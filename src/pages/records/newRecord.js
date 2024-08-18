import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { useState } from 'react'
import { RecordForm } from '../../components/records/RecordForm'
import { PatientDialog } from 'src/components/patients/PatientDialog'
import { useRecordState } from 'src/contexts/recordState'

const NewRecord = () => {
  const [newPatient, setNewPatient] = useState(false)
  const [newService, setNewService] = useState(false)
  const [newProduct, setNewProduct] = useState(false)
  const { total } = useRecordState()

  return (
    <Grid sx={styles.page} container>
      <RecordForm
        newPatient={newPatient}
        setNewPatient={setNewPatient}
        newService={newService}
        setNewService={setNewService}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
      />
      <PatientDialog open={newPatient} setOpen={setNewPatient} />
      <Grid sx={styles.fixedBar}>
        <Box sx={styles.totalContainer}>
          <Typography sx={styles.totalLabel}>Total:</Typography>
          <Typography sx={styles.total}>${total().toFixed(2)}</Typography>
        </Box>
        <Box>
          <Box component={'button'} sx={styles.createButton}>
            Crear Registro
          </Box>
          <Box component={'button'} sx={styles.cancelButton}>
            Cancelar
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

const styles = {
  fixedBar: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    zIndex: 999999,
    width: '100%',
    backgroundColor: 'white',
    padding: '20px',
    borderTop: '1px solid #ccc',
    boxShadow: '0 0 10px 0 #00000010'
  },
  createButton: {
    backgroundColor: '#00A99D',
    color: 'white',
    padding: '10px 20px',
    borderRadius: 1,
    marginRight: 2,
    border: 'none'
  },
  cancelButton: {
    backgroundColor: '#ccc',
    color: 'white',
    padding: '10px 20px',
    borderRadius: 1,
    border: 'none'
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 1
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00A99D',
    mr:3
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    pt:1,
    marginBottom: 1
  },
}

export default NewRecord
