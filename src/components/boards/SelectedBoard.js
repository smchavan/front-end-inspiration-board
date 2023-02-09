import PropTypes from "prop-types";

const SelectedBoard = (props) => {
  //return <p>{props.selectedBoardMessage}</p>;
  let message = "Select a Board from the Board List!";
  if (props.selectedBoardID !== 0) {
    // find the corresponding board to selectedBoardID
    const selectedBoard = props.boardsData.filter(
      (board) => board.id === props.selectedBoardID
    );
    message = `${selectedBoard[0].title} - ${selectedBoard[0].creator}`;
  }
  return <p>{message}</p>;
};

export default SelectedBoard;
