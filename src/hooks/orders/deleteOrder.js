import { collection, deleteDoc } from 'firebase/firestore'

export const deleteOrder = orderId => {
  try {
    const docRef = collection(db, 'orders').doc(orderId)
    const deletedOrder = deleteDoc(docRef)
    return deletedOrder
  } catch (error) {
    console.log(error)
  }
}
