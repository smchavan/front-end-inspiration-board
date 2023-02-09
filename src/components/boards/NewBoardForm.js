import PropTypes from "prop-types";
import { useState } from "react";

const NewBoardForm = (props) => {
  const [formFields, setFormFields] = useState({
    title: "",
    creator: "",
  });
  // event handler for form submit trigger
  const onFormSubmit = (event) => {
    // prevent unwanted default behavior of HTML forms
    event.preventDefault();

    // pass new board data to props function
    props.updateBoardsData({
      title: formFields.title,
      creator: formFields.creator,
    });

    // reset form fields state
    setFormFields({
      title: "",
      creator: "",
    });
  };
  // event handler for title change in text input
  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };
  // event handler for creator change in text input
  const onCreatorChange = (event) => {
    setFormFields({
      ...formFields,
      creator: event.target.value,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <section>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          value={formFields.title}
          onChange={onTitleChange}
        ></input>
      </section>
      <section>
        <label htmlFor="creator">Creator: </label>
        <input
          name="creator"
          type="text"
          value={formFields.creator}
          onChange={onCreatorChange}
        ></input>
      </section>
      <section>
        <button type="submit">Add Board</button>
      </section>
    </form>
  );
};

NewBoardForm.propTypes = {
  updateBoardsData: PropTypes.func.isRequired,
};

export default NewBoardForm;
