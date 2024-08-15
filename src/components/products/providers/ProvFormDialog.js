// ** React Imports
import * as React from 'react'
import { useState, useEffect } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, addDoc } from 'firebase/firestore'

export function ProvFormDialog({ open, setOpen, setProviders }) {
  const [provider, setProvider] = useState({ name: '', phone: '', email: '', notes: ''});

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(database, 'product_providers'),{
        ...provider,
        dateAdded: new Date(),
      });
      console.log('Document written with ID: ', docRef.id);
      setProvider({ name: '', phone: '', email: '', notes: ''})
      setOpen(false);
    }
    catch (e) {
      console.error('Error adding document: ', e);
    }
  }
  const handleChange = (event) => {
    setProvider({ ...provider, [event.target.name]: event.target.value });
  };

  return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registrar nuevo proveedor.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, ingrese los datos del proveedor.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <Grid sx={{width:"100%"}}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre del Proveedor / Visitador"
            type="text"
            fullWidth
            variant="standard"
            value={provider.name}
            onChange={handleChange}
          />
          </Grid>
          <Grid item container>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="phone"
                name="phone"
                label="Telefono"
                type="text"
                fullWidth
                variant="standard"
                value={provider.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Correo"
                type="text"
                fullWidth
                variant="standard"
                value={provider.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Agregar nota o descripción (uso interno)"
            type="text"
            fullWidth
            variant="standard"
            value={provider.notes}
            onChange={handleChange}
          />
          <Button type='button' onClick={handleSubmit}>Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
