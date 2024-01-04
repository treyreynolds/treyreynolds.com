import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { rleDecompress } from "../utils";
import patterns from "../data/patterns";
import Cell from "./Cell";

const DEFAULT_CELL_SIZE = 6;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const INTERVAL_MS = 0.1;

export default function GameBoard() {
  const [cellSize, setCellSize] = useState<number>(DEFAULT_CELL_SIZE);
  const [board, setBoard] = useState<boolean[]>([]);
  const [selectedPattern, setSelectedPattern] = useState(patterns.oscilator);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    setBoard(makeBoardPattern(rleDecompress(selectedPattern)));
  }, [selectedPattern]);

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

  const calculateNeighbors = (
    board: boolean[],
    x: number,
    y: number
  ): number => {
    let neighbors = 0;
    const idx = (y1: number, x1: number) => y1 * cols.current + x1;

    // Directly check each neighbor
    neighbors += x > 0 && y > 0 && board[idx(y - 1, x - 1)] ? 1 : 0; // Top-left
    neighbors += y > 0 && board[idx(y - 1, x)] ? 1 : 0; // Top
    neighbors +=
      x < cols.current - 1 && y > 0 && board[idx(y - 1, x + 1)] ? 1 : 0; // Top-right
    neighbors += x > 0 && board[idx(y, x - 1)] ? 1 : 0; // Left
    neighbors += x < cols.current - 1 && board[idx(y, x + 1)] ? 1 : 0; // Right
    neighbors +=
      x > 0 && y < rows.current - 1 && board[idx(y + 1, x - 1)] ? 1 : 0; // Bottom-left
    neighbors += y < rows.current - 1 && board[idx(y + 1, x)] ? 1 : 0; // Bottom
    neighbors +=
      x < cols.current - 1 && y < rows.current - 1 && board[idx(y + 1, x + 1)]
        ? 1
        : 0; // Bottom-right

    return neighbors;
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
    runIteration(board);
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

  const lastRenderTime = useRef(performance.now());

  const runIteration = (currentBoard: boolean[]) => {
    const currentTime = performance.now();
    const timeSinceLastRender = currentTime - lastRenderTime.current;

    let newBoard: boolean[] | null = null;

    if (timeSinceLastRender > INTERVAL_MS) {
      lastRenderTime.current = currentTime;

      newBoard = makeEmptyBoard(rows.current, cols.current);

      for (let y = 0; y < rows.current; y++) {
        for (let x = 0; x < cols.current; x++) {
          let neighbors = calculateNeighbors(currentBoard, x, y);
          let idx = y * cols.current + x;
          if (currentBoard[idx]) {
            newBoard[idx] = neighbors === 2 || neighbors === 3;
          } else {
            newBoard[idx] = neighbors === 3;
          }
        }
      }

      setBoard(newBoard);
    }

    timeoutHandler.current = window.requestAnimationFrame(() =>
      runIteration(newBoard || currentBoard)
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
        {board.map((cell, idx) => {
          const x = idx % cols.current;
          const y = Math.floor(idx / cols.current);
          return cell ? (
            <Cell x={x} y={y} size={cellSize} key={`${x},${y}`} />
          ) : null;
        })}
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
            step={0.5}
            onChange={handleChangeZoom}
          />
        </ZoomControl>
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
  background-image: linear-gradient(#333 1px, transparent 1px),
    linear-gradient(90deg, #333 1px, transparent 1px);
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
