import express from 'express';
import morgan from 'morgan';
import { router } from './routes.js';

//crea el servidor de la API REST
const app = express();

//Seteamos el puerto
app.set('port', 3000);

//hacemos uso de MORGAN para ver la solicitud de los clientes
app.use(morgan('dev'));

//Metodo que permite interpretar los elementos json enviados/recibidos
app.use(express.json());

//llamamos a las rutas a utilizar
app.use(router);

//Indicamos a la aplicación cual es el puerto
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
