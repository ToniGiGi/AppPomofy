import db from '../database/db';

// 1. INICIALIZAR LA TABLA
const initTable = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        subject TEXT,
        date TEXT,
        status TEXT,
        description TEXT
      );
    `);
  } catch (error) {
    console.log('Error al crear tabla:', error);
  }
};

// 2. AGREGAR TAREA
const addTask = async (title, subject, date, status, description) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO tasks (title, subject, date, status, description) VALUES (?, ?, ?, ?, ?)',
      title, subject, date, status, description
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.log('Error al agregar tarea:', error);
  }
};

// 3. OBTENER TAREAS
const getTasks = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM tasks ORDER BY id DESC');
    return allRows;
  } catch (error) {
    console.log('Error al obtener tareas:', error);
    return [];
  }
};

// --- ¡NUEVO! 3.5 OBTENER EL CONTEO TOTAL ---
const getTasksCount = async () => {
  try {
    // 'getFirstAsync' obtiene solo la primera fila (perfecto para un COUNT)
    const result = await db.getFirstAsync('SELECT COUNT(*) as count FROM tasks');
    return result.count;
  } catch (error) {
    console.log('Error al contar tareas:', error);
    return 0;
  }
};
// -------------------------------------------

// 4. ACTUALIZAR ESTADO
const updateTaskStatus = async (id, newStatus) => {
  try {
    await db.runAsync(
      'UPDATE tasks SET status = ? WHERE id = ?',
      newStatus, id
    );
  } catch (error) {
    console.log('Error al actualizar estado:', error);
  }
};

// 5. ACTUALIZAR DATOS COMPLETOS
const updateTaskFull = async (id, title, subject, date, description) => {
  try {
    await db.runAsync(
      'UPDATE tasks SET title = ?, subject = ?, date = ?, description = ? WHERE id = ?',
      title, subject, date, description, id
    );
  } catch (error) {
    console.log('Error al editar tarea:', error);
  }
};

// 6. ELIMINAR TAREA
const deleteTask = async (id) => {
  try {
    await db.runAsync('DELETE FROM tasks WHERE id = ?', id);
  } catch (error) {
    console.log('Error al eliminar tarea:', error);
  }
};

export const TasksController = {
  initTable,
  addTask,
  getTasks,
  getTasksCount, // <-- ¡No olvides exportarla!
  updateTaskStatus,
  updateTaskFull,
  deleteTask
};