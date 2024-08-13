import { Router } from 'express';
import { libro } from './controller.js';

//exportamos para que sea visible fuera de este archivo
export const router = Router();
router.get('/libros', libro.getAll);

//agrego un libro
router.post('/libro', libro.add);

//Elimino un libro
router.delete('/libro', libro.delete);

router.put('/libro', libro.update);
