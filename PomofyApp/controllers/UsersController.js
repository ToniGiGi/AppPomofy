import db from '../database/db';

// 1. INICIALIZAR TABLA DE USUARIOS
const initTable = async () => {
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `);
  } catch (error) {
    console.log('Error creando tabla users:', error);
  }
};

// 2. REGISTRAR USUARIO (Seed)
// Usamos "INSERT OR IGNORE" para que si Tony ya existe, no haga nada y no de error.
const registerUser = async (email, password) => {
  try {
    await db.runAsync(
      'INSERT OR IGNORE INTO users (email, password) VALUES (?, ?)',
      email, password
    );
  } catch (error) {
    console.log('Error registrando usuario:', error);
  }
};

// 3. LOGIN (Verificar Credenciales)
const loginUser = async (email, password) => {
  try {
    // Buscamos un usuario que tenga ESE email y ESA contraseña
    const user = await db.getFirstAsync(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      email, password
    );
    // Si 'user' tiene datos, el login es exitoso. Si es null/undefined, falló.
    return user; 
  } catch (error) {
    console.log('Error en login:', error);
    return null;
  }
};

export const UsersController = {
  initTable,
  registerUser,
  loginUser
};