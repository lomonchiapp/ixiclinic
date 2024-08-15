// ** React Imports
import * as React from 'react'
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'


export function CategoryFormDialog({ open, setOpen }) {
  const [serviceCategory, setServiceCategory] = useState({ name: '', description: '' });
  const [serviceCategories, setServiceCategories] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const docRef = await addDoc(collection(database, 'serviceCategories'), serviceCategory);
    console.log('Document written with ID: ', docRef.id);
    setServiceCategory({ name: '', description: '' });
    setOpen(false);
    // Poner notificacion aqui

  };

  const handleChange = (event) => {
    setServiceCategory({ ...serviceCategory, [event.target.name]: event.target.value });
  };

  return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registrar nueva categoría de Servicios.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, ingrese el nombre y la descripción de la nueva categoría de servicios.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre de la Categoría"
            type="text"
            fullWidth
            variant="standard"
            value={serviceCategory.name}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Escriba una descripcion (opcional)"
            type="text"
            fullWidth
            variant="standard"
            value={serviceCategory.description}
            onChange={handleChange}
          />
          <Button type='button' onClick={handleSubmit}>Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
