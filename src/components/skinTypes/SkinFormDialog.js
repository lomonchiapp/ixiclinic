// ** React Imports
import * as React from 'react'
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'


export default function SkinFormDialog({ open, setOpen }) {
  const [skinType, setSkinType] = useState({ name: '', description: '' });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setSkinType({ ...skinType, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(database, 'skin_types'), skinType);
    console.log('Document written with ID: ', docRef.id);
    setSkinType({ name: '', description: '' });
    setOpen(false);
  };

  return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registrar nuevo tipo de piel.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Tipo de piel"
            type="text"
            fullWidth
            variant="standard"
            value={skinType.name}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción del tipo de piel"
            type="text"
            fullWidth
            variant="standard"
            value={skinType.description}
            onChange={handleChange}
          />
          <Button type='button' onClick={handleSubmit}>Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
