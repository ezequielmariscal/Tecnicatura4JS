import {pool} from '../db.js'

export const listarTareas = async (req, res) =>{
    console.log(req.usuarioId);
    const resultado = await pool.query('SELECT = FROM tareas');
    return res.json(resultado.rows);
      
}

export const listarTarea = (req, res) => res.send('obteniendo tarea unica');

export const crearTarea = async(req, res) => {
    const { titulo, descripcion } = req.body;
    

    try {   const {rows} = await pool.query('INSERT INTO tareas ( titulo, descripcion ) VALUES ($1, $2)', [titulo ,descripcion]);
    console.log(rows);
    res.send('Creando tarea');
    } catch (error) {
        if (error.code === '23505') {
            return res.send('Ya existe una tarea con ese titulo');
        }
        console.log(error);
    } return res.send("algo salio mal");
    
}
export const actualizarTarea = (req, res) => res.send('actualizando tarea unica');

export const eliminarTarea = (req, res) => res.send('eliminando tarea unica');