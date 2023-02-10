import React, { useState, useEffect } from "react";
import "./App.css";

import BoardsDropDown from "./components/boards/BoardsDropDown";
import SelectedBoard from "./components/boards/SelectedBoard";
import NewBoardForm from "./components/boards/NewBoardForm";

import axios from "axios";
import CardList from "./components/cards/CardList";


// ~~~~~~ Helper Functions ~~~~~~
// Function for sending get requests
const getAllBoards = () => {
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
};
// Function for sending post requests
const registerNewBoard = (newBoard) => {
  // create request body
  const requestBody = {
    ...newBoard,
  };
  console.log(requestBody);
  // send post request
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/boards`, requestBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
};


function App() {

  const [boardsData, setBoardsData] = useState([]);
  const [selectedBoardID, setSelectedBoardID] = useState(1);
  const [cardsData, setCardsData] = useState([])
      
    
  const getBoardCard = async (boardId) =>{
    return axios
            .get(
              `${process.env.REACT_APP_BACKEND_URL}/boards/${selectedBoardID}/cards`,
            {}
          )
    
          .then((response) => {
            //return response.data
            setCardsData(response.data)})
          //console.log (response.data)
          
          .catch((error) => {
            console.log(error);
          });
        };
    
  useEffect(() =>{
    getBoardCard(selectedBoardID);
        }, [selectedBoardID]);
  const addCard = (message) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/boards/${selectedBoardID}/cards`,
        {
          
          message: message,
          likes_count: 0,
          board_id:selectedBoardID
        }
      )
      .then((response) => {
        const newCardList = [...cardsData];
        newCardList.push(response.data);
        setCardsData(newCardList);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };   
  // const addCard = (message) => {
  //   const newCardList = [...cardsData];
  
  //   const nextId = Math.max(...newCardList.map((card) => card.id)) + 1;
  
  //   newCardList.push({
  //       id: nextId,
  //       message: message,
  //       board_id:selectedBoardID,
  //       likes_count:0


  //     });
  //   setCardsData(newCardList);
  //   };

  const likeCard = (card_id) => {
    const card = cardsData.map((card) => {
      if (card.id === card_id) {
        card.likes_count += 1;
        return card;
      } else {
        return card;
        }
    });
  
    setCardsData(card);
    };
  
  // const deleteCard = (card_id) => {
  //   const newcards = cardsData.filter((card) => card.id !== card_id );
  //   console.log(newcards);
  //   setCardsData(newcards);
  // };  

  const deleteCard = (cardId) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/cards/${cardId}`)
      .then(() => {
        setCardsData((prevCards) => prevCards.filter((card) => card.id !== cardId));
        })
      .catch((error) => {
        console.log(error);
        });
    };
  
  
 
  // ~~~~~~ boards data ~~~~~~
  //const [boardsData, setBoardsData] = useState([]);
  // function to make get request whenever boardsData gets modified
  useEffect(() => {
    getAllBoards().then((boards) => {
      setBoardsData(boards);
    });
  }, []);
  // function to update boards data state upon submission
  const updateBoardsData = (newBoard) => {
    // make a post request to the backend
    registerNewBoard(newBoard);
    // change the boardsData state
    const newBoardsData = [...boardsData];
    // find next valid board id
    const nextID = Math.max(...newBoardsData.map((board) => board.id)) + 1;
    // update the boards data state with new board
    newBoardsData.push({
      id: nextID,
      title: newBoard.title,
      creator: newBoard.creator,
    });
    setBoardsData(newBoardsData);
  };


  // state to track selected board id
  //const [selectedBoardID, setSelectedBoardID] = useState(1);
  // function to update selected board state id
  const updateSelectedBoard = (selectedBoardElementID) => {
    setSelectedBoardID(selectedBoardElementID);
  };

  const getSelectedBoard = () => {
    const selectedBoard = boardsData.filter(
      (board) => board.id === selectedBoardID
    );
    return selectedBoard[0];
  }

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
          updateSelectedBoard={updateSelectedBoard}
        ></BoardsDropDown>
        <header>
          <h3>Selected Board</h3>
        </header>
        <SelectedBoard
          //selectedBoardID={selectedBoardID}
          selectedBoardData={getSelectedBoard(boardsData)}
        ></SelectedBoard>
        <header>
          <h3>Create a New Board</h3>
        </header>
        <NewBoardForm updateBoardsData={updateBoardsData}></NewBoardForm>
      </section>
      <CardList
        selectedBoardID={selectedBoardID}
        cardsData={cardsData}
        likeCard={likeCard}
        deleteCard={deleteCard}
        addCard={addCard}
        //getBoardCards={getBoardCards}
      />
      <footer>
        <h4>Made by Anna, Larissa, Melody, Supriya </h4>
      </footer>
    </main>
  );
}

export default App;
