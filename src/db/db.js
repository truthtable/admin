import Dexie from "dexie";

const DB_NAME = "srd";
export const CUSTOMER_FIELDS = Object.freeze({
    ID: "id",
    USER_ID: "user_id",
    NAME: "name",
    AADHAR_CARD_NO: "aadhar_card_no",
    DIARY_NUMBER: "diaryNumber",
    ADDRESS: "address",
    PHONE_NO: "phone_no",
    TOTAL_BALANCE: "totalBalance",
});

class LocalDB extends Dexie {
    customer;

    constructor() {
        super(DB_NAME);
        //NOTE : Delete When removing from remote
        this.version(3).stores({
            customer: [
                CUSTOMER_FIELDS.ID,
                CUSTOMER_FIELDS.USER_ID,
                CUSTOMER_FIELDS.NAME,
                CUSTOMER_FIELDS.AADHAR_CARD_NO,
                CUSTOMER_FIELDS.DIARY_NUMBER,
                CUSTOMER_FIELDS.ADDRESS,
                CUSTOMER_FIELDS.PHONE_NO,
                CUSTOMER_FIELDS.TOTAL_BALANCE,
            ].join(","),
        });
        this.customer = this.table("customer");
    }
}

export const localDB = new LocalDB();

localDB.version(1).stores({
    customer: [
        CUSTOMER_FIELDS.ID,
        CUSTOMER_FIELDS.USER_ID,
        CUSTOMER_FIELDS.NAME,
        CUSTOMER_FIELDS.AADHAR_CARD_NO,
        CUSTOMER_FIELDS.DIARY_NUMBER,
        CUSTOMER_FIELDS.ADDRESS,
        CUSTOMER_FIELDS.PHONE_NO,
        CUSTOMER_FIELDS.TOTAL_BALANCE,
    ].join(","),
});
export const storeCustomer = async (
    id,
    user_id,
    name,
    aadhar_card_no,
    diaryNumber,
    address,
    phone_no,
    totalBalance,
) => {
    await localDB.customer.put({
        id,
        user_id,
        name,
        aadhar_card_no,
        diaryNumber,
        address,
        phone_no,
        totalBalance,
    });
};
export const getLocalCustomers = async () => {
    const customers = await localDB.customer.toArray();
    return customers || null;
};
export const removeAllLocalCustomers = async () => {
    await localDB.customer.clear();
}