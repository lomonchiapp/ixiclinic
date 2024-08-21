import React from 'react'
import { Box, Typography } from '@mui/material'

export const EmptyPatient = () => {
  return <Box sx={styles.container}>
    <Typography sx={styles.text}>Seleccione un paciente para comenzar con el expediente</Typography>
  </Box>
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    border: '3px dashed #f0f0f0',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey'
  }
}