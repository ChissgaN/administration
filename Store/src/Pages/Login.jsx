import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineShop } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";

// Esquema de validación con YUP 
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Debe ingresar un correo válido")
    .required("El correo es obligatorio"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5173/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GuestLayout>
    <div className="flex min-h-screen items-center justify-center bg-[#CBE896]">
      <div className="w-full max-w-md rounded-lg bg-[#FFFFFC] p-6 shadow-md">
        {/* Ícono de tienda centrado */}
        <div className="flex justify-center mb-4">
          <AiOutlineShop size={50} className="text-blue-600" />
        </div>
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-700">
          Inicio de Sesión
        </h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Correo Electrónico</label>
            <input
              type="email"
              className={`w-full rounded-lg border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">Contraseña</label>
            <div className="relative">
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
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Mostrar mensaje de error de la API */}
          {errorMessage && (
            <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-[#ff1b1c] hover:underline">
            Haz click acá para registrarte
          </Link>
        </p>
      </div>
    </div>
    </GuestLayout>
  );
};

export default Login;
