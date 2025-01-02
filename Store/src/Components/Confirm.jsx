import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const Confirm = ({ open, onClose, onConfirm, itemName, itemType, usuario }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="confirmation-dialog"
      className="backdrop-blur-sm"
    >
      <DialogTitle id="confirmation-dialog" className="text-[#19535f] font-bold text-lg">
        Confirmación de Eliminación
      </DialogTitle>
      <DialogContent className="text-center">
        <Typography>
          {itemType === "user" && usuario ? (
            <>
              ¿Seguro que quieres eliminar este usuario
              <span className="font-bold text-[#ff7f11]">{usuario.email}</span>?
            </>
          ) : (
            <>
              ¿Seguro que desea eliminar {itemType === "product" ? "el producto" : "la categoría"}{" "}
              <span className="font-bold text-[#ff7f11]">{itemName}</span>?
            </>
          )}
        </Typography>
      </DialogContent>
      <DialogActions className="flex justify-center my-4">
        <Button onClick={onClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
