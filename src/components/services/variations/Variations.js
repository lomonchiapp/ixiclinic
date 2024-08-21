import React, { useState, useEffect } from 'react'
import {
  Box,
  FormControl,
  TextField,
  Grid,
  List,
  Typography,
  ListItem,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Button
} from '@mui/material'

// ** MUI ICONS
import Delete from '@mui/icons-material/Delete'

// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'

// ** Hooks
import { deleteVariation } from 'src/hooks/services/variations/deleteVariation'

// ** Custom Components
import { VariationForm } from './VariationForm'
import { EmptySelection } from './EmptySelection'
import { EmptyVariations } from './EmptyVariations'
import { VariationsTable } from './VariationsTable'

// ** Global States
import { useSelectedService } from 'src/contexts/useSelectedService'
import { useGlobalStore } from 'src/contexts/useGlobalStore'

export function Variations() {
  // ** Local State
  const [newVariation, setNewVariation] = useState(false)
  // ** Global State
  const { serviceVariations, setServiceVariations, fetchServVariations } = useGlobalStore()
  const { service } = useSelectedService()
  // ** Input States
  const variationsInService = serviceVariations.filter(variation => variation.service.id === service?.id)
  // ** Handlers

  useEffect(() => {
    fetchServVariations()
  }, [fetchServVariations])

  useEffect(() => {
    if (service && variationsInService.length > 0) {
      setNewVariation(false)
    }
  }, [variationsInService])

  return (
    <Grid sx={styles.list}>
      {service == null ? (
        <EmptySelection />
      ) : variationsInService.length === 0 && service != null ? (
        <EmptyVariations newVariation={newVariation} setNewVariation={setNewVariation} />
      ) : (
        <Box>
          <Box sx={styles.formContainer}>
            <VariationForm />
          </Box>
          <Box sx={styles.tableContainer}>
            <VariationsTable />
          </Box>
        </Box>
      )}
      {newVariation && <VariationForm setNewVariation={setNewVariation} />}
    </Grid>
  )
}

const styles = {
  list: {
    overflow: 'auto',
    padding: 5,
    marginTop: 5,
    border: '1px solid #f0f0f0',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)'
  },
  qty: {
    margin: '0 10px',
    fontWeight: 'bold',
    fontSize: 15
  },
  formContainer:{
    marginBottom: 3
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#00A99D',
    fontSize: 15,
    textAlign: 'right'
  },
  total: {
    fontWeight: 'bold',
    fontSize: 15
  },
  header: {
    color: '#00A99D',
    fontSize: 15,
    fontWeight: '500'
  },
  qtyIcons: {
    cursor: 'pointer',
    fontSize: 15
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qtyCell: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addIcon: {
    cursor: 'pointer',
    fontSize: 25,
    color: 'white',
    backgroundColor: '#00A99D'
  },
  closeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    cursor: 'pointer',
    fontSize: 18
  }
}
