import React from 'react';
import PropTypes from "prop-types"
import "./Card.css";

const Card = (props) =>{
  const onLikeButtonClick = () => {
    console.log(props.card_id);
    props.likeCard(props.card_id);
  };

  const onDeleteButtonClick =() =>{
    console.log(props.card_id);
    props.deleteCard(props.card_id);
  };

  return (
    <div className="card">
      <p className='card_message'>{props.message}</p>
      <section className='cards_buttons'>
        <p>{props.likes_count}💕</p>
      
        <button  className='like_button' type='button' onClick={onLikeButtonClick}>+1</button>
        <button  className='delete_button' type='button'onClick={onDeleteButtonClick}>Delete</button>
      </section>
    </div>
  );
};

Card.propTypes = {
  card_id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  likes_count: PropTypes.number,
  deleteCard: PropTypes.func.isRequired,
  likeCard: PropTypes.func.isRequired,
};

export default Card;