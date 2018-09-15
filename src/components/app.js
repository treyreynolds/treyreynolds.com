// @flow

import React from 'react';
import styled from 'styled-components';
import { rleDecompress } from '../utils';
import patterns from '../data/patterns';

import Cell from './cell';

const CELL_SIZE = 5;
const BOTTOM_BAR_HEIGHT = 50;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight - BOTTOM_BAR_HEIGHT;
const PATTERN_OFFSET_X = 10;
const PATTERN_OFFSET_Y = 10;

type State = {
  cells: Array<?{x: number, y: number}>,
  interval: number,
  isRunning: boolean
};

export default class Game extends React.Component<{}, State> {

  rows = 0;
  cols = 0;
  board = [];
  boardRef = null;
  timeoutHandler = null;

  state = {
    cells: [],
    interval: 10,
    isRunning: false
  };

  constructor() {
    super();
    this.rows = HEIGHT / CELL_SIZE;
    this.cols = WIDTH / CELL_SIZE;
    this.board = this.makeBoardPattern(rleDecompress(patterns.oscilator));
    this.state.cells = this.makeCells();
  }

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = false
      }
    }
    return board;
  }

  makeBoardPattern(pattern: any) {
    let board = [];
    for (let y = 0; y < this.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.cols; x++) {
        board[y][x] = pattern[y-PATTERN_OFFSET_Y]
          ? pattern[y-PATTERN_OFFSET_Y][x-PATTERN_OFFSET_X] === 1
          : false;
      }
    }
    return board;
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  calculateNeighbors(board: any, x:number, y:number) {

    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i];
      let y1 = y + dir[0];
      let x1 = x + dir[1];

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
        neighbors++;
      }
    }

    return neighbors;
  }


  getElementOffset() {
    if(this.boardRef){
      const rect = this.boardRef.getBoundingClientRect();
      const doc = document.documentElement || {};
      return {
        x: (rect.left + window.pageXOffset) - doc.clientLeft,
        y: (rect.top + window.pageYOffset) - doc.clientTop,
      };
    }
  }

  handleClick = (event: any) => {
    const elemOffset = this.getElementOffset() || {};
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;

    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
      this.board[y][x] = !this.board[y][x];
    }
    this.setState({ cells: this.makeCells() });
  };

  runGame = () => {
    this.setState({ isRunning: true });
    this.runIteration();
  };

  stopGame = () => {
    this.setState({ isRunning: false });
    if (this.timeoutHandler) {
      window.clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  };

  runIteration() {
    let newBoard = this.makeEmptyBoard();

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.board, x, y);
        if (this.board[y][x]) {
          newBoard[y][x] = (neighbors === 2 || neighbors === 3);
        } else {
          if (!this.board[y][x] && neighbors === 3) {
            newBoard[y][x] = true;
          }
        }
      }
    }

    this.board = newBoard;
    this.setState({ cells: this.makeCells() });

    this.timeoutHandler = window.setTimeout(() => {
      this.runIteration();
    }, this.state.interval);
  }

  handleIntervalChange = (event: any) => {
    this.setState({ interval: event.target.value });
  };


  render() {

    const { isRunning, cells } = this.state;

    return (
      <PageWrapper>
        <StyledBoard
          pageWidth={WIDTH}
          pageHeight={HEIGHT}
          cellSize={CELL_SIZE}
          onClick={this.handleClick}
          ref={(n) => { this.boardRef = n; }}
        >

          {
            cells.map(cell => cell &&
              <Cell x={cell.x} y={cell.y} size={CELL_SIZE} key={`${cell.x},${cell.y}`}/>
            )
          }

        </StyledBoard>

        <ControlsArea>
          Update every <input value={this.state.interval}
                              onChange={this.handleIntervalChange} /> msec
          {isRunning ?
            <button className="button"
                    onClick={this.stopGame}>Stop</button> :
            <button className="button"
                    onClick={this.runGame}>Run</button>
          }
        </ControlsArea>
      </PageWrapper>
    );
  }
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100vh;
`;

const StyledBoard = styled.div`
  display: block;
  width: ${p => p.pageWidth}px;
  height: ${p => p.pageHeight}px;
  position: relative;
  margin: 0 auto;
  background-color: #242833;
  background-image: linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px);
  background-size: ${p => p.cellSize}px ${p => p.cellSize}px;
`;

const ControlsArea = styled.div`
  background: #EFEFEF;
  color: #333;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;
  justify-content: center;
  
  input {
    height: 25px;
    margin: 0 5px 0 15px;
    width: 50px;
  }
  
  button {
    font-size: 12pt;
    cursor: pointer;
    color: rgb(24, 188, 156);
    background-color: transparent;
    border-radius: 8px;
    margin: 2px 0 0 10px;
    padding: 3px;
    width: 150px;
    transition: background-color 0.2s ease 0s;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(24, 188, 156);
    border-image: initial;
  }
`;
