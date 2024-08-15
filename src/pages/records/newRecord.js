import React from 'react'
import { useState } from 'react'
import { RecordForm } from '../../components/records/RecordForm'
import { PatientDialog } from 'src/components/patients/PatientDialog'

const NewRecord = () => {
  const [newPatient, setNewPatient] = useState(false)
  const [newService, setNewService] = useState(false)
  const [newProduct, setNewProduct] = useState(false)

  return (
    <>
      <RecordForm
      newPatient={newPatient}
      setNewPatient={setNewPatient}
      newService={newService}
      setNewService={setNewService}
      newProduct={newProduct}
      setNewProduct={setNewProduct}
      />
      <PatientDialog open={newPatient} setOpen={setNewPatient} />
    </>
  )
}

export default NewRecord
