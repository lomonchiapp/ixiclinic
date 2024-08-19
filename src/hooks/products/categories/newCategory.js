import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import {toast} from 'react-toastify';

export const newCategory = async (category) => {
    try {
        const docRef = doc(collection(database, 'product_categories'));
        const catId = docRef.id;
        await setDoc(docRef, { ...category, id: catId });
        console.log('Document written with ID: ', catId);
        toast.success('Categoría creado exitosamente.');
        return { ...category, id: catId };
    } catch (error) { 
        console.error('Error adding document: ', error);
        toast.error('Error al crear la categoría.');
        throw error;
    }
}