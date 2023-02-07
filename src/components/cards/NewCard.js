import PropTypes from "prop-types";
import { useState } from "react";

const INITIAL_CARD_DATA = {
  message: "test",
};

const NewCardForm = (props) => {
  const [formFields, setFormFields] = useState(INITIAL_CARD_DATA);

  const handleMessageChange = (event) => {
    setFormFields({
      ...formFields,
      message:event.target.value});
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    props.addCard(formFields.message)
    setFormFields(INITIAL_CARD_DATA);
  };
  return(
    <section className="new_card_form_container">
      <h2>Create a New Card</h2>
      <form className="new_card_form_form" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            name="message"
            type="text"
            value={formFields.message}
            onChange={handleMessageChange}/>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </section>

);
} 


export default NewCardForm;