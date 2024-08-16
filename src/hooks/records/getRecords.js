import { database } from 'src/firebase'
import { collection, getDocs} from 'firebase/firestore'

export const getRecords = async () => {
    recordsCollection = collection(database, 'records')
    const data = await getDocs(recordsCollection)
    setRecords(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
  }