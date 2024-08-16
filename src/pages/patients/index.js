import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PatientsTable} from "../../components/patients/patientsTable";
import Grid from "@mui/material/Grid";
import ControlPointIcon from '@mui/icons-material/ControlPoint';

const PatientsPage = () => {
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}
       >
          <Typography variant="h6">Lista de Pacientes</Typography>

          <Button startIcon={<ControlPointIcon/>} variant="contained" color="primary" onClick={() => window.location.href = "newPatient"}>Agregar Paciente</Button>
      </Grid>
      </Grid>
      <PatientsTable />
      </>
  );
};

export default PatientsPage;
// Path: src/pages/clients/index.js

