import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { predefinedCategories } from "../../categories";

// Fetch businesses by category
export const fetchBusinessesByCategory = async (category) => {
    try {
      let q;
      if (category === "Other") {
        // Exclude predefined categories for "Other"
        q = query(
          collection(db, "businesses"),
          where("category", "not-in", predefinedCategories)
        );
      } else {
        // Fetch matching category
        q = query(
          collection(db, "businesses"),
          where("category", "==", category)
        );
      }
  
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching businesses:", error);
      throw new Error("Failed to fetch businesses.");
    }
  };

// Fetch unique categories
export const fetchCategories = async () => {
  try {
    const businessesSnapshot = await getDocs(collection(db, "businesses"));
    const categories = new Set();
    businessesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.category) {
        categories.add(data.category);
      }
    });
    return Array.from(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories.");
  }
};

// Fetch business by ID
export const fetchBusinessById = async (id) => {
    try {
      const docRef = doc(db, "businesses", id); // Reference the document
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
      if (!docSnap.exists()) {
        throw new Error("Business not found");
      }
      return { id: docSnap.id, ...docSnap.data() };
    } catch (error) {
      console.error("Error fetching business by ID:", error);
      throw new Error("Failed to fetch business.");
    }
  };