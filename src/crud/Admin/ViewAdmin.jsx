import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../crud-css/read.css";
import { BsFillExclamationOctagonFill, BsFilter } from "react-icons/bs";

const ViewAdmin = () => {
  const [users, setUsers] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]); // New state for filtered data

  const Api = "https://randomuser.me/api/?results=10";

  const fetchData = async (api) => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setUsers(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(Api);
  }, []);

  useEffect(() => {
    // Filter the data based on the filterName input
    const filteredData = users.filter((user) => {
      const fullName =
        `${user.name.title} ${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(filterName.toLowerCase());
    });
    setFilteredUsers(filteredData); // Update the filtered data
  }, [filterName, users]);

  return (
    <div className="table-container">
      <div className="flex items-center justify-center space-x-0">
        <BsFilter
          className="mt-2 font-bold text-blue-800 text-3xl cursor-pointer"
          onClick={() => setShowFilterInput(!showFilterInput)}
        />
        <h1 className="text-black text-lg mt-4 mb-2 ml-4">Filtered Records</h1>
      </div>
      {showFilterInput && (
        <div
          className={`transition- duration-300 ease-in-out ${showFilterInput
              ? "h-auto opacity-100"
              : "h-0 opacity-0 overflow-hidden"
            }
      bg-white p-4 border rounded-lg shadow-md mt-4 space-y-4 space-x-3`}
        >
          <input
            type="text"
            placeholder="Enter Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="px-4 py-2 border border-black rounded-lg text-black::placeholder:text-sm"
          />
        </div>
      )}

      <div className="mt-4 text-center flex items-center space-x-2 mb-4">
        <BsFillExclamationOctagonFill
          className="text-blue-600 text-xl
          custom-icon-style"
        />
        <p className="text-lg text-blue-500">
          Total{" "}
          <span className="font-bold text-blue-600">
            {filteredUsers.length}
          </span>{" "}
          Delivery Boys Are Available {/* Display the count of filtered data */}
        </p>
      </div>

      <table className="hidden md:block lg:block">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>State</th>
            <th>City</th>
            <th>Address</th>
            <th>Bank Account No</th>
            <th>IFSC Code</th>
            <th>AdharCard No</th>
            <th>Operation</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>rajubahi jashbhai Lamba</td>
              <td>{user.dob.age}</td>
              <td>1234567891</td>
              <td>dhn</td>
              <td>naroli</td>
              <td>Silvassa char rasta near masat masti mota bhai complex</td>
              <td>12345678912345678</td>
              <td>12345678912</td>
              <td>123456789123</td>
              <td>
                <div className="flex flex-col items-center">
                  <div className="space-x-2">
                    <Link to="/UpdateAdmin">
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                        Update
                      </button>
                    </Link>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-lg mt-2">
                      Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden lg:hidden text-center p-4">
        <p className="text-gray-600">
          Please switch to desktop mode for a better experience.
        </p>
      </div>
    </div>
  );
};

export default ViewAdmin;
