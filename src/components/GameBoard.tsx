import styled from "styled-components";
import ZeroImg from "../assets/Zero.png";
import XImg from "../assets/Ex.png";
import { useEffect, useState } from "react";
import GameModal from "./GameModal";

const Container = styled.div`
  width: 450px;
  height: 450px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  transition: all 1s ease-in-out;
  @media only screen and (max-width: 600px) {
    width:250px;
    height: 250px;
  }
`;

const CellContainer = styled.div`
  flex: 1;
  background: orange;
  border: 0.5px solid lightgray;
  display: flex;
  justify-items: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background: #ffa600a2;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const GameBoard = () => {
  const imgSrc = [ZeroImg, XImg];
  const players = { human: ZeroImg, ai: XImg };
  const [cells, setCells] = useState(Array(9).fill(null));
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [gameMessage, setGameMessage] = useState("");

  const handleCellClick = (index: number) => {
    if (!cells[index]) {
      const newCells = [...cells];
      newCells[index] = imgSrc[currentImgIndex];
      setCells(newCells);
      const nextImgIndex = 1;
      setCurrentImgIndex(nextImgIndex);
      setTimeout(() => {
        nextPlayerTurn(nextImgIndex, newCells);
      }, 200);
    }
  };

  // function to decide the move for the ai player
  function nextPlayerTurn(nextImgIndex: number, cells: Array<string>) {
    // finding random moves
    // const move: number = Math.ceil(Math.random() * 8);

    // finding best move
    const move: number = bestMove(cells);

    const newCells = [...cells];
    newCells[move] = imgSrc[nextImgIndex];
  
    setCells(newCells);
    setCurrentImgIndex(0);
   
  }

  function bestMove(board: Array<string>) {
    let bestVal: number = -1000;
    let bestMoveIndex: number = 0;
    let index = 0;
    for (const i of board) {
      if (i == null) {
        const new_board = [...board];
        new_board[index] = players.ai;
        const moveVal = minmax(new_board, false);
        if (moveVal > bestVal) {
          bestVal = moveVal;
          bestMoveIndex = index;
        }
      }
      index++;
    }

    return bestMoveIndex;
  }

  function minmax(board: Array<string>, isMaximizing: boolean) {
    const score: number = winning(
      board,
      isMaximizing ? players.ai : players.human
    );
    if (score === 1 && isMaximizing) {
      return score;
    }
    if (score === 1 && !isMaximizing) {
      return -1;
    }

    if (score === 0) {
      return score;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      let index = 0;
      for (const i of board) {
        if (i == null) {
          const new_board = [...board];
          new_board[index] = players.ai;
          bestScore = Math.max(bestScore, minmax(new_board, false));
        }
        index++;
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      let index = 0;
      for (const i of board) {
        if (i == null) {
          const new_board = [...board];
          new_board[index] = players.human;
          bestScore = Math.min(bestScore, minmax(new_board, true));
        }
        index++;
      }
      return bestScore;
    }
  }

  // winning combinations using the board indexies
  function winning(board: Array<string>, player: string) {
    const isNullExist = (arr: Array<string>) => {
      for (const val of arr) {
        if (val == null) {
          return true;
        }
      }
      return false;
    };
    if (
      (board[0] == player && board[1] == player && board[2] == player) ||
      (board[3] == player && board[4] == player && board[5] == player) ||
      (board[6] == player && board[7] == player && board[8] == player) ||
      (board[0] == player && board[3] == player && board[6] == player) ||
      (board[1] == player && board[4] == player && board[7] == player) ||
      (board[2] == player && board[5] == player && board[8] == player) ||
      (board[0] == player && board[4] == player && board[8] == player) ||
      (board[2] == player && board[4] == player && board[6] == player)
    ) {
      return 1;
    } else if (!isNullExist(board)) {
      return 0;
    } else {
      return -1;
    }
  }

  useEffect(() => {
    if (winning(cells, players.human) && winning(cells, players.human) !== -1) {
        setGameMessage("You Win");
        setShowModal(true);
        setCells(Array(9).fill(null));
    }
    else if (winning(cells, players.ai) && winning(cells, players.ai) !== -1) {
        setGameMessage("You Lose!!");
        setShowModal(true);
        setCells(Array(9).fill(null));
    }
    else if (winning(cells, players.ai) == 0) {
        setGameMessage("Tie!!");
        setShowModal(true);
        setCells(Array(9).fill(null));
    }
  }, [cells, players.human, players.ai]);

  return (
    <Container>
      {cells.map((value, index) => (
        <CellContainer key={index} onClick={() => handleCellClick(index)}>
          {value && <Image src={value} />}
        </CellContainer>
      ))}
      {showModal ? (
        <GameModal message={gameMessage} setShowModal={setShowModal} />
      ) : null}
    </Container>
  );
};

export default GameBoard;
