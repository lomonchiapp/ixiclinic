import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import {ServiceForm} from "./ServiceForm";

export const Success = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="Service added successfully"
      />
  )}
