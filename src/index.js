const express = require('express');
const app = express();
const morgan = require('morgan');

// Configuración
app.set('port', process.env.PORT || 3000);
app.set('json spaces',2);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(require('./routes/index'));
app.use('/api/movies',require('./routes/movies'));

// Iniciando el servidor

app.listen(app.get('port'),() => {
    console.log(`Server on port ${app.get('port')}`);
});