import React, { useState, useEffect } from "react";
import "./App.css";

const BOARD_SIZE = 3;

const App = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const checkWinner = () => {
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
      for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    };

    const checkDraw = () => {
      return board.every((square) => square !== null);
    };

    const winnerExists = checkWinner();
    if (winnerExists) {
      setWinner(winnerExists);
    } else if (checkDraw()) {
      setWinner("Draw");
    }
  }, [board]);

  useEffect(() => {
    if (player === "O" && winner === null) {
      // Opponent plays
      const emptyIndices = board.reduce((acc, val, index) => {
        if (val === null) acc.push(index);
        return acc;
      }, []);
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const newBoard = [...board];
      newBoard[randomIndex] = "O";
      setBoard(newBoard);
      setPlayer("X");
    }
  }, [player, board, winner]);

  const handleClick = (index) => {
    if (board[index] === null && player === "X" && winner === null) {
      const newBoard = [...board];
      newBoard[index] = "X";
      setBoard(newBoard);
      setPlayer("O");
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((square, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
    );
  };

  const resetGame = () => {
    setBoard(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <div className="winner">
          {winner === "Draw" ? "It's a Draw!" : `Player ${winner} wins!`}
        </div>
      ) : (
        <div className="turn">Player's Turn: {player}</div>
      )}
      {renderBoard()}
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default App;
