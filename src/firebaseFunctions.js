import {db} from './firebase'
import { collection, doc, setDoc, getDoc} from "firebase/firestore";

export async function createDoc(name, user){
    await setDoc(doc(db, "users",name ), user);
}

export async function retriveDoc(name){
    const docRef = doc(db, "users", name)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        return docSnap.data()
      } else {
        console.log("No such document!");
      }
}
  