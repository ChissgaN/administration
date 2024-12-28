import { Router } from 'express';
import { store, update, remove, index,show } from '../controllers/ClientController.js';

export const client_router = Router();

client_router.get('/', index);
client_router.get('/:id', show);
client_router.post('/', store);
client_router.put('/:id', update);
//client_router.delete('/:id', remove);

export default client_router;