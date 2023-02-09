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
import ShowCard from "./components/cards/ShowCard";

function App() {
  // cards data
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
    {
      board_id: 1,
      board_title: "Legos are Fun!",
      id: 3,
      likes_count: 4,
      message: "test delete",
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

  const addCard = newCard => {
    const newCardList = [...cardsData];

    const nextId = Math.max(...newCardList.map(card => card.id)) + 1;
    
    newCardList.push({
      id: nextId,
      message: newCard.message,
      
  });    
    setCardsData(newCardList);
      }


  

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
  const deleteCard = () => {
    const newcards = cardsData.filter((card) => card.id !== 3);
    console.log(newcards);
    setCardsData(newcards);
    
  };

  

  // boards data
  const [boardsData, setBoardsData] = useState([]);

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

  // selected boards data
  const [selectedBoardMessage, setSelectedBoardMessage] = useState(
    "Select a Board from the Board List!"
  );
  const updateSelectedBoardMessage = (message) => {
    setSelectedBoardMessage(message);
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
          updateSelectedBoardMessage={updateSelectedBoardMessage}
        ></BoardsDropDown>
        <header>
          <h3>Selected Board</h3>
        </header>
        <SelectedBoard
          selectedBoardMessage={selectedBoardMessage}
        ></SelectedBoard>
        <header>
          <h3>Create a New Board</h3>
        </header>
        <NewBoardForm></NewBoardForm>
      </section>
      <ShowCard/>
      <CardList
        cardsData={cardsData}
        likeCard={likeCard}
        deleteCard={deleteCard}
      />
      <NewCard addCard={addCard} />

      <footer>
        <h4>Made by Anna, Larissa, Melody, Supriya </h4>
      </footer>
    </main>
  );
}

export default App;
