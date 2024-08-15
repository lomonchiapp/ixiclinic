import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import { ServiceDetail } from "./ServiceDetail";

export const EditServiceDrawer = ({open, setOpen, selectedService}) => {


 // const toggleDrawer = (newOpen) => () => {
 //   setOpen(newOpen);
 // };

  return (
    <div>
      <Drawer
      anchor='right'
      open={open} onClose={setOpen}>
        <ServiceDetail service={selectedService} setOpen={setOpen} />
      </Drawer>
    </div>
  );
}

