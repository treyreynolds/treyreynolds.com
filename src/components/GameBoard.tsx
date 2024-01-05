import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { rleDecompress } from "../utils";
import patterns from "../data/patterns";

const DEFAULT_CELL_SIZE = 6;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

export default function GameBoard() {
  const [generation, setGeneration] = useState<number>(0);
  const [cellSize, setCellSize] = useState<number>(DEFAULT_CELL_SIZE);
  const [board, setBoard] = useState<boolean[]>([]);
  const [neighborIndices, setNeighborIndices] = useState<number[][]>([]);
  const [selectedPattern, setSelectedPattern] = useState(patterns.oscilator);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viralMode, setViralMode] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initialBoard = makeBoardPattern(rleDecompress(selectedPattern));
    setBoard(initialBoard);
    setNeighborIndices(precomputeNeighborIndices());
  }, [selectedPattern]);

  useEffect(() => {
    drawBoard();
  }, [board, cellSize]);

  const colorGradient = [
    "#fcfe21",
    "#e7f945",
    "#d2f45e",
    "#b9ed76",
    "#a3e78b",
    "#a3e78a",
    "#89e19f",
    "#5dd6c3",
    "#45d1d7",
    "#2ccae8",
    "#1cdde8",
    "#1cdde8",
  ];

  const drawBoard = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        // get a random color for each fill
        board.forEach((cell, idx) => {
          if (cell) {
            ctx.fillStyle = colorGradient[idx % colorGradient.length];
            ctx.shadowBlur = 5;
            ctx.shadowColor = "#0e0e0e";
            const x = (idx % cols.current) * cellSize;
            const y = Math.floor(idx / cols.current) * cellSize;
            ctx.fillRect(x, y, cellSize, cellSize);
          }
        });
      }
    }
  };

  const rows = useRef<number>(Math.floor(HEIGHT / cellSize));
  const cols = useRef<number>(Math.floor(WIDTH / cellSize));

  const [isRunning, setIsRunning] = useState<boolean>(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const prevCellSize = useRef<number>(DEFAULT_CELL_SIZE);
  const timeoutHandler = useRef<number | null>(null);

  const makeEmptyBoard = (co: number, ro: number): boolean[] => {
    return new Array(ro * co).fill(false);
  };

  const makeBoardPattern = (pattern: {
    [key: number]: { [key: number]: number };
  }): boolean[] => {
    const board = makeEmptyBoard(rows.current, cols.current);
    const patternRows = Object.keys(pattern)
      .map((k) => parseInt(k))
      .filter((k) => !isNaN(k));
    const patternMaxRow = Math.max(...patternRows);
    const patternMaxCol = Math.max(
      ...patternRows.map((row) =>
        Math.max(
          ...Object.keys(pattern[row])
            .map((k) => parseInt(k))
            .filter((k) => !isNaN(k))
        )
      )
    );

    const offsetX = Math.max(0, Math.floor((cols.current - patternMaxCol) / 2));
    const offsetY = Math.max(0, Math.floor((rows.current - patternMaxRow) / 2));

    for (let y = 0; y <= patternMaxRow; y++) {
      for (let x = 0; x <= patternMaxCol; x++) {
        if (
          y + offsetY < rows.current &&
          x + offsetX < cols.current &&
          pattern[y] &&
          pattern[y][x] === 1
        ) {
          board[(y + offsetY) * cols.current + (x + offsetX)] = true;
        }
      }
    }
    return board;
  };

  const precomputeNeighborIndices = () => {
    const neighborIndices = new Array(rows.current * cols.current);

    for (let y = 0; y < rows.current; y++) {
      for (let x = 0; x < cols.current; x++) {
        const idx = y * cols.current + x;
        neighborIndices[idx] = [];

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < cols.current && ny >= 0 && ny < rows.current) {
              neighborIndices[idx].push(ny * cols.current + nx);
            }
          }
        }
      }
    }

    return neighborIndices;
  };

  const calculateNeighbors = (board: boolean[], idx: number): number => {
    return neighborIndices[idx].reduce(
      (acc, nIdx) => acc + (board[nIdx] ? 1 : 0),
      0
    );
  };

  const getElementOffset = (): { x: number; y: number } => {
    if (boardRef.current) {
      const rect = boardRef.current.getBoundingClientRect();
      const doc = document.documentElement || {};
      return {
        x: rect.left + window.scrollX - doc.clientLeft,
        y: rect.top + window.scrollY - doc.clientTop,
      };
    }
    return {
      x: 0,
      y: 0,
    };
  };

  const handleSelectPattern = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPattern(event.target.value);
    stopGame();
  };

  const handleCellToggle = (x: number, y: number) => {
    const idx = y * cols.current + x;
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[idx] = !newBoard[idx]; // Toggle cell
      return newBoard;
    });
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault(); // To prevent text selection during drag
    setIsDragging(true);
    handleClick(event); // Reusing your existing click handler
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const elemOffset = getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);

    if (x >= 0 && x < cols.current && y >= 0 && y < rows.current) {
      handleCellToggle(x, y);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const elemOffset = getElementOffset() || {};
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / cellSize);
    const y = Math.floor(offsetY / cellSize);
    handleCellToggle(x, y);
  };

  const runGame = () => {
    setIsRunning(true);
    runIteration(board, getActiveCells(board));
  };

  const stopGame = () => {
    setIsRunning(false);
    if (timeoutHandler.current) {
      window.cancelAnimationFrame(timeoutHandler.current);
      timeoutHandler.current = null;
    }
  };

  const handleChangeZoom = (event: React.ChangeEvent<HTMLInputElement>) => {
    stopGame();
    const newCellSize = parseFloat(event.target.value);
    setCellSize(newCellSize);
    adjustZoom(newCellSize);
  };

  const getActiveCells = (board: boolean[]) => {
    const activeCells: Set<number> = new Set();

    board.forEach((cell, idx) => {
      if (cell) {
        activeCells.add(idx);
        neighborIndices[idx].forEach((nIdx) => activeCells.add(nIdx));
      }
    });

    return activeCells;
  };

  const runIteration = (currentBoard: boolean[], active: Set<number>) => {
    setGeneration((prevGeneration) => prevGeneration + 1);
    const newActiveCells: Set<number> = new Set();
    const newBoard = currentBoard.slice();

    let countForThisGeneration = 0;
    active.forEach((idx) => {
      const neighbors = calculateNeighbors(currentBoard, idx);
      const alive = currentBoard[idx];
      const willBeAlive = alive
        ? neighbors === 2 || neighbors === 3
        : neighbors === 3 || (viralMode && neighbors === 4);

      if (willBeAlive) {
        newActiveCells.add(idx);
        neighborIndices[idx].forEach((nIdx) => newActiveCells.add(nIdx));
      }

      newBoard[idx] = willBeAlive;
      countForThisGeneration++;
    });

    setBoard(newBoard);

    // Continue the game loop
    timeoutHandler.current = window.requestAnimationFrame(() =>
      runIteration(newBoard, newActiveCells)
    );
  };

  const adjustZoom = (newCellSize: number) => {
    const newRows = Math.floor(HEIGHT / newCellSize);
    const newCols = Math.floor(WIDTH / newCellSize);
    const prevRows = rows.current;
    const prevCols = cols.current;

    setBoard((prevBoard) => {
      let newBoard = makeEmptyBoard(newCols, newRows);

      // Calculate offsets to center the existing pattern
      const colOffset = Math.floor((newCols - prevCols) / 2);
      const rowOffset = Math.floor((newRows - prevRows) / 2);

      // Copy the existing pattern into the new board, centered
      for (let y = 0; y < prevRows; y++) {
        for (let x = 0; x < prevCols; x++) {
          const newY = y + rowOffset;
          const newX = x + colOffset;
          if (newY >= 0 && newY < newRows && newX >= 0 && newX < newCols) {
            newBoard[newY * newCols + newX] = prevBoard[y * prevCols + x];
          }
        }
      }

      setNeighborIndices(precomputeNeighborIndices());
      return newBoard;
    });

    rows.current = newRows;
    cols.current = newCols;
    prevCellSize.current = newCellSize;
  };

  return (
    <PageWrapper>
      <StyledBoard
        $pageWidth={WIDTH}
        $pageHeight={HEIGHT}
        $cellSize={cellSize}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={boardRef}
      >
        <canvas ref={canvasRef} width={WIDTH} height={HEIGHT}></canvas>
      </StyledBoard>
      <ControlsArea>
        <Row>
          <Col>
            <div>
              <label htmlFor="pattern-select">Pattern</label>
            </div>
            <select
              id="pattern-select"
              value={selectedPattern}
              onChange={handleSelectPattern}
            >
              {Object.entries(patterns).map(([name, pattern]) => (
                <option key={name} value={pattern}>
                  {name}
                </option>
              ))}
            </select>
          </Col>
          {isRunning ? (
            <button className="button" onClick={stopGame}>
              Stop
            </button>
          ) : (
            <button className="button" onClick={runGame}>
              Run
            </button>
          )}
        </Row>
        <ZoomControl>
          <Label htmlFor="zoom-range">Zoom</Label>
          <RangeInput
            id="zoom-range"
            value={cellSize}
            type="range"
            min={1}
            max={20}
            step={1}
            onChange={handleChangeZoom}
          />
        </ZoomControl>
        <Row>
          <Label htmlFor="viral-mode">Viral Mode</Label>
          <input
            id="viral-mode"
            type="checkbox"
            checked={viralMode}
            onChange={() => setViralMode(!viralMode)}
            disabled={isRunning}
          />
        </Row>
        <Row>
          <Label>Generation</Label>
          {generation}
        </Row>
      </ControlsArea>
      <Logo>
        <img src="/trey-invert.svg" alt="Trey logo" width="150" height="150" />
      </Logo>
    </PageWrapper>
  );
}

