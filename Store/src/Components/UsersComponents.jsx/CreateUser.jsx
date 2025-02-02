import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

// Esquema de validación dinámico
const createValidationSchema = (existingEmails) =>
  yup.object().shape({
    role_id: yup.string().required("El rol es requerido."),
    email: yup
      .string()
      .email("Debes ingresar un correo válido.")
      .required("El correo electrónico es requerido.")
      .test(
        "unique-email",
        "El correo ya existe. Por favor, elige otro.",
        (value) => !existingEmails.includes(value)
      ),
    password: yup
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres.")
      .required("La contraseña es requerida."),
    phone_number: yup
      .string()
      .min(8, "El número de teléfono debe tener al menos 8 caracteres.")
      .required("El número de teléfono es requerido."),
    birth_date: yup
      .string()
      .transform((value, originalValue) => {
        return originalValue ? new Date(originalValue).toISOString().split("T")[0] : value;
      })
      .required("La fecha de nacimiento es requerida.")
      .test("is-18", "Debes tener al menos 18 años.", (value) => {
        if (!value) return false;
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const isMonthBefore = today.getMonth() < birthDate.getMonth();
        const isDayBefore =
          today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate();
        return age > 18 || (age === 18 && !isMonthBefore && !isDayBefore);
      }),
  });

export default function CreateUser({ open, onClose, onCreate, existingEmails }) {
  const [validationSchema, setValidationSchema] = useState(() =>
    createValidationSchema(existingEmails)
  );

  // Actualiza el esquema de validación si los correos cambian
  useEffect(() => {
    setValidationSchema(createValidationSchema(existingEmails));
  }, [existingEmails]);

  const { control, handleSubmit, reset, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      role_id: "",
      email: "",
      password: "",
      phone_number: "",
      birth_date: "",
    },
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
        <DialogContent
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
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
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Teléfono"
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
                sx={role_id !== 2 && { gridColumn: "span 2" }}
              />
            )}
          />
        </DialogContent>

        <DialogActions className="my-4 ">
          <Button onClick={onClose} color="error" variant="contained">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Crear Usuario
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

CreateUser.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  existingEmails: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const roles = [
  {
    id: 1,
    name: "Operador",
  },
  {
    id: 2,
    name: "Cliente",
  },
];
