import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaCartArrowDown, FaHome ,FaPhoneAlt} from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "./FoodCard.css";
import axios from "axios";

const FoodCard = ({ name, quantity, date, address, tag, status, index, recipient, number }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setCurrentStatus(status);
    // Format the date when the component mounts or when the date prop changes
    formatAndSetDate(date);
  }, [status, date]);

  // Function to format the date
  const formatAndSetDate = (dateString) => {
    const formatted = new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setFormattedDate(formatted);
  };


  const email = localStorage.getItem('email');
  const user_type = localStorage.getItem('user_type')
  const data = { key: index, recipient: email };

  const handleCollection = async () => {
    console.log("testing", data);
    try {
      const response = await axios.post("http://localhost:3000/collection", data);
      console.log(response.data);
      setCurrentStatus("collected");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card">
        <p style={{ position: "absolute", top: "0.5rem", left: "0.5rem", padding: "0.5rem 1rem", background: "#f5f5f5", color: "#333", fontSize: "1rem", fontWeight: "bold", borderRadius: "0.5rem" }}>{tag ? tag : "food"}</p>
        <img className="foodcard-img" src={`https://source.unsplash.com/random/?${name}`} alt="Card Image" />
        <div className="card-content">
          <h2 className="food-title">{name}</h2>
          <div className="food-details">
            <ul className="icons">
              <li>
                <span className="icons-name">
                  <FaCartArrowDown />
                </span>
                : {quantity} kg
              </li>
              <li>
                <span className="icons-name">
                  <FaCalendarAlt />
                </span>
                : {formattedDate}
              </li>
              <li>
                <span className="icons-name">
                  <FaHome />
                </span>
                : {address}
              </li>
              {currentStatus === "collected" && (
                <>
                <li>
                  <span className="icons-name">
                    <MdOutlineEmail />
                  </span>
                  : {recipient}
                </li>
                <li>
                  <span className="icons-name">
                    <FaPhoneAlt />
                  </span>
                  : {number}
                </li>
              </>
              )}
            </ul>
          </div>


            {user_type === "reciver" ? (
              currentStatus === "not_collected" ? (
                  // This block executes if condition1 and condition2 are true
                  <button className="food-btn" onClick={handleCollection}>Collect</button>
              ) : (
                  // This block executes if condition1 is true but condition2 is false
                  <button className="food-btn">Collected</button>
              )
          ) : (
            currentStatus === "not_collected" ? (
                  // This block executes if condition1 is false and condition3 is true
                  <button className="food-btn">Not Collected</button>
              ) : (
                  // This block executes if none of the conditions are true
                  <button className="food-btn">Collected</button>
              )
          )}

        </div>
      </div>
    </div>
  );
};

export default FoodCard;
