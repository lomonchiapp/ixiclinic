import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const EmptySelection = () => {
  return (
    <Grid sx={styles.emptyVariation}>
      <Typography>Seleccione un servicio para visualizar las variaciones.</Typography>
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
