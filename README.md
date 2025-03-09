# 📌 tuFincaProyecto

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

## Backend (Java 21 - Spring)

- 🔹 **Java 21** – Requerido para ejecutar el backend con Spring Boot.

- 🔹 **MySQL Server** – Necesario para importar la base de datos.

## Frontend (React - Node.js)

-🔹 **Node.js** – Necesario para ejecutar el frontend en React.

-🔹 **pnpm**– Administrador de paquetes (instálalo con npm install -g pnpm si aún no lo tienes).
  
## 1: Descargar github:

- **Clonate el proyecto en la carpeta de tu elección**
  ```bash
  git clone git@github.com:Catapultaa/tuFincaProyecto.git
  ```
  
- **Navega a la carpeta del proyecto**
  ```bash
  cd .\tuFincaProyecto\
  ```

  
## Importación de la base de datos MY SQL

## 🗄️ 2. Importar la base de datos en MySQL

### 📌 Importar desde MySQL Workbench

1. Abre MySQL Workbench y ve a Server > Data Import.

2. Si aún no tienes el esquema creado, créalo manualmente con el nombre mifinca.

3. Selecciona el archivo .sql del proyecto.

4. Haz clic en Start Import y espera a que termine el proceso.

### 🔍 Verificación de la importación

Una vez importado, verifica que las tablas estén correctamente creadas ejecutando en MySQL Workbench:
  
```bash
SHOW DATABASES;
USE mifinca;
SHOW TABLES;
```
### 📌 Debes ver las siguientes tablas en la base de datos:

- administrador
- administradormensaje
- etiqueta
- media
- mensaje
- propiedad
- propiedadetiqueta

- propiedadetiqueta
## 📤 3. Exportar el esquema de la base de datos

Para exportar el esquema en MySQL Workbench:

1. Ve a Server > Data Export.

2. En Tables to Export, selecciona tufinca.

3. En Export Options, elige Export to Dump Project Folder.
   
5. Selecciona Export to Self-Contained File

6. Guarda la exportación en Export to Self-Contained File y selecciona la carpeta /database del proyecto.

7. Selecciona las opciones Create Dump in a Single Transaction (self-contained file only) y Include Create Schema

8. Inicia la exportación 

## 2:🔨 Instalar dependencias de Spring Boot
### Dependencias del proyecto Spring
Al generar el proyecto en Spring Initializr, se seleccionaron las siguientes dependencias:

1. ✅ Spring Web → Para construir API RESTful.
   
3. ✅ Spring Boot DevTools → Para recarga en caliente durante el desarrollo.
   
4. ✅ Lombok → Para reducir el código repetitivo en las clases.
   
5. ✅ Spring Data JPA → Para interactuar con la base de datos.
   
6. ✅ MySQL Driver → Para conectarte a MySQL.
    
7. ✅ Spring Security → Para manejo de autenticación y roles.
    
8. ✅ Spring Boot Actuator → Para ver métricas, información del sistema, estado de la aplicación y más.

## 3: Instalar depencias de React




