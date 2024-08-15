// ** React Imports
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

// ** MUI Imports
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'

// ** MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'

// ** Table Columns
const columns = [
  {id: 'id', label: 'ID',minWidth:30},
  { id: 'patient', label: 'Paciente', minWidth: 170 },
  { id: 'date', label: 'Fecha', minWidth: 170 },
  { id: 'price', label: 'Monto Generado', minWidth: 170, align: 'right'},
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right'}
]
function createData(id, patient, date, amount, actions) {
  return {id, patient, date, amount, actions }
}

export const RecordsList = () => {
  // ** States

  const [loading, setLoading] = useState(true)
  const [records, setRecords] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [rows, setRows] = useState([])

  // ** Handlers
  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // ** UseEffect
  useEffect(() => {
    const fetchRecords = async () => {
      const querySnapshot = await getDocs(collection(database, 'records'))
      const records = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      })
      setRecords(records)
    }
    fetchRecords()
  }, [])

  useEffect(() => {
    const formattedRecords = records.map(record => {
      const fullName = `${record.patient.firstName} ${record.patient.lastName}`
      return createData(fullName, record.date, record.price, (
        <div>
          <EditIcon
            color='#535353'
            sx={{ cursor: 'pointer', marginRight: '0.5rem' }}
            onClick={() => router.push(`/records/${record.id}`)}
          />
          <DeleteIcon
            color='#535353'
            sx={{ cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#f44336'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#535353'}
            onClick={() => handleClickDelete(record.id)}
          />
        </div>
      ))
    })
    setRows(formattedRecords)
  }, [records])

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
