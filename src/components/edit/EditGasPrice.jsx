import { Button, Input, Stack } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { updateGas } from "../../state/UpdateGas";
import React, { useEffect } from "react";
export default function EditGasPrice(props) {
     const [button, setButton] = React.useState("block");
     const [textBox, setTextBox] = React.useState("none");
     const [value, setValue] = React.useState(props.value);

     const dispatch = useDispatch();
     const handleButtonClick = () => {
          setButton("none");
          setTextBox("flex");
     };
     const handleOkClick = () => {
          dispatch(updateGas({ id: props.id, price: value }));
          setButton("block");
          setTextBox("none");
     }
     return (
          <div>
               <Button
                    sx={{
                         display: button,
                         backgroundColor: "transparent",
                         color: "black",
                         width: "100%",
                         transition: "0.3s",
                         //change on hover
                         "&:hover": {
                              backgroundColor: "#0b6bcb",
                              color: "white",
                         },
                    }}
                    onClick={handleButtonClick}
               >
                    {value} ₹
               </Button>
               <div
                    style={
                         {
                              display: textBox,
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 10,
                         }

                    }
               >
                    <Input
                         placeholder="Enter Gas Price"
                         type="number"
                         onKeyUp={(e) => {
                              setValue(e.target.value);
                         }}
                    />
                    <Button
                         onClick={handleOkClick}
                    >
                         OK
                    </Button>
               </div>

          </div>
     );
}
