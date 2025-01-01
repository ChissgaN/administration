import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditCategories = ({ open, onClose, category, onUpdate }) => {
  const schema = yup.object().shape({
    name: yup.string().required('El nombre es obligatorio').min(3, 'El nombre debe tener al menos 3 caracteres'),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (category) {
      setValue('name', category.name);
    }
  }, [category, setValue]);

  const onSubmit = (data) => {
    onUpdate({ ...category, name: data.name });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Categoría</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Nombre de la Categoría</label>
            <input
              id="name"
              type="text"
              placeholder="Nombre"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
        </form>
      </DialogContent>
      <DialogActions className="my-4">
        <Button onClick={onClose} color="error" variant="contained">Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategories;
