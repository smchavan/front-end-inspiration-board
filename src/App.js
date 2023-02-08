import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/cards/Card";
import NewCard from "./components/cards/NewCard";
import BoardsList from "./components/boards/BoardsList";
//import CardList from './components/cards/CardList'
import axios from "axios";

function App() {
  // create states for boards and cards data
  const [cardsData, setCardsData] = useState([]);
  const [boardsData, setBoardsData] = useState([]);

  // initialize boards dataset upon mounting
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
      .then((response) => {
        console.log(response.data);
        setBoardsData(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, []);

  // Function to display card data
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

  return (
    <main className="App">
      <header className="App-header">
        <h1>CheerUp Inspiration Board</h1>
      </header>
      <BoardsList boardsData={boardsData}></BoardsList>
      <Card />
      <NewCard />
      <footer>
        <h4>Made by Anna, Larissa, Melody, Supriya </h4>
      </footer>
    </main>
  );
}

export default App;
