//delivery_history.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../crud-css/read.css";
import {
  BsFillExclamationOctagonFill,
  BsFillPencilFill,
  BsFilter,
  BsPlusSquare,
} from "react-icons/bs";
import gasDataService from "../../services/gas-services";
import DataTable from "../../components/table/DataTable";
import { CUSTOMER_DATA } from "../../services/Api";
import { Button } from "@mui/joy";
import { set } from "firebase/database";

const ViewCustomer = () => {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [showFilterInput, setShowFilterInput] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(CUSTOMER_DATA, {
        method: "get",
        headers: new Headers({
          "ngrok-skip-browser-warning": "69420",
        }),
      });
      const apiData = await res.json();
      //console.log(combineData(apiData.data, apiData.userdata));
      const temp = [];
      const combinedData = combineData(apiData.data, apiData.userdata);
      combinedData.map((item) => {
        temp.push(makeRow(item));
      });
      //console.log(temp);
      setData(temp);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const filteredData = data.filter((user) => {
      const fullName = `test`.toLowerCase();
      return fullName.includes(filterName.toLowerCase());
    });
    setFilteredData(filteredData); // Update the filtered data
  }, [filterName, data]);

  useEffect(() => {
    fetchData();

    gasDataService.listenDataChange(() => {
      console.log(1);
      fetchData();
    });
  }, []);

  return (
    <div className="table-container">
      <div className="flex items-center justify-center space-x-0">
        <BsFilter
          className="mt-2 font-bold text-blue-800 text-3xl cursor-pointer"
          onClick={() => setShowFilterInput(!showFilterInput)}
        />
        <h1 className="text-black text-lg mt-4 mb-2 ml-4 font-bold border-b-2 border-blue-500">
          Filtered Records
        </h1>
      </div>
      {showFilterInput && (
        <div
          className={`transition- duration-300 ease-in-out ${
            showFilterInput
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

          <select
            className="border border-black p-2 rounded-xl w-[15em] text-black"
            // value={selectedProduct}
            // onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option selected>Select By Name</option>
            <option>Courier Boy Name</option>
            <option>Customer Name</option>
            <option>Gas Cylinder Company</option>
          </select>
        </div>
      )}

      <div className="mt-4 text-center flex items-center space-x-2 mb-4">
        <BsFillExclamationOctagonFill
          className="text-blue-600 text-xl
          custom-icon-style"
        />
        <p className="text-lg text-blue-500">
          Total{" "}
          <span className="font-bold text-blue-600">{filteredData.length}</span>{" "}
          Delivery History Are Available{" "}
          {/* Display the count of filtered data */}
        </p>
      </div>

      {/* <table className="hidden md:block lg:block">
        <thead>
          <tr>
            <th>Id</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Gas Cylinder Company</th>
            <th>Gas kg</th>
            <th>Date & Time</th>
            <th>Gas Price</th>
            <th>Recived Amount</th>
            <th>Mistake</th>
          </tr>
        </thead>
        <tbody>
          {data.map((value, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{titleCase(value.customer_id.name)}</td>
              <td>{value.customer_id.address}</td>
              <td>{titleCase(value.gas_id.company_name)}</td>
              <td>{value.gas_id.kg}KG</td>
              <td>{formatDateTime(value.created_at)}</td>
              <td>{value.gas_id.price}₹</td>
              <td>{value.received_amount}₹</td>
              <td>
                <div className="flex flex-col items-center">
                  {value.correction == 1 ? (
                    <div className="space-x-2">
                      <Link to="/edit_delivery_history">
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg">
                          Edit
                        </button>
                      </Link>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg mt-2">
                        Delete
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Link to="/edit_delivery_history">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                          Edit
                        </button>
                      </Link>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg mt-2">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <DataTable
        thead={["Name", "Address", "Phone No.", "Balance", "Action"]}
        tbody={data}
      />

      <div className="md:hidden lg:hidden text-center p-4">
        <p className="text-gray-600">
          Please switch to desktop mode for a better experience.
        </p>
      </div>
    </div>
  );
};
function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-indexed
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export default ViewCustomer;
/*
{
       "data":[
              {
                     "id": 15,
                     "user_id": 4,
                     "Balance": 0,
                     "created_at": null,
                     "updated_at": null
              },
              {
                     "id": 15,
                     "user_id": 4,
                     "Balance": 0,
                     "created_at": null,
                     "updated_at": null
              }
       ],
       "userdata":[
              {
                     "id": 4,
                     "name": "sitesh vikash patel",
                     "address": "Dadra,indrustry area ,DNH",
                     "phone_no": "8674927938",
                     "created_at": "2023-12-11T14:39:52.000000Z",
                     "updated_at": "2023-12-18T07:38:41.000000Z"},
              {
                     "id": 5,
                     "name": "sitesh vikash patel",
                     "address": "Dadra,indrustry area ,DNH",
                     "phone_no": "8674927938",
                     "created_at": "2023-12-11T14:39:52.000000Z",
                     "updated_at": "2023-12-18T07:38:41.000000Z"
              }
       ]
}
*/
function combineData(data, userdata) {
  return data.map((item) => {
    const user = userdata.find((user) => user.id === item.user_id);
    return {
      ...item,
      user,
    };
  });
}

// { model of data
//        "id": 16,
//        "user_id": 5,
//        "Balance": 0,
//        "created_at": null,
//        "updated_at": null,
//        "user": {
//            "id": 5,
//            "name": "Ganesh subhash patel",
//            "address": "Dadra,near park,DNH",
//            "phone_no": "9876543210",
//            "created_at": "2023-12-12T16:55:05.000000Z",
//            "updated_at": null
//        }
//    }
function makeRow(data) {
  return [
    data.user.name,
    data.user.address,
    data.user.phone_no,
    data.Balance,
    <Button variant="solid" startDecorator={<BsFillPencilFill />}>
      Edit
    </Button>,
  ];
}
