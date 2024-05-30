import React, { useState } from "react";

import "../crud-css/insert.css";
import { useEffect } from "react";

function add_delivery_history() {
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [Courier_Boy_Name, setCourier_Boy_Name] = useState("");
    const [Customer_Name, setCustomer_Name] = useState("");
    const [Address, setAddress] = useState("");
    const [Gas_Cylinder_Company, setGas_Cylinder_Company] = useState("");
    const [Gas_kg, setGas_kg] = useState("");
    const [date_time, setDateTime] = useState("");
    const [Gas_Price, setGas_Price] = useState("");
    const [Recived_Amount, setRecived_Amount] = useState("");

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
        <div
            className="mx-auto p-7 h-[34em] w-[70em] bg-white border border-gray-300 shadow-lg rounded-lg relative top-16
      form-container-wherehouse-update"
        >
            {/* <h1 className="text-lg leading-8 text-blue-800 font-bold mb-2 text-center">
                Update Delivery History
            </h1> */}
            {message.error ? (
                <div className="text-red-500">{message.msg}</div>
            ) : (
                <div className="text-green-500">{message.msg}</div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-wrap">
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="name">Courier Boy Name:</label>
                        <input
                            type="text"
                            placeholder="Wherehouse Name"
                            value={Courier_Boy_Name}
                            onChange={(e) => setCourier_Boy_Name(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="address">Customer Name:</label>
                        <input
                            type="text"
                            placeholder="Customer Name"
                            value={Customer_Name}
                            onChange={(e) => setCustomer_Name(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="age">Address:</label>
                        <input
                            type="text"
                            placeholder="Address"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="phone_number">Gas Cylinder Company:</label>
                        <input
                            type="text"
                            placeholder="Gas Cylinder Company"
                            value={Gas_Cylinder_Company}
                            onChange={(e) => setGas_Cylinder_Company(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="state">Gas kg:</label>
                        <input
                            type="text"
                            placeholder="Gas kg"
                            value={Gas_kg}
                            onChange={(e) => setGas_kg(e.target.value)}
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

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="city">Gas Price:</label>
                        <input
                            type="text"
                            placeholder="Gas Price"
                            value={Gas_Price}
                            onChange={(e) => setGas_Price(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 sm:p-0 md:p-2 lg:p-4">
                    <div className="form-group">
                        <label htmlFor="address">Recived Amount:</label>
                        <input
                            type="text"
                            placeholder="Recived Amount"
                            value={Recived_Amount}
                            onChange={(e) => setRecived_Amount(e.target.value)}
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

export default add_delivery_history;
