import * as SQLite from 'expo-sqlite';

// Usamos la nueva función "Sync" que es compatible con la última versión
const db = SQLite.openDatabaseSync('pomofy.db');

export default db;