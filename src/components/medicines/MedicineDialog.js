import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import NewMedicineForm from './NewMedicineForm'

export function MedicineDialog({ open, setOpen, medicine, setMedicine }) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registrar nuevo medicamento.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Registra un nuevo medicamento a la base de datos para su posterior uso en el sistema.
        </DialogContentText>
        <NewMedicineForm open={open} setOpen={setOpen} medicine={medicine} setMedicine={setMedicine}/>
      </DialogContent>
    </Dialog>
  )
}
