# control-gastos
## Descripción
Es una aplicación web enfocada en el manejo de las finanzas personales y manejo de presupuesto. Por el momento estamos en el 
desarrollo de nuevas funcionalidades las cuales son: registro de transacciones, reportes y estadísticas, alertas y presupuestos.
## Tecnologías 
- Backend: NodeJS, Typescript, Express.
- Frontend: Angular
- Seguridad: JWT
- Base de datos: PostgreSQL
## Requisitos previos, verifica que los tengas instalados
- Node.js (v18 o versiones superiores recomendado)
- pnpm
- PostgreSQL
- AngularCLI
## Instalación
- Paso 1: Clona el siguiente repositorio https://github.com/Jambrocio-2025444/control-gastos.git
- Paso 2: Abrir Visual studio code y abrir la carpeta donde lo clonaste
- Paso 3: Crear un archivo .env dentro de la carpeta backend, luego guíate del archivo .env.example para ingresar tus datos, tendrás que escribir           lo siguiente dentro del archivo .env: DB_PASSWORD=tuContraseña y tu palabra clave en JWT_SECRET.
- Paso 4: Escribe lo siguiente en una terminal cd control-gastos/cd Control-Gastos para poder ingresar dentro del proyecto
- Paso 5: Escribe cd backend y luego npm run dev, si todo salió bien aparecerá el siguiente mensaje: "Base de datos inicializada"
- Paso 6: En una nueva terminal haz lo mismo del paso cuatro y cuando estés dentro del proyecto escribe cd frontend, estando dentro del                   frontend escribe ng serve, si todo salió bien podrás te redireccionara a tu navegador con el login.
