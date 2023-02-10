//import PropTypes from "prop-types";
import  React,{ useState } from "react";
import "./NewCard.css"

const INITIAL_CARD_DATA = {
  message: "",
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
    if (formFields.message.length > 40){
      alert("Message cannot be over 40 characters");
    } else if (formFields.message.length === 0){
      alert("Message cannot be empty");
    } else {
      props.addCard(formFields.message)
      setFormFields(INITIAL_CARD_DATA);
  }
}
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
          <h4>Preview:{formFields.message}</h4>
        </div>
        <div>
          <button className="new_card_form_submit" type="submit">Submit</button>
        </div>
      </form>
    </section>

);
} 


export default NewCardForm;