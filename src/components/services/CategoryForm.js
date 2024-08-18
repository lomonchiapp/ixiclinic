// ** React Imports
import * as React from 'react'
import { useState } from 'react'

// ** MUI Imports
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
//Custom Hook
import { newCategory } from 'src/hooks/services/categories/newCategory'

export function CategoryForm({setOpen}) {
  const [serviceCategory, setServiceCategory] = useState({ name: '', description: '' });
  const [serviceCategories, setServiceCategories] = useState([]);

  const handleChange = (event) => {
    setServiceCategory({ ...serviceCategory, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const category = await newCategory(serviceCategory);
      setServiceCategories([...serviceCategories, category]);
      setServiceCategory({ name: '', description: '' });
      setOpen(false)
    } catch (error) {
      console.error("Error creating new category: ", error);
      // Optionally, you can add user notification here
    }
  };
  return (
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
          <Button type='button' onClick={() => setOpen(false)}>Cancelar</Button>
        </form>
  )
}
