import { database } from 'src/firebase'
import { collection, getDocs} from 'firebase/firestore'

export const getPrescriptions = async () => {
    const prescCollection = collection(database, 'prescriptions')
    const data = await getDocs(prescCollection)
    console.log(data)
    return data
}
