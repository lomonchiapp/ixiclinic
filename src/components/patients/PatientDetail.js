import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Switch,
  FormControlLabel
} from '@mui/material'
import { database } from 'src/firebase'
import { doc, updateDoc, getDoc, getDocs, collection } from 'firebase/firestore'
// ** Global State
import { useSelectedPatient } from 'src/contexts/useSelectedPatient'
import { useGlobalStore } from 'src/contexts/useGlobalStore'
import Close from 'mdi-material-ui/Close'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined'
import { getSkinTypes } from 'src/hooks/patients/getSkinTypes'

export const PatientDetail = ({ open, setOpen }) => {
  // ** Global State
  const { patient, setPatient } = useSelectedPatient()
  const { fetchPatients } = useGlobalStore()
  const [skinTypes, setSkinTypes] = useState([])
  const [editableFields, setEditableFields] = useState({
    firstName: patient?.firstName || '',
    lastName: patient?.lastName || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    allergy: patient?.allergy || false,
    pastProcedures: patient?.pastProcedures || '',
    skinType: patient?.skinType || '',
    rncCedula: patient?.rncCedula || '',
    usedProducts: patient?.usedProducts || '',
    notes: patient?.notes || '',
    address: patient?.address || '',
    dateOfBirth: patient?.dateOfBirth || null
  })
  const [toggle, setToggle] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    allergy: false,
    pastProcedures: false,
    skinType: false,
    rncCedula: false,
    usedProducts: false,
    notes: false,
    address: false,
    dateOfBirth: false
  })

  const fetchSkinTypes = async () => {
    const skins = await getSkinTypes()
    setSkinTypes(skins)
  }

  useEffect(() => {
    fetchSkinTypes()
  }, [])

  const handleFieldChange = (field, value) => {
    setEditableFields(prevState => ({ ...prevState, [field]: value }))
  }

  const handleToggle = field => {
    setToggle(prevState => ({ ...prevState, [field]: !prevState[field] }))
  }

  const handleBlur = async (field, newValue) => {
    handleToggle(field)
    if (patient[field] !== newValue) {
      try {
        await updateDoc(doc(database, 'patients', patient.id), { [field]: newValue })
        setPatient(prevPatient => ({ ...prevPatient, [field]: newValue }))
        fetchPatients()
      } catch (error) {
        console.error('Error updating document: ', error)
      }
    }
  }

  const handleSave = async () => {
    setToggle({
      firstName: false,
      lastName: false,
      email: false,
      phone: false,
      isAllergic: false,
      allergy: false,
      pastProcedures: false,
      skinType: false,
      rncCedula: false,
      usedProducts: false,
      notes: false,
      address: false,
      dateOfBirth: false
    })
    setOpen(false)

  }

  const handleClose = () => {
    setOpen(false)
  }

  const fieldLabels = {
    firstName: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    phone: 'No. de Contacto',
    allergy: 'Alergias',
    isAllergic: 'Alergico',
    pastProcedures: 'Procedimientos pasados',
    skinType: 'Tipo de Piel',
    rncCedula: 'RNC/Cedula',
    usedProducts: 'Productos usados anteriormente',
    notes: 'Notas',
    address: 'Direccion',
    dateOfBirth: 'Fecha de Nacimiento'
  }

  return (
    <Card sx={{ maxWidth: 400, minWidth: 400 }}>
      <CardHeader title='Patient Information' />
      <Close onClick={handleClose} sx={styles.closeIcon} />
      <Divider />
      <CardContent>
        <Grid sx={styles.formContainer} container spacing={2}>
          {Object.keys(editableFields).map(field => (
            <Grid key={field} sx={styles.div} item>
              <Typography sx={styles.label}>{fieldLabels[field]}</Typography>
              {toggle[field] ? (
                field === 'isAllergic' ? (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editableFields.allergy}
                        onChange={e => handleFieldChange('isAllergic', e.target.checked)}
                        onBlur={() => handleBlur('isAllergic', editableFields.allergy)}
                      />
                    }
                    label='Alergico?'
                  />
                ) : field === 'skinType' ? (
                  <Select
                    value={editableFields.skinType}
                    onChange={e => handleFieldChange('skinType', e.target.value)}
                    onBlur={() => handleBlur('skinType', editableFields.skinType)}
                  >
                    {skinTypes.map(skin => (
                      <MenuItem key={skin.id} value={skin.id}>
                        {skin.name}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <TextField
                    autoFocus
                    value={editableFields[field]}
                    onChange={e => handleFieldChange(field, e.target.value)}
                    onBlur={() => handleBlur(field, editableFields[field])}
                    size='small'
                    sx={styles.textField}
                    label={field.charAt(0).toUpperCase() + field.slice(1)} // Add label here
                  />
                )
              ) : (
                <Typography onClick={() => handleToggle(field)} sx={styles.value}>
                  {editableFields[field]}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
        <Button startIcon={<CheckOutlinedIcon />} sx={{ marginRight: 2 }} variant='contained' onClick={handleSave}>
          Salir
        </Button>
      </CardContent>
    </Card>
  )
}

const styles = {
  formContainer: {
    maxHeight: '60vh',
    overflow: 'auto'
  },
  label: {
    fontWeight: 600,
    fontSize: 14
  },
  div: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1
  },
  value: {
    border: '1px dashed #C9C9C9',
    fontSize: 12,
    paddingY: 2,
    paddingX: 1,
    minWidth: 200,
    '&:hover': {
      cursor: 'pointer',
      border: '1px dashed #00A99D'
    }
  },
  textField: {
    minWidth: 200,
    border: '1px dashed #C9C9C9',
    borderRadius: 2
  },
  closeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
    cursor: 'pointer'
  }
}
