// ** React Imports
import React, { useState, useEffect } from 'react'
// ** MUI Imports
import { FormControl, Grid, TextField, InputLabel, Typography } from '@mui/material'
import { ServiceBox } from '../../inputs/ServiceBox'
import AddCircleIcon from '@mui/icons-material/AddCircle'
// ** Custom Components
import { AddServiceDrawer } from '../../services/AddServiceDrawer'
import { ServList } from '../ServList'
// ** Firestore Imports
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'
//** Global state */
import { useRecordState } from 'src/contexts/recordState'
import CheckBox from '@mui/icons-material/CheckBox'

export function ServicesTab({ services, setServices, newService, setNewService }) {
  const { servList, setServList } = useRecordState()
  const [variations, setVariations] = useState([])
  const [variationFields, setVariationFields] = useState({})
  const [hidden, setHidden] = useState(false)
  // Function to update the state of a specific field

  const getVariations = async () => {
    const variationsCollection = collection(database, 'service_variations')
    const variationsSnapshot = await getDocs(variationsCollection)
    const variationsList = variationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setVariations(variationsList)
  }

  useEffect(() => {
    getVariations()
  }, [])

  return (
    <Grid sx={styles.tabContainer} container>
      <Grid item sx={styles.selectContainer} container>
        <ServiceBox setServices={setServices} services={services} />
        <AddServiceDrawer open={newService} setOpen={setNewService} />
        <AddCircleIcon color='primary' sx={{ cursor: 'pointer' }} onClick={() => setNewService(true)} />
      </Grid>

      <Grid
        container
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          minWidth: '100%',
          maxWidth: '100%'
        }}
      >
      <Grid xs={4}>
        <ServList />
      </Grid>
        <Grid xs={8} sx={styles.attrContainer}>
          {servList.map((serv, servIndex) => {
            return (
              <Grid sx={styles.attributes}>
                <Grid sx={styles.variationHeader}>
                  <InputLabel sx={styles.attributeLabel}>
                    Variaciones de {serv.name}
                  </InputLabel>
                </Grid>
                {variations
                  .filter(variation => variation.service.id === serv.id)
                  .map((variation, index) => (
                    <Grid container key={index}>
                      <FormControl
                        sx={{ display: 'flex', flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}
                      >
                        <TextField
                          fullWidth
                          label={variation.name}
                          size='small'
                          variant='outlined'
                          type='text'
                          sx={{ marginRight: 3 }}
                        />{' '}
                        <Typography sx={{ color: 'grey', fontVariant: 'italic', fontSize: '8' }}>
                          (+${variation.price})
                        </Typography>
                      </FormControl>
                    </Grid>
                  ))}
              </Grid>
            )
          })}
        </Grid>
        {servList.variations}
      </Grid>
    </Grid>
  )
}
const styles = {
  tabContainer: {
    paddingTop: 10
  },
  selectContainer: {
    alignItems: 'center'
  },
  attributes: {
    marginRight: 3,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 5,
    border: '1px solid #f0f0f0',
    borderRadius: 5,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    padding: 5,
    maxHeight: 280,
    minHeight: 280,
    overflow: 'auto',
    maxWidth: '25%',
    minWidth: '25%',
  },
  variationHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #f0f0f0',
    marginBottom: 5
  },
  attributeLabel: {
    fontSize: 14,
    marginBottom: 3
  },
  attrContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'start',
  }
}
