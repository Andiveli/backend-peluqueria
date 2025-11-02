# Backend Peluquería

Este repositorio contiene el backend para la gestión de una peluquería. El proyecto está desarrollado completamente en **JavaScript** y proporciona una API para administrar servicios, citas, clientes y empleados de la peluquería.

## Características principales

- Gestión de clientes, empleados y servicios.
- Reservas y administración de citas.
- Control de disponibilidad y horarios.
- Autenticación y autorización de usuarios.
- Integración con bases de datos.
- Estructura modular y escalable.

## Tecnologías utilizadas

- **JavaScript** (Node.js)
- Framework recomendado: Express.js (puedes ajustar según el framework utilizado)
- Base de datos: (agrega aquí el tipo de base de datos: MongoDB, MySQL, PostgreSQL, etc.)
- Otros: (JWT para autenticación, dotenv, bcrypt, etc.)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Andiveli/backend-peluqueria.git
   ```

2. Ingresa al directorio del proyecto:
   ```bash
   cd backend-peluqueria
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Configura las variables de entorno en un archivo `.env` (ver ejemplo en `.env.example` si existe).

5. Inicia el servidor:
   ```bash
   npm start
   ```

## Uso

La API estará disponible por defecto en `http://localhost:3000/` (o el puerto que definas en tu configuración).

### Endpoints principales

- `/api/clientes` - CRUD de clientes
- `/api/empleados` - CRUD de empleados
- `/api/servicios` - CRUD de servicios
- `/api/citas` - Gestión de reservas

*(Ajusta los endpoints según la estructura real del proyecto)*

## Contribuir

¡Las contribuciones son bienvenidas! Por favor, abre un issue o envía un pull request para sugerir mejoras.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más información.

---

**Desarrollado por [Andiveli](https://github.com/Andiveli)**
