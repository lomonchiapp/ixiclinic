import React, { useEffect } from 'react'
import { Box, FormControl, TextField, Grid, List, Typography, ListItem, Table, TableRow, TableHead, TableCell } from '@mui/material'
import { useRecordState } from 'src/contexts/recordState'

// ** MUI ICONS
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Delete from '@mui/icons-material/Delete'

export function ServList() {
  // ** Global State
  const { servList, setServList, qties, setQties, servTotal, setServTotal } = useRecordState()

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

    const newServList = [...servList]
    newServList.splice(index, 1)
    setServList(newServList)
  }

  useEffect(() => {
    const total = servList.reduce((acc, serv) => acc + Number(serv.price), 0)
    setServTotal(total)
  }, [servList])

  return (
    <Grid sx={styles.list}>
      <Typography sx={styles.header}>Servicios / Tratamientos</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Especificaciones</TableCell>
            <TableCell>Precio</TableCell>
          </TableRow>
        </TableHead>
        {servList.map((serv, index) => (
          <TableRow key={index}>

            <TableCell>{serv.name}</TableCell>
            <TableCell>{serv.name}</TableCell>
            <TableCell>${serv.price}</TableCell>
            <TableCell>
            <Delete onClick={() => HandleDeleteItem(index)} sx={styles.qtyIcons} />
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell></TableCell>
          <TableCell><Typography sx={styles.totalLabel}>Total:</Typography></TableCell>
          <TableCell><Typography sx={styles.total}>${servTotal}</Typography></TableCell>
        </TableRow>
      </Table>
    </Grid>
  )
}

const styles = {
  list: {
    minWidth: 500,
    minHeight: 400,

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
