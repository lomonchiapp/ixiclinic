import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ProductList} from "./productTable";
import Grid from "@mui/material/Grid";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const ProductPage = () => {
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}
       >
          <Typography variant="h6">Lista de Productos</Typography>

          <Button startIcon={<ControlPointIcon/>} variant="contained" color="primary" onClick={() => window.location.href = "new"}>Agregar Cliente</Button>
      </Grid>
      </Grid>
      <ProductList />
      </>
  );
};

export default ProductPage;
// Path: src/pages/clients/index.js

