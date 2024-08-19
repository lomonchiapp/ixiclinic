import { useRouter } from 'next/router'
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRecordState } from 'src/contexts/recordState'
import {toast } from 'react-toastify'

export const useNewAndRecord = () => {
  const router = useRouter()
  const { setSelectedPatient } = useRecordState()

  const newAndRecord = async (patient) => {
    try {
      const docRef = await addDoc(collection(database, 'patients'), patient)
      setSelectedPatient({ id: docRef.id, ...patient })
      console.log('Document written with ID: ', docRef.id)
      toast.success('Paciente creado exitosamente.')
      router.push('/records/newRecord')
    } catch (e) {
      console.log('Error adding document:', e)
      toast.error('Error al crear el paciente.')
    }
  }

  return { newAndRecord }
}