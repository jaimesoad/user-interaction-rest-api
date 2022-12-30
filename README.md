# user-interaction-rest-api

REST API hecho en Typescript con Express js y MySQL, con el propósito de brindar un CRUD de usuarios en una base de datos.

## Indice
- [Endpoints](#endpoints)
  - [GET](#get)
  - [POST](#post)
  - [PATCH](#patch)
  - [DELETE](#delete)
- [Funciones](#funciones)
  - [Controllers](#controllers)
  - [Middleware](#middleware)
  - [Utils](#utils)


## Endpoints
Nota: Todos los endpoints a excepción de `/login` y `/signup` requieren que el usuario esté autenticado.

### GET

 - `/user/:username`: Muestra el nombre, username y edad del usuario que se esté buscando en caso de encontrarse.
 - `/info`: Muestra toda la información no crítica del usuario, como su nombre, edad, correo y username 

### POST

 - `/login`: Necesita del username y contraseña; devuelve como resultado un jwt con una vida de 15 minutos.
 - `/signup`: Necesita que el usuario ingrese todos sus datos siendo estos: nombre, apellido, username, contraseña, edad y correo; esto crea dicho usuario en la base de datos. Como resultado devuelve un jwt con una vida de 15 minutos 

### PATCH

 - `/info`: Da la posibilidad al usuario en sesión de cambiar cualquier valor de sus datos menos la contraseña. 

### DELETE

 - `/delete-account`: Esto borra al usuario de la base de datos. para ello, el usuario debe proveer su contraseña para confirmar su elección.

## Funciones

### Controllers

Elimina la cuenta del usuario actual si la contraseña proporcionada es correcta.
```Typescript
async function deleteAccount(req: Request, res: Response)
```
\
Muestra la información no crítica del usuario actual: nombre, apellido, nombre de usuario, edad y correo electrónico.
```Typescript
async function GetUserInfo(req: Request, res: Response)
```
\
Modifica los valores dados del usuario actual y se los muestra al usuario.
```Typescript
async function PatchUserInfo(req: Request, res: Response)
```
\
Inicia sesión con nombre de usuario y contraseña solo si el usuario dado existe en la base de datos.
```Typescript
async function login(req: Request, res: Response)
```
\
Crea un nuevo usuario solo si el nombre de usuario y las contraseñas son únicos.
```Typescript
async function signup(req: Request, res: Response)
```
\
Busca en la base de datos a un usuario determinado y lo muestra de nuevo. si no, envía un error de usuario no encontrado.
```Typescript
async function FindUser(req: Request, res: Response)
```

### Middleware

Verifica si el token que proviene del usuario es un token válido.
```Typescript
function AuthToken(req: Request, res: Response, next: NextFunction)
```

### Utils

Devuelve el hash de la contraseña creada por el usuario
```Typescript
function Utils(passwd: string): string
```
\
Genera una cadena aleatoria de caracteres para la nueva contraseña salt.
```Typescript
function GenPasswordSalt()
```
\
Autentica al usuario con el nombre de usuario y la contraseña proporcionados.
```Typescript
async function AuthUser(username: string, password: string)
```
\
Crea un nuevo token en caso de que un usuario inicie sesión, se registre o cambie de nombre de usuario.
```Typescript
function CreateNewToken(username: string)
```
