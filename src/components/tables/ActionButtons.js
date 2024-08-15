import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

export const ActionButtons = ({ id }) => {

  return (
    <ButtonGroup variant="text" aria-label="text button group">
      <Button component={Link} to={`/services/${id}`}>Ver</Button>
      <Button component={Link} to={`/services/${id}/edit`}>Editar</Button>
      <Button component={Link} to={`/services/${id}/delete`}>Eliminar</Button>
    </ButtonGroup>
  );
}
