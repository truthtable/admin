import { LinearProgress } from "@mui/joy";
import React from "react";

export default function DataTable(props) {
     const { thead, tbody, loading } = props;

     return (
          <div>
               <div style={{ display: loading ? "block" : "none" }}>
                    <LinearProgress color="primary" variant="soft" />
               </div>
               <table className="hidden md:block lg:block w-full">
                    <thead>
                         <tr>
                              {thead.map((value, index) => (
                                   <th
                                        key={index}
                                        scope="col"
                                        className="px-2 py-1"
                                   >
                                        {value}
                                   </th>
                              ))}
                         </tr>
                    </thead>
                    <tbody>
                         {tbody.map((value, index) => (
                              <tr
                                   style={{
                                        backgroundColor:
                                             index % 2 === 0
                                                  ? "#ffffff"
                                                  : "#f0f0f2",
                                   }}
                                   key={index}
                              >
                                   {value.map((val, ind) => (
                                        <td key={ind} className="px-2 py-1">
                                             {val}
                                        </td>
                                   ))}
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     );
}
