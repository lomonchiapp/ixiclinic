import React, { useState, useEffect } from 'react'
// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Global State
import { useSearchStore } from 'src/hooks/globalStates/useSearchStore'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'

const AppBarContent = props => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props
  // ** States
  const [searchFocused, setSearchFocused] = useState(false)
  const { searchText, setSearchText } = useSearchStore()

  // ** Hook
  const hiddenSm = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <TextField
          size='large'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onBlur={() => setSearchFocused(false)}
          onFocus={() => setSearchFocused(true)}
          sx={searchFocused ? styles.focusedInput : styles.input}
          InputProps={{
            startAdornment: (
              <InputAdornment onClick={() => setSearchFocused(true)} position='start'>
                <Magnify fontSize='medium' />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  )
}

  const styles = {
    input: {
      width: 50,
      maxHeight: 70,
      transition: 'width 0.3s ease',
    },
    focusedInput: {
      width: 200,
      maxHeight: 70,
      backgroundColor: 'white',
      transition: 'width 0.3s ease',
    },
  };


export default AppBarContent
