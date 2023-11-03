import { Router } from "express";

const router = Router();

router.post('/singin', (req, res) => res.send("Ingresando"));

router.post('/singup', (req, res) => res.send("Registrando"));

router.post('/singout', (req, res) => res.send("Cerrando sesion"));

router.get('/profile', (req, res) => res.send("Perfil de usuario"));

export default router;