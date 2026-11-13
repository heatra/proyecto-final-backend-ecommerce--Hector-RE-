# ⚡ Proyecto Final E-Commerce - Tienda de Electricidad (API REST + Frontend)

Sistema web Full Stack desarrollado como proyecto final para la gestión integral de componentes y artículos de una tienda de electricidad. Cuenta con una **API REST en Java (Spring Boot)** con validaciones y soporte CORS, una interfaz web en **HTML/CSS/JS** y el respaldo de la base de datos relacional en **MySQL**.

* **Repositorio:** [proyecto-final-backend-ecommerce--Hector-RE-](https://github.com)
* **Autor:** Héctor RE (`@heatra`)

---

## 📁 Estructura del Proyecto

```text
proyecto-final-backend-ecommerce--Hector-RE-/
├── BACKEND/
│   └── componentes/             # Proyecto Java Spring Boot con Maven (API REST)
├── DATABASE/
│   └── tienda_electricidad.sql  # Script de estructura y datos en MySQL
├── FRONTEND/
│   ├── index.html               # Interfaz principal del e-commerce
│   └── ...                      # Hojas de estilo (.css) y scripts de conexión (.js)
└── .gitignore
```

---

## 🛠️ Tecnologías y Herramientas Utilizadas

### Backend
* **Lenguaje:** Java (JDK 17+)
* **Framework:** Spring Boot (Spring Web, Spring Data JPA, Jakarta Validation)
* **Gestor de dependencias y construcción:** Apache Maven (`mvnw`)
* **Arquitectura:** Controladores REST (`@RestController`), Servicios, Repositorios y Entidades JPA

### Frontend
* **Maquetado y Estilos:** HTML5 y CSS3
* **Lógica y Consumo de API:** JavaScript (ES6+ / Fetch API)

### Base de Datos y Entorno Local
* **Motor de Base de Datos:** MySQL
* **Servidor Local:** XAMPP (Apache + MySQL)
* **Gestor Visual:** phpMyAdmin

### Herramientas de Desarrollo
* **IDE:** Visual Studio Code (Extension Pack for Java, Spring Boot Tools, Live Server)
* **Control de Versiones:** Git y GitHub

---

## Endpoints de la API REST

La API corre por defecto en `http://localhost:8080` bajo la ruta base `/api/componentes` y tiene habilitado `@CrossOrigin(origins = "*")` para permitir peticiones desde cualquier cliente frontend.

| Método HTTP | Endpoint | Descripción | Parámetros / Cuerpo (JSON) |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/componentes` | Obtiene el listado completo de componentes | No requiere |
| `GET` | `/api/componentes/{id}` | Busca y devuelve un componente específico por su ID | `id` (Long) en la URL |
| `POST` | `/api/componentes` | Crea y guarda un nuevo componente (con validación `@Valid`) | JSON en el Body (ver ejemplo abajo) |
| `PUT` | `/api/componentes/{id}` | Actualiza todos los datos de un componente existente | `id` (Long) en URL + JSON en el Body |
| `DELETE` | `/api/componentes/{id}` | Elimina un componente de la base de datos por su ID | `id` (Long) en la URL |

### Ejemplo de cuerpo JSON (`POST` y `PUT`)
```json
{
  "nombre": "Llave Térmica Bipolar 2x25A",
  "categoria": "Protección Eléctrica",
  "precio": 14500.50,
  "stock": 30,
  "descripcion": "Interruptor termomagnético para riel DIN"
}
```

---

## Guía de Instalación y Uso

Para que funcione, el usuario que descargue del repositorio debe seguir este orden:
• 1. Base de Datos (XAMPP / MySQL): Primero encender MySQL, asegurar base de datos tienda_electricidad exista
• 2. Backend (Spring Boot / Java): Segundo se ejecuta la aplicación Java (./mvnw spring-boot:run). Al arrancar,     
     conecta a MySQL y abre el puerto 8080 para escuchar peticiones en http://localhost:8080/api/componentes.
• 3. Frontend (index.html): Tercero y último se abre index.html (con Live Server o en el navegador). Al cargarse,  
     su archivo JavaScript hace peticiones fetch al puerto 8080 para traer los componentes y dibujarlos en pantalla.


## Detalle de Instalación:

### 1. Clonar el repositorio
```bash
git clone https://github.com.git
cd proyecto-final-backend-ecommerce--Hector-RE-
```
### 2. Importar la Base de Datos (XAMPP / MySQL)
1. Inicia los módulos **Apache** y **MySQL** en el panel de control de **XAMPP**.
2. Abre `http://localhost/phpmyadmin` en tu navegador.
3. Crear una nueva base de datos llamada **`tienda_electricidad`**.
4. Selecciona la base de datos, ve a la pestaña **Importar**, elige el archivo `.sql` ubicado dentro de la carpeta `DATABASE/` y haz clic en **Importar**.

### 3. Configurar y ejecutar el Backend

1. Abrir la carpeta `BACKEND/componentes` en **Visual Studio Code**.
2. Verificar las credenciales de conexión en `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/tienda_electricidad
   spring.datasource.username=root
   spring.datasource.password=root
   
3. Ejecutar el servidor desde la terminal integrada:
   ```bash
   cd BACKEND/componentes
   ./mvnw spring-boot:run
   ```

### 4. Ejecutar el Frontend
1. Asegúrar que el Backend esté activo en `http://localhost:8080`.
2. Abrir la carpeta `FRONTEND` en Visual Studio Code.
3. Hacer clic derecho sobre `index.html` y seleccionar: Open with Live Server (o ábrir directamente con doble clic en el navegador web).
