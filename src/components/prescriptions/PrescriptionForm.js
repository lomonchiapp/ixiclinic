// ** MUI Imports
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { newPrescription } from 'src/hooks/prescriptions/newPrescription'
import { Tab, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import Select from '@mui/material/Select'
import { PrescPDF } from 'src/components/prescriptions/PrescPDF'
// ** Icons Imports
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { InputLabel, MenuItem, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Autocomplete } from '@mui/material'
// Hooks
import { getPatients } from 'src/hooks/patients/getPatients'
import { getMedicines } from 'src/hooks/medicines/getMedicines'
import { getUnits } from 'src/hooks/getUnits'

//Day Library
import dayjs from 'dayjs'
//Components
import { PatientsSelect } from 'src/components/inputs/PatientsSelect'
import { PatientFormDialog } from 'src/components/patients/PatientDialog'
import { MedicineDialog } from 'src/components/medicines/MedicineDialog'
//Icons
import Close from 'mdi-material-ui/Close'
//Inputs
import { Date } from 'src/components/inputs/Date'
//Global States
import { usePrescState } from 'src/contexts/prescState'
//PDF
import dynamic from "next/dynamic";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export const PrescriptionForm = ({ open, setOpen, patients, date, setDate }) => {
  // Global states
  const {
    patient,
    setPatient,
    onWeeks,
    medicines,
    setMedicines,
    durations,
    setDurations,
    dosages,
    description,
    setDosages,
    frequencies,
    setDescription,
    setFrequencies,
    setOnWeeks
  } = usePrescState()
  // Local states
  // Medicine list state
  const [medList, setMedList] = useState({})
  // Input Local states
  const [inputMedicine, setInputMedicine] = useState('')
  const [inputDuration, setInputDuration] = useState('')
  const [inputDosage, setInputDosage] = useState('')
  const [onWeek, setOnWeek] = useState(false)
  const [inputFrequency, setInputFrequency] = useState('')
  const [inputAdvFrequency, setInputAdvFrequency] = useState('')
  const [inputDescription, setInputDescription] = useState('')

  //
  const [MedDialogOpen, setMedDialogOpen] = useState(false)
  const [freqAdvanced, setFreqAdvanced] = useState(false)

  const router = useRouter()

  //Funciones
  const openDialog = () => setMedDialogOpen(true)
  const handleFreqAdvanced = () => setFreqAdvanced(!freqAdvanced)

  const addToList = () => {
    // Ensure all variables are arrays
    const safeMedicines = Array.isArray(medicines) ? medicines : [];
    const safeDurations = Array.isArray(durations) ? durations : [];
    const safeDosages = Array.isArray(dosages) ? dosages : [];
    const safeFrequencies = Array.isArray(frequencies) ? frequencies : [];
    const safeOnWeeks = Array.isArray(onWeeks)? onWeeks : []

    // Check if the medicine already exists in the list
    const existingMedicineIndex = safeMedicines.findIndex(medicine =>
      medicine.name === inputMedicine.name && medicine.presentation === inputMedicine.presentation);

    if (existingMedicineIndex === -1) {
      // Medicine does not exist, add new entries
      setMedicines([...safeMedicines, { name: inputMedicine.name, presentation: inputMedicine.presentation }]);
      setDurations([...safeDurations, inputDuration]);
      setOnWeeks([...safeOnWeeks, onWeek]);
      setDosages([...safeDosages, inputDosage]);
      setFrequencies([...safeFrequencies, inputFrequency]);
    } else {
      // Medicine exists, update existing entries (optional)
      // This part can be customized based on how you want to handle duplicates
      safeDurations[existingMedicineIndex] = inputDuration;
      safeOnWeeks[existingMedicineIndex] = onWeek;
      safeDosages[existingMedicineIndex] = inputDosage;
      safeFrequencies[existingMedicineIndex] = inputFrequency;

      // Update the states with the modified arrays
      setDurations([...safeDurations]);
      setOnWeeks([...safeOnWeeks]);
      setDosages([...safeDosages]);
      setFrequencies([...safeFrequencies]);
    }

    // Reset the input fields
    console.log(safeDurations, safeDosages, safeFrequencies);
  };
  const handleFreqChange = event => {
    setInputFrequency(event.target.value)
  }
  useEffect(() => {
    if (!MedDialogOpen) {
      getMedicines()
        .then(response => {
          setMedList(response.data)
          // Set the selectedMedicine to the last element of the fetched medicines array
          if (response.data.length > 0) {
            setInputMedicine(response.data[response.data.length - 1])
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [MedDialogOpen])


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      // Add the new prescription
      const response = await newPrescription(prescription)
      // Update your state with the new list of prescriptions
      setPrescription(response.data)
      // Reset the prescription state to its initial value
      setPrescription({
        patient: '',
        doctor: '',
        date: dayjs().format('DD/MM/YYYY'),
        medicines: [],
        suministrations: [],
        administrations: [],
        dosages: [],
        frequencies: [],
        durations: []
      })
      router.reload()
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  const deleteRow = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index))
    setDurations(durations.filter((_, i) => i !== index))
    setDosages(dosages.filter((_, i) => i !== index))
    setFrequencies(frequencies.filter((_, i) => i !== index))
  }


  return (

      <form onSubmit={handleSubmit}>

          <Grid spacing={2}>
            <Grid sx={{ display: 'flex', marginBottom: 5 }}>
              <Grid container>
                <PatientsSelect patients={patients} patient={patient} setPatient={setPatient} isDialogOpen={open} />
                <Button
                  startIcon={<AddCircleIcon fontSize='' />}
                  sx={{ width: 40 }}
                  variant='outlined'
                  size='large'
                  onClick={setOpen}
                ></Button>
              </Grid>

              <PatientFormDialog open={open} setOpen={setOpen} />
              <Date date={date} setDate={setDate}/>
            </Grid>
            <Grid sx={styles.tableForm}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Medicamento
                      <AddCircleIcon sx={{ cursor: 'pointer' }} onClick={() => openDialog()} />
                      <MedicineDialog
                        open={MedDialogOpen}
                        setOpen={setMedDialogOpen}
                        medicine={medicines}
                        setMedicine={setMedicines}
                      />
                    </TableCell>
                    <TableCell width={'15%'}>Duración</TableCell>
                    <TableCell width={'20%'}>Dosis</TableCell>
                    <TableCell>Frecuencia</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Autocomplete
                        disablePortal
                        id='medicine'
                        size='small'
                        onChange={(event, newValue) => {
                          setInputMedicine(newValue)
                        }}
                        value={inputMedicine}
                        options={medList}
                        getOptionLabel={option => option.name + ' ' + option.presentation} // Use the name property for the option label
                        sx={{ width: 300, border: 'none' }}
                        renderInput={params => <TextField {...params} label='Medicamento...' />}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        id='inputDuration'
                        name='inputDuration'
                        value={inputDuration}
                        onChange={(e) => setInputDuration(e.target.value)}
                        type='number'
                        variant='standard'
                        size='small'
                        sx={{ width: '30%' }}
                      />{' '}
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          backgroundColor: '#EDEDED',
                          fontSize: 10,
                          padding: 1,
                          display: 'inline',
                          marginLeft: 1
                        }}
                        onClick={() => setOnWeek(!onWeek)}
                        color='text.secondary'
                      >
                        {onWeek ? 'sem' : 'dias'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        sx={styles.dosageField}
                        id='dosage'
                        name='dosage'
                        value={inputDosage}
                        onChange={(e) => setInputDosage(e.target.value)}
                        type='text'
                        variant='standard'
                        size='small'
                      />
                      <Typography
                        sx={{
                          backgroundColor: '#EDEDED',

                          fontSize: 10,
                          padding: 1,

                          display: 'inline',
                          marginLeft: 1
                        }}
                        color='text.secondary'
                      >
                        {getUnits(inputMedicine.presentation)}
                      </Typography>

                    </TableCell>
                    <TableCell>
                      {!freqAdvanced ? (
                        <Select
                         value={inputFrequency}
                         onChange={handleFreqChange} id='frequency' name='frequency' size='small'>
                          <MenuItem selected value={2}>
                            Cada 2 Dias
                          </MenuItem>
                          <MenuItem value={"Diario"}>Diario</MenuItem>
                          <MenuItem value={"cada 6 Horas"}>cada 6 Horas</MenuItem>
                          <MenuItem value={"Cada 8 Horas"}>Cada 8 Horas</MenuItem>
                          <MenuItem value={"Cada 12 Horas"}>Cada 12 Horas</MenuItem>
                          <MenuItem onClick={() => handleFreqAdvanced()} sx={{ backgroundColor: '#EDEDED' }} value={6}>
                            Freq. Avanzada
                          </MenuItem>
                        </Select>
                      ) : (
                        <Grid>
                          <TextField
                            placeholder='Solo los Lunes'
                            id='frequency'
                            value={inputAdvFrequency}
                            onChange={(e) => setInputAdvFrequency(e.target.value)}
                            name='frequency'
                            type='text'
                            variant='standard'
                            size='small'
                          />
                          <Close onClick={() => handleFreqAdvanced()} sx={{ backgroundColor: '#EDEDED', width: 20 }} />
                        </Grid>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid sx={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
              <Button
                startIcon={<AddCircleIcon fontSize='' />}
                sx={{ width: '100%' }}
                variant='outlined'
                size='small'
                onClick={() => addToList()}
              >
                AGREGAR MEDICAMENTO A LA RECETA
              </Button>
            </Grid>
            <Grid sx={{ width: '100%' }}>
              {medicines && medicines.length >= 1 ? (
                <Table sx={styles.prescTable}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Medicamento</TableCell>
                      <TableCell>Duración</TableCell>
                      <TableCell>Dosificación</TableCell>
                      <TableCell>Frecuencia</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicines.map((medicine, index) => (
                      <TableRow key={index}>
                        <TableCell>{medicine.name}</TableCell>
                        <TableCell>{durations[index]} dias</TableCell>
                        <TableCell>{dosages[index]}{getUnits(medicine.presentation)}</TableCell>
                        <TableCell>{frequencies[index]}</TableCell>
                        <TableCell>
                          <CancelPresentationIcon onClick={() => deleteRow(index)} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Grid sx={styles.emptyPresc}>
                  <Typography sx={styles.textEmptyPresc} color='secondary'>
                    No hay medicamentos en la receta
                  </Typography>
                </Grid>
              )}
            </Grid>
            <Grid item container>
              <TextField
                size='small'
                value={description}
                type='number'
                multiline
                rows={4}
                id='description'
                name='description'
                onChange={(e) => setDescription(e.target.value)}
                sx={{ width: '100%', marginTop:5 }}
                label='Descripcion de la receta'
                placeholder='Escriba detalladamente la receta medica, su uso, dosis, etc.'
              />
            </Grid>
            <Grid
        spacing={2}
        container
        sx={{
          display: 'flex',
          padding: 5,
          zIndex: 1000,
          border: 'solid 1px #e0e0e0',
          backgroundColor: 'white',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)'
        }}
      >
        <Button sx={{ marginRight: 2 }} type='button' variant='contained' size='large' startIcon={<AddCircleIcon />}>
          Guardar
        </Button>
        <PDFDownloadLink document={<PrescPDF date={date} patients={patients} />} fileName='receta.pdf'>
          <Button sx={{marginRight: 2}} startIcon={<PictureAsPdfIcon/>} size='large' variant='contained'>
            Descargar
          </Button>
        </PDFDownloadLink>
        <Button  startIcon={<Close/>} size='large' color='secondary' variant='outlined'>
            Cancelar
          </Button>

      </Grid>
          </Grid>
      </form>
  )
}

const styles = {
  emptyPresc: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
    marginTop: 2,
    backgroundColor: '#EDEDED'
  },
  textEmptyPresc: {
    fontSize: 15,
    textAlign: 'center'
  },
  dosageField: {
    width: '30%',
    textAlign: 'center'
  },
  prescTable: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginY: 2,
    backgroundColor: '#EDEDED'
  },
  tableForm: {
    border: 'solid 1px #00A99E44',
    marginY: 2,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    width: '100%'
  }
}
