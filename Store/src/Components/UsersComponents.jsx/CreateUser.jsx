import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addYears } from "date-fns";

// Esquema de validación con Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ingresar un correo válido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
  phone_number: yup.string().required("El número de teléfono es obligatorio"),
  birth_date: yup
    .date()
    .nullable()
    .required("La fecha de nacimiento es obligatoria")
    .test(
      "is-over-18",
      "Debes ser mayor de 18 años",
      (value) => value && addYears(value, 18) <= new Date()
    ),
  role: yup
    .number()
    .required("Debes seleccionar un rol")
    .oneOf([1, 2], "Rol no válido"),
});

const CreateUser = ({ open, onClose, onSubmit }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crear Usuario</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          {/* Email y Contraseña */}
          <div className="flex justify-around gap-4">
            <TextField
              label="Correo Electrónico"
              fullWidth
              margin="dense"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="dense"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </div>

          <div className="flex justify-around gap-4 items-center">
          <TextField
              select
              label="Rol"
              className="w-[47%]"
              margin="dense"
              defaultValue=""
              {...register("role")}
              error={!!errors.role}
              helperText={errors.role?.message}
            >
              <MenuItem value={1}>Operador</MenuItem>
              <MenuItem value={2}>Cliente</MenuItem>
            </TextField>
          
            <Controller
              name="birth_date" margin="dense"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    {...field}
                    onChange={(date) => field.onChange(date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Fecha de Nacimiento"
                        fullWidth
                        margin="dense"
                        error={!!errors.birth_date}
                        helperText={errors.birth_date?.message}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

          </div>
          <div className="flex justify-center mx-auto">
          <Controller
            name="phone_number"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <PhoneInput
                {...field}
                country={"gt"}
                inputClass={`w-full h-full  ${errors.phone_number ? "border-red-500" : "border-gray-300"}`}
                className=""
              />
            )}
          />
          {errors.phone_number && (
            <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>
          )}

          </div>
        </form>
      </DialogContent>
      <DialogActions className="my-4 ">
        <Button onClick={onClose} color="error" variant="contained">
          Cancelar
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} variant="contained" color="primary">
          Crear Usuario
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUser;
