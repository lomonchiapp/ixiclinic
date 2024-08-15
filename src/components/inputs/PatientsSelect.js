import React from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

export function PatientsSelect({ isDialogOpen, setPatient, patient, patients }) {

  const handleChange = (event, newValue) => {
    setPatient(newValue);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id="patient-autocomplete"
          options={patients}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          value={patients.find(pat => pat.id === patient) || null} // Ensure the correct patient object is set as the value
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} label="Seleccione un Paciente" />}
          sx={{ minWidth: 250 }}
        />
      </FormControl>
    </Box>
  );
}
