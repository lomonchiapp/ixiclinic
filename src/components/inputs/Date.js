import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
export function Date({date, setDate}) {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
      format='DD/MM/YYYY'
      sx={{ width: 170 }}
        label="Fecha"
        value={date}
        onChange={(newValue) => {
          setDate(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
