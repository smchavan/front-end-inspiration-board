import PropTypes from "prop-types";

const BoardsDropDown = (props) => {
  // event handler for selecting board from Drop Down
  const displaySelectedBoard = () => {
    // collect selected board element
    const selectElement = document.querySelector("#selected");
    // format new board message from boardsData
    // const selectedBoard = props.boardsData.filter(
    //   (board) => board.title === selectElement.value
    // );
    const selectedBoardElement = props.boardsData.filter(
      (board) => board.title === selectElement.value
    );
    // update selected board state
    //props.updateSelectedBoard(selectedBoard);
    props.updateSelectedBoard(selectedBoardElement[0].id);
    //console.log(selectedBoard[0].id); // here's your board ID GURRRLLL!
  };

  // gather board titles as options in Boards Drop Down Table
  const boardTitles = props.boardsData.map((board) => {
    return (
      <option key={board.id} value={board.title}>
        {board.title}
      </option>
    );
  });

  // Display Boards Drop Down Table for user to select
  return (
    <form>
      <label htmlFor="boards">Choose a board:</label>
      <select id="selected" onChange={displaySelectedBoard}>
        {boardTitles}
      </select>
    </form>
  );
};

BoardsDropDown.propTypes = {
  boardsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      creator: PropTypes.string.isRequired,
    })
  ),
  updateSelectedBoard: PropTypes.func.isRequired,
};

export default BoardsDropDown;
