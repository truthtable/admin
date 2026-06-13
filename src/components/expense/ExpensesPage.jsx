import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Option, Select, Stack, Table, Modal, ModalDialog, FormLabel, Input, Button, FormControl, Alert } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpences } from "../../redux/actions/expencesActions.js";
import { fetchUser } from "../../redux/actions/userActions.js";
import { formatDateToDDMMYY_HHMM, titleCase } from "../../Tools.jsx";
import { Api } from "../../services/Api.jsx";

export default function ExpensesPage() {
     const dispatch = useDispatch();

     const { userDataLoading, users } = useSelector((state) => state.user);
     const expence = useSelector((state) => state.expence);
     const [expenseType, setExpenseType] = React.useState('all');
     const [openModal, setOpenModal] = useState(false);
     const [formData, setFormData] = useState({ reason: '', amount: '' });
     const [loading, setLoading] = useState(false);
     const [message, setMessage] = useState(null);
     const [messageType, setMessageType] = useState('info');
     //console.log(users)
     useEffect(() => {
          if ((expence.expenses === null) && !expence.expenceLoading) {
               dispatch(fetchExpences());
          }
          if (!userDataLoading && !users) {
               dispatch(fetchUser());
          }
     },);

     const handleAddExpense = async () => {
          if (!formData.reason || !formData.amount) {
               setMessage('Please fill in all fields');
               setMessageType('warning');
               return;
          }
          setLoading(true);
          try {
               const response = await Api.post('/expenses', formData);
               setMessage('Expense added successfully!');
               setMessageType('success');
               setFormData({ reason: '', amount: '' });
               setTimeout(() => setOpenModal(false), 1000);
               dispatch(fetchExpences());
          } catch (error) {
               console.error('Error adding expense:', error);
               setMessage(error?.response?.data?.message || 'Failed to add expense');
               setMessageType('danger');
          } finally {
               setLoading(false);
          }
     };
     let rows = [];
     //let courierNames = {};
     rows = expence?.expenses?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((expense) => {
          const courierId = expense.user_id;
          const courierName = users.find((user) => user.courier_boys[0]?.id === courierId)?.name
          return (
               <tr key={`${expense.id}-expns`} className="bg-white">
                    <td className="bg-white w-46">{formatDateToDDMMYY_HHMM(expense.created_at)}</td>
                    <td className="w-64">{titleCase(courierName)}</td>
                    <td>{titleCase(expense.reason)}</td>
                    <td className="w-46">₹{expense.amount}</td>
               </tr>
          );
     });
     return (<Stack
          direction="column"
          className="grow h-full w-full p-2 rounded-t-lg"
     >
          <Stack direction="row" gap={1} p={1} className="w-full bg-white" alignItems="center">
               <span className="font-bold text-black">Expenses Type :</span>
               <Select
                    placeholder="Select Expense Type"
                    className="!text-black"
                    defaultValue={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
               >
                    <Option value="all">All Expenses</Option>
                    <Option value="office">Office Expenses</Option>
                    <Option value="expense">Expenses</Option>
               </Select>
               <Button
                    variant="solid"
                    color="success"
                    onClick={() => {
                         setOpenModal(true);
                         setMessage(null);
                    }}
                    sx={{ marginLeft: 'auto', minWidth: '120px', padding: '8px 16px' }}
               >
                    + Add Expense
               </Button>
          </Stack>
          {
               (expence.expenceLoading || userDataLoading) ?
                    <Box sx={{ width: "100%", height: "6px" }}><LinearProgress
                         sx={{ width: "100%", height: "6px" }} /></Box> : <></>
          }
          <Table
               borderAxis="both"
               size="md"
               variant="outlined"
               color="neutral"
               stripe="odd"
               stickyFooter
               stickyHeader
               sx={{
                    width: "100%",
                    tableLayout: "auto",
                    '& th, & td': { color: 'black !important', fontWeight: 'bold !important' },
               }}
               className="!text-black"
          >
               <thead>
                    <tr>
                         <th>Date</th>
                         <th>Name</th>
                         <th>Description</th>
                         <th>Amount</th>
                    </tr>
               </thead>
               <tbody>
                    {rows}
               </tbody>
               <tfoot>
                    <tr>
                         <th colSpan={3}></th>
                         <th>
                              Total : ₹{expence.expenses?.reduce((total, exp) => total + parseFloat(exp.amount), 0)}
                         </th>
                    </tr>
               </tfoot>
          </Table>
          <Modal
               aria-labelledby="modal-title"
               open={openModal}
               onClose={() => setOpenModal(false)}
               sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
               <ModalDialog variant="outlined" role="alertdialog">
                    <h2 id="modal-title">Add New Expense</h2>
                    {message && (
                         <Alert color={messageType} variant="soft" sx={{ marginBottom: '1rem' }}>
                              {message}
                         </Alert>
                    )}
                    <FormControl>
                         <FormLabel>Reason</FormLabel>
                         <Input
                              placeholder="Enter expense reason"
                              value={formData.reason}
                              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                         />
                    </FormControl>
                    <FormControl>
                         <FormLabel>Amount</FormLabel>
                         <Input
                              placeholder="Enter amount"
                              type="number"
                              step="0.01"
                              value={formData.amount}
                              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                         />
                    </FormControl>
                    <Stack direction="row" gap={1} justifyContent="flex-end">
                         <Button
                              variant="plain"
                              color="neutral"
                              onClick={() => setOpenModal(false)}
                         >
                              Cancel
                         </Button>
                         <Button
                              loading={loading}
                              onClick={handleAddExpense}
                              variant="solid"
                              color="success"
                         >
                              Add Expense
                         </Button>
                    </Stack>
               </ModalDialog>
          </Modal>
     </Stack>)
}