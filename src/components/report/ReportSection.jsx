import { Button, Divider, Input, Stack } from "@mui/joy";
import { BsSearch } from "react-icons/bs";

export default function ReportSection() {

     return (
          <div
               style={{
                    width: "100%",
                    overflow: "auto",
                    padding: "10px",
               }}
          >
               <Stack
                    direction="row"
                    gap={1}
               >
                    <Button>
                         Customer
                    </Button>
                    <Button

                    >
                         Delivery Boy
                    </Button>
                    <Divider
                         orientation="horizontal"
                         sx={{
                              flexGrow: 1,
                              opacity: 0
                         }}
                    />
                    <Input

                         placeholder="Search"
                         startDecorator={
                              <BsSearch />
                         }
                    />
               </Stack>
               <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                    spacing={1}
                    sx={{
                         width: "100%",
                         mt: 1,
                    }}
               >
                    <Stack
                         sx={{
                              backgroundColor: "#FFF5E1",
                              borderRadius: 10,
                              padding: 1,
                         }}
                    >
                         Section #1
                    </Stack>
                    <Stack
                         sx={{
                              flexGrow: 1,
                         }}
                    >
                         Section #2
                    </Stack>
               </Stack>
          </div>
     )
}