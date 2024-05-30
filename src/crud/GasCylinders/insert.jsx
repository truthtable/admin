import React, { useState, useEffect } from "react";
import gasDataService from "../../services/gas-services";
import "../crud-css/insert.css";

function Insert() {
  const [company, setCompany] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage({ error: false, msg: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ error: false, msg: "" });

    if (
      company === "" ||
      weight === "" ||
      quantity === "" ||
      price === "" ||
      selectedWarehouse === ""
    ) {
      setMessage({
        error: true,
        msg: "Please fill in all fields, including the warehouse selection",
      });
      return;
    }

    // Parse the quantity input to an integer
    const quantityValue = parseInt(quantity, 10);

    if (isNaN(quantityValue) || quantityValue <= 0) {
      setMessage({ error: true, msg: "Quantity must be a positive number" });
      return;
    }

    try {
      // Loop to insert data based on quantity
      for (let i = 0; i < quantityValue; i++) {
        const newgas = {
          company,
          weight,
          price,
          warehouse: selectedWarehouse, // Add the selected warehouse to the data
        };
        await gasDataService.addGas(newgas);
      }
      setMessage({
        error: false,
        msg: `${quantityValue} data submitted successfully`,
      });
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    // Reset form fields
    setCompany("");
    setWeight("");
    setPrice("");
    setQuantity("");
    setSelectedWarehouse("");
  };

  return (
    <div className="form-container">
      {message.error ? (
        <div className="text-red-500">{message.msg}</div>
      ) : (
        <div className="text-green-500">{message.msg}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="warehouse">Select WhereHouse:</label>
          <select
            name="warehouse"
            id="warehouse"
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
          >
            <option value="" disabled>
              Select WhereHouse
            </option>
            <option value="A">WhereHouse A</option>
            <option value="B">WhereHouse B</option>
            <option value="C">WhereHouse C</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Company Name:</label>
          <input
            type="text"
            placeholder="Enter Company Name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropdown2">Weight:</label>
          <input
            type="text"
            placeholder="Enter Weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropdown2">Price:</label>
          <input
            type="text"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter Quantity"
          />
        </div>
        <button type="" className="form-btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Insert;
