import * as React from "react";
import Input from "@mui/joy/Input";
import FormLabel from "@mui/joy/FormLabel";
import Stack from "@mui/joy/Stack";

export default function DateTimePickerField({value, onChange}) {
    return (
        <Stack spacing={1} sx={{width: 300}}>
            <FormLabel>Select Date & Time</FormLabel>
            <Input
                type="datetime-local"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                slotProps={{
                    input: {
                        step: 60, // 1-minute step
                    },
                }}
            />
        </Stack>
    );
}
