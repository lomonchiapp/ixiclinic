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
import Box from '@mui/material/Box'
// ** Icon Imports
import DeleteIcon from '@mui/icons-material/Delete'
import Edit from '@mui/icons-material/Edit'
// ** Firestore Import
import { database } from 'src/firebase'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'
// ** Global State
import { sServiceState } from 'src/contexts/sServiceState'

// ** Custom Components
import { EditServiceDrawer } from './EditServiceDrawer'

const columns = [
  { id: 'name', label: 'Nombre del Servicio', minWidth: 170 },
  { id: 'category', label: 'Categoría', minWidth: 170, align: 'right' },
  { id: 'price', label: 'Precio', minWidth: 170, align: 'right' },
  { id: 'variations', label: 'Variaciones', minWidth: 170, align: 'right' },
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right' }
]
function createData(name, category, price, actions) {
  return { name, category, price, actions }
}

export function ServicesList({ drawerIsOpen }) {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedService, setSelectedService] = useState(null)
  const [openEditDrawer, setOpenEditDrawer] = useState(false)
  const [rows, setRows] = useState([])
  const router = useRouter()

  // ** Global State
  const { setService } = sServiceState()

  // ** Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleServiceSelect = service => {
    setService(service)
    console.log(service)
    setOpenEditDrawer(true)
  }

  const handleServiceDelete = async id => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      try {
        await deleteDoc(doc(database, 'services', id))
        const newServices = services.filter(service => service.id !== id)
        setServices(newServices)
      } catch (error) {
        console.error(error)
      }
    }
  }

  // ** Use Effects

  useEffect(() => {
    if (!drawerIsOpen) {
      const fetchServices = async () => {
        const querySnapshot = await getDocs(collection(database, 'services'))
        const services = querySnapshot.docs.map(doc => {
          return { id: doc.id, ...doc.data() }
        })
        setServices(services)
      }
      fetchServices()
    }
  }, [drawerIsOpen])

  useEffect(() => {
    const formattedServices = services.map(service => {
      return createData(
        service.name,
        service.category.name,
        service.price,
        <Box>
          <Edit onClick={() => handleServiceSelect(service)} sx={{ cursor: 'pointer', color: 'secondary', marginRight: 1 }} />
          <DeleteIcon onClick={() => handleServiceDelete(service.id)} sx={{ cursor: 'pointer', color: 'secondary' }} />
        </Box>
      )
    })
    setRows(formattedServices)
  }, [services])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <EditServiceDrawer open={openEditDrawer} setOpen={setOpenEditDrawer} />
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {columns.map(column => {
                    const value = row[column.id]

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
