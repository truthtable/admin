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

const THIN_BORDER = {
    top:    { style: 'thin', color: { argb: 'FF000000' } },
    left:   { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    right:  { style: 'thin', color: { argb: 'FF000000' } },
};

/** Apply Arial font + border (+ optional fill) to every cell in a row. */
function styleRow(row, { argbFill = null, bold = true } = {}) {
    row.eachCell({ includeEmpty: true }, (cell) => {
        cell.font   = { name: 'Arial', bold, size: 10 };
        cell.border = THIN_BORDER;
        if (argbFill) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: argbFill } };
        }
    });
}

const ExportODS = (props) => {
    const handleExport = async () => {
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet('Sheet1');

        const headers    = props.headers.map(h => h.label || h);
        const rowColors  = props.rowColors || [];
        const numCols    = headers.length;

        // --- Header row ---
        const headerRow = ws.addRow(headers);
        styleRow(headerRow, { argbFill: 'FFD3D3D3', bold: true });

        // --- Data rows ---
        props.data.forEach((rowData, idx) => {
            const row   = ws.addRow(rowData);
            const color = rowColors[idx];
            const argbFill = color ? ('FF' + color.replace('#', '')) : null;
            styleRow(row, { argbFill, bold: true });
        });

        // --- Total row with SUM formulas ---
        const columnsToSum = props.sumColumns || ['sub total', 'online', 'cash', 'total payment', 'balance', 'total'];
        const dataStartRow = 2;                    // row 1 = header
        const dataEndRow   = 1 + props.data.length;

        const totalRow = ws.addRow([]);
        totalRow.getCell(1).value = 'Total';

        headers.forEach((header, colIdx) => {
            if (columnsToSum.some(name => header.toLowerCase().includes(name.toLowerCase()))) {
                const colLetter = ws.getColumn(colIdx + 1).letter;
                totalRow.getCell(colIdx + 1).value = {
                    formula: `SUM(${colLetter}${dataStartRow}:${colLetter}${dataEndRow})`
                };
            }
        });

        styleRow(totalRow, { argbFill: 'FFD3D3D3', bold: true });

        // --- Column widths (auto-size heuristic) ---
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