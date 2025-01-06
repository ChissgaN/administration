import { useEffect, useState } from "react";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";



const schema = yup.object().shape({
  role_id: yup.string().required("El rol es requerido."),
  email: yup.string().email().required("Debes ingresar un correo válido."),
  password: yup.string().min(6).required("La contraseña es requerida."),
  phone_number: yup.string().required("El número de teléfono es requerido."),
  birth_date: yup.string().transform((value, originalValue) => {
    return originalValue ? new Date(originalValue).toISOString().split('T')[0] : value;
  }).required("La fecha de nacimiento es requerida."),
});

export default function CreateUser({ open, onClose, onCreate }) {

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role_id: "",
      email: "",
      password: "",
      phone_number: "",
      birth_date: "",
    }
  });

  const onSubmit = (data) => {
    onCreate(data);
    onClose();
    reset();
  };

  const role_id = watch("role_id");

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-[#ed217c] font-bold">Crear Usuario</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <DialogContent sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
        }}>

          <Controller
            name="role_id"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label="Rol"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {roles.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}

              </TextField>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Correo Electrónico"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />


          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="phone_number"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="phone_number"
                type="tel"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />



          <Controller
            name="birth_date"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={role_id !== 2 && { gridColumn: 'span 2' }}
              />
            )}
          />

          <Controller
            name="social_reason"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Razón Social"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ display: role_id !== 2 ? "none" : "block"}}
              />
            )}
          />

          <Controller
            // ocupa dos columnas
            name="comertial_name"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Nombre Comercial"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ display: role_id !== 2 ? "none" : "block", gridColumn: 'span 2' }}
              />
            )}
          />

          <Controller
            name="delivery_address"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Dirección de Entrega"
                fullWidth
                margin="normal"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ display: role_id !== 2 ? "none" : "block", gridColumn: 'span 2' }}
              />
            )}
          />

        </DialogContent>

        <DialogActions className="my-4 ">
          <Button onClick={onClose} color="error" variant="contained" >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Crear Producto
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

const roles = [
  {
    id: 1,
    name: "Operador"
  },
  {
    id: 2,
    name: "Cliente"
  }
]