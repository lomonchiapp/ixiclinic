import React from 'react'
import { Box, FormControl, TextField, Grid, List, Typography, ListItem, Table, TableRow, TableHead, TableCell } from '@mui/material'
import { useRecordState } from 'src/contexts/recordState'

// ** MUI ICONS
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Delete from '@mui/icons-material/Delete'

export function ProdList() {
  // ** Global State
  const { prodList, setProdList, qties, setQties } = useRecordState()

  // ** Handlers
  const handleAdd = index => {
    const newQties = [...qties]
    newQties[index] += 1
    setQties(newQties)
  }
  const handleSubstract = index => {

    const newQties = [...qties]
    if (newQties[index] > 1) {
      newQties[index] -= 1
      setQties(newQties)
    }
    setQties(newQties)
  }

  const HandleDeleteItem = index => {

    const newProdList = [...prodList]
    newProdList.splice(index, 1)
    setProdList(newProdList)
  }

  const total = prodList.reduce((acc, prod, index) => {
    return acc + prod.price * qties[index]
  }, 0)

  const totalQty = qties.reduce((acc, qty) => acc + qty, 0)

  return (
    <Grid sx={styles.list}>
      <Typography sx={styles.header}>Productos Seleccionados</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cant</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>
        {prodList.map((prod, index) => (
          <TableRow key={index}>
            <TableCell sx={styles.qtyCell}>
            <RemoveIcon onClick={() => handleSubstract(index)} sx={styles.qtyIcons} />
            <Typography sx={styles.qty}>{qties[index]}</Typography>
            <AddIcon onClick={() => handleAdd(index)} sx={styles.qtyIcons} />
            </TableCell>
            <TableCell>{prod.name}</TableCell>
            <TableCell>${prod.price}</TableCell>
            <TableCell>
            <Delete onClick={() => HandleDeleteItem(index)} sx={styles.qtyIcons} />
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell><Typography sx={styles.totalLabel}>Total:</Typography></TableCell>
          <TableCell><Typography sx={styles.total}>${total}</Typography></TableCell>
        </TableRow>
      </Table>
    </Grid>
  )
}

const styles = {
  list: {
    maxWidth: 400,
    maxHeight: 300,
    overflow: 'auto',
    padding: 5,
    marginTop:5,
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
    fontWeight: '500',
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
  }
}
