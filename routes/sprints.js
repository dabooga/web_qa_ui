var express = require('express');
var axios = require('axios');
const pdf_generator = require('../middleware/pdf_generator');
var router = express.Router();
const FormData = require('form-data');
const { PassThrough } = require('stream');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


let json_response_data = {}

router.use((req, res, next) => {
  req.session.title = [{
    'section': "Sprint Closing",
    'url': "/sprint"}
  ];
  next();
});

router.get('/', async(req, res) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${req.session.token}`
      }
    };
    const response = await axios.get(ApiURL + "/sprint", config);
    res.render('sprint_close', { jsonSprints: response.data , session: req.session});
  } catch (error) {
    // Manejar errores
    if (error.response){
      console.log(error.response.status)
      if (error.response.status === 401){
        res.render("login", {"error_msg" :"Error token expired"})
      }else{
        res.redirect("/")
      }
    }else{
      console.log(error)
      res.status(500).json({ error: 'Error al consultar la API en Python' });
    }
  }
});

router.get('/id/:id', async(req, res) => {
  const id = req.params.id;
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${req.session.token}`
      }
    };
    var response = await axios.get(ApiURL + `/sprint/info/${id}`, config);
    json_response_data = response.data;
    req.session.title.push({'section': json_response_data.sprint, 'url': ""});
    res.json(json_response_data);
  } catch (e) {
    // Manejar errores
    console.error('Error al hacer la solicitud a la API en Python:', e);
    res.status(500).json({ error: 'Error al consultar la API en Python' });
  }
});

router.post('/generate_pdf', upload.none(), async (req, res) => {
  try {
    json_response_data['comments'] = req.body.comments;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename= ' + json_response_data.sprint + '.pdf');
    const doc = await pdf_generator(json_response_data)
    doc.pipe(res);
  } catch (e){
    console.error("Error generating pdf:", e)
    res.status(500).json({error: 'Error al consultar la API en Python' });
  }
})


router.post('/close', upload.none(), async (req, res) => {
  try{
    json_response_data['comments'] = req.body.comments
    const doc = await pdf_generator(json_response_data, false)
    const pdfStream = new PassThrough();
    doc.pipe(pdfStream);
    
    const form = new FormData();
    form.append('sprint_id', req.body.sprint_id);
    form.append('comments', req.body.comments);
    form.append('key', req.body.key);
    form.append('pdf', pdfStream, {
      filename: `${json_response_data.sprint.replace(" #", "__")}.pdf`,
    });

    const config = {
      headers: {
        'Authorization': `Bearer ${req.session.token}`,
        ...form.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };
  
    const response = await axios.post(ApiURL + `/storic/add`, form, config);
    req.session.added = {'status': true, 'msg':`Sprint ${response.data.sprint} has been added`};
    res.status(200).json({'status': 'ok'})
  }catch (e){
    console.error("Error en closing sprint: ", e);
    res.status(500).json({error: 'Error en closing sprint' });
  }
})

module.exports = router;