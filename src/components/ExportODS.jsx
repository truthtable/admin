import React from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

/**
 * ExportODS — exports data as a styled .xlsx file.
 *
 * Props:
 *   headers     : string[]            — column header labels
 *   data        : any[][]             — rows of cell values
 *   rowColors   : (string|null)[]     — optional, hex fill per row e.g. "#FFFF00"; null = no fill
 *   sumColumns  : string[]            — column name substrings that get a SUM total row
 *   filename    : string              — output filename (no extension)
 */
const ExportODS = (props) => {
    const handleExport = async () => {
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet('Sheet1');

        const headers = props.headers.map(h => h.label || h);
        const rowColors = props.rowColors || [];

        // --- Header row ---
        const headerRow = ws.addRow(headers);
        headerRow.font = { bold: true };
        headerRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD3D3D3' }, // light grey header
        };

        // --- Data rows ---
        props.data.forEach((rowData, idx) => {
            const row = ws.addRow(rowData);

            const color = rowColors[idx];
            if (color) {
                // Strip leading '#', prepend 'FF' for full opacity ARGB
                const argb = 'FF' + color.replace('#', '');
                row.eachCell({ includeEmpty: true }, (cell) => {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb },
                    };
                });
            }

            row.font = { bold: true };
        });

        // --- Total row with SUM formulas ---
        const columnsToSum = props.sumColumns || ['sub total', 'online', 'cash', 'total payment', 'balance', 'total'];
        const dataStartRow = 2; // row 1 = header
        const dataEndRow   = 1 + props.data.length;
        const totalRowIdx  = dataEndRow + 1;

        const totalRow = ws.addRow([]);
        totalRow.getCell(1).value = 'Total';
        totalRow.font = { bold: true };
        totalRow.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFD3D3D3' },
        };

        headers.forEach((header, colIdx) => {
            if (columnsToSum.some(name => header.toLowerCase().includes(name.toLowerCase()))) {
                const colLetter = ws.getColumn(colIdx + 1).letter;
                totalRow.getCell(colIdx + 1).value = {
                    formula: `SUM(${colLetter}${dataStartRow}:${colLetter}${dataEndRow})`
                };
            }
        });

        // --- Column widths ---
        ws.columns.forEach((col, i) => {
            col.width = Math.max(headers[i]?.length || 8, 10);
        });

        // --- Write & download ---
        const buffer = await wb.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        saveAs(blob, `${props.filename}.xlsx`);
    };

    return (
        <button
            onClick={handleExport}
            className="inline-block px-4 whitespace-nowrap bg-green-200 py-1.5 ms-1 hover:bg-green-700 hover:text-white text-black rounded-md transition duration-200 font-bold"
        >
            {props.children ? props.children : 'Download'}
        </button>
    );
};

export default ExportODS;