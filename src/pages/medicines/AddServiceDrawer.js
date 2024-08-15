import * as React from 'react';

import Drawer from '@mui/material/Drawer';

import {ServiceForm} from "./ServiceForm";

export const AddServiceDrawer = ({open, setOpen}) => {


 // const toggleDrawer = (newOpen) => () => {
 //   setOpen(newOpen);
 // };

  return (
    <div>
      <Drawer
      anchor='right'
      open={open} onClose={setOpen}>
        <ServiceForm open={open} setOpen={setOpen} />
      </Drawer>
    </div>
  );
}