const Logo = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100vh;
`;

interface StyledBoardProps {
  $pageWidth: number;
  $pageHeight: number;
  $cellSize: number;
}

const StyledBoard = styled.div<StyledBoardProps>`
  display: block;
  width: ${(p) => p.$pageWidth}px;
  height: ${(p) => p.$pageHeight}px;
  position: relative;
  margin: 0 auto;
  background-color: #242833;
  background-image: ${(p) =>
    p.$cellSize > 2
      ? `linear-gradient(#333 1px, transparent 1px),
    linear-gradient(90deg, #333 1px, transparent 1px)`
      : "none"};
  background-size: ${(p) => p.$cellSize}px;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const ControlsArea = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 20px 15px 10px 15px;
  z-index: 1;
  color: #fff;
  background: #00000050;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: start;
  justify-content: center;

  button {
    font-size: 12pt;
    cursor: pointer;
    color: #18bc9c;
    background-color: transparent;
    border-radius: 8px;
    padding: 10px;
    width: 150px;
    border-width: 1px;
    border-style: solid;
    border-color: #18bc9c;
    border-image: initial;
  }
`;

const ZoomControl = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 16px;
`;

const RangeInput = styled.input`
  width: 200px; // Adjust as needed for the track length
  margin-left: 10px;
  -webkit-appearance: none; // Removes default webkit styles
  appearance: none;
  height: 2px;
  background: #ddd; // Color of the track
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px; // Width of the thumb
    height: 20px; // Height of the thumb
    background: rgb(24, 188, 156); // Color of the thumb
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 20px; // Width of the thumb
    height: 20px; // Height of the thumb
    background: rgb(24, 188, 156); // Color of the thumb
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-track {
    background: #ddd; // Color of the track
    height: 2px;
  }

  &::-ms-thumb {
    width: 20px; // Width of the thumb
    height: 20px; // Height of the thumb
    background: #333; // Color of the thumb
    cursor: pointer;
    border-radius: 50%;
  }

  &::-ms-track {
    background: transparent; // Required for MS
    border-color: transparent;
    color: transparent;
  }
`;
