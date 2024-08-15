import {
     Box,
     Button,
     Card,
     CardContent,
     Container,
     Divider,
     Input,
     LinearProgress, Option,
     Select,
     Stack,
     Typography
} from "@mui/joy";
import { CgAdd } from "react-icons/cg";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import ModalClose from "@mui/joy/ModalClose";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { createOrder, deleteOrder, fetchOrders, updateOrder } from "../../redux/actions/purchaseOrderActions.js";
import DataTable from "../table/DataTable.jsx";
import { FaCheck, FaCompressArrowsAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { createItem, deleteItem, updateItem } from "../../redux/actions/purchaseOrderItemActions.js";
import { fetchGasData } from "../../state/GasList.jsx";
let gasList = [];
export default function Purchase() {

     const allGases = useSelector(state => state.gas);
     //console.log(allGases);

     const [addPurchaseModel, setAddPurchaseModel] = useState(false);

     const dispatch = useDispatch();
     const { orders, loading, error } = useSelector(state => state.purchaseOrders);


     //console.log(orders)

     useEffect(() => {
          dispatch(fetchGasData());
          dispatch(fetchOrders());
     }, [dispatch]);

     const refresh = () => {
          dispatch(fetchOrders());
     };

     let purchaseRows = []

     if (allGases.data != null) {
          gasList = allGases.data.data
          //console.log(gasList);
          orders.forEach((value, index) => {

               let items = []
               value.items.forEach((item, index) => {
                    let gas = gasList.find(gas => gas.id === item.gas_id);
                    items.push(
                         [
                              <Cell
                                   id={item.id}
                                   data={`${gas.company_name} : ${gas.kg}KG`}
                                   tableName="purchase_order_items"
                                   column="gas_id"
                              />,
                              <Cell
                                   id={item.id}
                                   data={item.qty}
                                   tableName="purchase_order_items"
                                   column="qty"
                              />,
                              <Cell
                                   id={item.id}
                                   data={item.rate}
                                   tableName="purchase_order_items"
                                   column="rate"
                              />,
                              <Cell
                                   id={item.id}
                                   data={item.pay_amt}
                                   tableName="purchase_order_items"
                                   column="pay_amt"
                              />,
                              <Cell
                                   id={item.id}
                                   data={item.return_cyl_qty}
                                   tableName="purchase_order_items"
                                   column="return_cyl_qty"
                              />,
                              // <Box
                              //      sx={{
                              //           cursor: "pointer",
                              //           color: "black",
                              //           transition: "all 0.3s",
                              //           borderRadius: "md",
                              //           padding: 1,
                              //           margin: .5,
                              //           "&:hover": {
                              //                color: "white",
                              //                backgroundColor: "black",
                              //           },
                              //           display: "flex",
                              //           justifyContent: "center",
                              //           alignItems: "center",
                              //      }}
                              //      onClick={() => {
                              //           const dell = confirm("Are you sure you want to delete this item?");
                              //           if (dell) {
                              //                dispatch(deleteItem(item.id))
                              //           }
                              //      }}
                              // >
                              //      <AiFillDelete />
                              // </Box>
                         ]
                    )
               })

               const thStyle = {
                    width: "100%",
                    color: "white",
                    backgroundColor: "#f5f7f9",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.3s",
                    "&:hover": {
                         color: "white",
                         backgroundColor: "#f5f7f9",
                    },
               }
               const itemsThStyle = {
                    width: "100%",
                    color: "black",
                    borderRadius: 0,
                    backgroundColor: "#f5f7f9",
                    whiteSpace: "nowrap",
                    transition: "background-color 0.3s",
                    "&:hover": {
                         color: "black",
                         backgroundColor: "#f5f7f9",
                    },
               }
               purchaseRows.push(
                    <Stack
                         direction="column"
                         width="100%"
                    >
                         {/* <DataTable
                            thead={[
                                <Button sx={thStyle}>Order No.</Button>,
                                <Button sx={thStyle}>Date</Button>,
                                <Button sx={thStyle}>Scheme</Button>,
                                <Button sx={thStyle}>Scheme Type</Button>,
                            ]}
                            tbody={[[
                                <Cell
                                    id={value.id}
                                    data={value.order_no}
                                    tableName="purchase_orders"
                                    column="order_no"
                                />,
                                <Cell
                                    id={value.id}
                                    data={value.date}
                                    tableName="purchase_orders"
                                    column="date"
                                />,
                                <Cell
                                    id={value.id}
                                    data={value.scheme}
                                    tableName="purchase_orders"
                                    column="scheme"
                                />,
                                <Cell
                                    id={value.id}
                                    data={value.scheme_type}
                                    tableName="purchase_orders"
                                    column="scheme_type"
                                />

                            ]]}
                        /> */}

                         <DataTable
                              thead={[
                                   <Button sx={itemsThStyle}>Cylinder</Button>,
                                   <Button sx={itemsThStyle}>Quantity</Button>,
                                   <Button sx={itemsThStyle}>Rate</Button>,
                                   <Button sx={itemsThStyle}>Payment</Button>,
                                   <Button sx={itemsThStyle}>Return Cylinder</Button>,
                                   // <Button sx={itemsThStyle}>Delete</Button>,
                              ]}
                              tbody={items}
                         />

                         {/* <CardContent>
                                        <AddOrderItem orderId={value.id} />
                                   </CardContent> */}

                         {/* <Stack
                                   direction="row"
                                   gap={1}
                                   sx={{
                                        width: "100%",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   <Box
                                        sx={{
                                             cursor: "pointer",
                                             color: "black",
                                             transition: "all 0.3s",
                                             borderRadius: "md",
                                             padding: 1,
                                             margin: .5,
                                             "&:hover": {
                                                  color: "white",
                                                  backgroundColor: "black",
                                             },
                                        }}
                                        onClick={() => {
                                             const dell = confirm("Are you sure you want to delete this order?");
                                             if (dell) {
                                                  dispatch(deleteOrder(value.id))
                                             }
                                        }}
                                   >
                                        <AiFillDelete />
                                   </Box>
                              </Stack> */}
                    </Stack>
               )
          })
     }


     return (
          <div style={{
               overflow: "auto",
               padding: "10px",
               width: "100%",
          }}>
               <Stack
                    direction="column"
                    sx={{
                         borderRadius: "md",
                         padding: 1,
                         marginTop: 1,
                         backgroundColor: "transparent",
                         color: "black",
                    }}
               >
                    <LinearProgress
                         sx={{
                              my: 1,
                              width: "100%",
                              display: (loading) ? "block" : "none",
                         }}
                    />
                    <Divider
                         sx={{
                              flexGrow: 1,
                              opacity: 0,
                         }}
                    />
                    <Stack
                         direction="row"
                    >
                         <Divider
                              sx={{
                                   flexGrow: 1,
                                   backgroundColor: "transparent",
                              }}
                         />
                         <Button
                              variant="solid"
                              startDecorator={<CgAdd />}
                              onClick={() => setAddPurchaseModel(true)}
                         >
                              Add Purchase
                         </Button>
                    </Stack>
               </Stack>
               <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={addPurchaseModel}
                    onClose={() => setAddPurchaseModel(false)}
                    sx={{
                         display: "flex",
                         justifyContent: "center",
                         alignItems: "center",
                    }}
               >
                    <Container>
                         <Sheet
                              variant="outlined"
                              sx={{
                                   borderRadius: "md",
                                   p: 3,
                                   boxShadow: "lg",
                                   maxHeight: "100vh"
                              }}
                         >
                              <ModalClose variant="plain" sx={{ m: 1 }} />
                              <Typography
                                   component="h2"
                                   id="modal-title"
                                   level="h4"
                                   textColor="inherit"
                                   fontWeight="lg"
                              >
                                   Add Purchase
                              </Typography>
                              <LinearProgress
                                   sx={{
                                        my: 1,
                                        width: "100%",
                                        display: (false) ? "block" : "none",
                                   }}

                              />
                              <Divider sx={{
                                   my: 1
                              }} />
                              <form
                                   onSubmit={(event) => {
                                        event.preventDefault();
                                        const formData = new FormData(event.currentTarget);
                                        const formJson = Object.fromEntries(formData.entries());
                                        let date_str = formJson.date;
                                        let date_epoch = new Date(date_str).getTime();
                                        dispatch(createOrder(formJson));
                                        setAddPurchaseModel(false);
                                   }}
                              >
                                   <Stack
                                        direction="column"
                                        gap={1}
                                        sx={{
                                             width: "100%",
                                             borderRadius: "md",
                                             padding: 1,
                                             marginTop: 1,
                                             backgroundColor: "transparent",
                                             color: "black",
                                        }}>
                                        <Input
                                             placeholder="Date"
                                             type="date"
                                             name="date"
                                             required
                                        />
                                        <Input
                                             placeholder="Order No."
                                             type="text"
                                             name="order_no"
                                             required
                                        />
                                        <Input placeholder="Scheme" type="text" name="scheme" required />
                                        <Input placeholder="Scheme Type" type="text" name="scheme_type" required />
                                        <Button
                                             startDecorator={
                                                  <CgAdd />
                                             }
                                             type="submit"
                                        >
                                             Save
                                        </Button>
                                   </Stack>
                              </form>
                         </Sheet>
                    </Container>
               </Modal>
               <Stack
                    direction="column"
                    width="100%"
                    gap={1}
               >
                    {
                         purchaseRows
                    }
               </Stack>
          </div>
     );
}

export const Cell = ({ id, data, tableName, column }) => {
     const [editMode, setEditMode] = useState(false);
     const [editValue, setEditValue] = useState(data);
     const dispatch = useDispatch();
     return <Box
          sx={{
               cursor: "pointer",
               height: "100%",
               flexGrow: 1,
          }}
     >
          {
               editMode ? <Stack direction="column">
                    <Input
                         sx={{
                              color: "black",
                              backgroundColor: "rgba(84,167,255,0.69)",
                         }}
                         name={column}
                         type="text"
                         value={editValue}
                         onChange={(e) => setEditValue(e.target.value)}
                         endDecorator={
                              <Stack direction="row" gap={2}>
                                   <FaCompressArrowsAlt
                                        onClick={() => {
                                             setEditMode(false)
                                        }}
                                   />
                                   <FaCheck
                                        onClick={() => {
                                             setEditMode(false)
                                             if (tableName === "purchase_orders") {
                                                  dispatch(updateOrder(id, { [column]: editValue }))
                                             }
                                             if (tableName === "purchase_order_items") {
                                                  dispatch(updateItem(id, { [column]: editValue }))
                                             }
                                        }}
                                   />
                              </Stack>
                         }
                    />
               </Stack> : <Button
                    sx={{
                         width: "100%",
                         height: "100%",
                         color: "black",
                         backgroundColor: "transparent",
                         whiteSpace: "nowrap",
                         transition: "background-color 0.3s",
                         "&:hover": {
                              color: "white",
                         },
                    }}
                    onClick={() => setEditMode(true)}
               >
                    {data}
               </Button>
          }
     </Box>
}
let options = []
function AddOrderItem({ orderId }) {
     const dispatch = useDispatch();
     const [addOrdeeItemView, setAddOrdeeItemView] = useState(false);

     if (options.length === 0) {
          gasList.forEach((gas) => {
               if (gas.company_name === "GO GASS") {
                    options.push(<Option key={gas.id} value={gas.id}>{`${gas.company_name} : ${gas.kg}KG`}</Option>)
               }
          })
     }

     return (
          <Stack>
               {
                    addOrdeeItemView ? <form
                         onSubmit={(event) => {
                              event.preventDefault();
                              const formData = new FormData(event.currentTarget);
                              const formJson = Object.fromEntries(formData.entries());
                              console.log(formJson);
                              formJson.order_id = orderId;
                              //console.log(formJson);
                              dispatch(createItem(formJson));
                              setAddOrdeeItemView(false);
                              dispatch(fetchOrders());
                         }}
                    >
                         <Stack
                              direction="column"
                              gap={1}
                              sx={{
                                   width: "100%",
                                   borderRadius: "md",
                                   padding: 1,
                                   marginTop: 1,
                                   backgroundColor: "transparent",
                                   color: "black",
                              }}>
                              <Select
                                   placeholder="Select Gas"
                                   name="gas_id"
                                   required
                              >
                                   {
                                        options
                                   }
                              </Select>
                              <Input
                                   placeholder="Quantity"
                                   type="number"
                                   name="qty"
                                   required
                              />
                              <Input
                                   placeholder="Rate"
                                   type="number"
                                   name="rate"
                                   required
                              />
                              <Input
                                   placeholder="Payment"
                                   type="number"
                                   name="pay_amt"
                                   required
                              />
                              <Input
                                   placeholder="Return Quantity"
                                   type="number"
                                   name="return_cyl_qty"
                                   required
                              />
                              <Stack
                                   direction="row"
                                   gap={1}
                                   sx={{
                                        width: "100%",
                                        justifyContent: "flex-end",
                                   }}
                              >
                                   <Button variant="outlined" onClick={() => setAddOrdeeItemView(false)}>
                                        Cancel
                                   </Button>
                                   <Button
                                        type="submit"
                                   >
                                        Save
                                   </Button>
                              </Stack>
                         </Stack>
                    </form> : <Button
                         variant="soft"
                         sx={{
                              width: "100%",
                              height: "100%",
                              whiteSpace: "nowrap",
                              transition: "background-color 0.3s",
                         }}
                         onClick={() => setAddOrdeeItemView(true)}
                    >
                         Add Order Item
                    </Button>
               }
          </Stack>
     );
}