// ** React Component
import * as React from 'react';
import { useState, useEffect } from 'react';

// ** MUI Components
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// ** Firestore Import
import { database, FIREBASE_APP } from 'src/firebase';
import { collection, getDocs, } from 'firebase/firestore';

export function ServiceCategorySelect({isDialogOpen, serviceCategory, setServiceCategory}) {
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    if (!isDialogOpen) {
      const fetchServiceCategories = async () => {
        const querySnapshot = await getDocs(collection(database, 'service_categories'));
        const serviceCategories = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setServiceCategories(serviceCategories);
      };
      fetchServiceCategories();
    }
  }, [isDialogOpen]);

  const handleChange = (event) => {
    setServiceCategory(event.target.value);
  };

  return (
    <Box>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Seleccione una Categoria</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          sx={{ minWidth: 200}}
          value={serviceCategory}
          label="Categoria de Servicio"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Categorias</em>
          </MenuItem>
          {serviceCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
  );
}
