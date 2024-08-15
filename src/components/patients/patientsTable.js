// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'

const columns = [
  { id: 'name', label: 'Nombre del Paciente', minWidth: 170 },
  { id: 'phone', label: 'No. de Contacto', minWidth: 170, align: 'right' },
  { id: 'email', label: 'E-mail', minWidth: 170, align: 'right' },
  { id: 'nextDate', label: 'Próxima Cita', minWidth: 170, align: 'right' },
  { id: 'nextDue', label: 'Próxima Factura', minWidth: 170, align: 'right' }
]
function createData(name, phone, email, nextDate, nextDue) {
  return { name, phone, email, nextDate, nextDue }
}

export const PatientsList = () => {
  // ** States
  const [patients, setPatients] = useState([])
  const [rows, setRows] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // ** Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // ** UseEffect
  useEffect(() => {
    const fetchPatients = async () => {
      const querySnapshot = await getDocs(collection(database, 'patients'))
      const patients = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setPatients(patients)
    }
    fetchPatients()
  }, [])
  useEffect(() => {
    const formattedPatients = patients.map(patient => {
      const fullName = `${patient.firstName} ${patient.lastName}`
      return createData(fullName, patient.phone, patient.email, patient.nextDate, patient.nextDue)
    })
    setRows(formattedPatients)
  }, [patients])

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
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
