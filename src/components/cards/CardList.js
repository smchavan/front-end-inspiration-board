import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./CardList.css";
import NewCard from "./NewCard";
import axios from "axios";

const CardList = (props) => {
  const [cardsData, setCardsData] = useState([
    {
      board_id: 1,
      board_title: "Legos are Fun!",
      id: 1,
      likes_count: 3,
      message: "Lego Lego Lego Fun",
    },
    {
      board_id: 2,
      board_title: "Legos are Fun!",
      id: 2,
      likes_count: 4,
      message: "Puzzles are also Fun like Legos",
    },
    {
      board_id: 3,
      board_title: "test delete",
      id: 3,
      likes_count: 4,
      message: "test delete",
    },
    {
      board_id: 4,
      board_title: "board 4",
      id: 4,
      likes_count: 4,
      message: "board 4",
    },
    {
      board_id: 1,
      board_title: "Legos are Fun!",
      id: 5,
      likes_count: 4,
      message: "board1",
    },
  ]);
  //console.log(props.selectedBoard ? props.selectedBoard[0].id: null)
  
  if (props.selectedBoard !== undefined) {
    console.log(props.selectedBoard)
    const boardID = props.selectedBoard[0].id;
    console.log(boardID)
    const boardCard = cardsData.filter((card) => card.board_id !== boardID)
    console.log(boardCard)
    setCardsData(boardCard)
  } 
  console.log(cardsData)

  
  //console.log(props.selectedBoard)
  
  //let boardID = props.selectedBoard[0].id;
 

  
  //const boardID = 4;
  
  //const cardsData = props.getBoardCards()
  //const boardCard = cardsData.filter((card) => card.board_id === boardID);
  //console.log(boardCard);
  //console.log(boardCard[0].board_title)
  //console.log(props.selectedBoard)
  

  //console.log(props.selectedBoard[0].cards)

  //const boardCard = props.cardsData.filter(card=>card.board_id===BoardId)
  //console.log(boardCard)

  const getBoardCards = (boardId) => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${props.selectedBoard[0].id}/cards`,
        {}
      )

      .then((response) => setCardsData(response.data))
      .catch((error) => {
        console.log(error);
      });
  };
  const addCard = (message) => {
    const newCardList = [...cardsData];

    const nextId = Math.max(...newCardList.map((card) => card.id)) + 1;

    newCardList.push({
      id: nextId,
      message: message,
    });
    setCardsData(newCardList);
  };

  const likeCard = () => {
    const card = cardsData.map((card) => {
      if (card.id === 2) {
        card.likes_count += 1;
        return card;
      } else {
        return card;
      }
    });

    setCardsData(card);
  };

  const deleteCard = () => {
    const newcards = cardsData.filter((card) => card.id !== 3);
    console.log(newcards);
    setCardsData(newcards);
  };

  return (
    <>
      <div>
        {cardsData.map((card) => (
          <Card
            key={card.id}
            card_id={card.id}
            board_id={card.board_id}
            likes_count={card.likes_count}
            message={card.message}
            likeCard={likeCard}
            deleteCard={deleteCard}
          />
        ))}
      </div>
      <div>
        <NewCard addCard={addCard} />
      </div>
    </>
  );
};

export default CardList;
