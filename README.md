Autor: Ing. Martin Acosta - 2020
# API REST con NodeJS
## Introducción 🚀
El siguiente repositorio contiene el desarrollo de una API REST, implementada a modo de práctica. La misma devuelve un arreglo de objetos JSON, admitiendo los métodos GET, POST, PUT y DELETE.
## Preparación 📋
### Creo el package.json con la descripción del proyecto
```sh
npm init --yes
```
### Instalación de los módulos en el proyecto
* [Express](https://expressjs.com/es/) brinda la infraestructura para aplicaciones web, de manera sencilla.
* [Morgan](https://www.npmjs.com/package/morgan) es un middleware para mostrar por consola las consultas realizadas al servidor.
```sh
npm i express morgan
```
### Requerimiento de los módulos
Para utilizar los módulos instalados es necesario hacer sus respectivos requires
```sh
const express = require('express');
const app = express();
const morgan = require('morgan');
```
Debido a que esta práctica se realiza mediante un mock de datos, es necesario requerirlo
```sh
let movies = require('../sample.json');
```
## Desarrollo 🔧
### Middlewares
Para utilizar morgan se lo debe iniciar, pasándole como parámetro el formato correspondiente para la salida de información
```sh
app.use(morgan('dev'));
```
Tanto para leer datos en formato json o también los provenientes de formularios, se debe configurar express para usar los middlewares propios.
```sh
app.use(express.urlencoded({extended: false}));
app.use(express.json());
```
El parámetro **extended** con valor *false* establece que no se recibirán datos extensos, como en el caso de imágenes o archivos.
### Configuración de la API
Para iniciar el servidor utilizando express, es necesario establecer el puerto en el cual se escucharan peticiones
```sh
app.set('port', process.env.PORT || 3000);
```
El parámetro **process.env.PORT** permite tomar el valor del puerto establecido por servicios de hosting. En caso de no tenerlo, toma por defecto el valor *3000*.

Para establecer un formato adecuado para la visualización de las respuestas, se configura un espaciado para los objetos json que enviará express
```sh
app.set('json spaces',2);
```
### Estableciendo las rutas
Las rutas de la API estarán definidas dentro de archivos externos para permitir un mejor órden y mayor claridad. En un nuevo archivo *routes/movies.js* defino las rutas de la API. 

Requiero el método *Router* perteneciente a express
```sh
const { Router } = require('express');
const router = Router();
```
Defino una ruta a la cual hacer un GET
```sh
router.get('/', (req,res) => {
    res.send('GET recibido');
});
```
Defino una ruta a la cual hacer un POST
```sh
router.post('/',(req,res) => {
    const { dato1, dato2 } = req.body;
    res.send('POST recibido');
});
```
Defino una ruta a la cual hacer un PUT, recibiendo como parámetro el id del elemento a actualizar
```sh
router.put('/:id',(req,res) => {
    const { id } = req.params;
    const { dato1, dato2 } = req.body;
    res.send('PUT recibido');
});
```
Defino una ruta a la cual hacer un DELETE, recibiendo como parámetro el id del elemento a eliminar
```sh
router.delete('/:id',(req,res) => {
    const { id } = req.params;
    res.json('DELETE recibido');
});
```
Y exporto las rutas definidas
```sh
module.exports = router;
```

Desde la API necesito utilizar las rutas requiriéndolas desde el archivo donde fueron definidas y de ser deseado, agregar un inicio a la ruta predeterminada
```sh
app.use('/api/ruta',require('./routes/movies'));
```
### Inicialización de la API
Teniendo todo configurado se puede comenzar a escuchar sobre el puerto
```sh
app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});
```
## Construido con 🛠️
* [Express](https://expressjs.com/es/)
* [Morgan](https://www.npmjs.com/package/morgan)
## Contribuir 🖇️
Para contribuir realizar un pull request con las sugerencias.
## Licencia 📄
GPL