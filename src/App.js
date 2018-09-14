// @flow

import React from 'react';
import './App.css';
const CELL_SIZE = 5;
const WIDTH = 1440;
const HEIGHT = 800;

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
        board[y][x] = pattern[y-20]
          ? pattern[y-20][x-60] === 1
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
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top + window.pageYOffset) - doc.clientTop,
    };
  }

  handleClick = (event: any) => {
    const elemOffset = this.getElementOffset();
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
    return (
      <div className="Cell" style={{
        left: `${CELL_SIZE * x + 1}px`,
        top: `${CELL_SIZE * y + 1}px`,
        width: `${CELL_SIZE - 1}px`,
        height: `${CELL_SIZE - 1}px`,
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

const treyRLE = `x = 97, y = 97, rule = B3/S23
37bo33bo$36b2o32b2o$35bobo31bobo$36bobo31bobo$36bob2o2b2o26bob2o2b2o$
30bo7bo25bo7bo$30bo33bo3$30bo15bo17bo15bo$29b3o12b2obo15b3o12b2obo$26b
3o17b3o11b3o17b3o$27bob2o12b3o15bob2o12b3o$28bo15bo17bo15bo$11bo$10b2o
$9bobo32bo33bo$10bobo23bo7bo25bo7bo$10bob2o2b2o13b2o2b2obo26b2o2b2obo$
4bo7bo23bobo31bobo$4bo32bobo31bobo$37b2o32b2o$37bo33bo$4bo15bo$3b3o12b
2obo$3o17b3o$bob2o12b3o65bo$2bo15bo65b2o$83bobo$84bobo$18bo65bob2o2b2o
$10bo7bo59bo7bo$5b2o2b2obo65bo$10bobo$11bobo$11b2o65bo15bo$11bo65b3o
12b2obo$74b3o17b3o$75bob2o12b3o$76bo15bo$46b3o$45bo2bo$45b2o2bo42bo$
48bo35bo7bo$45bo2bo30b2o2b2obo$45bobo3b2ob2o28bobo$46bo3bo3bobo28bobo$
42bo8bo4bo28b2o$11bo28b2ob2o7b2ob2o28bo$10b2o28bo4bo8bo$9bobo28bobo3bo
3bo$10bobo28b2ob2o3bobo$10bob2o2b2o30bo2bo$4bo7bo35bo$4bo42bo2b2o$48bo
2bo$48b3o$4bo15bo$3b3o12b2obo$3o17b3o$bob2o12b3o65bo$2bo15bo65b2o$83bo
bo$84bobo$18bo65bob2o2b2o$10bo7bo59bo7bo$5b2o2b2obo65bo$10bobo$11bobo$
11b2o65bo15bo$11bo65b3o12b2obo$74b3o17b3o$75bob2o12b3o$76bo15bo$25bo
33bo$24b2o32b2o$23bobo31bobo32bo$24bobo31bobo23bo7bo$24bob2o2b2o26bob
2o2b2o13b2o2b2obo$18bo7bo25bo7bo23bobo$18bo33bo32bobo$85b2o$85bo$18bo
15bo17bo15bo$17b3o12b2obo15b3o12b2obo$14b3o17b3o11b3o17b3o$15bob2o12b
3o15bob2o12b3o$16bo15bo17bo15bo3$32bo33bo$24bo7bo25bo7bo$19b2o2b2obo
26b2o2b2obo$24bobo31bobo$25bobo31bobo$25b2o32b2o$25bo33bo!`;
