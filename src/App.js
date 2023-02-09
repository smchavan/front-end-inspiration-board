import React, { useState, useEffect } from "react";
import "./App.css";

import BoardsDropDown from "./components/boards/BoardsDropDown";
import SelectedBoard from "./components/boards/SelectedBoard";
import NewBoardForm from "./components/boards/NewBoardForm";

import axios from "axios";
import CardList from "./components/cards/CardList";
import ShowCard from "./components/cards/ShowCard";

function App() {
  // ~~~~~~ boards data ~~~~~~
  const [boardsData, setBoardsData] = useState([]);
  // function to initialize boards data upon mounting
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
      .then((response) => {
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, []);
  // function to update boards data upon form submission
  const updateBoardsData = (newBoard) => {
    // duplicate boardsData
    const newBoardsData = [...boardsData];
    // find next valid board id
    const nextID = Math.max(...newBoardsData.map((board) => board.id)) + 1;
    newBoardsData.push({
      id: nextID,
      title: newBoard.title,
      creator: newBoard.creator,
    });
    setBoardsData(newBoardsData);
  };

  // selected boards message
  const [selectedBoard, setSelectedBoard] = useState();
  // function to update selected board message
  const updateSelectedBoard = (selectedBoard) => {
    setSelectedBoard(selectedBoard);
    console.log(selectedBoard);
    //console.log(selectedBoard[0])
  };

  return (
    <main className="App">
      <header className="App-header">
        <h1>CheerUp Inspiration Board</h1>
      </header>
      <section>
        <header>
          <h3>Boards</h3>
        </header>
        <BoardsDropDown
          boardsData={boardsData}
          updateSelectedBoard={updateSelectedBoard}
        ></BoardsDropDown>
        <header>
          <h3>Selected Board</h3>
        </header>
        <SelectedBoard selectedBoard={selectedBoard}></SelectedBoard>
        <header>
          <h3>Create a New Board</h3>
        </header>
        <NewBoardForm updateBoardsData={updateBoardsData}></NewBoardForm>
      </section>
      <ShowCard />
      <CardList
        selectedBoard={selectedBoard}
        //cardsData={cardsData}
        //likeCard={likeCard}
        //deleteCard={deleteCard}
        //addCard={addCard}
        //getBoardCards={getBoardCards}
      />
      <footer>
        <h4>Made by Anna, Larissa, Melody, Supriya </h4>
      </footer>
    </main>
  );
}

export default App;
