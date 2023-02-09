import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./CardList.css";

const CardList = (props) => {
  // get the board id from the selected board (BoardsDropDown component)
  const boardID = props.selectedBoard[0].id;

  // use the props.getAllCards(board_id) --> cards dataset
  const cardsData = props.getAllCards(boardID);

  // map each card in dataset to a <Card> array

  // return your list of cards
  return (
    <div className="card_entries__container">
      {props.cardsData.map((card) => (
        <Card
          key={card.id}
          card_id={card.id}
          board_id={card.board_id}
          likes_count={card.likes_count}
          message={card.message}
          likeCard={props.likeCard}
          deleteCard={props.deleteCard}
        />
      ))}
    </div>
  );
};

export default CardList;
