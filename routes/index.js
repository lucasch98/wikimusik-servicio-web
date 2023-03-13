const { Router } = require('express');
const router = Router();


const { getBandas, getAlbumes, getCanciones, getGeneros, getBandasById, 
    getAlbumesById, getCancionesById, getGenerosById, getImageBanda, 
    getImageAlbum, getAlbumesFromBandaId, getCancionesFromAlbumId, getBandasFromGeneroId } = require('../controllers/index.controller');

    
//Bandas

/**
 * @swagger
 * /bandas:
 *  get:
 *    description: Obtiene la informacion de todas las bandas
 *    tags:
 *      - Banda
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/bandas', getBandas);

/**
 * @swagger
 * /banda/{id}:
 *  get:
 *    description: Obtiene una banda en especifico
 *    tags:
 *      - Banda
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) de la banda
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro la banda solicitada 
 *      default:
 *        description: Error inesperado
 */
router.get('/banda/:id', getBandasById);

/**
 * @swagger
 * /banda/{id}/imagen:
 *  get:
 *    description: Obtiene la imagen de una banda en especifico
 *    tags:
 *      - Banda
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) de la banda
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico) 
 *      '404':
 *        description: No se encontro la imagen solicitada
 *      default:
 *        description: Error inesperado
 */
router.get('/banda/:id/imagen', getImageBanda);


/**
 * @swagger
 * /genero/{id}/bandas:
 *  get:
 *    description: Obtiene las bandas que son de ese genero
 *    tags:
 *      - Banda
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) del genero
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro bandas asociadas al genero solicitado
 *      default:
 *        description: Error inesperado
 */
router.get('/genero/:id/bandas' , getBandasFromGeneroId);//Me traigo las bandas que son del genero :id



//Albumes

/**
 * @swagger
 * /albumes:
 *  get:
 *    description: Obtiene la informacion de todos los albumes
 *    tags:
 *      - Album
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/albumes', getAlbumes);

/**
 * @swagger
 * /album/{id}:
 *  get:
 *    description: Obtiene un album en especifico
 *    tags:
 *      - Album
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) del album
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro el album solicitado
 *      default:
 *        description: Error inesperado
 */
router.get('/album/:id', getAlbumesById);

/**
 * @swagger
 * /album/{id}/imagen:
 *  get:
 *    description: Obtiene la imagen de un album en especifico
 *    tags:
 *      - Album
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) del album
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico) 
 *      '404':
 *        description: No se encontro la imagen solicitada
 *      default:
 *        description: Error inesperado
 */
router.get('/album/:id/imagen', getImageAlbum);

/**
 * @swagger
 * /banda/{id}/albumes:
 *  get:
 *    description: Obtiene los albumes de la banda en especifico
 *    tags:
 *      - Album
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) de la banda
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro los albumes de la banda solicitada 
 *      default:
 *        description: Error inesperado
 */
router.get('/banda/:id/albumes' , getAlbumesFromBandaId);//Me traigo los albumes de la banda :id



//Canciones


/**
 * @swagger
 * /canciones:
 *  get:
 *    description: Obtiene la informacion de todas las canciones
 *    tags:
 *      - Cancion
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/canciones', getCanciones);

/**
 * @swagger
 * /cancion/{id}:
 *  get:
 *    description: Obtiene una cancion en especifico
 *    tags:
 *      - Cancion
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) de la cancion
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro la cancion solicitada 
 *      default:
 *        description: Error inesperado
 */
router.get('/cancion/:id', getCancionesById);


/**
 * @swagger
 * /album/{id}/canciones:
 *  get:
 *    description: Obtiene las canciones que son del album en especifico
 *    tags:
 *      - Cancion
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) del album
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro las canciones del album solicitado
 *      default:
 *        description: Error inesperado
 */
router.get('/album/:id/canciones' , getCancionesFromAlbumId);//Me traigo las canciones que son del album :id



//Generos

/**
 * @swagger
 * /generos:
 *  get:
 *    description: Obtiene la informacion de todos los generos
 *    tags:
 *      - Genero
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      default:
 *        description: Error inesperado
 */
router.get('/generos', getGeneros);

/**
 * @swagger
 * /genero/{id}:
 *  get:
 *    description: Obtiene un genero en especifico
 *    tags:
 *      - Genero
 *    parameters:
 *      - in: path
 *        name: id
 *        description: Es la id (numero) del genero
 *        required: true
 *        schema:
 *          type: integer
 *    responses:
 *      '200':
 *        description: Respuesta exitosa
 *      '400':
 *        description: Id ingresada invalida (el tipo no es numerico)
 *      '404':
 *        description: No se encontro el genero solicitado
 *      default:
 *        description: Error inesperado
 */
router.get('/genero/:id', getGenerosById);


module.exports = router;

