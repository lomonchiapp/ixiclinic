import React, { useEffect, useState } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// Global State
import { useRecordState } from 'src/contexts/recordState'
import { useGlobalStore } from 'src/contexts/useGlobalStore';

// Custom Hooks
import { getPatients } from 'src/hooks/patients/getPatients';

export function PatientsSelect({ setPatient }) {
  const { setSelectedPatient, selectedPatient } = useRecordState()
  const [inputValue, setInputValue] = useState('')
  const { patients } = useGlobalStore()

  const handleChange = (event, newValue) => {
    setSelectedPatient(newValue);
  };

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };
  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id="patient-autocomplete"
          options={patients}
          value={selectedPatient || null} // Ensure value is controlled
          inputValue={inputValue}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          onChange={handleChange}
          onInputChange={handleInputChange}
          renderInput={(params) => <TextField {...params} label="Seleccione un Paciente" />}
          sx={{ minWidth: 250 }}
        />
      </FormControl>
    </Box>
  );
}
