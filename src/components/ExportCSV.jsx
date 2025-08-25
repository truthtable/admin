// ExportCSV.jsx
import React from 'react';
import { Box } from '@mui/joy';
import { CSVLink } from 'react-csv';

const ExportCSV = (props) => {
     //console.log(props);
     //replace 0 with empty
     //console.log(props.data);
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
               {
                    props.children ? props.children : "Download"
               }
          </CSVLink>
     );
};

export default ExportCSV;
