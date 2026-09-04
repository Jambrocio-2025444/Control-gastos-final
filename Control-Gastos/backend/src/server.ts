import app from './app';
import { initializeDatabase } from './config/database';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initializeDatabase();
    console.log('Base de datos conectada correctamente');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log('Endpoints:');
      console.log('   POST /api/auth/login');
      console.log('   GET  /api/auth/me');
      console.log('   GET  /api/health');
    });
  } catch (error) {
    console.error('El servidor no arrancará por un error de base de datos:', error);
    process.exit(1);
  }
}

startServer();