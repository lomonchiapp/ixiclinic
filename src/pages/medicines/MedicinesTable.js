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
import { getMedicines } from 'src/api/medicines.api'
import axios from 'axios'
import { ActionButtons } from 'src/components/tables/ActionButtons'
import { Button, ButtonGroup } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';
const columns = [
  {id: 'id', label: 'ID',minWidth:30},
  { id: 'name', label: 'Nombre del Medicamento', minWidth: 170 },
  { id: 'presentation', label: 'Presentación', minWidth: 170, align: 'right'},
  { id: 'administration', label: 'Via de Administración', minWidth: 170, align: 'right'},
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right'}
]
function createData(id, name, presentation, administration, actions) {

  return {id, name, presentation, administration, actions }
}


export function MedicinesList({isDialogOpen}) {
  const [loading, setLoading] = useState(true)
  const [medicines, setMedicines] = useState([])
  const [rows, setRows] = useState([])


  const router = useRouter();
  const handleClickDelete = async (id) => {
    if (window.confirm('Seguro de eliminar este medicamento?')) {
      const res = await fetch(`http://127.0.0.1:8000/medicines/api/medicines/${id}`,{method:'DELETE'})
      if (res.status === 204) {
        setRows(currentRows => currentRows.filter(row => row.id !== id));
      }
    }
  }

 async function loadMedicines() {
    const res = await getMedicines();

    const data = await Promise.all(res.data.map(async (medicine) => {
      return createData(medicine.id, medicine.name, medicine.presentation, medicine.administration, (
        <DeleteIcon
        color='#535353'
        sx={{ cursor: 'pointer' }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#f44336'}
        onMouseLeave={(e) => e.currentTarget.style.color = '#535353'}
        onClick={() => handleClickDelete(medicine.id)}
      />
      ));
    }));
    return data;
  }

  useEffect(() => {
    // Call loadServices within useEffect
    // Pass any dependencies as arguments if they are used inside loadServices
    loadMedicines().then(setRows).catch(console.error);
    setLoading(false)
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      getMedicines().then((response) => {
        setServiceCategories(response.data);
      }).catch((error) => {
        console.error('An error occurred:', error);
      });
    } else {
      //update state Rows
      loadMedicines().then(setRows).catch(console.error);
    }
  }, [isDialogOpen]);


  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ServicesTable rows={rows} loading={loading} setLoading={setLoading}/>
      )}
    </div>
  );
}
const ServicesTable = ({rows, setRows}) => {
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

