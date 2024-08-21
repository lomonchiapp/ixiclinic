// ** React Imports
import { useState } from "react";
// ** MUI Imports
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
// ** Custom Components
import {AddServiceDrawer} from "../../components/services/AddServiceDrawer";
import {ServicesTable} from "../../components/services/ServicesTable";
// ** Icons
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { VariationsDialog } from "src/components/services/variations/VariationsDialog";

const ServicesPage = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}
       >
          <Typography variant="h6">Servicios del Centro</Typography>
          <Box>
          <Button sx={{marginRight:3}} startIcon={<MultipleStopIcon/>} variant="outlined" color="primary" onClick={() => setOpenDialog(true)}>Variaciones</Button>
          <Button startIcon={<ControlPointIcon/>} variant="contained" color="primary" onClick={() => setOpenDrawer(true)}>Agregar Servicio</Button>
          </Box>
      </Grid>
      </Grid>
      <ServicesTable drawerIsOpen={openDrawer} />
      <AddServiceDrawer open={openDrawer} setOpen={setOpenDrawer} />
      <VariationsDialog open={openDialog} setOpen={setOpenDialog} />
      </>
  );
};

export default ServicesPage;
// Path: src/pages/clients/index.js
