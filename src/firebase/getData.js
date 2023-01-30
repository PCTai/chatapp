import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./config";


const getDatas = (nameCol) => {
    const q = query(collection(db, nameCol));
    let a = new Array();
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            a.push(doc.data());
        });
    });
    console.log(a)
    return [...a];
}

export {getDatas }