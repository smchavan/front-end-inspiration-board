import React from 'react';
import PropTypes from "prop-types"
import "./Card.css";

const Card = (props) =>{
  return (
    <div>
      <button onClick={() => deleteCard(id)}>Delete</button>

    </div>
  )
}