import React, { useEffect, useState } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { usePatientStore } from 'src/hooks/globalStates/usePatientStore';
import { getPatients } from 'src/hooks/patients/getPatients';

export function PatientsSelect({ setPatient }) {
  const { setSelectedPatient, selectedPatient } = usePatientStore();
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsData = await getPatients();
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []); // Add an empty dependency array to avoid unnecessary re-fetching

  const handleChange = (event, newValue) => {
    setSelectedPatient(newValue);
    if (setPatient) {
      setPatient(newValue);
    }
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id="patient-autocomplete"
          options={patients}
          value={selectedPatient || null} // Ensure value is controlled
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="Seleccione un Paciente" />}
          sx={{ minWidth: 250 }}
        />
      </FormControl>
      {selectedPatient?.firstName && <p>Selected Patient: {selectedPatient.firstName}</p>}
    </Box>
  );
}
