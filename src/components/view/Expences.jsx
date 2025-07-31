import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpences, updateExpence } from '../../redux/actions/expencesActions';
import { Box, Button, Divider, Input, LinearProgress, Stack, Table, Typography } from '@mui/joy';
import { FcDown } from 'react-icons/fc';
import gasServices from '../../services/gas-services';
export default function Expences() {
     //get user_id from url
     //
     const currentUrl = window.location.href;
     const hashIndex = currentUrl.indexOf('#');
     const hashPart = currentUrl.substring(hashIndex + 1);
     const url = new URL(hashPart, window.location.origin);
     const searchParams = new URLSearchParams(url.search);
     const USER_ID = searchParams.get('user_id');
     const USER_NAME = searchParams.get('user_name');
     const START_DATE = searchParams.get('start_date');
     const END_DATE = searchParams.get('end_date');
     //console.log(USER_ID);
     //

     //
     const [startDate, setStartDate] = React.useState(() => {
          if (START_DATE) {
               return START_DATE;
          }
          else {
               const firstDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

               const year = firstDateOfCurrentMonth.getFullYear();
               const month = String(firstDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
               const day = String(firstDateOfCurrentMonth.getDate()).padStart(2, '0');

               const formattedDate = `${year}-${month}-${day}`;
               return formattedDate;
          }
     });
     console.log(startDate)
     const [endDate, setEndDate] = React.useState(() => {
          if (END_DATE) {
               return END_DATE;
          }
          else {
               const lastDateOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

               const year = lastDateOfCurrentMonth.getFullYear();
               const month = String(lastDateOfCurrentMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
               const day = String(lastDateOfCurrentMonth.getDate()).padStart(2, '0');

               const formattedDate = `${year}-${month}-${day}`;
               return formattedDate;
          }
     });
     //

     const dispatch = useDispatch();
     const {
          expenses,
          expenceLoading,
          expenceError,
     } = useSelector((state) => state.expence);

     console.log({ expenses, expenceLoading, expenceError });

     const totalExpences = expenses.reduce((acc, expence) => acc + expence.amount, 0);
     //console.log(totalExpences);
     console.log(expenses, USER_ID);
     let onlySelectedDeliveryBoy = expenses.filter((expence) => expence.user_id == USER_ID);

     const get = () => {
          dispatch(fetchExpences({
               user_id: USER_ID,
               startDate,
               endDate
          }));
     }

     useEffect(() => {
          get()
     }, [startDate,
          endDate]);


     useEffect(() => {
          gasServices.listenDataChange(() => {
               if (
                    !expenceLoading
               ) {
                    console.log("fetching...");
                    get();
               }
          });
     }, []);

     return (
          <Box
               sx={{
                    backgroundColor: 'white',
                    height: '100%',
               }}
          >
               <Stack
                    direction={"row"}
                    gap={1}
                    alignItems="center"
               >
                    <Box
                         sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 28,
                              ml: 1,
                              transform: 'rotate(90deg)',
                              padding: 1,
                              borderWidth: 2,
                              borderRadius: "md",
                              '&:hover': {
                                   backgroundColor: '#FFF4B7',
                              }
                         }}
                         onClick={() => {
                              window.history.back();
                         }}
                    >
                         <FcDown />
                    </Box>
                    <span style={{
                         textAlign: "center",
                         fontSize: "20px",
                         fontWeight: "bold",
                         color: "black",
                         padding: "16px",
                    }}>
                         Expences of {USER_NAME} : <i>₹{totalExpences}</i>
                    </span>
                    <Divider sx={{ flexGrow: 1 }} />
                    <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} >
                         <span style={{ fontWeight: "bold", color: "black" }}>Date&nbsp;Start&nbsp;:&nbsp;</span>
                         <Input type="date" sx={{ width: "100%" }}
                              onChange={(event) => {
                                   setStartDate(event.target.value)
                              }}
                              defaultValue={startDate}
                         />
                    </Stack>
                    <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} mr={2}>
                         <span style={{ fontWeight: "bold", color: "black" }}>Date&nbsp;End&nbsp;:&nbsp;</span>
                         <Input type="date" sx={{ width: "100%" }}
                              onChange={(event) => {
                                   setEndDate(event.target.value)
                              }}
                              defaultValue={endDate}
                         />
                    </Stack>
                    <Stack gap={1} direction={"row"} alignContent={"center"} alignItems={"center"} mr={2}>
                         <Button
                              onClick={get}
                         >OK</Button>
                    </Stack>
               </Stack>
               <LinearProgress
                    sx={{
                         display: expenceLoading ? 'block' : 'none'
                    }}
               />
               <Table>
                    <thead>
                         <tr>
                              <th>Date</th>
                              <th>Reason</th>
                              <th>Amount</th>
                         </tr>
                    </thead>
                    <tbody>
                         {onlySelectedDeliveryBoy.map((expence) => (
                              <tr key={expence.id}
                                   style={{
                                        backgroundColor: expence.error ? "#ffe8e8" : "white"
                                   }}
                              >
                                   <td style={{ fontWeight: "bold", color: expence.error ? "red" : "black" }}>{formatDate(expence.created_at)}</td>
                                   <td style={{ fontWeight: "bold" }}>
                                        <Box
                                             sx={{
                                                  transition: 'all 0.3s',
                                                  borderRadius: 'md',
                                                  '&:hover': {
                                                       backgroundColor: 'lightblue',
                                                       p: 1
                                                  }
                                             }}
                                             onClick={() => {
                                                  const value = prompt("Enter reason", expence.reason);
                                                  if (value) {
                                                       dispatch(
                                                            updateExpence({
                                                                 id: expence.id,
                                                                 reason: value,
                                                                 error: false,
                                                                 phone: false
                                                            })
                                                       );
                                                  }
                                             }}
                                        ><span className='b'
                                             style={{
                                                  color: expence.error ? "red" : "black"
                                             }}
                                        >{expence.reason}</span></Box>
                                   </td>
                                   <td style={{ fontWeight: "bold" }}>
                                        <Box
                                             sx={{
                                                  transition: 'all 0.3s',
                                                  borderRadius: 'md',
                                                  '&:hover': {
                                                       backgroundColor: 'lightblue',
                                                       p: 1
                                                  }
                                             }}
                                             onClick={() => {
                                                  const value = prompt("Enter new amount", expence.amount);
                                                  if (value) {
                                                       dispatch(
                                                            updateExpence({
                                                                 id: expence.id,
                                                                 amount: value,
                                                                 error: false,
                                                                 phone: false
                                                            })
                                                       );
                                                  }
                                             }}
                                        ><span className='b'
                                             style={{
                                                  color: expence.error ? "red" : "black"
                                             }}
                                        >₹{expence.amount}</span></Box>
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </Table>
          </Box>
     )
}
function formatDate(date) {
     const dateObj = new Date(date);
     const month = dateObj.getMonth() + 1;
     const day = dateObj.getDate();
     const year = dateObj.getFullYear();
     const newDate = `${month}/${day}/${year}`;
     //console.log(newDate);
     return newDate;
}