import React, { useState } from "react";

import "../crud-css/insert.css";
import { useEffect } from "react";

function wherehpuseInsert() {
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [supplier, setSupplierName] = useState("");
  const [pin_code, setPinCode] = useState("");
  const [date_time, setDateTime] = useState("");

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
      name === "" ||
      age === "" ||
      phone_number === "" ||
      state === "" ||
      city === "" ||
      address === ""
    ) {
      setMessage({ error: true, msg: "Please fill in all fields" });

      setTimeout(() => {
        setMessage({ error: false, msg: "" });
      }, 3000);

      return;
    }
  };

  return (
    <div className="mx-auto p-7 h-[34em] w-[70em] bg-white border border-gray-300 shadow-lg rounded-lg relative top-16
    form-container-wherehouse">
      {message.error ? (
        <div className="text-red-500">{message.msg}</div>
      ) : (
        <div className="text-green-500">{message.msg}</div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              placeholder="Wherehouse Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">Supplier Name:</label>
            <input
              type="text"
              placeholder="Supplier Name"
              value={supplier}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="age">Area:</label>
            <input
              type="text"
              placeholder="Age"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="phone_number">City:</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="city">Country:</label>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">Pin Code:</label>
            <input
              type="text"
              placeholder="Pin Code"
              value={pin_code}
              onChange={(e) => setPinCode(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
          <div className="form-group">
            <label htmlFor="address">Date & Time:</label>
            <input
              type="datetime-local"
              placeholder="Pin Code"
              value={date_time}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="w-full px-4 py-2">
          <button type="" className="form-btn-submit w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default wherehpuseInsert;
