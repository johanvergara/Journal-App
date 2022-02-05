import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {

    const docRef = collection(db, `${uid}/journal/notes`);
    const notesSnap = await getDocs(docRef);
    const notes = [];

    notesSnap.forEach( snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    });

    return notes;
}