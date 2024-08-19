import {database} from 'src/firebase'
import {collection, doc, setDoc} from 'firebase/firestore'
import {toast} from 'react-toastify';

export const newProvider = async (provider) => {
    try {
        const docRef = doc(collection(database, 'product_providers'));
        const provId = docRef.id;
        await setDoc(docRef, { ...provider, id: provId });
        console.log('Document written with ID: ', provId);
        toast.success('Proveedor creado exitosamente.');
        return { ...provider, id: provId };
    } catch (error) { 
        console.error('Error adding document: ', error);
        toast.error('Error al crear el proveedor.');
        throw error;
    }
}