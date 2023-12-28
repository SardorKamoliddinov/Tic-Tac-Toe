import React, { useState } from "react";
import "./../../App.css";

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const initialState = {
  squares: Array(9).fill(null),
  xIsNext: true,
};

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board() {
  const [state, setState] = useState(initialState);

  const handleClick = (i) => {
    const squares = state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      squares: squares,
      xIsNext: !state.xIsNext,
    });
  };

  const handleRestart = () => {
    setState(initialState);
  };

  const renderSquare = (i) => {
    return <Square value={state.squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(state.squares);
  const queue = winner
    ? `Winner: ${winner}`
    : `Next player: ${state.xIsNext ? "X" : "O"}`;
  const status = (
    <div
      style={{
        color: winner === "O" ? "green" : winner === "X" ? "red" : "black",
        fontWeight:
          winner === "O" ? "bold" : winner === "X" ? "bold" : "normal",
      }}
    >
      Winner: {winner}
    </div>
  );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="queue">{queue}</div>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="board-row">
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <button className="restart-button" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
}

function Test() {
  return (
    <div className="chartCard">
      <div className="chartBox">
        <Board />
      </div>
    </div>
  );
}

export default Test;
