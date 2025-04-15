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

## Configuración del proyecto
1. **Luego de clonar el proyecto, deberias ver una carpeta llamada .\backend\ en donde encontraras otra carpeta llamada ./tufinca/ a la cual vas a acceder.**
```bash
cd ./backend/tufinca/
```
2. El proyecto ya es un entorno de Spring Boot con Maven por lo que deberias ver un pom.xml en la raiz del proyecto.
   
   ![Mi Imagen](https://drive.google.com/uc?export=view&id=1kLtjpx2oh2kN9jwDCzvPLpsHn4d_4md6)

4. **Construir el proyecto con Maven.**
Ejecuta el siguiente comando en la terminal dentro del directorio del proyecto:
```bash
./mvnw clean install
```
Si estás en Windows, usa:
```bash
mvnw.cmd clean install
```
Esto descargará las dependencias y compilará el código.
Si tienes Maven instalado globalmente, también puedes ejecutar:
```bash
sudo mvn clean install
```

En caso de que envíe error en properties application, agregar al archivo pom, en la sección build, antes de plugins:
```bash
<resources>
            <resource>
                <directory>src/main/resources</directory>
                <filtering>false</filtering> 
            </resource>
        </resources>
```

5. **Abrir el Proyecto en tu IDE (IntelliJ o VSCode)**
   
**Si usas IntelliJ IDEA:**

- Abre IntelliJ.
- Ve a "File" > "Open" y selecciona la carpeta del proyecto clonado.
- IntelliJ detectará que es un proyecto Maven y descargará las dependencias automáticamente.

**Si usas VSCode:**

- Asegúrate de tener la extensión "Java Extension Pack" instalada.
- Abre la carpeta del proyecto con "File" > "Open Folder".
- Usa la terminal integrada para ejecutar los comandos de Maven.

**Para ejecutarlo por comandos linux:**
```bash
sudo mvn spring-boot:run
```

6. **Verificar que todo funciona**

Si la aplicación Spring Boot se ejecuta correctamente, deberías ver logs en la terminal indicando que está corriendo en el puerto 8080. Puedes probarlo abriendo un navegador y visitando:
```bash
http://localhost:8080
```
Si ves una pagina de login es que todo esta corriendo bien :).
## 3: Instalar depencias de React

## 4 📁 Instrucciones sobre la carpeta uploads
Nuestro sistema utiliza una carpeta ubicada en la ruta:

```
/backend/tufinca/uploads
```
![image](https://github.com/user-attachments/assets/fa63a64b-0c6b-4857-a028-2aed92f524f3)

En esta carpeta se almacenan los archivos que los usuarios suben, como imágenes asociadas a propiedades.

### ⚠️ Importante: esta carpeta no se debe subir al repositorio
Contiene muchos archivos (imágenes), lo cual puede afectar el rendimiento y peso del repositorio.

Está listada en el archivo .gitignore, por lo tanto Git no la rastrea ni la sube.

## 💻 Entorno de desarrollo (local)
Cada desarrollador debe crear manualmente una carpeta llamada uploads en la ruta mencionada:
```
/backend/tufinca/uploads
```
Esto permitirá:

- Probar la funcionalidad de carga de imágenes.

- Verificar que las imágenes se estén guardando correctamente de manera local.

- Confirmar que se asocian correctamente en la base de datos con sus respectivas propiedades.

### 🔧 El esquema SQL actual ya está actualizado y contiene dos propiedades sin imágenes para realizar pruebas.

### 🔍 ¿Cómo probar que funciona?
1. Desde el frontend, edita una propiedad.

2. Añade una o más imágenes.

3. Verifica que:

- Las imágenes se hayan guardado en tu carpeta local uploads.

- Se haya actualizado correctamente la base de datos con las nuevas imágenes asociadas a la propiedad.

### 🚀 Producción
1. Para el entorno de producción:

- Se subirá una única carpeta uploads que contendrá todas las imágenes asociadas a las propiedades correctamente organizadas.

- Esta carpeta será administrada según las necesidades del despliegue y almacenamiento.






