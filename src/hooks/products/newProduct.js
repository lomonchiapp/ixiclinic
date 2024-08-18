import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';

export const newProduct = async (product) => {
    try {
      const newDocRef = doc(collection(database, 'products')); // Create a new document reference with an auto-generated ID
      const prodId = newDocRef.id;
      await setDoc(newDocRef, { ...product, id: prodId }); // Set the document with the ID included
      console.log('Document written with ID: ', prodId);
      toast.success('Producto creado exitosamente.');
      return { ...product, id: prodId }; // Return the new category with the ID
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Error al crear el servicio.');
      throw error; // Re-throw the error to be handled by the caller
    }
  };