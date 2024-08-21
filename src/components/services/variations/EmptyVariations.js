import React from 'react'
import { Button, Grid, Typography, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const EmptyVariations = ({ setNewVariation, newVariation }) => {
  return (
    <Grid sx={styles.emptyVariation}>
      {newVariation ?(
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
          <Typography textAlign='center'>
            Llene los campos que estan abajo para crear la primera variación.
          </Typography>
        </Box>
      )
      : (<Box>
      <Typography textAlign='center'>No hay variaciones para este servicio</Typography>
      <Button onClick={() => setNewVariation(true)} startIcon={<AddIcon />}>
        Agregue la primera Variación
      </Button>
      </Box>)}
    </Grid>
  )
}

const styles = {
  emptyVariation: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    display: 'flex',
    flexDirection: 'column'
  }
}
