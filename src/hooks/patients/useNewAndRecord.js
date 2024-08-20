import { useRouter } from 'next/router'
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useRecordState } from 'src/contexts/recordState'
import { usePatientStore } from '../globalStates/usePatientStore'
import {toast } from 'react-toastify'

export const useNewAndRecord = () => {
  const router = useRouter()
  const { setSelectedPatient } = useRecordState()
  const { patient } = usePatientStore()


  const newAndRecord = async () => {
    try {
      const docRef = await addDoc(collection(database, 'patients'), patient)
      console.log('Document written with ID: ', docRef.id)
      toast.success('Paciente creado exitosamente.')
      router.push('/records/newRecord')
      setSelectedPatient({ id: docRef.id, ...patient })

    } catch (e) {
      console.log('Error adding document:', e)
      toast.error('Error al crear el paciente.')
    }
  }

  return { newAndRecord }
}
