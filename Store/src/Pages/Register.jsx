import React, { useState } from "react";
import GuestLayout from "../Layouts/GuestLayout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link } from "react-router-dom";
import { addYears } from "date-fns";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    phone_number: yup
  .string()
  .required("El número de teléfono es obligatorio"),
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

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    <GuestLayout>
    <div className="flex min-h-screen items-center justify-center bg-[#CBE896]">
      <div className="w-full max-w-md rounded-lg bg-[#FFFFFC] p-6 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Crear Cuenta <span className="animate-wiggle">👋</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              className={`w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-600"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Contraseña
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className={`w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-600"
              }`}
              {...register("password")}
            />
            <button
              type="button"
              className="absolute top-10 right-3 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Número de Teléfono
            </label>
            <Controller
              name="phone_number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"gt"} 
                  inputClass={`w-full rounded-lg ${
                    errors.phone_number ? "border-red-500" : "border-gray-300"
                  }`}
                />
              )}
            />
            {errors.phone_number && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone_number.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 mb-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Fecha de Nacimiento
              </label>
              <Controller
                name="birth_date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      {...field}
                      value={field.value || null}
                      onChange={(date) => field.onChange(date)}
                      textField={(params) => (
                        <input
                          {...params.inputProps}
                          className={`w-full h-10 rounded-lg border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                            errors.birth_date
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-600"
                          }`}
                        />
                      )}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.birth_date && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.birth_date.message}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Rol
              </label>
              <select
                className={`w-full rounded-lg border px-4 py-4 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                  errors.role
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-600"
                }`}
                {...register("role")}
              >
                <option disabled value="">Seleccionar Rol</option>
                <option value="1">Operador</option>
                <option value="2">Cliente</option>
              </select>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.role.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Crear Cuenta
          </button>
        </form>

      </div>
    </div>
    </GuestLayout>
  );
};

export default Register;
