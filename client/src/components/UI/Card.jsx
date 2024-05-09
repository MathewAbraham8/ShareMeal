import React from "react";
import "./Card.css";

const Card = ({ name, des, img }) => {
  return (
    <div class="partner-card">
      <img src={img} alt="Ngo pic" />
      <div class="card-content">
        <h2 class="card-heading">{name}</h2>
        <p class="card-description">{des}</p>
        <button class="btn-card">Donate Now</button>
      </div>
    </div>
  );
};

export default Card;
