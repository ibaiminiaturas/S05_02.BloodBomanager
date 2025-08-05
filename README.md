# ⚡ Blood Bowl Frontend – React + Vite

## 📌 Descripción

Este proyecto es un **frontend en React** construido con **Vite** que consume la API RESTful de Blood Bowl creada en Laravel. Permite interactuar con equipos, jugadores, partidos y simular encuentros, gestionando usuarios y roles mediante autenticación tokenizada.

---

## 🌐 URLs de la API

La aplicación consume la API que puede estar corriendo de forma local o en producción.

Configura la URL base de la API en el archivo `.env`:

Para desarrollo local
VITE_API_BASE_URL=http://localhost:8000

Para producción (Railway)
VITE_API_BASE_URL=https://s05bloodbowlapi-production.up.railway.app
yaml
Copia
Modifica

> **Importante:** Recuerda reiniciar el servidor de desarrollo tras cambiar el `.env` para que Vite tome la nueva variable.

---

## 🚀 Tecnologías y herramientas usadas

- **React 19** – Librería principal para construir interfaces UI.
- **Vite** – Herramienta de bundling y desarrollo rápido.
- **React Router Dom** – Navegación SPA.
- **Tailwind CSS** – Estilizado utilitario.
- **Framer Motion** – Animaciones UI.
- **SweetAlert2** – Mensajes y alertas modales.
- **React Icons** – Iconografía.
- **Fetch API** – Para llamadas HTTP a la API backend.
- **Context API** – Para manejo de autenticación y estado global.

---

## ⚙️ Instalación local y ejecución

1. Clona el repositorio:

    ```bash
    git clone https://github.com/ibaiminiaturas/S05_02.BloodBomanager.git
    cd tu-repo-frontend
    ```

2. Instala dependencias:

    ```bash
    npm install
    ```

3. Configura tu archivo `.env` con la URL correcta del backend (ver sección URLs de la API).

4. Ejecuta el servidor de desarrollo:

    ```bash
    npm run dev
    ```

5. Accede a la app en `http://localhost:5173` (o el puerto que Vite indique).

---

## 🔐 Autenticación y gestión de usuario

La app consume la API que utiliza Laravel Passport para autenticar usuarios mediante OAuth2.

- Regístrate o inicia sesión para obtener un token.
- El token se almacena en contexto y se añade a las llamadas a la API en la cabecera `Authorization: Bearer {token}`.
- Roles y permisos limitan funcionalidades y rutas.

---

## 📂 Estructura del proyecto

src/
├── components/ # Componentes UI reutilizables
├── pages/ # Páginas principales (Dashboard, Equipos, Partidos, etc.)
├── utils/ # Hooks y funciones auxiliares (AuthContext, fetchers, etc.)
├── App.jsx # Componente raíz con rutas
├── main.jsx # Punto de entrada (renderizado React)
.env # Variables de entorno para la configuración API
tailwind.config.js # Configuración Tailwind CSS
vite.config.js # Configuración Vite


## 📝 Notas

- Las llamadas a la API usan la variable `import.meta.env.VITE_API_BASE_URL` para direccionar correctamente.
- Puedes cambiar fácilmente entre backend local o producción ajustando `.env`.
- Este proyecto es 100% React + Vite, sin backend propio, consume la API externa de Blood Bowl.

---

## 🔗 Enlaces útiles

- Backend API (Laravel) repo: [https://github.com/ibaiminiaturas/S05.Bloodbowl_API](https://github.com/ibaiminiaturas/S05.Bloodbowl_API)
- API en producción (Railway): [https://s05bloodbowlapi-production.up.railway.app](https://s05bloodbowlapi-production.up.railway.app)
- Swagger API docs: [https://s05bloodbowlapi-production.up.railway.app/api/documentation](https://s05bloodbowlapi-production.up.railway.app/api/documentation)

---

👨‍💻 **Autor:** Ibai Ramirez Pereda  
🔗 [GitHub - ibaiminiaturas](https://github.com/ibaiminiaturas)
