import {Button, Container, Divider, Input, Option, Select, Stack, Typography} from "@mui/joy";
import DataTable from "../table/DataTable.jsx";
import TableHead from "../table/TableHead.jsx";
import { BsPlus } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {createWarehouse, deleteWarehouse, fetchWarehouses} from "../../redux/actions/warehouseActions.js";
import {useEffect, useState} from "react";
import {fetchGasData} from "../../state/GasList.jsx";
import ModalClose from "@mui/joy/ModalClose";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";

const Warehouse = () => {

    let dispatch = useDispatch();

    const data = useSelector(state => state.warehouses);

    const allGases = useSelector(state => state.gas);

    const [addWarehouseModel, setAddWarehouseModel] = useState(false);

    useEffect(() => {
        dispatch(fetchWarehouses());
        dispatch(fetchGasData());
    }, [dispatch]);

    let fullCylinders = []
    let emptyCylinders = []

    let allGas = []

    if (allGases.data != null) {
        try {
            allGas = allGases.data.data

            if (allGas !== null) {
                if (data.warehouses.length !== 0) {
                    data.warehouses.forEach((warehouse) => {
                        const gas = allGas.find(gas => gas.id === warehouse.gas_cylinder_id);
                        if (warehouse.is_empty === 0) {
                            fullCylinders.push([
                                gas.company_name,
                                gas.kg + "KG",
                                warehouse.count,
                                <Button
                                    variant="solid"
                                    onClick={() => dispatch(deleteWarehouse(warehouse.id))}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "0px",
                                    }}
                                   >
                                    Delete
                                </Button>
                            ])
                        } else {
                            emptyCylinders.push([
                                gas.company_name,
                                gas.kg + "KG",
                                warehouse.count,
                                <Button
                                    variant="solid"
                                    onClick={() => dispatch(deleteWarehouse(warehouse.id))}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "0px",
                                    }}
                                >
                                    Delete
                                </Button>
                            ])
                        }
                    })
                }
            }
        } catch (error) {
            console.log(error)
            window.location.reload();
        }
    }
     return (
          <div
               style={{
                    width: "100%",
                    overflow: "auto",
                    padding: "10px",
               }}
          >
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={addWarehouseModel}
                    onClose={() => setAddWarehouseModel(false)}
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
                            <ModalClose variant="plain" sx={{m: 1}}/>
                            <Typography
                                component="h2"
                                id="modal-title"
                                level="h4"
                                textColor="inherit"
                                fontWeight="lg"
                            >
                                Add Warehouse
                            </Typography>
                            <Divider sx={{
                                 my: 1
                            }}/>
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    console.log(formJson);
                                    dispatch(createWarehouse(formJson));
                                    setAddWarehouseModel(false);
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
                                    }}
                                >
                                    <Select
                                        label="Is Empty"
                                        name="gas_cylinder_id"
                                        defaultValue={0}
                                        placeholder="Select Gas"
                                        required
                                    >
                                        {
                                            allGas.map((gas, index) => {
                                                return <Option key={index}  value={gas.id}>{`${gas.company_name} ${gas.kg}KG`}</Option>
                                            })
                                        }
                                    </Select>
                                    <Select
                                        label="Is Empty"
                                        name="is_empty"
                                        defaultValue={0}
                                        required
                                        >
                                        <Option value={0}>Full</Option>
                                        <Option value={1}>Empty</Option>
                                    </Select>
                                    <Input
                                        placeholder="Count"
                                        type="number"
                                        name="count"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        color="primary"
                                        sx={{ mt: 3 }}
                                    >
                                        Submit
                                    </Button>
                                </Stack>
                            </form>
                        </Sheet>
                    </Container>
                </Modal>
               <Stack
                    direction="row"
                    justifyContent="end"
                    alignItems="right"
                    spacing={1}
                    mb={1}
                    sx={{
                         width: "100%",
                    }}
               >
                    <Button
                         variant="soft"
                         onClick={() => setAddWarehouseModel(true)}
                         startDecorator={
                              <BsPlus />
                         }
                    >
                         Add Cylinder
                    </Button>

               </Stack>

               <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={1}
               >
                    <div
                         style={{
                              flexGrow: 1,
                              backgroundColor: "#f5f5f5",
                         }}
                    >
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#379777",
                                   color: "white",

                              }}
                         >
                              Full cylinders
                         </Button>
                        <DataTable thead={[
                            <TableHead>Company Name</TableHead>,
                            <TableHead>Weight</TableHead>,
                            <TableHead>Total</TableHead>,
                        ]} tbody={fullCylinders} loading={false}/>
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#379777",
                                   color: "white",

                              }}
                         >
                              Total
                         </Button>
                    </div>
                    <div
                         style={{
                              flexGrow: 1,
                         }}
                    >
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#FF9800",
                                   color: "white",
                              }}
                         >
                              Empty cylinders
                         </Button>
                         <DataTable
                              thead={[
                                   <TableHead>Company Name</TableHead>,
                                   <TableHead>Weight</TableHead>,
                                   <TableHead>Total</TableHead>,
                              ]}
                              tbody={emptyCylinders}
                              loading={false}
                         />
                         <Button
                              sx={{
                                   width: "100%",
                                   borderRadius: "0px",
                                   backgroundColor: "#FF9800",
                                   color: "white",
                              }}
                         >
                              Total
                         </Button>
                    </div>
               </Stack >
          </div >
     );
};
export default Warehouse;
