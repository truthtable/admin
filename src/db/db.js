import Dexie from "dexie";

export const db = new Dexie("OrdersDB");

db.version(1).stores({
     orders: "id, product_name, quantity, created_at",
});
