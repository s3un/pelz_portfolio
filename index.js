const express = require("express");
const path = require("path");
const app = new express();

const port = 3000;

app.use(express.static(path.join(__dirname, './static')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './static/index.html'));
      
})

app.post('/contact', (request, response) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", //replace with your email provider
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
  var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
  var mail = {
    from: "your_account@gmail.com", // sender address
    to: "your_account@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
    subject: "Mail From Contact Form", // Subject line
    text: textBody,
    html: htmlBody
  };

  transporter.sendMail(mail, function (err, info) {
		if(err) {
			console.log(err);
			response.json({ message: "message not sent: an error occured; check the server's console log" });
		}
		else {
			response.json({ message: `message sent: ${info.messageId}` });
		}
	});
})
app.listen(port, () => {
    console.log(`App listen on port ${port}`);
});