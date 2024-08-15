import React from 'react';
//MUI Components
import { Box, Button } from '@mui/material';
//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
//Products List Component
import { ProductsList } from '../ProductsList';

export const FloatingWindow = ({index, values, setValues, handleChange}) => {
  return (
    <>
    <Box sx={styles.floatingWindow}>
    <ProductsList index={index} values={values} setValues={setValues} handleChange={handleChange}/>
    </Box>
    <Box sx={styles.FloatingNewProduct}>
    <Button sx={{width:"100%"}}><AddCircleOutlineIcon sx={{fontSize:20, paddingRight:1}}/>Agregar Nuevo Producto</Button>
    </Box>
    </>
  )
}

const styles = {
  floatingWindow: {
    position: 'absolute',
    zIndex: 9999999,
    width: '150%',
    overflow: 'auto',
    top: '3rem',
    backgroundColor: 'white',
    border: 'solid 1px #e0e0e0',
    borderRadius: 1,
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
    maxHeight: 200,
    minHeight: 200,
    '&::-webkit-scrollbar': {
      width: '0.5em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: '1px solid slategrey',
    },
  },
  FloatingNewProduct: {
    position: 'absolute',
    zIndex: 999,
    width: '150%',
    overflow: 'auto',
    top: 240,
    backgroundColor: 'white',
    border: 'solid 1px #e0e0e0',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)'
  }
}
