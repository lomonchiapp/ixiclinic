import React from "react";
import { Button, Typography, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function EmptyPresc() {
  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    }}>
      <Typography sx={{maxWidth:300, textAlign:'center'}} variant='h6'>
        Comienza creando una receta para visualizarla aquí
      </Typography>
<ArrowBackIcon sx={{fontSize:'70', marginTop:5}}/>
    </Grid>
  );
}
