// gas-services.js
import { db, realTimeDB } from "../firebase-config";
import {
     collection,
     getDocs,
     updateDoc,
     deleteDoc,
     addDoc,
     doc,
     serverTimestamp,
     getDoc,
     runTransaction,
} from "firebase/firestore";

import { getDatabase, ref, set, onValue } from "firebase/database";

const gascollectionRef = collection(db, "gas_record");

class gasDataService {
     addGas = (newgas) => {
          return addDoc(gascollectionRef, newgas);
     };

     getAllGas = () => {
          return getDocs(gascollectionRef); // Use getDocs to fetch all documents
     };

     updatGas = () => {
          const updateDoc = doc(db, "gas_record", id);
          return updateDoc(updateDoc);
     };

     deleteGas = (id) => {
          const deletedoc = doc(db, "gas_record", id);
          return deleteDoc(deletedoc);
     };

     notifyDataChange = () => {
          set(ref(realTimeDB, "root/change/"), {
               change: "update",
               changeBy: "admin",
          });
     };

     // listenDataChange = (callback) => {
     //      const refs = ref(realTimeDB, "root/change/");
     //      onValue(refs, (snapshot) => {
     //           //const data = snapshot.val();
     //           //console.log(data);
     //           if (callback) {
     //                callback();
     //           }
     //      });
     // };
     listenDataChange = (callback) => {
          const refs = ref(realTimeDB, "root/change/");
          // Return the unsubscribe function from onValue
          return onValue(refs, (snapshot) => {
               if (callback) {
                    callback();
               }
          });
     };

}

export default new gasDataService();
