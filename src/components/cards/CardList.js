import React from "react";
import PropTypes from "prop-types";
import Card from './Card';
import './CardList.css';

const CardList = (props) => {
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