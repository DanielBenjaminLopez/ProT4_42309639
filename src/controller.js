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

  async getOne(req, res) {
    try {
      const libro = req.body;
      const [result] = await pool.query(
        'SELECT nombre, autor, categoria, añopublicacion, ISBN FROM libros WHERE id = (?)',
        [libro.id]
      );
      //Veo si el existe el id en el body
      if (!libro.id) {
        return res.status(400).json({
          error: 'El parámetro id es obligatorio',
        });
      }
      // Si no se encontraron resultados, `result` será un array vacío.
      if (result.length === 0) {
        return res.status(404).json({
          error: 'Libro no encontrado',
        });
      }

      // Si se encuentra el libro, devolver los resultados.
      res.json(result[0]);
    } catch (error) {
      res.status(500).json({
        error: 'Error al obtener el libro',
        details: error.message,
      });
    }
  }

  async add(req, res) {
    try {
      const { nombre, autor, categoria, añopublicacion, ISBN, ...extraFields } =
        req.body;

      // Validamos que no existan campos adicionales no deseados
      if (Object.keys(extraFields).length > 0) {
        return res.status(400).json({
          error: 'Atributos adicionales no permitidos',
          extraFields,
        });
      }

      // Validamos que todos los campos requeridos estén presentes
      if (!nombre || !autor || !categoria || !añopublicacion || !ISBN) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      // Verificamos si ya existe un libro con el mismo ISBN
      const [existingBook] = await pool.query(
        'SELECT 1 FROM libros WHERE ISBN = ?',
        [ISBN]
      );

      if (existingBook.length > 0) {
        return res.status(400).json({
          error: 'Ya existe un libro con el mismo ISBN',
        });
      }

      // Insertamos solo los campos válidos en la base de datos
      const [result] = await pool.query(
        'INSERT INTO libros(nombre, autor, categoria, añopublicacion, ISBN) VALUES (?, ?, ?, ?, ?)',
        [nombre, autor, categoria, añopublicacion, ISBN]
      );

      res.json({ 'ID insertado': result.insertId });
    } catch (error) {
      res.status(500).json({
        error: 'Error al añadir el libro',
        details: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const { ISBN } = req.body;
      const [result] = await pool.query(`DELETE FROM libros WHERE ISBN = ?`, [
        ISBN,
      ]);

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: 'Libro no encontrado, no se eliminó ningún registro',
        });
      }

      res.json({ message: 'Libro eliminado exitosamente' });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Error al eliminar el libro', details: error.message });
    }
  }

  async update(req, res) {
    try {
      const libro = req.body;
      // Validamos que todos los campos requeridos estén presentes
      if (
        !libro.nombre ||
        !libro.autor ||
        !libro.categoria ||
        !libro.añopublicacion ||
        !libro.ISBN
      ) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const [result] = await pool.query(
        `UPDATE libros SET nombre=(?), autor=(?), categoria=(?), añopublicacion=(?) WHERE ISBN=(?)`,
        [
          libro.nombre,
          libro.autor,
          libro.categoria,
          libro.añopublicacion,
          libro.ISBN,
        ]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: 'Libro no encontrado, no se actualizó ningún registro',
        });
      }

      res.json({ message: 'Libro actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar el libro',
        details: error.message,
      });
    }
  }
}

export const libro = new LibroController();
