// ** React Imports
import * as React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import {PatientForm} from './PatientForm'

export function PatientDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registrar nuevo paciente.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, llene los campos para registrar un nuevo paciente. Recuerde que esta es una version compacta del
          formulario, los demas datos los puede llenar luego en el perfil del paciente.
        </DialogContentText>
        <PatientForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
