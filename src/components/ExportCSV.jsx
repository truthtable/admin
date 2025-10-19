// ExportCSV.jsx
import React from 'react';
import {CSVLink} from 'react-csv';

const ExportCSV = (props) => {
    //console.log(props);
    //replace 0 with empty
    props.data.forEach((row) => {
        row.forEach((cell, index) => {
            if (cell === 0 || cell === "-") {
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
            className="inline-block px-4 whitespace-nowrap bg-green-200 py-1.5 ms-1 hover:bg-green-700 hover:text-white text-black rounded-md transition duration-200 font-bold"
        >
            {

                props.children ? props.children : "Download"
            }
        </CSVLink>
    );
};

export default ExportCSV;
