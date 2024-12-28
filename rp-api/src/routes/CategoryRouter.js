import { Router } from 'express';
import { store, update, remove, index, show} from '../controllers/CategoryController.js';

export const category_router = Router();

category_router.get('/', index);
category_router.get('/:id', show);
category_router.post('/', store);
category_router.put('/:id', update);
category_router.delete('/:id', remove);

export default category_router;