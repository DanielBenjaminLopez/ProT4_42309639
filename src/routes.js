import { Router } from 'express';
import { libro } from './controller.js';

//exportamos para que sea visible fuera de este archivo
export const router = Router();

//Consulta general
router.get('/libros', libro.getAll);

//Consulta particular
//router.get('/libro', libro.getOne);

//agrego un libro
router.post('/libro', libro.add);

//Elimino un libro
router.delete('/libro', libro.delete);

//Elimino un libro
router.put('/libro', libro.update);
