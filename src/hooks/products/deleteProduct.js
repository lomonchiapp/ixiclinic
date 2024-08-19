import { deleteDoc, doc } from 'firebase/firestore';
import { database } from 'src/firebase';
import { toast } from 'react-toastify';

export const deleteProduct = async (id) => {
  try {
    await deleteDoc(doc(database, 'products', id));
    toast.success('Producto eliminado con éxito');
  } catch (e) {
    console.error('hubo bobo:', e);
    toast.error('Hubo un error al eliminar el paciente');
  }
};