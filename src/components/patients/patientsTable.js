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
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

// ** Firestore Imports
import { getPatients } from 'src/hooks/patients/getPatients'
import { deletePatient } from 'src/hooks/patients/deletePatient'

// ** Global State
import { useSearchStore } from 'src/hooks/globalStates/useSearchStore'
import { usePatientStore } from 'src/hooks/globalStates/usePatientStore'

// ** toastify
import { toast } from 'react-toastify'

const columns = [
  { id: 'name', label: 'Nombre del Paciente', minWidth: 170 },
  { id: 'phone', label: 'No. de Contacto', minWidth: 170, align: 'right' },
  { id: 'email', label: 'E-mail', minWidth: 170, align: 'right' },
  { id: 'nextDate', label: 'Próxima Cita', minWidth: 170, align: 'right' },
  { id: 'nextDue', label: 'Próxima Factura', minWidth: 170, align: 'right' }
]

export const PatientsTable = () => {
  // ** States
  const [patients, setPatients] = useState([])
  const { selectedPatient, setSelectedPatient } = usePatientStore()
  const [page, setPage] = useState(0)
  const { searchText } = useSearchStore()
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchText.toLowerCase())
  )

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
      const patientsData = await getPatients()
      setPatients(patientsData)
    }

    fetchPatients()
  }, [])

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
            {filteredPatients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(patient => (
              <TableRow
                hover
                onClick={() => setSelectedPatient(patient)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                key={patient.id}
                tabIndex={-1}
              >
                <TableCell component='th' scope='row'>
                  {patient.firstName} {patient.lastName}
                </TableCell>
                <TableCell align='right'>{patient.phone}</TableCell>
                <TableCell align='right'>{patient.email}</TableCell>
                <TableCell align='right'>{patient.nextDate}</TableCell>
                <TableCell align='right'>{patient.nextDue}</TableCell>
                <TableCell align='right'>
                  <IconButton onClick={() => deletePatient(patient.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
