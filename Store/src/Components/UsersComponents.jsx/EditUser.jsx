import { useEffect, useState } from "react";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getUser } from "../../libs/axios/users"


const schema = yup.object().shape({
  role_id: yup.string().required("El rol es requerido."),
  email: yup.string().email().required("Debes ingresar un correo válido."),
  phone_number: yup.string().required("El número de teléfono es requerido."),
  birth_date: yup.string().transform((value, originalValue) => {
    return originalValue ? new Date(originalValue).toISOString().split('T')[0] : value;
  }).required("La fecha de nacimiento es requerida."),
  social_reason: yup.string().required("La razón social es requerida."),
  comertial_name: yup.string().required("El nombre comercial es requerido."),
  delivery_address: yup.string().required("La dirección de entrega es requerida."),
});


export default function EditUser({ open, onClose, onUpdate, user_id }) {

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role_id: "",
      email: "",      phone_number: "",
      birth_date: "",
      social_reason: "",
      comertial_name: "",
      delivery_address: "",
    }
  });

  const onSubmit = (data) => {
    onUpdate(data);
    onClose();
    reset();
  };

  const role_id = watch("role_id");

  useEffect(() => {
    if (user_id) {
      getUser(user_id)
        .then(({ data }) => {
          const currentData = {
            role_id: data.role_id,
            email: data.email,
            phone_number: data.phone_number,
            birth_date: data.birth_date,
            social_reason: data?.client?.social_reason,
            comertial_name: data?.client?.comertial_name,
            delivery_address: data?.client?.delivery_address
          }
          reset(currentData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user_id]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-[#ed217c] font-bold"> Actualizar Usuario </DialogTitle>
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
              />
            )}
          />
          {role_id === 2 &&
            <>

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
                    sx={{ gridColumn: 'span 2' }}
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
                    sx={{ gridColumn: 'span 2' }}
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
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
                    sx={{ gridColumn: 'span 2' }}
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

            </>
          }

        </DialogContent>

        <DialogActions className="m-4 ">
          <Button onClick={onClose} color="error" variant="contained" >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Actualizar 
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