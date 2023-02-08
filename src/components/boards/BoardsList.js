import PropTypes from "prop-types";
import BoardDropDown from "./BoardDropDown";

const BoardsList = (props) => {
  // update boards data
  props.getAllBoards();
  const boards = props.boardsData.map((board) => {
    return (
      <li key={board.id}>
        <BoardDropDown
          id={board.id}
          title={board.title}
          creator={board.creator}
        ></BoardDropDown>
      </li>
    );
  });
  return (
    <section>
      <h2>Boards</h2>
      <ul>{boards}</ul>
    </section>
  );
};

BoardsList.propTypes = {
  getAllBoards: PropTypes.func.isRequired,
};

export default BoardsList;
