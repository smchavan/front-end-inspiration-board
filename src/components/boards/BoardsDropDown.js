import PropTypes from "prop-types";

const BoardsDropDown = (props) => {
  // event handler for selecting board from Drop Down
  const displaySelectedBoard = () => {
    // collect selected board element
    const selectElement = document.querySelector("#selected");
    // format new board message from boardsData
    const selectedBoardMessage = props.boardsData.map((board) => {
      if (board.title === selectElement.value) {
        return `${board.title} - ${board.creator}`;
      }
    });
    // update selectedBoardMessage state
    props.updateSelectedBoardMessage(selectedBoardMessage);
  };

  const boardTitles = props.boardsData.map((board) => {
    return (
      <option key={board.id} value={board.title}>
        {board.title}
      </option>
    );
  });

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
  updateSelectedBoardMessage: PropTypes.func.isRequired,
};

export default BoardsDropDown;
