
const{ Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized:false
    }
});


//Devuelve verdadero si el numero es un entero, falso en caso contrario.
function esEntero(numero){
    if (numero % 1 == 0) {
        return true;
    } else {
        return false;
    }
}


//Bandas
const getBandas = async (req, res) => {
    let cant = req.query.count;
    
    var response = await pool.query('SELECT * FROM bandas');
    if(cant > 0){
         response = await pool.query('SELECT * FROM bandas LIMIT $1', [cant]);
    }
        
    for (let i = 0; i <  response.rows.length; i++) {
        response.rows[i].imagen = 'https://wikimusik-servicio-web.herokuapp.com/banda/'+ response.rows[i].id+'/imagen';
    }

    res.json(response.rows);  
}

const getBandasById = async (req, res) => {
        /*const id = req.params.id;
        if(esEntero(id)){//Compruebo si el id es un entero.
            const response = await pool.query('SELECT * FROM bandas WHERE id = $1', [id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro la banda.
                res.status(404).json();
            }else{//Se encontro la banda.
                response.rows[0].imagen = 'https://wikimusik-servicio-web.herokuapp.com/banda/'+id+'/imagen';
                res.json(response.rows);
            }
        }else{
            res.status(400).json();
        }*/
        const id = req.params.id;
        if(esEntero(id)){//Compruebo si el id es un entero.
          const response = await pool.query('SELECT bandas.nombre AS nombre, integrantes, descripcion, origen, historia, imagen, generos.nombre AS genero FROM (bandas INNER JOIN generos ON bandas.genero_id=generos.id) WHERE bandas.id = $1', [id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro la banda.
                res.status(404).json();
            }else{//Se encontro la banda.
                response.rows[0].imagen = 'https://wikimusik-servicio-web.herokuapp.com/banda/'+id+'/imagen';
                res.json(response.rows);
            }
        }else{
            res.status(400).json();
        }
}

const getBandasFromGeneroId = async (req, res) => {
    const id = req.params.id;
    if(esEntero(id)){//Compruebo si el id es un entero.
        const response = await pool.query('SELECT * FROM bandas WHERE genero_id = $1', [id]);
        if(response.rows.length == 0){//Si esta vacio, no se encontraron bandas.
            res.status(404).json();
        }else{//Se encontraron bandas.
            for (let i = 0; i <  response.rows.length; i++) {
                response.rows[i].imagen = 'https://wikimusik-servicio-web.herokuapp.com/banda/'+ response.rows[i].id+'/imagen';
            }
            res.json(response.rows);
        }
    }else{
        res.status(400).json();
    }
}


//Obtener imagen de banda con su id.
/*const getImageBanda = async (req, res) => {
        if(esEntero(req.params.id)){//Compruebo si el id es un entero.
            const response = await pool.query("SELECT encode(imagen,'base64') FROM bandas where id = $1", [req.params.id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro la imagen de la banda.
                res.status(404).json();
            }else{//Se encontro la imagen de la banda
                var respuesta = Buffer.from(response.rows[0].encode, 'base64');
                var rta=respuesta.toString('utf-8');
                const mimeType = 'imagen/png';
                res.send(`<img src="data:${mimeType};base64,${rta}"/>`);
            }
        }else{
            res.status(400).json();
        }
}*/


const getImageBanda = async (req,res) => {
    try{
        const id=req.params.id;
        if (esEntero(id)){
            const fs = require('fs');
            const response = await pool.query("SELECT encode(imagen,'base64') FROM bandas where id = $1", [id]);
            //console.log(response.rows[0].encode);
            var respuesta=Buffer.from(response.rows[0].encode,'base64');
            var rta=respuesta.toString('utf-8');
            let buff = Buffer.from(rta, 'base64');
            fs.writeFileSync('imagen.jpg', buff, function (err) {
                console.log('File created');
            });
            const mimeType = 'image/jpg';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.write(buff);
            res.end();
        }
        else
            res.status(403).send();
    }
    catch(err){
        res.status(404).send({
            "name": "Not Found Exception",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}


//Albumes
const getAlbumes = async (req, res) => {
    const response = await pool.query('SELECT * FROM albumes');
    for (let i = 0; i <  response.rows.length; i++) {
        response.rows[i].imagen = 'https://wikimusik-servicio-web.herokuapp.com/album/'+ response.rows[i].id+'/imagen';
    }
    res.json(response.rows);
}

const getAlbumesById = async (req, res) => {
        const id = req.params.id;
        if(esEntero(id)){//Compruebo si el id es un entero.
            const response = await pool.query('SELECT * FROM albumes WHERE id = $1', [id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro el album.
                res.status(404).json();
            }else{//Se encontro el album.
                response.rows[0].imagen = 'https://wikimusik-servicio-web.herokuapp.com/album/'+id+'/imagen';
                res.json(response.rows);
            }
        }else{
            res.status(400).json();
        }
}

const getAlbumesFromBandaId = async (req, res) => {
    const id = req.params.id;
    if(esEntero(id)){//Compruebo si el id es un entero.
        const response = await pool.query('SELECT * FROM albumes WHERE banda_id = $1', [id]);
        if(response.rows.length == 0){//Si esta vacio, no se encontraron los albumes.
            res.status(404).json();
        }else{//Se encontraron los albumes.
            for (let i = 0; i <  response.rows.length; i++) {
                response.rows[i].imagen = 'https://wikimusik-servicio-web.herokuapp.com/album/'+ response.rows[i].id+'/imagen';
            }
            res.json(response.rows);
        }
    }else{
        res.status(400).json();
    }
}

/*
//Obtener imagen de album con su id.
const getImageAlbum = async (req, res) => {
        if(esEntero(req.params.id)){//Compruebo si el id es un entero.
            const response = await pool.query("SELECT encode(imagen,'base64') FROM albumes where id = $1", [req.params.id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro la imagen del album.
                res.status(404).json();
            }else{//Se encontro la imagen del album.
                var respuesta = Buffer.from(response.rows[0].encode, 'base64');
                var rta=respuesta.toString('utf-8');
                const mimeType = 'imagen/png';
                res.send(`<img src="data:${mimeType};base64,${rta}"/>`);
            }
        }else{
            res.status(400).json();
        }
}
*/

const getImageAlbum = async (req,res) => {
    try{
        const id=req.params.id;
        if (esEntero(id)){
            const fs = require('fs');
            const response = await pool.query("SELECT encode(imagen,'base64') FROM albumes where id = $1", [id]);
            //console.log(response.rows[0].encode);
            var respuesta=Buffer.from(response.rows[0].encode,'base64');
            var rta=respuesta.toString('utf-8');
            let buff = Buffer.from(rta, 'base64');
            fs.writeFileSync('imagen.jpg', buff, function (err) {
                console.log('File created');
            });
            const mimeType = 'image/jpg';
            res.writeHead(200, { 'Content-Type': mimeType });
            res.write(buff);
            res.end();
        }
        else
            res.status(403).send();
    }
    catch(err){
        res.status(404).send({
            "name": "Not Found Exception",
            "message": "The requested resource was not found.",
            "code": 0,
            "status": 404
        });
    }
}











//Canciones
const getCanciones = async (req, res) => {
    const response = await pool.query('SELECT * FROM canciones');
    res.json(response.rows);
}

const getCancionesById = async (req, res) => {
        const id = req.params.id;
        if(esEntero(id)){//Compruebo si el id es un entero.
            const response = await pool.query('SELECT * FROM canciones WHERE id = $1', [id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro la cancion.
                res.status(404).json();
            }else{//Se encontro la cancion.
                res.json(response.rows);
            }
        }else{
            res.status(400).json();
        }
}

const getCancionesFromAlbumId = async (req, res) => {
    const id = req.params.id;
    if(esEntero(id)){//Compruebo si el id es un entero.
        const response = await pool.query('SELECT * FROM canciones WHERE album_id = $1', [id]);
        if(response.rows.length == 0){//Si esta vacio, no se encontraron canciones.
            res.status(404).json();
        }else{//Se encontraron canciones.
            res.json(response.rows);
        }
    }else{
        res.status(400).json();
    }
}

const getGeneros = async (req, res) => {
    const response = await pool.query('SELECT * FROM generos');
    res.json(response.rows);
}

const getGenerosById = async (req, res) => {
        const id = req.params.id;
        if(esEntero(id)){//Compruebo si el id es un entero.
            const response = await pool.query('SELECT * FROM generos WHERE id = $1', [id]);
            if(response.rows.length == 0){//Si esta vacio, no se encontro el genero.
                res.status(404).json();
            }else{//Se encontro el genero.
                res.json(response.rows);
            }
        }else{
            res.status(400).json();
        }
}

module.exports = {
    getBandas,
    getAlbumes,
    getCanciones,
    getGeneros,
    getBandasById,
    getAlbumesById,
    getCancionesById,
    getGenerosById,
    getImageBanda,
    getImageAlbum,
    getAlbumesFromBandaId,
    getCancionesFromAlbumId,
    getBandasFromGeneroId
}