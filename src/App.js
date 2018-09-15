// @flow

import React from 'react';
import './App.css';
const CELL_SIZE = 10;
const BOTTOM_BAR_HEIGHT = 30;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight - BOTTOM_BAR_HEIGHT;
const PATTERN_OFFSET_X = 50;
const PATTERN_OFFSET_Y = 30;

const colorGradient = [
  '#fcfe21',
  '#e7f945',
  '#d2f45e',
  '#b9ed76',
  '#a3e78b',
  '#a3e78a',
  '#89e19f',
  '#5dd6c3',
  '#45d1d7',
  '#2ccae8',
  '#1cdde8',
  '#1cdde8'
];

type State = {
  cells: Array<?{x: number, y: number}>,
  interval: number,
  isRunning: boolean
};

class Game extends React.Component<{}, State> {

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
    this.board = this.makeBoardPattern(rleDecompress(treyRLE));
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

  calculateNeighbors(board: Array<{x: number, y: number}>, x:number, y:number) {
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
          if (neighbors === 2 || neighbors === 3) {
            newBoard[y][x] = true;
          } else {
            newBoard[y][x] = false;
          }
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
      <div>
        <div
          className="Board"
          style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
          onClick={this.handleClick}
          ref={(n) => { this.boardRef = n; }}
        >
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y}
                  key={`${cell.x},${cell.y}`}/>
          ))}
        </div>
        <div className="controls">
          Update every <input value={this.state.interval}
                              onChange={this.handleIntervalChange} /> msec
          {isRunning ?
            <button className="button"
                    onClick={this.stopGame}>Stop</button> :
            <button className="button"
                    onClick={this.runGame}>Run</button>
          }
        </div>
      </div>
    );
  }
}

type CellProps = {
  x: number,
  y: number
};

class Cell extends React.Component<CellProps> {
  render() {
    const { x, y } = this.props;
    const gradientSelector = (x + y) % 10;
    return (
      <div className="Cell" style={{
        left: `${CELL_SIZE * x}px`,
        top: `${CELL_SIZE * y}px`,
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
        backgroundColor: colorGradient[gradientSelector],
        borderRadius: '5px'
      }} />
    );
  }
}

export default Game;


var rleDecompress = function(rle) {
  rle = rle.substr(rle.indexOf('\n', rle.indexOf('rule')+1)).replace('\n', '');
  rle = rle.replace('\r', '');

  var piece = {0:{}};
  var num = '';
  var x = 0;
  var y = 0;
  var l;

  for(var s in rle) {

    var s = rle[s];

    if(s === 'b') {

      x = num === '' ? x+1 : x + parseInt(num);
      num = '';

    }

    else if(s === 'o') {

      var i = num === '' ? 1 : parseInt(num);

      while(i--)
        piece[y][x+i] = 1;

      x = num === '' ? x+1 : x + parseInt(num);
      num = '';


    }

    else if(s === '$') {

      y += num === '' ? 1 : parseInt(num);
      x = 0;
      num = '';
      piece[y] = {};

    }

    else if(s === '!')
      break;

    else if(parseInt(s).toString() !== 'NaN'){

      num += s;

    }

  }

  return piece;

};

const treyRLE = `x = 8, y = 5, rule = B3/S23
4b3o$3bo$o5bo$b2o2bobo$bobo!`;
