// import PropTypes from "prop-types";

const BoardsDropDown = (props) => {
  const boardTitles = props.boardsData.map((board) => {
    return (
      <option key={board.id} value="board.title">
        {board.title}
      </option>
    );
  });

  return (
    <form>
      <label htmlFor="boards">Choose a board:</label>
      <select id="boards" name="boards">
        {boardTitles}
      </select>
    </form>
  );
};

export default BoardsDropDown;
