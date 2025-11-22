import * as React from "react";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";
import {chunkArray} from "../Tools";
import {Button, Input, Option, Select} from "@mui/joy";
import {FaEdit} from "react-icons/fa";
import {CgClose} from "react-icons/cg";

interface DateTimePickerFieldProps {
    value: string;                   // ISO string like "2025-09-17T20:45"
    onChange: (val: string) => void; // callback when value changes
}

export default function DateTimePickerField(
    {value, onChange}: DateTimePickerFieldProps
) {
    const [editMode, setEditMode] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState(value ? new Date(value) : new Date());
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are 0-indexed
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";

    //console.log({currentDate})

    const setDay = (d: number) => {
        const newDate = new Date(currentDate);
        newDate.setDate(d);
        setCurrentDate(newDate);
        onChange(newDate.toISOString());
    }
    const setMonth = (m: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(m - 1); // Months are 0-indexed
        setCurrentDate(newDate);
        onChange(newDate.toISOString());
    }
    const setYear = (y: number) => {
        const newDate = new Date(currentDate);
        newDate.setFullYear(y);
        setCurrentDate(newDate);
        onChange(newDate.toISOString());
    }
    const setHours = (h: number) => {
        const newDate = new Date(currentDate);
        newDate.setHours(h);
        setCurrentDate(newDate);
        onChange(newDate.toISOString());
    }
    const setMinutes = (m: number) => {
        const newDate = new Date(currentDate);
        newDate.setMinutes(m);
        setCurrentDate(newDate);
        onChange(newDate.toISOString());
    }
    const setAmPm = (ap: string) => {
        const newDate = new Date(currentDate);
        if (ap === "AM" && newDate.getHours() >= 12) {
            newDate.setHours(newDate.getHours() - 12);
        } else if (ap === "PM" && newDate.getHours() < 12) {
            newDate.setHours(newDate.getHours() + 12);
        }
        setCurrentDate(newDate);
        onChange(newDate.toISOString());
    }
    const monthStrings = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysLength = new Date(year, month, 0).getDate();
    const days = Array.from({length: daysLength}, (_, i) => i + 1);
    return (<Stack>
        <FormLabel>Date and Time</FormLabel>
        <Button
            onClick={() => setEditMode(!editMode)}
            variant={"soft"}
        >
            <Stack
                gap={1}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <FormLabel sx={{m: 0, p: 0, fontWeight: "bold"}}>
                    {`${day} ${monthStrings[month - 1]} ${year} - ${hours % 12 === 0 ? 12 : hours % 12}:${minutes.toString().padStart(2, '0')} ${amPm} `}
                </FormLabel>
                {
                    editMode ? <CgClose/> : <FaEdit/>
                }
            </Stack>
        </Button>
        {
            !editMode ? (
                    ""
                ) :
                <Stack
                    spacing={1}
                    direction={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{
                        border: "1px solid lightgray",
                        borderRadius: 5,
                        padding: 2,
                        mt: 1
                    }}
                >
                    <Stack spacing={1} direction={"row"}>
                        <Select
                            sx={{width: 140}}
                            value={month}
                            onChange={(e, newValue) => setMonth(Number(newValue))}>
                            {monthStrings.map((m, index) => (
                                <Option key={index} value={index + 1}>
                                    {m}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(Number(e.target.value))}
                            sx={{width: 70}}
                        />
                    </Stack>
                    <Stack spacing={.5} direction={"column"} className={"border-2 rounded-lg p-1"}>
                        {
                            chunkArray(days, 7).map((week) => {
                                return (
                                    <Stack spacing={.5} direction={"row"}>
                                        {
                                            week.map((d) => {
                                                return (
                                                    <Button
                                                        key={"day_" + d}
                                                        className={"w-7 h-7"}
                                                        sx={{
                                                            textAlign: "center",
                                                            backgroundColor: d === day ? "primary.main" : "transparent",
                                                            color: d === day ? "white" : "black",
                                                            "&:hover": {
                                                                backgroundColor: d === day ? "primary.dark" : "lightgray",
                                                            }
                                                        }}
                                                        onClick={() => setDay(d)}
                                                    >{d}</Button>
                                                )
                                            })
                                        }
                                    </Stack>
                                )
                            })
                        }
                    </Stack>
                    <Stack spacing={1} direction={"row"}>
                        <Select
                            sx={{width: 70}}
                            value={hours % 12 === 0 ? 12 : hours % 12}
                            onChange={(e, newValue) => {
                                let h = Number(newValue);
                                if (amPm === "PM" && h !== 12) {
                                    h += 12;
                                } else if (amPm === "AM" && h === 12) {
                                    h = 0;
                                }
                                setHours(h);
                            }}>
                            {Array.from({length: 12}, (_, i) => i + 1).map((h) => (
                                <Option key={h} value={h}>
                                    {h}
                                </Option>
                            ))}
                        </Select><FormLabel>:</FormLabel>
                        <Select
                            sx={{width: 70}}
                            value={minutes}
                            onChange={(e, newValue) => setMinutes(Number(newValue))}>
                            {Array.from({length: 60}, (_, i) => i).map((m) => (
                                <Option key={m} value={m}>
                                    {m.toString().padStart(2, '0')}
                                </Option>
                            ))}
                        </Select>
                        <Select
                            sx={{width: 90}}
                            value={amPm}
                            onChange={(e, newValue) => setAmPm(newValue || "AM")}>
                            {["AM", "PM"].map((ap) => (
                                <Option key={ap} value={ap}>
                                    {ap}
                                </Option>
                            ))}
                        </Select>
                    </Stack>
                </Stack>
        }</Stack>);
}