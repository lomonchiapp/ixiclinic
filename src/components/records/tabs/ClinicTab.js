import React, { useState, useEffect } from 'react'
import { Grid, TextField, Typography, FormControl, Box, Select, MenuItem } from '@mui/material'
import { useRecordState } from 'src/contexts/recordState'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { getServices } from 'src/hooks/services/getServices'
import { addDays } from 'date-fns'

export function ClinicTab() {
  const { notes, procedure, setNotes, setProcedure, nextDate, nextService, setNextService} = useRecordState()
  const [services, setServices] = useState([])

  useEffect(() => {
    const fetchServices = async () => {
      const services = await getServices()
      setServices(services)
    }
    fetchServices()
  }, [])

  const [nextAppointment, setNextAppointment] = useState(dayjs().add(7, 'day'))

  const handleDateChange = date => {
    setNextAppointment(date)
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid sx={styles.tab}>
        <Box>
          <FormControl>
            <Typography variant='h6'>Procedimientos realizados</Typography>
            <TextField
              sx={styles.textArea}
              value={procedure}
              multiline
              rows={3}
              onChange={e => setProcedure(e.target.value)}
              label='Procedimiento realizados'
              variant='outlined'
            />
          </FormControl>
        </Box>
        <Box>
          <FormControl>
            <Typography variant='h6'>Notas del paciente</Typography>
            <TextField
              sx={styles.textArea}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              multiline
              rows={3}
              label='Procedimiento'
              variant='outlined'
            />
          </FormControl>
        </Box>
        {/* Next Date */}
        <Box>
          <FormControl>
            <Typography variant='h6'>Proxima Cita</Typography>

            <DatePicker
              onChange={handleDateChange}
              value={nextAppointment}
              format='DD/MM/YYYY'
              renderInput={params => <TextField {...params} label='Proxima Cita' variant='outlined' />}
            />
          </FormControl>
        </Box>
        <Box>
          <Typography variant='h6'>Proximo servicio a tomar</Typography>
          <Select
            value={nextService}
            onChange={e => setNextService(e.target.value)}
            variant='outlined'
            >
              {services.map(service => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </Select>
        </Box>
      </Grid>
    </LocalizationProvider>
  )
}

const styles = {
  tab: {
    pt: 3,
    display: 'flex',
    flexDirection: 'column'
  },
  textArea: {
    minWidth: 300,
    marginBottom: 7
  }
}
