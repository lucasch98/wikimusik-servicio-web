const express = require('express');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 5000
const app = express();
app.use(cors());

  //routes
 app.use(require('./routes/index'));

 //middleware
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));
 app.listen(PORT);

 const swaggerUiExpress = require('swagger-ui-express');
 const swaggerJsdoc = require('swagger-jsdoc');


 const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "WikiMusik API",
        version: "1.0.0",
        description:
          "Documentacion WikiMusik API",
        contact: {
          name: "Lucas Cervelli Haderne",
        },
      },
      servers: [
        {
          url: "https://wikimusik-servicio-web.herokuapp.com/",
        },
      ],
    },
    apis: ["./routes/index.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(specs)
  );
