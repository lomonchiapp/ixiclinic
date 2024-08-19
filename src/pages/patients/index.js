import React, { useState } from 'react';
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PatientsTable} from "../../components/patients/patientsTable";
import Grid from "@mui/material/Grid";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { PatientDrawer } from 'src/components/patients/PatientDrawer';
import { PatientForm } from 'src/components/patients/PatientForm';

const PatientsPage = () => {
  const [newPatient, setNewPatient] = useState(false)
  return (
    <>
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3}}
       >
          <Typography variant="h6">Lista de Pacientes</Typography>

          <Button startIcon={<ControlPointIcon/>} variant="contained" color="primary" onClick={() => setNewPatient(true)}>Agregar Paciente</Button>
          <PatientDrawer setOpen={setNewPatient} open={newPatient}>
            <PatientForm setOpen={setNewPatient}/>
          </PatientDrawer>
      </Grid>
      </Grid>
      <PatientsTable newPatient={newPatient} setNewPatient={setNewPatient} />
      </>
  );
};

export default PatientsPage;
// Path: src/pages/clients/index.js

