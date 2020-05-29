if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

//Initializations
const app = express();
require('./database')


//setings
app.set('port', 3000);


//Middlewares
app.use(morgan('dev'));
app.use(cors());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//routes
app.use('/api/books', require('./routes/books'));

//static files
app.use(express.static(path.join(__dirname, 'public')));


//Start server 
app.listen(app.get('port'), ()=>{
    console.log('Servidor en el puerto: ', app.get('port'));
})
