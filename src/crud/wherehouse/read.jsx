import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../crud-css/read.css";
import { BsFillExclamationOctagonFill, BsFilter } from "react-icons/bs";
import DataTable from "../../components/table/DataTable";
import { GET_WEATHOUSE_DATA, getLoginData, URL } from "../../services/Api";
import { Button } from "@mui/joy";

const wherehouseread = () => {
     const [showFilterInput, setShowFilterInput] = useState(false);
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(false);

     const fetchData = async () => {
          setLoading(true);
          try {
               const token = sessionStorage.getItem("authToken")
               const res = await fetch(GET_WEATHOUSE_DATA, {
                    method: "get",
                    headers: new Headers({
                         "ngrok-skip-browser-warning": "69420",
                         Authorization: `Bearer ${token}`,
                    }),
               });
               const apiData = await res.json();
               console.log(apiData);
               const cb = combineData(apiData.data, apiData.gasdata);
               const temp = [];
               cb.map((value, index) => {
                    temp.push([
                         value.company_name,
                         value.kg,
                         value.price,
                         value.full_cylinder,
                         value.empty_cylinder,
                         <Button>Edit</Button>,
                    ]);
               });
               //console.log(temp);
               setData(temp);
               setLoading(false);
          } catch (error) {
               setLoading(false);
               console.error("Error fetching data:", error);
          }
     };

     useEffect(() => {
          fetchData();
     }, []);

     return (
          <div className="table-container-wherehouse main-box">
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
                              className="px-4 py-2 border border-black rounded-lg text-black::placeholder:text-sm"
                         />
                    </div>
               )}

               <div className="mt-4 text-center flex items-center space-x-2 mb-4">
                    <BsFillExclamationOctagonFill className="text-blue-600 text-xl" />
                    <p className="text-lg text-blue-500">
                         Total <span className="font-bold text-blue-600">0</span> WherHouses
                         Are Available {/* Display the count of filtered data */}
                    </p>
               </div>

               {/* <table className="hidden md:block lg:block">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Supplier Name</th>
            <th>Area</th>
            <th>State</th>
            <th>City</th>
            <th>Country</th>
            <th>Pin Code</th>
            <th>Date & Time</th>
            <th>Operation</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>chacha godown</td>
              <td>ramesh supiler</td>
              <td>tokarkhada</td>
              <td>Dnh</td>
              <td>Silvassa</td>
              <td>india</td>
              <td>396235</td>
              <td>10pm 20/2/2023</td>
              <td>
                <div className="flex flex-col items-center">
                  <div className="space-x-2">
                    <Link to="/updateWherehouse">
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
      </table> */}
               <DataTable
                    loading={loading}
                    thead={[
                         "Gas Company",
                         "Kg",
                         "Price",
                         "Full Cylinder",
                         "Empty Cylinder",
                         "Edit",
                    ]}
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

export default wherehouseread;

function combineData(data, gasdata) {
     const combinedData = data.map((item) => {
          const gasItem = gasdata.find((gas) => gas.id === item.gas_cylinder_id);
          return {
               ...item,
               ...gasItem,
          };
     });
     return combinedData;
}
// {
//        "data": [
//        {
//        "id": 2,
//        "gas_cylinder_id": 3,
//        "full_cylinder": 10,
//        "empty_cylinder": 9,
//        "created_at": "2024-02-08T17:12:43.000000Z",
//        "updated_at": "2024-02-09T09:39:52.000000Z"
//        },
//        {
//        "id": 3,
//        "gas_cylinder_id": 8,
//        "full_cylinder": 0,
//        "empty_cylinder": 5,
//        "created_at": null,
//        "updated_at": null
//        }
//        ],
//        "gasdata": [
//        {
//        "id": 3,
//        "company_name": "Go Gas",
//        "kg": 12,
//        "price": 1200
//        },
//        {
//        "id": 8,
//        "company_name": "Bharat Petroleum",
//        "kg": 1,
//        "price": 10
//        }
//        ],
//        "isSuccessfull": true
//        }
