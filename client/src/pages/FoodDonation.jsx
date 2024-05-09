import React, { useState } from "react";
import axios from "axios";
import "./foodDonation.css";

function FoodDonation() {
  const [foodName, setFoodName] = useState("");
  const [foodTag, setFoodTag] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);



  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const email = localStorage.getItem("email");
  console.log(email);
  const number = localStorage.getItem("number");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create a FormData object
    let formData = new FormData();
  
    // Append your form fields to the FormData object
    formData.append('foodName', foodName);
    formData.append('foodTag', foodTag);
    formData.append('quantity', quantity);
    formData.append('expiryDate', expiryDate);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('image', image); // Assuming 'image' is the file input field

  
    // Send the form data to the server using fetch or Axios
    try {
      // const response = await axios.post('http://localhost:5000/predict', formData, {
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded' // Set the Content-Type header for FormData
      //   }
      // });
  
      console.log(selectedOption)

      if (selectedOption == "non_fruits"){
        const data = {
          foodName: foodName,
          foodTag: foodTag,
          quantity: quantity,
          expiryDate: expiryDate,
          address : address,
          email: email,

        };
  
        console.log(data)
        const response_1 = await axios.post('http://localhost:3000/fooddonation', data)
        console.log(response_1)
        alert("Food Donated Successfully!!!");

      }
    else {
      
      const formData = new FormData();
      formData.append('image', image);


      const data = {'image':image}
      console.log(data)
      const response_1 = await axios.post('http://localhost:5000/predict' , formData)
      console.log(response_1.data['message'])
      const predicted = response_1.data['message']


      if (predicted == "fresh"){
        const data = {
          foodName : foodName,
          foodTag : foodTag,
          quantity : quantity,
          expiryDate : expiryDate,
          address : address,
          email : email,
        };
        
        console.log('fresh' , data)
        const response = await axios.post('http://localhost:3000/fooddonation' , data)
        console.log(response)
        alert("Food Donated Successfully!!!");
      }
    }

      

      // console.log(response.data);
      return response_1.data;
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="foodDonation_container">
      <div className="foodDonation_heading">
        <h1 className="heading-foodd">FOOD DONATION FORM</h1>
      </div>
      <div className="foodDonation_wrapper">
        <form className="food-donation_form" onSubmit={handleSubmit}>
          <div className="form_element">
            <label htmlFor="foodName">Food name</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={foodName}
              onChange={(event) => setFoodName(event.target.value)}
            />
          </div>
          <div className="form_element">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>

          <div className="form_element">
            <label htmlFor="foodTag">Food type or tag</label>
            <select
              id="foodTag"
              name="foodTag"
              value={foodTag}
              onChange={(event) => setFoodTag(event.target.value)}
            >
              <option value="" disabled selected>
                Choose type
              </option>
              <option value="veg" style={{ color: "black" }}>
                Veg
              </option>
              <option value="nonveg" style={{ color: "black" }}>
                Non Veg
              </option>
            </select>
          </div>

          <div className="form_element">
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={expiryDate}
              onChange={(event) => setExpiryDate(event.target.value)}
            />
          </div>
          <div className="form_element">
            <label htmlFor="address">Address</label>
            <input
              type="address"
              id="address"
              name="address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          

        {/* <div>
          <input type="radio" name="check" value="fuits">Fruits</input>
          <input type="radio" name="check" value="not_fruit">None-Fruit</input>
        </div> */}

          <div className="form_element">
          <label>Food type</label>
          <div className="radio-group">
            <label className="radio-label">
              Fruits
              <input 
                type="radio" 
                name="check" 
                value="fruits" 
                checked={selectedOption === 'fruits'}
                onChange={handleOptionChange} 
              />
            </label>
            <label className="radio-label">
              Not Fruits   
              <input 
                type="radio" 
                name="check" 
                value="non_fruits" 
                checked={selectedOption === 'non_fruits'}
                onChange={handleOptionChange} 
              />
            </label>
          </div>
          </div>
          {/* Conditionally render "Upload Image" input */}
        {selectedOption === 'fruits' && (
          <div className="form_element">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}

          <button id="foodDonation_submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoodDonation;
