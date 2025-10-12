import React, {useEffect, useMemo, useState} from 'react';
import {
    Button,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
    Input,
    LinearProgress,
    Modal,
    ModalDialog,
    Sheet,
    Stack,
    Switch,
    Table,
    Typography,
} from '@mui/joy';
import {useDispatch, useSelector} from "react-redux";
import {addGasData, fetchGasData, updateGasData} from "../../state/GasList.jsx";
import {RiAddCircleLine} from "react-icons/ri";

function GasUi() {
    const dispatch = useDispatch();
    const {data, isLoading, updateSuccessful} = useSelector((state) => state.gas);
    const [cylinders, setCylinders] = useState([]);
    const [open, setOpen] = useState(false);
    const [newRowData, setNewRowData] = useState({company_name: '', kg: ''});
    const [errors, setErrors] = useState({});

    // Fetch data if needed
    useEffect(() => {
        if (updateSuccessful) {
            //reload page
            window.location.reload();
        }
        if (!isLoading) {
            if (data) {
                let cylinderData = data.data || [];
                cylinderData = cylinderData.map(gas => ({
                    ...gas,
                    isOld: true
                }));
                setCylinders(Array.isArray(cylinderData) ? cylinderData : []);
            } else {
                dispatch(fetchGasData());
            }
        }
    }, [data, isLoading]);

    // Group cylinders by company name
    const groupedCylinders = useMemo(() => {
        if (!Array.isArray(cylinders)) return {};
        return cylinders.reduce((acc, {company_name, kg, is_active, id, isOld}) => {
            const key = company_name?.toUpperCase() || 'UNKNOWN';
            acc[key] ??= {kgs: []};
            acc[key].kgs.push({value: kg, id, is_active, isOld: isOld ?? false});
            return acc;
        }, {});
    }, [cylinders]);

    // Validation
    const validate = () => {
        const errs = {};
        if (!newRowData.company_name.trim()) errs.company_name = 'Company name is required.';
        if (!newRowData.kg) errs.kg = 'Initial KG is required.';
        else if (isNaN(newRowData.kg) || Number(newRowData.kg) <= 0)
            errs.kg = 'Initial KG must be a positive number.';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // Add new company
    const handleAddRow = () => {
        if (!validate()) return;
        const newCylinder = {
            id: crypto.randomUUID(),
            company_name: newRowData.company_name.toUpperCase(),
            kg: parseInt(newRowData.kg, 10),
            is_active: true,
            isOld: false
        };
        setCylinders([...cylinders, newCylinder]);
        handleModalClose();
    };

    const handleKgChange = (id, newKg) => {
        setCylinders((prev) =>
            prev.map((c) => (c.id === id ? {...c, kg: Number(newKg) || 0} : c))
        );
    };

    const handleKgActiveChange = (id, active) => {
        dispatch(
            updateGasData({
                id: id,
                is_active: active
            })
        )
        // setCylinders((prev) =>
        //     prev.map((c) => (c.id === id ? {...c, is_active: active} : c))
        // );
    };

    const handleAddKg = (companyName) => {
        const hasEmptyKg = cylinders.some(
            (c) => c.company_name === companyName && c.kg === 0
        );
        if (hasEmptyKg) return;

        const newCylinder = {
            id: crypto.randomUUID(),
            company_name: companyName,
            kg: 0,
            is_active: true,
            isOld: false
        };
        setCylinders([...cylinders, newCylinder]);
    };

    const handleModalClose = () => {
        setOpen(false);
        setNewRowData({company_name: '', kg: ''});
        setErrors({});
    };

    // Render input row for kg list
    const renderKgInputs = (kgs, companyName, color) =>
        kgs.map((kgItem) => {
            const {id, value, is_active} = kgItem;
            const isOld = kgItem.isOld ?? false;
            return (
                <Input
                    key={id}
                    type="number"
                    placeholder="0"
                    value={value === 0 ? '' : value}
                    sx={{width: 120, flexShrink: 0}}
                    onFocus={(e) => (e.target.dataset.prevKg = String(value || 0))}
                    onChange={(e) => {
                        if (isOld) {
                            return
                        }
                        handleKgChange(id, e.target.value)
                    }}
                    onBlur={(e) => {
                        const newKg = Number(e.target.value);
                        const prevKg = Number(e.target.dataset.prevKg ?? 0);
                        const duplicate = cylinders.find(
                            (c) =>
                                c.company_name === companyName &&
                                c.kg === newKg &&
                                c.id !== id
                        );
                        if (duplicate) {
                            alert(`${companyName}:${newKg} Cylinder already exists`);
                            setCylinders((prev) =>
                                prev.map((c) =>
                                    c.id === id ? {...c, kg: prevKg} : c
                                )
                            );
                        } else {
                            dispatch(
                                addGasData({
                                    company_name: companyName,
                                    kg: newKg
                                })
                            )
                        }
                    }}
                    endDecorator={<span style={{marginRight: 4}}>KG</span>}
                    startDecorator={
                        <Switch
                            variant="outlined"
                            color={color}
                            checked={is_active}
                            onChange={(e) =>
                                handleKgActiveChange(id, e.target.checked)
                            }
                        />
                    }
                />
            );
        });

    return (
        <div className="p-4">
            <Button
                sx={{
                    display: "none"
                }}
                className="mb-4" onClick={() => setOpen(true)}>
                Add New Cylinder
            </Button>

            <Sheet
                variant="outlined"
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    borderRadius: '8px',
                    mt: 1,
                }}
            >
                <Table variant="soft" borderAxis="both" sx={{tableLayout: 'auto'}}>
                    <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>KGs</th>
                    </tr>
                    {
                        isLoading ? <tr>
                            <th colSpan={2}>
                                <LinearProgress/>
                            </th>
                        </tr> : <></>
                    }
                    </thead>
                    <tbody>
                    {Object.entries(groupedCylinders).map(([companyName, data]) => {
                        const activeKgs = data.kgs.filter((k) => k.is_active);
                        const inactiveKgs = data.kgs.filter((k) => !k.is_active);
                        return (
                            <tr key={companyName}>
                                <td>
                                    <Typography
                                        fontWeight="bold"
                                        fontSize="16px"
                                        sx={{cursor: 'text'}}
                                    >
                                        {companyName}
                                    </Typography>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-2">
                                        {/* Active */}
                                        <div className="flex items-center gap-2">
                                            <Typography level="body-sm" sx={{width: '80px'}}>
                                                Active:
                                            </Typography>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'nowrap',
                                                    overflowX: 'auto',
                                                    gap: '8px',
                                                }}
                                            >
                                                {renderKgInputs(activeKgs, companyName, 'success')}
                                                <Button
                                                    size="sm"
                                                    variant="outlined"
                                                    sx={{backgroundColor: 'white'}}
                                                    startDecorator={<RiAddCircleLine/>}
                                                    onClick={() => handleAddKg(companyName)}
                                                >
                                                    Add KG
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Inactive */}
                                        <div className="flex items-center gap-2">
                                            <Typography level="body-sm" sx={{width: '80px'}}>
                                                Inactive:
                                            </Typography>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'nowrap',
                                                    overflowX: 'auto',
                                                    gap: '8px',
                                                }}
                                            >
                                                {renderKgInputs(inactiveKgs, companyName, 'danger')}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </Sheet>

            {/* Modal */}
            <Modal open={open} onClose={handleModalClose}>
                <ModalDialog>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                //handleAddRow();
                            }}
                        >
                            <Stack spacing={2}>
                                <FormControl error={!!errors.company_name}>
                                    <Input
                                        placeholder="Company Name"
                                        value={newRowData.company_name}
                                        onChange={(e) =>
                                            setNewRowData({
                                                ...newRowData,
                                                company_name: e.target.value,
                                            })
                                        }
                                        autoFocus
                                    />
                                    {errors.company_name && (
                                        <FormHelperText>{errors.company_name}</FormHelperText>
                                    )}
                                </FormControl>

                                <FormControl error={!!errors.kg}>
                                    <Input
                                        placeholder="Initial KG"
                                        type="number"
                                        value={newRowData.kg}
                                        onChange={(e) =>
                                            setNewRowData({
                                                ...newRowData,
                                                kg: e.target.value,
                                            })
                                        }
                                    />
                                    {errors.kg && (
                                        <FormHelperText>{errors.kg}</FormHelperText>
                                    )}
                                </FormControl>

                                <Stack direction="row" spacing={1} justifyContent="flex-end">
                                    <Button variant="soft" onClick={handleModalClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">Save</Button>
                                </Stack>
                            </Stack>
                        </form>
                    </DialogContent>
                </ModalDialog>
            </Modal>
        </div>
    );
}

export default GasUi;
