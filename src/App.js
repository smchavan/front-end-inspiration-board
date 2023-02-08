import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/cards/Card";
import NewCard from "./components/cards/NewCard";
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
    <div className="App">
      <header className="App-header">
        <h1>CheerUp Inspiration Board</h1>
      </header>
      <body>
        <CardList cardsData={cardsData} likeCard={likeCard} />

        <NewCard />
      </body>
      <footer>
        <p4>Made by Anna, Larissa, Melody, Supriya </p4>
      </footer>
    </div>
  );
}

export default App;
