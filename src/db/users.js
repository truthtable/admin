import Dexie from "dexie";

const DB_NAME = "srd";
export const U = Object.freeze({
    I: "i",
    C: "c"
});

class UDB extends Dexie {
    u;

    constructor() {
        super(DB_NAME);
        this.version(1).stores({
            u: [
                U.I,
                U.C,
            ].join(","),
        });
        this.u = this.table("u");
    }
}

export const uDB = new UDB();

uDB.version(1).stores({
    u: [
        U.I,
        U.C,
    ].join(","),
});

export const storeU = async (
    i,
    c
) => {
    await uDB.u.put({
        [U.I]: i,
        [U.C]: c,
    });
};
export const removeU = async (i) => {
    await uDB.u.where(U.I).equals(i).delete();
}
export const getU = async () => {
    const u = await uDB.u.toArray();
    return u || null;
};
