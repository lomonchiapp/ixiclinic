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

// Global States
import { useSearchStore } from 'src/hooks/globalStates/useSearchStore';
import { useGlobalStore } from 'src/contexts/useGlobalStore';
import { useSelectedRecord } from 'src/contexts/useSelectedRecord';

// ** Table Columns
const columns = [
  {id: 'id', label: 'ID', minWidth:30},
  { id: 'patient', label: 'Paciente', minWidth: 170 },
  { id: 'date', label: 'Fecha', minWidth: 170 },
  { id: 'price', label: 'Monto Generado', minWidth: 170, align: 'right'},
  { id: 'services', label: 'Servicios Realizados', minWidth: 170, align: 'right'},
  { id: 'actions', label: 'Acciones', minWidth: 170, align: 'right'}
]

export const RecordsTable = () => {
  // ** Global States
  const { searchText } = useSearchStore()
  const { records, fetchRecords } = useGlobalStore()
  const { record, setRecord } = useSelectedRecord()
   // ** Local States
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // ** Modes
  const [viewMode, setViewMode] = useState(false)
  const [editMode, setEditMode] = useState(false)

  // ** Handlers
  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const viewRecord = (record) => {
    setRecord(record)
    setViewMode(true)
  }
  // Use Effect
  useEffect(() => {
    fetchRecords()
  }, [fetchRecords])

  // Filter Records

  const filteredRecords = records.filter(record => {
    const searchLower = searchText.toLowerCase()
    const patfirstNameMatch = record.patient?.firstName?.toLowerCase().includes(searchLower)
    const patlastNameMatch = record.patient?.lastName?.toLowerCase().includes(searchLower)
    return patfirstNameMatch || patlastNameMatch
  })

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
          {filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(patient => (
              <TableRow hover onClick={() => setPatient(patient)} sx={styles.row} key={patient.id} tabIndex={-1}>
                <TableCell component='th' scope='row'>
                  {record.id}
                </TableCell>
                <TableCell align='right'>{record.patient.firstName} - {record.patient.lastName}</TableCell>
                <TableCell align='right'>{record.createdAt}</TableCell>
                <TableCell align='right'>{record.prodTotal + record.servTotal + record.variationsTotal}</TableCell>
                <TableCell align='right'>{patient.nextDue}</TableCell>
                <TableCell
                  align='right'
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Grid sx={styles.btnContainer}>
                    <Grid item>
                      <Edit onClick={() => editRecord(record)} sx={styles.actionButton} />
                      <EditDrawer open={editMode} setOpen={setEditMode}>
                        <RecordDetail setOpen={setEditMode} />
                      </EditDrawer>
                    </Grid>
                    <Grid item>
                      <Visibility onClick={() => viewRecord(record)} sx={styles.actionButton} />
                      <ViewDialog setOpen={setViewMode} open={viewMode}>
                        <ViewRecord record={record} setOpen={setViewMode} />
                      </ViewDialog>
                    </Grid>
                    <Grid>
                      <DeleteIcon sx={styles.deleteButton} onClick={() => handleDelete(record.id)} />
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
        count={records.length}
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
    gap: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f0f0f0'
    }
  }
}
