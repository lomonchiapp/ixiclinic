import React from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

export function ProductsSelect({ setProduct, product, products }) {
  const handleChange = (event, newValue) => {
    setProvider(newValue);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id="provider-autocomplete"
          options={products}
          getOptionLabel={(option) => `${option.name}`}
          value={products.find(prod => prod.id === product) || null} //prov is provider
          onChange={handleChange}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={(params) => <TextField {...params} label="Seleccione un Proveedor / Visitador" />}
          sx={{ minWidth: 345 }}
        />
      </FormControl>
    </Box>
  );
}
