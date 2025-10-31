import React from 'react';
import * as XLSX from 'xlsx';

const ExportODS = (props) => {
    const handleExport = () => {
        const wb = XLSX.utils.book_new();

        // Create worksheet from data
        const wsData = [
            props.headers.map(h => h.label || h),
            ...props.data
        ];

        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Define columns to sum
        const columnsToSum = props.sumColumns || ['sub total', 'online', 'cash', 'total payment', 'balance', 'total'];

        // Add formula row at the end
        const lastRowIndex = wsData.length; // 0-indexed
        // Add "Total" text in the first column of the formula row
        ws[`A${lastRowIndex + 1}`] = {
            t: 's',
            v: 'Total'
        };

        // Find column indices and add sum formulas
        columnsToSum.forEach(columnName => {
            props.headers.forEach((header, columnIndex) => {
                const headerText = (header.label || header).toLowerCase();

                // Check if the header contains the column name
                if (headerText.includes(columnName.toLowerCase())) {
                    const col = XLSX.utils.encode_col(columnIndex);
                    ws[`${col}${lastRowIndex + 1}`] = {
                        t: 'n',
                        f: `SUM(${col}2:${col}${lastRowIndex})`
                    };
                }
            });
        });

        // Update range to include formula row
        const range = XLSX.utils.decode_range(ws['!ref']);
        range.e.r = lastRowIndex;
        ws['!ref'] = XLSX.utils.encode_range(range);

        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${props.filename}.xlsx`, {bookType: 'xlsx'});
    };

    return (
        <button
            onClick={handleExport}
            className="inline-block px-4 whitespace-nowrap bg-green-200 py-1.5 ms-1 hover:bg-green-700 hover:text-white text-black rounded-md transition duration-200 font-bold"
        >
            {props.children ? props.children : "Download"}
        </button>
    );
};

export default ExportODS;