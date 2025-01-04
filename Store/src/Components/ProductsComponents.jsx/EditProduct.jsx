import React from "react";
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
import Dropzone from "react-dropzone";

const schema = yup.object().shape({
  products_categories_id: yup.string().required("La categoría es requerida."),
  name: yup.string().required("El nombre es requerido."),
  brand: yup.string().required("La marca es requerida."),
  code: yup.string().required("El código es requerido."),
  stock: yup
    .number()
    .typeError("El stock debe ser un número.")
    .min(0, "El stock no puede ser negativo.")
    .required("El stock es requerido."),
  price: yup
    .number()
    .typeError("El precio debe ser un número.")
    .min(0, "El precio no puede ser negativo.")
    .required("El precio es requerido."),
  photo: yup.mixed().required("La foto es requerida."),
});

export default function EditProduct({ open, onClose, onSave, productData }) {
  const { control, handleSubmit, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
    defaultValues: productData || {
      products_categories_id: "",
      name: "",
      brand: "",
      code: "",
      stock: 1,
      price: 0,
      status_id: 1,
      photo: null,
    },
  });

  React.useEffect(() => {
    if (productData) {
      Object.entries(productData).forEach(([key, value]) => setValue(key, value));
    }
  }, [productData, setValue]);

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setValue("photo", acceptedFiles[0]);
    }
  };

  const onSubmit = (data) => {
    
    const { status, category, ...rest } = data; // delete status and category from validation 

    const updatedData = Object.entries(rest).reduce((acc, [key, value]) => { // iterate over the rest of the data and check if the value is different from the original value in productData and add it to the acc object

      if (key === "photo" && value instanceof File) {
        acc[key] = value;
      } else {
        const oldValue = productData[key];
        const newValue = typeof oldValue === 'number' ? parseFloat(value) : value;
        if (newValue !== oldValue) {
          acc[key] = newValue;
        }
      }
      return acc;
    }, {});
    onSave(updatedData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-[#ed217c] font-bold">Editar Producto</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <div className="flex justify-around gap-4 mt-4">
            <Controller
              name="products_categories_id"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Categoría"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value="1">Electrodomésticos</MenuItem>
                  <MenuItem value="2">Ropa</MenuItem>
                  <MenuItem value="3">Zapatos</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="flex justify-around gap-4 mt-4">
            <Controller
              name="brand"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Marca"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="code"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Código"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <div className="flex justify-around gap-4 mt-4">
            <Controller
              name="stock"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Stock"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="price"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="Precio"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>

          <Controller
            name="photo"
            control={control}
            render={({ field, fieldState }) => (
              <div className="mt-6">
                <Dropzone
                  onDrop={handleFileDrop}
                  accept={{
                    "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                  }}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer bg-[#e3d8f1] text-[#9381ff] hover:bg-[#d8c9f0] transition duration-300 ${getValues("photo") && " border-green-400"}`}
                    >
                      <input {...getInputProps()} />
                      <p className="text-sm font-medium">
                        {getValues("photo")?.name || getValues("photo") || "Arrastra una imagen aquí o haz clic para seleccionarla"}
                      </p>
                    </div>
                  )}
                </Dropzone>
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-2">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        </DialogContent>

        <DialogActions className="my-4 ">
          <Button onClick={onClose} color="error" variant="contained" >
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
