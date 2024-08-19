// ** React Imports
import * as React from 'react'
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

// ** MUI Icons
import AddCircleIcon from '@mui/icons-material/AddCircle'

// ** Hook
import {newCategory} from 'src/hooks/products/categories/newCategory'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { set } from 'nprogress'

export  function CategoryFormDialog({ open, setOpen, setProduct}) {
  // ** Local States
  const [productCategory, setProductCategory] = useState({ name: '', description: '', dateAdded: new Date() });



  // ** Handlers
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setProductCategory({ ...productCategory, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const category = await newCategory(productCategory)
      console.log('Category added: ', category);
      setProductCategory({ name: '', description: '' });
      setProduct(prevProduct => ({...prevProduct, category: category}));
      setOpen(false);
    } catch (error) {
      console.error("Error creating new category: ", error);
      // Optionally, you can add user notification here
    }
  }

  return (
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Registrar nueva categoría de productos.</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Por favor, ingrese el nombre y la descripción de la nueva categoría de productos.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre de la categoría de productos"
            type="text"
            fullWidth
            variant="standard"
            value={productCategory.name}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Descripción de la categoría de productos"
            type="text"
            fullWidth
            variant="standard"
            value={productCategory.description}
            onChange={handleChange}
          />
          <Button type='submit' onClick={handleSubmit}>Agregar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
