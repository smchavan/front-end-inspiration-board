import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/cards/Card";
import NewCard from "./components/cards/NewCard";
import BoardsDropDown from "./components/boards/BoardsDropDown";
import SelectedBoard from "./components/boards/SelectedBoard";
import NewBoardForm from "./components/boards/NewBoardForm";
//import CardList from './components/cards/CardList'
import axios from "axios";
import CardList from "./components/cards/CardList";

function App() {
  const [cardsData, setCardsData] = useState([
    {
      board_id: 1,
      board_title: "Legos are Fun!",
      id: 1,
      likes_count: 3,
      message: "Lego Lego Lego Fun",
    },
    {
      board_id: 1,
      board_title: "Legos are Fun!",
      id: 2,
      likes_count: 4,
      message: "Puzzles are also Fun like Legos",
    },
  ]);

  const [boardsData, setBoardsData] = useState([]);

  // initialize boards dataset upon mounting
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

  const getAllCards = (boardId) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards/${boardId}/cards`)
      .then((response) => {
        console.log(response.data);
        setCardsData(response.data.cards);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  };

  const likeCard = () => {
    const cards = cardsData.map((card) => {
      if (card.id === 2) {
        card.likes_count += 1;
        return card;
      } else {
        return card;
      }
    });

    setCardsData(cards);
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
        <BoardsDropDown boardsData={boardsData}></BoardsDropDown>
        <header>
          <h3>Selected Board</h3>
        </header>
        <SelectedBoard></SelectedBoard>
        <header>
          <h3>Create a New Board</h3>
        </header>
        <NewBoardForm></NewBoardForm>
      </section>
      <CardList cardsData={cardsData} likeCard={likeCard} />
      <NewCard />
      <Card />
      <NewCard />
      <footer>
        <h4>Made by Anna, Larissa, Melody, Supriya </h4>
      </footer>
    </main>
  );
}

export default App;
