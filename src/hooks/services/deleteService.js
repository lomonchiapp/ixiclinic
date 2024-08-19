import {deleteDoc, collection} from 'firebase/firestore'

export const deleteService = async (id) => {
    try{
    await deleteDoc(collection(database, 'service').doc(id))
    toast.success('Servicio eliminado con éxito')
} catch (e) {
    console.error('hubo bobo:', e)
    toast.error('Hubo un error al eliminar el paciente')
}
}
