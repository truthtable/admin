import DataTable from "../table/DataTable.jsx";
import TableHead from "../table/TableHead.jsx";

export default function Purchase() {
    const purchasedata = [
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],
        [
            "12/10/2021",
            "123",
            "HP",
            "14.2",
            "1",
            "14.2",
            "900",
            "900",
            "900",
        ],

    ]
    return (
        <div style={{
            width: "100%",
            overflow: "auto",
            padding: "10px",
        }}>
            <DataTable
                thead={[
                    <TableHead
                        key="date"
                    >Date</TableHead>,
                    <TableHead
                        key="order"
                    >Order No.</TableHead>,
                    <TableHead
                        key="brand"
                    >Brand</TableHead>,
                    <TableHead
                        key="cyl"
                    >Cyl Kg</TableHead>,
                    <TableHead
                        key="qty"
                    >Qty</TableHead>,
                    <TableHead
                        key="total"
                    >Total Kg</TableHead>,
                    <TableHead
                        key="rate"
                    >Rate</TableHead>,
                    <TableHead
                        key="amt"
                    >Amt. Total</TableHead>,
                    <TableHead
                        key="scheme"
                    >Pay Amount</TableHead>,
                ]}
                tbody={purchasedata}
                loading={false}
            />
        </div>
    );
}