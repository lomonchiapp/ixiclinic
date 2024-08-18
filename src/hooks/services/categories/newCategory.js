import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import { toast } from 'react-toastify';

export const newCategory = async (category) => {
    try {
      const newDocRef = doc(collection(database, 'service_categories')); // Create a new document reference with an auto-generated ID
      const catId = newDocRef.id;
      await setDoc(newDocRef, { ...category, id: catId }); // Set the document with the ID included
      console.log('Document written with ID: ', catId);
      toast.success('Categoría de Servicio creada exitosamente');
      return { ...category, id: catId }; // Return the new category with the ID
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error('Error al crear la categoría de servicio');
      throw error; // Re-throw the error to be handled by the caller
    }
  };