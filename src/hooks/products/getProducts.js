import { database } from 'src/firebase'
import { getDocs, collection } from 'firebase/firestore'

export const getProducts = async () => {
  try {
    const productsCollection = getDocs(collection(database, 'products'))
    const products = (await productsCollection).docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    return products
  } catch (error) {
    console.error("Error getting patients:", error);
    // Handle the error appropriately, e.g., return an empty array or throw the error
    return []; 
  }
}