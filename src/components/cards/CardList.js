import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./CardList.css";
import NewCard from "./NewCard";
import axios from "axios";

const CardList = (props) => {
  console.log(props.cardsData)
  //const selectedBoardId = props.selectedBoard ? props.selectedBoard[0].id: null
  //console.log(props.selectedBoard ? props.selectedBoard.id: null)
  //console.log(selectedBoardId )
  //if (props.selectedBoard !== undefined) {
    //console.log(props.selectedBoard)
    ////const boardID = props.selectedBoard[0].id;
    //console.log(boardID)
    //const boardCard = cardsData.filter((card) => card.board_id === boardID)
    //console.log(boardCard)
    //setCardsData(boardCard)

  // const getBoardCard = async (boardId) =>{
  //   return axios
  //       .get(
  //       `${process.env.REACT_APP_BACKEND_URL}/boards/${props.selectedBoard.id}/cards`,
  //       {}
  //     )

  //     .then((response) => {return response.data})
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   };

  //   useEffect(() =>{
  //     getBoardCard(selectedBoardId);
  //   }, [props.selectedBoard]);
  if (props.selectedBoardID!== null){
    return (
      <>
        <div>
          {props.cardsData.filter((card) => card.board_id === props.selectedBoardID).map((card) => (
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
        <div>
          <NewCard addCard={props.addCard} />
        </div>
      </>
    );
  }
  
  
};

export default CardList;
