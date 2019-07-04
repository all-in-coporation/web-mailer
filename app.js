const app = require('express')();
var bodyParser = require('body-parser');
var helper = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const http = require('http');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

let httpServer = http.createServer(app);
httpServer.listen(80);

app.post('/send-mail', function(req, res, next) {
    var from_email = new helper.Email(process.env.SENDGRID_TO);
    var to_email = new helper.Email(process.env.SENDGRID_TO);
    var subject = 'Mensaje recibido desde el formulario: '+ req.body.subject;
    var content = new helper.Content('text/plain', 'Nombre: ' + req.body.name + ', email: ' + req.body.emailFrom + ', asunto: ' + req.body.subject + ', Mensaje: ' + req.body.message);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });
      
    sg.API(request, function(error, response) {
        if (error) {
            res.status(500).send({
                message: 'Server fail'
            });
        } else {
            res.send({message: 'Success'});
        }
    });
});

app.post('/add-mail', function(req, res, next) {
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/contactdb/recipients',
        body: [{
            "email": req.body.mail
        }],
    });
      
    sg.API(request, function(error, response) {
        if (error) {
            res.status(500).send({
                message: 'Server fail'
            });
        } else {
            res.send({message: 'Success'});
        }
    });
});

app.all('*', function (req, res, next) {
    res.redirect('https://allinigthapp.com');
});
