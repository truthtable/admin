import { Box, Button } from "@mui/joy";

export default function TableHead(props) {
     const { children } = props;
     return (
          <Box
               sx={{
                    padding: "0px",
                    margin: "0px",
                    backgroundColor: "transparent",
                    mx: "8px",
               }}>
               <Button
                    style={{
                         flexGrow: 1,
                         width: "100%",
                         height: "100%",
                         margin: "0px",
                         padding: "0px",
                         borderRadius: "0px",
                         color: "black",
                         backgroundColor: "transparent",
                         whiteSpace: "nowrap",
                         disabled: true
                    }}
               >
                    {children}
               </Button>
          </Box>
     );
}