// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Grid from '@mui/material/Grid'
// ** Icon Imports
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
import Visibility from '@mui/icons-material/Visibility'
// ** Firestore Import
import { database } from 'src/firebase'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'
// ** Global State
import { useSelectedService } from 'src/contexts/useSelectedService'
import { useSearchStore } from 'src/hooks/globalStates/useSearchStore'
import { useGlobalStore } from 'src/contexts/useGlobalStore'
// Hook

// ** Custom Components
import { EditServiceDrawer } from './EditServiceDrawer'
import { EditDrawer } from '../EditDrawer'
import {ServiceDetail} from './ServiceDetail'
import { ViewDialog } from '../ViewDialog'


const columns = [
  { id: 'name', label: 'Nombre del Servicio', minWidth: 170 },
  { id: 'category', label: 'Categoría', minWidth: 170, align: 'right' },
  { id: 'price', label: 'Precio', minWidth: 170, align: 'right' },
  { id: 'variations', label: 'Variaciones', minWidth: 170, align: 'right' },
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right' }
]

export const ServicesTable = () => {
  // ** Local States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  
  //Global States
  const { searchText } = useSearchStore()
  const { service, setService } = useSelectedService()
  const { fetchServices, services } = useGlobalStore()

  //Modes
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState(false)
  
  // Filter Services
  const filteredServices = services.filter(service => {
    const searchLower = searchText.toLowerCase()
    const nameMatch = service.name.toLowerCase().includes(searchLower)
    return nameMatch
  })

  // ** Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const editService = service => {
    setService(service)
    setEditMode(true)
  }
  const viewService = service => {
    setService(service)
    setViewMode(true)
  }

  const handleDelete = id => {
    deleteService(id)
    setService(services.filter(service => service.id !== id))
  }

  useEffect(() => {
    fetchServices()
  }, [services, fetchServices])


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(service => (
              <TableRow hover sx={styles.row} key={service.id} tabIndex={-1}>
                <TableCell component='th' scope='row'>
                  {service.name}
                </TableCell>
                <TableCell align='right'>{service.category?.name}</TableCell>
                <TableCell align='right'>{service.price}</TableCell>
                
                <TableCell align='right'>{service.stock}</TableCell>
                <TableCell align='right'>{service.cost}</TableCell>
                <TableCell
                  align='right'
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                >
                  <Grid sx={styles.btnContainer}>
                    <Grid item>
                      <Edit onClick={() => editService(service)} sx={styles.actionButton} />
                      <EditDrawer open={editMode} setOpen={setEditMode}>
                        <ServiceDetail setOpen={setEditMode} />
                      </EditDrawer>
                    </Grid>
                    <Grid item>
                      <Visibility onClick={() => viewService(service)} sx={styles.actionButton} />
                      <ViewDialog setOpen={setViewMode} open={viewMode}></ViewDialog>
                    </Grid>
                    <Grid>
                      <DeleteIcon sx={styles.deleteButton} onClick={() => handleDelete(service.id)} />
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={services.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}

const styles = {
  actionButton: {
    cursor: 'pointer',
    p: 1,
    border: '1px solid #00A99D',
    color: '#00a99d',
    BorderRadius: 1,
    transition: 'all 0.5s ease',
    '&:hover': {
      transition: 'all 0.5s ease',
      backgroundColor: '#00A99D',
      color: 'white',
      borderRadius: 2,
      border: '1px solid #00a99d'
    }
  },
  deleteButton: {
    cursor: 'pointer',
    p: 1,
    border: '1px solid #E10D00',
    color: '#E10D00',
    BorderRadius: 1,
    transition: 'all 0.5s ease',
    '&:hover': {
      transition: 'all 0.5s ease',
      backgroundColor: '#E10D00',
      color: 'white',
      borderRadius: 2,
      border: '1px solid '
    }
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  }
}
