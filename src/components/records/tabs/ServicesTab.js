// ** React Imports
import React, { useState, useEffect } from 'react'
// ** MUI Imports
import { FormControl, Grid, TextField, Box, InputLabel, Typography, Checkbox } from '@mui/material'
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
import { Font } from '@react-pdf/renderer'

export function ServicesTab({ services, setServices, newService, setNewService }) {
  const { servList, setServList, servTotal, setServTotal, servVariations, setServVariations } = useRecordState()
  const [variations, setVariations] = useState([])
  const [variationFields, setVariationFields] = useState({})
  const [checkboxStates, setCheckboxStates] = useState({})
  const [hidden, setHidden] = useState(false)
  // Function to update the state of a specific field

  const getVariations = async () => {
    const variationsCollection = collection(database, 'service_variations');
    const variationsSnapshot = await getDocs(variationsCollection);
    const variationsList = variationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setVariations(variationsList);
  };

  useEffect(() => {
    getVariations();
  }, []);

  useEffect(() => {
    // Synchronize checkbox states with servVariations
    const newCheckboxStates = variations.reduce((acc, variation) => {
      acc[variation.id] = servVariations.some(vari => vari.id === variation.id);
      return acc;
    }, {});
    setCheckboxStates(newCheckboxStates);
  }, [servVariations, variations]);

  const handleCheckboxChange = (e, variation) => {
    const isChecked = e.target.checked;

    if (Array.isArray(servVariations)) {
      if (isChecked) {
        setServVariations(prevList => {
          const isVariationInList = prevList.some(vari => vari.id === variation.id);
          if (!isVariationInList) {
            return [...prevList, variation];
          }
          return prevList;
        });
        setServTotal(prevTotal => prevTotal + variation.price);
      } else {
        setServVariations(prevList => prevList.filter(vari => vari.id !== variation.id));
        setServTotal(prevTotal => prevTotal - variation.price);
      }
    } else {
      console.error('servVariations is not an array:', servVariations);
    }

    setCheckboxStates(prevStates => ({
      ...prevStates,
      [variation.id]: isChecked
    }));
  };
  return (
    <Grid sx={styles.tabContainer} container>
      <Grid item sx={styles.selectContainer} container>
        <ServiceBox setServices={setServices} services={services} />
        <AddServiceDrawer open={newService} setOpen={setNewService} />
        <AddCircleIcon color='primary' sx={{ cursor: 'pointer' }} onClick={() => setNewService(true)} />
      </Grid>

      <Grid container xs={12} sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
          <Box sx={styles.listContainer}>
            <ServList />
            <Box sx={styles.totalContainer}>
              <Typography sx={styles.totalLabel}>Total:</Typography>
              <Typography sx={styles.total}>
                ${typeof servTotal === 'number' ? servTotal.toFixed(2) : '0.00'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid xs={7} sx={styles.attrContainer}>
          {servList.map((serv, servIndex) => (
            <Grid key={serv.id} sx={styles.attributes}>
              <Grid sx={styles.variationHeader}>
                <InputLabel sx={styles.attributeLabel}>Variaciones de {serv.name}</InputLabel>
              </Grid>
              {variations
                .filter(variation => variation.service.id === serv.id)
                .map((variation, index) => (
                  <Grid container key={variation.id}>
                    <FormControl sx={{ display: 'flex', flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
                      <Checkbox
                        checked={checkboxStates[variation.id] || false}
                        onChange={e => handleCheckboxChange(e, variation)}
                      />
                      <TextField
                        fullWidth
                        label={variation.name}
                        size='small'
                        variant='outlined'
                        type='text'
                        sx={{ marginRight: 3 }}
                      />
                      <Typography sx={{ color: 'grey', fontVariant: 'italic', fontSize: '8' }}>
                        (+${variation.price})
                      </Typography>
                    </FormControl>
                  </Grid>
                ))}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
const styles = {
  tabContainer: {
    paddingTop: 10
  },
  totalLabel: {
    fontSize: 14,
    marginRight: 3
  },
  total: {
    fontSize: 14,
    FontWeight: 'bold',
    color: '#00A99D'
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 10,
    padding: 5,
    border: '1px solid #00A99D'
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
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
    padding: 5,
    maxHeight: 250,
    minHeight: 270,
    overflow: 'auto',
    maxWidth: 250,
    minWidth: '25%',
    // Custom scrollbar styles
    '&::-webkit-scrollbar': {
      width: '4px' // Customize scrollbar width
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1', // Customize scrollbar track color
      borderRadius: '10px' // Round the corners of the scrollbar track
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888', // Customize scrollbar thumb color
      borderRadius: '10px' // Round the corners of the scrollbar thumb
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555' // Change thumb color on hover
    },
    // For Firefox
    scrollbarWidth: 'thin', // Make the scrollbar thin
    scrollbarColor: '#888 #FFFFFF' // Set thumb and track color
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
    justifyContent: 'start'
  }
}
