var express = require('express');
var axios = require('axios');
var router = express.Router();

/* GET users listing. */

router.get('/', async(req, res) => {
  try {
    // Realizar una solicitud GET a la API
    //const response = await axios.get(ApiURL + "/saludo"); // Reemplaza con la URL de tu API en Python
    //const data = response.data; // Datos de la respuesta de la API

    // Enviar la respuesta de la API como respuesta en la ruta
    //res.json(data);

    console.log("DDDDDDDDDDDDDDDDD")
  } catch (error) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API en Python:', error);
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
});

module.exports = router;