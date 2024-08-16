import React from 'react'
import { useState, useEffect } from 'react'
import { Typography, Grid, Box, Table, TableRow, TableCell } from '@mui/material'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer'
import { Image } from '@react-pdf/renderer'
import { getPatients } from 'src/hooks/patients/getPatients'
import logo from '../../pages/prescriptions/ixiicon.png'
import dayjs from 'dayjs'
import { getUnits } from 'src/hooks/getUnits'
// Import Global Presc State
import { usePrescState } from 'src/contexts/prescState'

export const PrescPDF = ({ patients, date }) => {
  const {
    patient,
    setPatient,
    doctor,
    setDoctor,
    medicines,
    setMedicines,
    durations,
    onWeeks,
    setDurations,
    dosages,
    description,
    setDosages,
    frequencies,
    setDescription,
    setFrequencies,
    administrations,
    setAdministrations
  } = usePrescState()

  const getPatientName = patient => {
    const patientData = patients.find(p => p.id === patient)
    return patientData ? `${patientData.firstName} ${patientData.lastName}` : ''
  }
  const dateStr = dayjs(date).format('DD/MM/YYYY')
  return (
    <Document>
      <Page size='A5' style={styles.page}>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ textAlign: 'left', fontSize:12 }}>Paciente: {getPatientName(patient)}</Text>
            <Text style={styles.date}>{dateStr}</Text>
          </View>
          <View>
            <Text style={styles.label}>Doctor: </Text>
          </View>
          <View style={styles.prescBox}>
            <Text style={styles.pbHeader}>Usted debe tomar:</Text>
            {medicines.map((medicine, index) => (
              <View key={index}>
                <Text style={styles.pbText} key={index}>
                  {dosages[index]} {getUnits(medicine.presentation)} de {medicine.name} {frequencies[index]} durante{' '}
                  {durations[index]} {onWeeks[index] ? 'semanas' : 'días'}
                </Text>
              </View>
            ))}
          </View>
          <View>
            <Text style={styles.label}>Indicaciones</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.footer}>
            <Text>Receta médica generada por ixiicon</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    fontFamily: 'Helvetica',
    position: 'relative'
  },
  bodyContainer: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    border: '1px solid #EDEDED'
  },
  description: {
    fontSize: 13,
    overflow: 'hidden'
  },
  prescBox: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    minHeight: '40%',
    maxHeight: '40%',
    border: '1px solid #EDEDED'
  },
  date: {
    fontSize: 13,
    textAlign: 'right',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    padding: 5
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  pbHeader: {
    fontSize: 12,
    fontFamily: 'Helvetica',
    fontStyle: 'bold',
    color: 'grey',
    marginBottom: 10
  },
  pbText: {
    fontSize: 12,
    marginBottom: 5
  },
  pbMedicine: {
    fontWeight: 'bold',
    fontSize: 12
  },
  patientName: {
    fontSize: 12
  },
  label: {
    fontSize: 12,
    color: 'grey',
    fontWeight: 'bold'
  },
  logo: {
    width: 50,
    height: 50
  },
  footer: {
    backgroundColor: '#EDEDED',
    width: '100%',
    position: 'absolute',
    height: 40,
    bottom: 0,
    textAlign: 'center',
    fontSize: 12,
    color: 'grey'
  }
})
