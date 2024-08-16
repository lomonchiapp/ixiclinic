import {deleteDoc, collection} from 'firebase/firestore'

export const deletePatient = async (id) => {
    try{
    await deleteDoc(collection(database, 'patients').doc(id))
    toast.success('Paciente eliminado con éxito')
} catch (e) {
    console.error('hubo bobo:', e)
    toast.error('Hubo un error al eliminar el paciente')
}
}
