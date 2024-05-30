import { db } from "../firebase-config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const deliveryBoyCollectionRef = collection(db, "deliveryboy_record");

class deliveryBoyService {
  addDeliveryBoy(newBoy) {
    return addDoc(deliveryBoyCollectionRef, newBoy);
  }

  readDeliveryBoy = () => {
    return getDocs(deliveryBoyCollectionRef);
  };

  updateDeliveryBoy = () => {
    const updateDeliveryBoy = doc(db, "deliveryboy_record", id);
    return updateDeliveryBoy(updateDeliveryBoy);
  };

  deleteDeliveryBoys = () => {
    const deleteDeliveryBoys = doc(db, "deliveryboy_record", id);
    return deleteDeliveryBoys(deleteDeliveryBoys);
  };
}

export default new deliveryBoyService();
