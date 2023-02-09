import React, { useState, useEffect } from "react";
import "./App.css";

import BoardsDropDown from "./components/boards/BoardsDropDown";
import SelectedBoard from "./components/boards/SelectedBoard";
import NewBoardForm from "./components/boards/NewBoardForm";

import axios from "axios";
import CardList from "./components/cards/CardList";
import ShowCard from "./components/cards/ShowCard";


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
    ])
    
  const getBoardCard = async (boardId) =>{
    return axios
            .get(
            `${process.env.REACT_APP_BACKEND_URL}/boards/${selectedBoardID}/cards`,
            {}
          )
    
          .then((response) => {return response.data})
          .catch((error) => {
            console.log(error);
          });
        };
    
  useEffect(() =>{
    getBoardCard(selectedBoardID);
        }, [BoardsDropDown]);
      
  const addCard = (message) => {
    const newCardList = [...cardsData];
  
    const nextId = Math.max(...newCardList.map((card) => card.id)) + 1;
  
    newCardList.push({
        id: nextId,
        message: message,
        board_id:selectedBoardID,
        likes_count:0


      });
    setCardsData(newCardList);
    };

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
  
  const deleteCard = (card_id) => {
    const newcards = cardsData.filter((card) => card.id !== card_id );
    console.log(newcards);
    setCardsData(newcards);
  };  

  const handleDelete = (cardId) => {
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
  // const [boardsData, setBoardsData] = useState([]);
  // // function to initialize boards data upon mounting
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_URL}/boards`)
  //     .then((response) => {
  //       setBoardsData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.message);
  //     });
  // }, []);
  // // function to update boards data upon form submission
  // const updateBoardsData = (newBoard) => {
  //   // duplicate boardsData
  //   const newBoardsData = [...boardsData];
  //   // find next valid board id
  //   const nextID = Math.max(...newBoardsData.map((board) => board.id)) + 1;
  //   newBoardsData.push({
  //     id: nextID,
  //     title: newBoard.title,
  //     creator: newBoard.creator,
  //   });
  //   setBoardsData(newBoardsData);
  // };

  // // selected boards message
  // const [selectedBoard, setSelectedBoard] = useState([]);
  // // function to update selected board message
  // const updateSelectedBoard = (selectedBoard) => {
  //   setSelectedBoard(selectedBoard);
  //   console.log(selectedBoard);
  //   //console.log(selectedBoard[0])
  // };
  // ~~~~~~ boards data ~~~~~~
  const [boardsData, setBoardsData] = useState([]);
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
  const [selectedBoardID, setSelectedBoardID] = useState(1);
  // function to update selected board state id
  const updateSelectedBoard = (selectedBoardElementID) => {
    setSelectedBoardID(selectedBoardElementID);
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
          updateSelectedBoard={updateSelectedBoard}
        ></BoardsDropDown>
        <header>
          <h3>Selected Board</h3>
        </header>
        <SelectedBoard
          selectedBoardID={selectedBoardID}
          boardsData={boardsData}
        ></SelectedBoard>
        <header>
          <h3>Create a New Board</h3>
        </header>
        <NewBoardForm updateBoardsData={updateBoardsData}></NewBoardForm>
      </section>
      <ShowCard />
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
