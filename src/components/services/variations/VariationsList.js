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
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Close from 'mdi-material-ui/Close'

// ** Firebase Imports
import { database } from 'src/firebase'
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore'

// ** Custom Components
import { VariationForm } from './VariationForm'
import Delete from '@mui/icons-material/Delete'

export function VariationsList({ serviceSelected }) {
  // ** Local State
  const [variations, setVariations] = useState([])
  const [isDeleting, setIsDeleting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  // ** Input States

  // ** Handlers

  const fetchVariations = async () => {
    const variationsCollection = collection(database, 'service_variations')
    const variationsSnapshot = await getDocs(variationsCollection)
    const variationsList = variationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setVariations(variationsList)
  }

  const handleDelete = async id => {
    setIsDeleting(true)
    setDeletingId(id)
    await deleteDoc(doc(database, 'service_variations', id))
    // Update the variations list
    setVariations(variations.filter(variation => variation.id !== id))

    setIsDeleting(false)
    setDeletingId(null)
    fetchVariations()
  }

  useEffect(() => {
    fetchVariations()
  }, [])

  return (
    <Grid sx={styles.list}>
      {serviceSelected && (
        <Box>
          <Typography sx={styles.header}>Variaciones de {serviceSelected.name}</Typography>
          <VariationForm serviceSelected={serviceSelected} setVariations={setVariations} />
        </Box>
      )}

      {serviceSelected ? (
        <Table sx={styles.table}>
          <Typography sx={styles.header}>Variaciones de {serviceSelected.name}</Typography>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Atributos</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {variations
              .filter(variation => variation.service.id === serviceSelected.id)
              .map(
                variation => (
                  console.log(variation),
                  (
                    <TableRow key={variation.id}>
                      <TableCell>{variation.name}</TableCell>
                      <TableCell>{variation.attributes}</TableCell>
                      <TableCell>${variation.price}</TableCell>
                      <TableCell>
                        {deletingId === variation.id ? (
                          <Typography sx={styles.qtyIcons}>Deleting...</Typography>
                        ) : (
                          <Delete
                            onClick={() => handleDelete(variation.id)}
                            sx={styles.qtyIcons}
                            aria-label={`Delete ${variation.id}`}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
          </TableBody>
        </Table>
      ) : (
        <Grid
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Typography>No hay variaciones para este servicio</Typography>
          <Button onClick={() => setNewVariation(true)} startIcon={<AddIcon />}>
            Agregue la primera Variación
          </Button>
        </Grid>
      )}
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
