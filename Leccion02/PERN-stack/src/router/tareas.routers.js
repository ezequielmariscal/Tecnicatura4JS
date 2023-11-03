import { Router } from "express";

const router = Router();

router.get('/tareas',(req, res) => res.send('Obteniendo tareas'));

router.get('/tarea/:id',(req, res) => res.send('Obteniendo tarea unica'));

router.post('/tareas',(req, res) => res.send('Creando tarea'));

router.put('/tarea/:id',(req, res) => res.send('Actualizando tarea unica'));

router.delete('/tarea/:id',(req, res) => res.send('Eliminando tarea unica'));

export default router;