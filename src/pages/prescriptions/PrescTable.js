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

// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs, deleteDoc } from 'firebase/firestore'

// ** MUI Icons
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const columns = [
  {id: 'id', label: 'ID',minWidth:30},
  { id: 'patient', label: 'Paciente', minWidth: 170 },
  { id: 'medicines', label: 'Medicamentos', minWidth: 170, align: 'right'},
  { id: 'date', label: 'Fecha', minWidth: 170, align: 'right'},
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right'}
]
function createData(id, patient, medicines, date, actions) {

  return {id, patient, medicines, date, actions }
}

export function PrescriptionsList({dialogIsOpen, setDialogIsOpen}) {
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [rows, setRows] = useState([])

  const router = useRouter();
  const handleClickDelete = async (id) => {
    if (window.confirm('Seguro de eliminar este servicio?')) {
      const res = await fetch(`http://127.0.0.1:8000/prescriptions/api/prescriptions/${id}`,{method:'DELETE'})
      if (res.status === 204) {
        setRows(currentRows => currentRows.filter(row => row.id !== id));
      }
    }
  }

 async function loadPrescriptions() {
    const res = await getPrescriptions();
    const data = await Promise.all(res.data.map(async (service) => {
      return createData(service.id, service.name, categoryName, service.price, (
        <DeleteIcon
        color='#535353'
        sx={{ cursor: 'pointer' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#f44336'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#535353'}
        onClick={() => handleClickDelete(service.id)}
      />
      ));
    }));
    return data;
  }

  useEffect(() => {
    // Call loadServices within useEffect
    // Pass any dependencies as arguments if they are used inside loadServices
    loadPrescriptions().then(setRows).catch(console.error);
    setLoading(false)
  }, []);





  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PrescTable rows={rows} loading={loading} setLoading={setLoading}/>
      )}
    </div>
  );
}
const PrescTable = ({rows, setRows}) => {
  // ** States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)


  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

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

