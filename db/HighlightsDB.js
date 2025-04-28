import { collection, addDoc, getDocs,getDoc,doc,updateDoc,arrayUnion, query, where } from "firebase/firestore"
import FB from "./connectDB"

const { db } = FB;

export async function getHighlights(){
    try {
        const highlights = [];
        const querySnapshot = await getDocs(collection(db, "events"));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Make sure imageurl exists and has the correct format
            const imageUrl = data.imageurl && data.imageurl.startsWith('/') ? data.imageurl : `/${data.imageurl}`;
            
            highlights.push({ 
                id: doc.id,
                url: imageUrl,
                caption: data.title,
                description: data.shortDesc
            });
        });
        console.log("Processed highlights:", highlights);
        return highlights;
    } catch (error) {
        console.error("Error fetching highlights:", error.message);
        return [];  // Return empty array instead of null
    }
}