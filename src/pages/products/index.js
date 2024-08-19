//MUI Imports
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import Typography from '@mui/material/Typography';
// Custom Components
import { ProductsTable } from "src/components/products/ProductsTable";
import { AddProductDrawer } from "src/components/products/AddProductDrawer";

import { useState } from "react";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}
       >
          <Typography variant="h6">Listado de Productos</Typography>

          <Button startIcon={<ControlPointIcon/>} variant="contained" color="primary" onClick={() => setOpen(true)}>Agregar Producto</Button>

      </Grid>
      </Grid>
      <ProductsTable drawerIsOpen={open} />
      <AddProductDrawer open={open} setOpen={setOpen} />
      </>
  );
};

export default ProductsPage;
// Path: src/pages/clients/index.js
