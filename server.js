const express = require('express');
const router = express.Router();
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(5000, () => console.log('Server Running'));

const contactEmail = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'admin@directitc.com',
        pass: 'd52JIL*ATfaJT#!LspoDLtpMTytCmYtT',
    },
});

contactEmail.verify((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Ready to Send');
    }
});

router.post('/contact', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    console.log('name', name);
    console.log('email', email);
    console.log('message', message);
    const mail = {
        from: email,
        to: 'admin@directitc.com',
        subject: 'Contact Form Submission',
        html: `<p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Message: ${message}</p>`,
    };

    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: 'ERROR' });
        } else {
            res.json({ status: 'Message Sent' });
        }
    });
});