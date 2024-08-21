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

// ** Custom Components
import { VariationForm } from './VariationForm'
import { EmptySelection } from './EmptySelection'
import {EmptyVariations} from './EmptyVariations'

// ** Hooks
import { deleteVariation } from 'src/hooks/services/variations/deleteVariation'

// ** Global States
import { useSelectedService } from 'src/contexts/useSelectedService'
import { useGlobalStore } from 'src/contexts/useGlobalStore'

export function VariationsTable() {
  // ** Local State
  const { serviceVariations, setServiceVariations, fetchServVariations } = useGlobalStore()
  // ** Global State
  const { service } = useSelectedService()
  // ** Input States

  // ** Handlers


  const handleDelete = (id) => {
    deleteVariation(id)
    setServiceVariations(serviceVariations.filter(variation => variation.id !== id))
  }
  useEffect(() => {
    fetchServVariations()
  }, [fetchServVariations])

  return (
    <Box>
    <Box> <Typography sx={styles.header}>Variaciones de {service.name}</Typography></Box>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceVariations
              .filter(variation => variation.service.id === service.id)
              .map(
                variation => (
                  console.log(variation),
                  (
                    <TableRow key={variation.id}>
                      <TableCell>{variation.name}</TableCell>
                      <TableCell>${variation.price}</TableCell>
                      <TableCell>
                        
                          <Delete
                            onClick={() => handleDelete(variation.id)}
                            sx={styles.qtyIcons}
                            aria-label={`Delete ${variation.id}`}
                          />

                      </TableCell>
                    </TableRow>
                  )
                )
              )}
          </TableBody>
        </Table>
        </Box>
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
