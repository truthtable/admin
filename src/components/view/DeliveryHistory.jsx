/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Box, Chip, Divider, LinearProgress, Select, Stack, Tab, Table, TabList, TabPanel, Tabs, Option, Button, Modal, Sheet, ModalClose, Typography, Input, List, ListItem, ListItemButton, ListItemDecorator, ListItemContent, FormControl, FormLabel, RadioGroup, Radio, Card, IconButton } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { deleteDeliveryById, deliveriesIniState, fetchDeliveries, updateDelivery } from "../../redux/actions/deliveryActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
import { fetchUser, fetchUserRequest } from "../../redux/actions/userActions.js";
import { RxFontStyle } from "react-icons/rx";
import { FcHighPriority } from "react-icons/fc";
import { CgClose, CgUser } from "react-icons/cg";
import { MdDone, MdEdit, MdKeyboardArrowDown, MdKeyboardArrowRight, MdKeyboardArrowUp } from "react-icons/md";
import { IoMdClose, IoMdDoneAll } from "react-icons/io";
import { TbCylinder } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { addGasDelivery, deleteGasDelivery, gasDeliveriesIniState, updateGasDelivery } from "../../redux/actions/gasDeliveryActions.js";
import { set } from "firebase/database";
import { RiDeleteBinFill } from "react-icons/ri";
import gasServices from "../../services/gas-services.jsx";
import { Paper } from "@mui/material";
import PropTypes from 'prop-types';
export default function deliveryHistory() {

     // Add these color constants at the top of the file
     const COLORS = {
          WHITE: "#ffffff",
          KG_12: "#e3f2fd",
          KG_15: "#e8f5e9",
          KG_17: "#fff3e0",
          KG_21: "#f3e5f5"
     };

     const columns = [
          //Info
          { column: "Date", color: COLORS.WHITE },
          { column: "Customer", color: COLORS.WHITE },

          // 12KG Group 
          { column: "12KG CYL", color: COLORS.KG_12 },
          { column: "MT", color: COLORS.KG_12 },
          { column: "Rate", color: COLORS.KG_12 },
          { column: "Total", color: COLORS.KG_12 },

          // 15KG Group
          { column: "15KG CYL", color: COLORS.KG_15 },
          { column: "MT", color: COLORS.KG_15 },
          { column: "Rate", color: COLORS.KG_15 },
          { column: "Total", color: COLORS.KG_15 },

          // 17KG Group
          { column: "17KG CYL", color: COLORS.KG_17 },
          { column: "MT", color: COLORS.KG_17 },
          { column: "Rate", color: COLORS.KG_17 },
          { column: "Total", color: COLORS.KG_17 },

          // 21KG Group
          { column: "21KG CYL", color: COLORS.KG_21 },
          { column: "MT", color: COLORS.KG_21 },
          { column: "Rate", color: COLORS.KG_21 },
          { column: "Total", color: COLORS.KG_21 },

          // Summary rows  
          { column: "Sub Total", color: COLORS.WHITE },
          { column: "Recieved", color: COLORS.WHITE }
     ];

     // First, let's add a helper function to calculate gas group totals
     function calculateGasGroup(cylinders, mt, rate) {
          return {
               cylinders,
               mt,
               rate,
               total: mt * rate
          };
     }

     // Update the createData function to be more organized
     function createData(date, info, gasInfo, kg12Data, kg15Data, kg17Data, kg21Data, received) {
          const kg12 = calculateGasGroup(kg12Data.cylinders, kg12Data.mt, kg12Data.rate);
          const kg15 = calculateGasGroup(kg15Data.cylinders, kg15Data.mt, kg15Data.rate);
          const kg17 = calculateGasGroup(kg17Data.cylinders, kg17Data.mt, kg17Data.rate);
          const kg21 = calculateGasGroup(kg21Data.cylinders, kg21Data.mt, kg21Data.rate);

          const subTotal = kg12.total + kg15.total + kg17.total + kg21.total;

          return {
               date,
               customer: info.customer,
               info: info,
               gasInfo: gasInfo,
               kg12,
               kg15,
               kg17,
               kg21,
               subTotal,
               received
          };
     }

     Row.propTypes = {
          row: PropTypes.shape({
               date: PropTypes.string.isRequired,
               customer: PropTypes.string.isRequired,
               info: PropTypes.shape({
                    customer: PropTypes.string.isRequired,
                    adress: PropTypes.string.isRequired,
                    deliveredBy: PropTypes.string.isRequired,
                    cash: PropTypes.number.isRequired,
                    online: PropTypes.number.isRequired,
                    correction: PropTypes.bool.isRequired,
                    paid: PropTypes.bool.isRequired
               }),
               kg12: PropTypes.shape({
                    cylinders: PropTypes.number.isRequired,
                    mt: PropTypes.number.isRequired,
                    rate: PropTypes.number.isRequired,
                    total: PropTypes.number.isRequired
               }).isRequired,
               kg15: PropTypes.shape({
                    cylinders: PropTypes.number.isRequired,
                    mt: PropTypes.number.isRequired,
                    rate: PropTypes.number.isRequired,
                    total: PropTypes.number.isRequired
               }).isRequired,
               kg17: PropTypes.shape({
                    cylinders: PropTypes.number.isRequired,
                    mt: PropTypes.number.isRequired,
                    rate: PropTypes.number.isRequired,
                    total: PropTypes.number.isRequired
               }).isRequired,
               kg21: PropTypes.shape({
                    cylinders: PropTypes.number.isRequired,
                    mt: PropTypes.number.isRequired,
                    rate: PropTypes.number.isRequired,
                    total: PropTypes.number.isRequired
               }).isRequired,
               subTotal: PropTypes.number.isRequired,
               received: PropTypes.number.isRequired
          }).isRequired,
          initialOpen: PropTypes.bool
     };
     function Row({ row, initialOpen = false }) {
          const [open, setOpen] = React.useState(initialOpen);

          // Define the cell groups for easier mapping
          const cellGroups = [
               {
                    key: 'info', cells: [
                         { value: row.date },
                         { value: row.customer }
                    ], color: COLORS.WHITE
               },
               {
                    key: 'kg12', cells: [
                         { value: row.kg12.cylinders },
                         { value: row.kg12.mt },
                         { value: row.kg12.rate },
                         { value: row.kg12.total }
                    ], color: COLORS.KG_12
               },
               {
                    key: 'kg15', cells: [
                         { value: row.kg15.cylinders },
                         { value: row.kg15.mt },
                         { value: row.kg15.rate },
                         { value: row.kg15.total }
                    ], color: COLORS.KG_15
               },
               {
                    key: 'kg17', cells: [
                         { value: row.kg17.cylinders },
                         { value: row.kg17.mt },
                         { value: row.kg17.rate },
                         { value: row.kg17.total }
                    ], color: COLORS.KG_17
               },
               {
                    key: 'kg21', cells: [
                         { value: row.kg21.cylinders },
                         { value: row.kg21.mt },
                         { value: row.kg21.rate },
                         { value: row.kg21.total }
                    ], color: COLORS.KG_21
               },
               {
                    key: 'summary', cells: [
                         { value: row.subTotal },
                         { value: row.received }
                    ], color: COLORS.WHITE
               }
          ];

          return (
               <React.Fragment>
                    <tr style={{ textAlign: "center" }}>
                         <td style={{ textAlign: "center", backgroundColor: COLORS.WHITE }}>
                              <Box>
                                   <IconButton
                                        aria-label="expand row"
                                        variant="plain"
                                        color="neutral"
                                        size="sm"
                                        onClick={() => setOpen(!open)}
                                   >
                                        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                                   </IconButton>
                              </Box>
                         </td>

                         {cellGroups.map(group => (
                              group.cells.map((cell, cellIndex) => (
                                   <td
                                        key={`${group.key}-${cellIndex}`}
                                        style={{
                                             backgroundColor: group.color,
                                             textAlign: "center"
                                        }}
                                   >
                                        {cell.value}
                                   </td>
                              ))
                         ))}
                    </tr>
                    <tr>
                         <td style={{ height: 0, padding: 0 }} colSpan={columns.length + 1}>
                              {open && (
                                   <Sheet
                                        variant="soft"
                                        sx={{ p: 1, pl: 6, boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)' }}
                                   >
                                        <Typography level="body-lg" component="div">
                                             Details
                                        </Typography>
                                        <Table
                                             borderAxis="bothBetween"
                                             size="md"
                                             aria-label="purchases"
                                        >
                                             <thead>
                                                  <tr>
                                                       <th>Date</th>
                                                       <td>13</td>
                                                  </tr>
                                                  <tr>
                                                       <th>adress</th>
                                                       <td>13</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Delivered By</th>
                                                       <td>13</td>
                                                  </tr>
                                                  {
                                                       row.gasInfo.map((gasInfo, index) => (
                                                            <tr key={gasInfo.cylinder + "-" + index}>
                                                                 <th>{gasInfo.cylinder}</th>
                                                                 <td>
                                                                      {gasInfo.qty} : QTY, {gasInfo.kg} : KG
                                                                 </td>
                                                            </tr>
                                                       ))
                                                  }
                                                  <tr>
                                                       <th>Cash</th>
                                                       <td>13</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Online</th>
                                                       <td>13</td>
                                                  </tr>
                                                  <tr>
                                                       <th>Correction</th>
                                                       <td>false</td>
                                                  </tr>
                                             </thead>
                                             <tbody>

                                             </tbody>
                                        </Table>
                                   </Sheet>
                              )}
                         </td>
                    </tr>
               </React.Fragment>
          );
     }
     // Update the rows data with the new structure
     const rows = [
          createData(
               // date
               "24/01/25",
               // info
               {
                    customer: "Customer",
                    adress: "dadra",
                    deliveredBy: "ME",
                    cash: 1000,
                    online: 1009,
                    correction: false,
                    paid: false,
               },
               //gasInfo
               [
                    { cylinder: "Go Gas", qty: 12, kg: 15 },
                    { cylinder: "HP", qty: 12, kg: 15 },
               ],
               // 12KG Group
               { cylinders: 10, mt: 120, rate: 100 },
               // 15KG Group
               { cylinders: 5, mt: 75, rate: 110 },
               // 17KG Group
               { cylinders: 8, mt: 136, rate: 120 },
               // 21KG Group
               { cylinders: 3, mt: 63, rate: 130 },
               // received amount
               447607
          ),
     ];
     return <Stack
          sx={{
               height: "100%",
               width: "100%",
               backgroundColor: "white",
               borderRadius: "lg",
               overflow: "auto",
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               color: "black",
          }}
     >
          <Stack sx={{ backgroundColor: "lightgreen", width: "100%" }}>
               1
          </Stack>
          <Stack sx={{ backgroundColor: "lightblue", width: "100%", flexGrow: 1 }}>
               <Sheet>
                    <Table
                         aria-label="collapsible table"
                         size="md"
                         sx={{
                              wordBreak: "keep-all",
                              tableLayout: "auto",
                         }}
                    >
                         <thead>
                              <tr>
                                   {/* <th style={{ width: 40 }} aria-label="empty" />
                                   <th style={{ width: '40%' }}>Dessert (100g serving)</th> */}
                                   <th style={{ width: 40 }} aria-label="empty" />
                                   {
                                        columns.map((col, index) => (
                                             <th
                                                  key={index + "_" + col.column}
                                                  style={{
                                                       textAlign: "center",
                                                       backgroundColor: col.color
                                                  }}
                                             >
                                                  {col.column}
                                             </th>
                                        ))
                                   }
                              </tr>
                         </thead>
                         <tbody>
                              {rows.map((row, index) => (
                                   <Row key={row.date + "_" + index} row={row} initialOpen={false} />
                              ))}
                         </tbody>
                    </Table>
               </Sheet>
          </Stack>
     </Stack>
}