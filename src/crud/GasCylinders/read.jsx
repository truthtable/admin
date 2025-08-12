import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "../crud-css/read.css";
import gasDataService from "../../services/gas-services";

import {
     BsFillExclamationOctagonFill,
     BsFilter,
     BsPlus,
     BsPlusSquare,
} from "react-icons/bs";
import { getLoginData, URL } from "../../services/Api";
import DataTable from "../../components/table/DataTable";
import { Alert, Button } from "@mui/joy";
import EditGasPrice from "../../components/edit/EditGasPrice";
import { useSelector } from "react-redux";

const GasList = () => {
     const [filter, setFilter] = useState({ company: "", weight: "" });
     const [showFilter, setShowFilter] = useState(false); // State variable to control filter visibility
     const [loading, setLoading] = useState(true);

     const [gasData, setGasData] = useState([]);

     const response = useSelector((state) => state.updateGas);

     useEffect(() => {
          fechData();
     }, []);
     if (response.isError) {
          alert("Error updating gas price");
     }

     async function fechData() {
          const api = URL + "api/gas_cylinder_data";
          setLoading(true);
          try {

               const token = sessionStorage.getItem("authToken");

               const res = await fetch(api, {
                    method: "get",
                    headers: new Headers({
                         "ngrok-skip-browser-warning": "69420",
                         Authorization: `Bearer ${token}`,
                    }),
               });
               const apiData = await res.json();
               const temp = [];
               apiData.data.map((value) => {
                    temp.push([
                         value.id,
                         value.company_name,
                         value.kg + " kg",
                         <EditGasPrice key={value.id} id={value.id} value={value.price} />,
                    ]);
               });
               setGasData(temp);
               // console.log(apiData);
               setLoading(false);
          } catch (error) {
               console.error("Error fetching data:", error);
               setLoading(false);
          }
     }

     return (
          <div className="table-container">
               <div className="flex items-center justify-center space-x-0">
                    <BsFilter className="mt-2 font-bold text-blue-800 text-3xl cursor-pointer" />
                    <h1 className="text-black text-lg mt-4 mb-2 ml-4">Filtered Records</h1>
               </div>

               {/* Filter container */}
               {showFilter && (
                    <div
                         className={`transition- duration-300 ease-in-out ${showFilter ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
                              }
                  bg-white p-4 border rounded-lg shadow-md mt-4 space-y-4 space-x-3`}
                    >
                         <input
                              type="text"
                              placeholder="Enter Company name"
                              className="px-4 py-2 border border-black rounded-lg text-black::placeholder:text-sm"
                              value={filter.company}
                              onChange={(e) => setFilter({ ...filter, company: e.target.value })}
                         />
                         <input
                              type="text"
                              placeholder="Enter Weight"
                              className="px-4 py-2 border border-black rounded-lg text-black::placeholder:text-sm"
                              value={filter.weight}
                              onChange={(e) => setFilter({ ...filter, weight: e.target.value })}
                         />
                    </div>
               )}

               <div className="mt-4 text-center flex items-center justify-center space-x-0 mb-4">
                    <BsFillExclamationOctagonFill className="text-blue-600 icon" />
                    <p className="text-lg text-blue-500">
                         Total <span className="font-bold text-blue-600">{0}</span> Products
                         are Available
                    </p>
               </div>
               <div className="flex justify-end mb-4 space-x-2">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                         Delete
                    </button>

                    <Link to="/update">
                         <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
                              Update
                         </button>
                    </Link>
                    <Button variant="solid" startDecorator={<BsPlusSquare />}>
                         Solid
                    </Button>
               </div>
               <DataTable
                    thead={["Id", "Company Name", "Weight", "Price",]}
                    tbody={gasData}
                    loading={loading}
               />
               {/* <table>
        <thead>
          <tr>
            <th>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-500"
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
                <span className="ml-2">Select All</span>
              </label>
            </th>
            <th>Id</th>
            <th>Wherehouse</th>
            <th>Company Name</th>
            <th>Weight</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredGas.map((doc, index) => (
            <tr key={doc.id}>
              <td>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="p-0 space-x-0 m-0"
                    checked={individualChecks[doc.id] || false}
                    onChange={() => toggleIndividualCheck(doc.id)}
                  />
                </label>
              </td>
              <td>{index + 1}</td>
              <td>Wherehouse</td>
              <td>{doc.company}</td>
              <td>{doc.weight}</td>
              <td>{doc.price}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
          </div>
     );
};

export default GasList;
