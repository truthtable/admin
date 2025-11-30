/* eslint-disable react/prop-types */
import React from "react";
import {Divider} from "@mui/joy";

export default function Spacer({height = 0, width = 0, color = "#333333"}) {
    return <Divider
        orientation={
            height > width ? "horizontal" : "vertical"
        }
        sx={{
            margin: 0,
            padding: 0,
            height: `${height}px`,
            width: `${width}px`,
            backgroundColor: color,
        }}
    />
}