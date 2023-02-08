import React,{useState, useEffect} from 'react';
import './App.css';
import Card from './components/cards/Card'
import NewCard from './components/cards/NewCard'
//import CardList from './components/cards/CardList'
import axios from "axios";

function App() {
  const [cardsData, setCardsData] = useState([]);

  const getAllCards  = (boardId) => {
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
    <div className="App">
      <header className="App-header">
        <h1>CheerUp Inspiration Board</h1>
      </header>  
      <body> 
        <Card/>
        <NewCard/>
      </body> 
      <footer>
        <p4>Made by Anna, Larissa, Melody, Supriya </p4>
      </footer>
    </div>
  );
}

export default App;
