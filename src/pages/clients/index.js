import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {ClientList} from "./clientsTable";
import Grid from "@mui/material/Grid";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const ClientsPage = () => {
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}
       >
          <Typography variant="h6">Lista de Clientes</Typography>

          <Button startIcon={<ControlPointIcon/>} variant="contained" color="primary" onClick={() => window.location.href = "newClient"}>Agregar Cliente</Button>
      </Grid>
      </Grid>
      <ClientList />
      </>
  );
};

export default ClientsPage;
// Path: src/pages/clients/index.js

