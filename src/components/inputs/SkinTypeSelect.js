import * as React from 'react';
import { useState, useEffect } from 'react';

// ** MUI Components
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ** Firestore Import
import { database } from 'src/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function SkinTypeSelect({isDialogOpen}) {

  // ** Local State
  const [skinType, setSkinType] = useState('');
  const [skinTypes, setSkinTypes] = useState([]);

  // ** Handlers
  const handleChange = (event) => {
    setSkinType(event.target.value);
  };

  useEffect(() => {
    if (!isDialogOpen) {
      const fetchSkinTypes = async () => {
        const querySnapshot = await getDocs(collection(database, 'skin_types'));
        const skinTypes = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        setSkinTypes(skinTypes);
      };
      fetchSkinTypes();
    }
  }, [isDialogOpen]);



  return (
    <Box>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Tipo de piel</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          sx={{ minWidth: 250}}
          value={skinType}
          label="Tipo de Piel"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {skinTypes.map((skinType) => (
            <MenuItem key={skinType.id} value={skinType.id}>
              {skinType.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
