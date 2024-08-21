import React, { useState, useEffect } from 'react'
import { FormControl, Grid, TextField, Box, InputLabel, Typography, Checkbox } from '@mui/material'
import { RecordServSelect } from '../../inputs/RecordServSelect'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { AddServiceDrawer } from '../../services/AddServiceDrawer'
import { ServList } from '../ServList'
import { database } from 'src/firebase'
import { collection, getDocs } from 'firebase/firestore'
// Global State
import { useRecordState } from 'src/contexts/recordState'
import { useGlobalStore } from 'src/contexts/useGlobalStore'

export function ServicesTab({ newService, setNewService }) {
  const { servList, setServList, servTotal, variationsTotal , servVariations = [], setServVariations } = useRecordState()
  const { serviceVariations, setServiceVariations, fetchServVariations } = useGlobalStore()
  const [variationDetails, setVariationDetails] = useState({})
  const [checkboxStates, setCheckboxStates] = useState({})
  const [hidden, setHidden] = useState(true)
  // ** PUNTO DE PARTIDA **
  useEffect(() => {
    // Fetch variations when component mounts
    fetchServVariations()
      // Initialize checkbox states based on servVariations
      const initialCheckboxStates = {};
      serviceVariations.forEach(variation => {
        initialCheckboxStates[variation.id] = servVariations.some(v => v.id === variation.id);
      });
      setCheckboxStates(initialCheckboxStates);
  }, [fetchServVariations]);

  const handleCheckboxChange = (variation) => {
    const newCheckboxStates = {
      ...checkboxStates,
      [variation.id]: !checkboxStates[variation.id],
    };
    setCheckboxStates(newCheckboxStates);

    if (newCheckboxStates[variation.id]) {
      // Add variation to servVariations
      setServVariations([...servVariations, variation]);
      console.log('Adding variation', variation);
      console.log(servVariations);
    } else {
      // Remove variation from servVariations
      setServVariations(servVariations.filter(v => v.id !== variation.id));
    }
  };

  const handleDetailChange = (variation, detail) => {
    const newVariationDetails = {
      ...variationDetails,
      [variation.id]: detail,
    };
    setVariationDetails(newVariationDetails);
    // Update the detail in servVariations if the checkbox is checked
    if (checkboxStates[variation.id]) {
      const updatedVariations = servVariations.map(v => v.id === variation.id ? { ...v, detail } : v);
      setServVariations(updatedVariations);
    }
  }
  return (
    <Grid sx={styles.tabContainer} container>
      <Grid item sx={styles.selectContainer} container>
        <RecordServSelect />
        <AddServiceDrawer open={newService} setOpen={setNewService} />
        <AddCircleIcon color='primary' sx={{ cursor: 'pointer' }} onClick={() => setNewService(true)} />
      </Grid>

      <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Box sx={styles.listContainer}>
            <ServList variationDetails={variationDetails} />
            <Box sx={styles.totalContainer}>
              <Box sx={styles.subTotalContainer}>
              <Typography sx={styles.subTotalLabel}>Total en agregados:</Typography>
              <Typography sx={styles.total}>
                ${typeof variationsTotal === 'number' ? variationsTotal.toFixed(2) : '0.00'}
              </Typography>
              </Box>
              <Box sx={{display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                <Typography sx={styles.totalLabel}>Total:</Typography>
              <Typography sx={styles.total}>
                ${typeof servTotal === 'number' ? servTotal.toFixed(2) : '0.00'}
              </Typography>
              </Box>
              
            </Box>
          </Box>
        </Grid>
        <Grid item xs={7} sx={styles.attrContainer}>
  {servList.map((serv) => {
    const filteredVariations = serviceVariations.filter(variation => variation.service.id === serv.id);
    if (serviceVariations.length === 0) {
      return null;
    }
    return (
      <Grid key={serv.id} sx={styles.attributes}>
        <Grid sx={styles.variationHeader}>
          <InputLabel sx={styles.attributeLabel}>Variaciones de {serv.name}</InputLabel>
        </Grid>
        {filteredVariations.map((variation) => (
          
          <Grid sx={styles.variationBox} container key={variation.id}>
            <FormControl sx={styles.variation}>
              <Checkbox
                checked={checkboxStates[variation.id] || false}
                onChange={() => handleCheckboxChange(variation)}
              />
              <TextField
                fullWidth
                label={variation.name}
                value={variationDetails[variation.id] || ''}
                onChange={(e) => handleDetailChange(variation, e.target.value)}
                size='small'
                variant='outlined'
                type='text'
                sx={{ marginRight: 3 }}
                disabled={!checkboxStates[variation.id]}
              />
              <Box sx={styles.variationPriceBox}>
                <Typography sx={styles.variationPrice}>
                  +${variation.price}
                </Typography>
              </Box>
            </FormControl>
          </Grid>
        ))}
      </Grid>
    );
  })}
        </Grid>
      </Grid>
    </Grid>
  )
}

const styles = {
  tabContainer: {
    paddingTop: 5
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 2
  },
  subTotalLabel: {
    fontSize: 12,
    marginRight: 2
  },
  variationPrice: {
    fontSize:10,
  },
  variation:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    mb:2,
  },
  variationPriceBox:{
    border: '1px solid #00A99D',
    p:1,
    backgroundColor: '#D0F9F6',
    borderRadius:'5px',
  },
  variationBox:{
    diplay:'flex',
    flexDirection:'column'
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A99D'
  },
  subTotalContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 1
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 5,
    paddingRight: 5,
    paddingBottom:2.5,
    paddingTop:2.5,
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
