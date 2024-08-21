import React, { useState, useEffect, useMemo } from 'react';
import { Box, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelectedService } from 'src/contexts/useSelectedService';
import { useGlobalStore } from 'src/contexts/useGlobalStore';
import { set } from 'nprogress';

export const ServiceVariationsBox = () => {
  const { services, fetchServices } = useGlobalStore();
  const { service, setService } = useSelectedService();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        await fetchServices();
        setService(null)
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, [fetchServices]);


  const handleChange = (event, newValue) => {
    setService(newValue);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Autocomplete
          id='service-autocomplete'
          options={services}
          getOptionLabel={option => `${option.name}`}
          onChange={handleChange}
          inputValue={service?.name || ''}
          value={service || null}
          renderInput={params => (
            <TextField
              {...params}
              label='Elija un servicio'
              disabled={loading}
            />
          )}
          sx={{ minWidth: 345 }}
          size='small'
        />
      </FormControl>
    </Box>
  );
};