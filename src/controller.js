//usamos un pool en vez de una conexion simple por si en un futuro ocupemos conexiones paralelas o concurrentes
import { pool } from './database.js';

class LibroController {
  async getAll(req, res) {
    try {
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al obtener los libros', details: error.message });
    }
  }

  async add(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query(
        `INSERT INTO libros(nombre, autor, categoria, añopublicacion, ISBN) VALUES (?,?,?,?,?)`,
        [
          libro.nombre,
          libro.autor,
          libro.categoria,
          libro.añopublicacion,
          libro.ISBN,
        ]
      );
      res.json({ 'ID insertado': result.insertId });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al añadir el libro', details: error.message });
    }
  }

  async delete(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query(`DELETE FROM libros WHERE ISBN=(?)`, [
        libro.ISBN,
      ]);
      res.json({ 'Libro eliminado': result.affectedRows });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al eliminar el libro', details: error.message });
    }
  }

  async update(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query(
        `UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?), ISBN=(?) WHERE id=(?)`,
        [
          libro.nombre,
          libro.autor,
          libro.categoria,
          libro.añopublicacion,
          libro.ISBN,
          libro.id,
        ]
      );
      res.json({ 'Libros modificados': result.changedRows });
    } catch (error) {
      res
        .status(500)
        .json({
          error: 'Error al actualizar el libro',
          details: error.message,
        });
    }
  }
}

export const libro = new LibroController();
