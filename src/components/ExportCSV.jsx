// ExportCSV.jsx
import React from 'react';
import { Box } from '@mui/joy';
import { CSVLink } from 'react-csv';

const ExportCSV = (props) => {
     //console.log(props);
     //replace 0 with empty
     props.data.forEach((row) => {
          row.forEach((cell, index) => {
               if (cell == 0) {
                    row[index] = ""
               }
          })
     })
     return (
          <CSVLink
               data={props.data}
               headers={props.headers}
               filename={props.filename}
               target="_blank"
               className="inline-block px-4 py-2 ms-1 hover:bg-blue-700 hover:text-white text-black rounded-md transition duration-200 font-bold"
          >
               Download
          </CSVLink>
     );
};

export default ExportCSV;
