import { Router } from 'express';
import { store, update, remove, index } from '../controllers/StatusController.js';

export const status_router = Router();

status_router.get('/', index);
status_router.post('/', store);
status_router.put('/:id', update);
status_router.delete('/:id', remove);

export default status_router;