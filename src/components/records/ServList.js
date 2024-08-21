import React, { useEffect } from 'react'
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
  TableCell
} from '@mui/material'
import { useRecordState } from 'src/contexts/recordState'

// ** MUI ICONS
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Delete from '@mui/icons-material/Delete'

export function ServList({ variationDetails }) {
  // ** Global State
  const { servList, setServList, servVariations, qties, setQties, servTotal, setServTotal, variationsTotal, setVariationsTotal } = useRecordState()

  // ** Handlers
  const handleAdd = index => {
    const newQties = [...qties];
    newQties[index] += 1;
    setQties(newQties);
  };

  const handleSubstract = index => {
    const newQties = [...qties];
    if (newQties[index] > 1) {
      newQties[index] -= 1;
      setQties(newQties);
    }
    setQties(newQties);
  };

  useEffect(() => {
    const total = servList.reduce((acc, serv) => acc + Number(serv.price), 0);
    const variationsTotal = servVariations.reduce((acc, variation) => acc + Number(variation.price), 0);
    setVariationsTotal(variationsTotal);
    setServTotal(total + variationsTotal);
  }, [servList, servVariations]); // Add servVariations to the dependency array

  const handleDeleteItem = index => {
    const newServList = [...servList];
    newServList.splice(index, 1);
    setServList(newServList);
  };

  const getVariationsTotal = () => {
    return servTotal + variationsTotal;
  };

  return (
    <Grid sx={styles.list}>
      <Typography sx={styles.header}>Servicios / Tratamientos</Typography>
      <Box sx={styles.tableContainer}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Especificaciones</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {servList.map((serv, index) => {
            const variationsForService = servVariations.filter(variation => variation.service.id === serv.id)
            return (
              <TableRow key={index}>
                <TableCell>{serv.name}</TableCell>
                <TableCell>
                  {variationsForService.map(variation => (
                    <Box sx={styles.varCell} key={variation.id}>
                      <Typography sx={styles.varName}>{variation.name}</Typography> -{' '}
                      <Typography sx={styles.varDetail}>{variationDetails[variation.id] || ''}</Typography>
                    </Box>
                  ))}
                </TableCell>
                <TableCell>${serv.price}</TableCell>
                <TableCell>
                  <Delete onClick={() => handleDeleteItem(index)} sx={styles.qtyIcons} />
                </TableCell>
              </TableRow>
            )
          })}
        </Table>
      </Box>
    </Grid>
  )
}

const styles = {
  list: {
    minHeight: 150,
    position: 'relative',
    overflow: 'auto',
    pt: 5,
    marginTop: 5,
    border: '1px solid #f0f0f0',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    flexGrow: 1
  },
  varName: {
    fontWeight: 'bold',
    mr:1,
  },
  varDetail: {
    color: 'grey',
    fontVariant: 'italic',
    fontSize: 12,
    maxWidth: 80,
    wordBreak:'break-word'
  },
  varCell: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 300,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tableContainer: {
    overflow: 'auto',
    height: '100%',
    width: '100%'
  },
  totalRow: {
    borderTop: '1px solid #f0f0f0',
    backgroundColor: '#f0f0f0',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mt: 5,
    p: 3
  },
  table: {
    mb: 5,
    borderCollapse: 'collapse'
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
    p: 5
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
