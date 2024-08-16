'use client'

import { Card, CardHeader, CardContent, Divider, Grid, Button } from '@mui/material'
import { PrescriptionForm } from './PrescriptionForm'
import { useState } from 'react'
import { PrescPDF } from 'src/components/prescriptions/PrescPDF'
import { useEffect } from 'react'
import { getPatients } from 'src/hooks/patients/getPatients'
import dayjs from 'dayjs'
import { usePrescState } from 'src/contexts/prescState'
import { EmptyPresc } from 'src/components/prescriptions/EmptyPresc'
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);


const NewPrescription = () => {
  const [patients, setPatients] = useState([])
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(dayjs())
  const { patient, medicines, description } = usePrescState()

  useEffect(() => {
    getPatients()
      .then(response => {
        setPatients(response.data)
      })
      .catch(error => {
        console.error('An error occurred:', error)
      })
  }, [])
  return (
    <Grid sx={{ display: 'flex' }}>
      <Card sx={{ maxWidth: '50%' }}>
        <CardHeader title='Crear nueva receta medica' titleTypographyProps={{ variant: 'h6' }} />
        <Divider />
        <CardContent>
          <PrescriptionForm date={date} setDate={setDate} patients={patients} open={open} setOpen={setOpen} />
        </CardContent>
      </Card>

      <Card sx={{ minWidth: '40%', marginLeft: 10 }}>
        {patient || medicines.length > 0 || description ? (
          <PDFViewer width={"100%"} height={"100%"} >
            <PrescPDF date={date} patients={patients} />
          </PDFViewer>
        ) : (
          <EmptyPresc />
        )}

      </Card>
    </Grid>
  )
}

export default NewPrescription
