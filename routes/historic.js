var express = require('express');
var axios = require('axios');
var router = express.Router();
const pdf_generator = require('../middleware/pdf_generator');

router.use((req, res, next) => {
  req.session.title = [{
    'section': "QA Sprint History",
    'url': "/historic"}
  ]
  next();
});

router.get('/', async(req, res) => {
  try {
    var r_data = {};
    const config = {
      headers: {
        'Authorization': `Bearer ${req.session.token}`
      }
    };

    var response = await axios.get(ApiURL + "/storic", config);
    r_data.json_response = response.data;
    r_data.session = req.session;

    res.render('sprint_history', r_data);

  } catch (error) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API en Python:', error);
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
});

router.get('/id/:id', async(req, res) => {
  const id = req.params.id;
  try {
    
    var response = await axios.get(ApiURL + `/storic/get/${id}`);
    var data = response.data; 

    res.json(data);

  } catch (e) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API en Python:', e);
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
});

router.post('/generate_pdf', async (req, res) => {
  const id = req.body.id;
  var response = await axios.get(ApiURL + `/storic/get/${id}`);
  var jsonData = response.data;
  //order = ['Commons', 'Rocket', 'Nakama', 'Sputnik', 'Heyday', 'Smith']
  order = ['nebulaSUITE', 'nebulaUSERS', 'nebulaID', 'nebulaCERT', 'nebulaSIGN', 'Otras tecnologias'];
  try {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename= ' + jsonData.sprint + '.pdf');
    doc = await pdf_generator(jsonData)
    doc.pipe(res);
  } catch (e){
    console.error("Error generating pdf:", e)
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
})

router.delete('/delete/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${req.session.token}`
      }
    };
    var response = await axios.delete(ApiURL + `/storic/delete/${id}`, config);
    req.session.delete = {'status': true, 'msg':`Sprint ${response.data.sprint} has been deleted`};
    res.status(200).json(response.data)
  } catch (e) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API en Python:', e);
    req.session.delete = {'status': false, 'msg':`Error deleting Sprint ${id}`};
    res.status(403).json(response.data)
  }
});

module.exports = router;