const express = require("express");
const path = require("path");
const app = new express();
const mailgun = require("mailgun-js")
const api_key = "7cd6e59c0c7b00edb9fa3fd601be7981-30344472-525df09d"
const domain = "sandboxbf551d2c3ba94ffcaa80235c39bbe01c.mailgun.org"
const mg = mailgun({apiKey: api_key, domain: domain});


// const mg = mailgun.client({
// 	username: process.env.USER,
// 	key: process.env.PASS,

// });

const port = 3000;

app.use(express.json())


app.use(express.static(path.join(__dirname, './static')));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, './static/index.html'));
      
})

app.post('/contact', (request, response) => {
  // const transporter = nodemailer.createTransport({
  //   host: "smtp.sendgrid.net", //replace with your email provider
  //   port: 25,
  //   auth: {
  //     user: process.env.EMAIL,
  //     pass: process.env.PASS,
  //   },
  // });
  var textBody = `FROM: ${request.body.name} EMAIL: ${request.body.email} MESSAGE: ${request.body.message}`;
  var htmlBody = `<h2>Mail From Contact Form</h2><p>from: ${request.body.name} <a href="mailto:${request.body.email}">${request.body.email}</a></p><p>${request.body.message}</p>`;
  var mail = {
    from: "your_account@gmail.com", // sender address
    to: "oyebowalemuiz@gmail.com", // list of receivers (THIS COULD BE A DIFFERENT ADDRESS or ADDRESSES SEPARATED BY COMMAS)
    subject: "Mail From Contact Form", // Subject line
    text: textBody,
    html: htmlBody
  };

  // mg.messages
	// .create(sandboxbf551d2c3ba94ffcaa80235c39bbe01c.mailgun.org, {
	// 	from: "Mailgun Sandbox <postmaster@sandboxbf551d2c3ba94ffcaa80235c39bbe01c.mailgun.org>",
	// 	to: ["oyebowalemuiz@gmail.com"],
	// 	subject: "Hello",
	// 	text: textBody,
  //   html: htmlBody
	// })
	// .then(msg => {
    
  //   console.log(msg)
  //   response.json({ message: `message sent` });
  // }) // logs response data
	// .catch(err => {
  //   console.log(err)
  //   response.json({ message: "message not sent: an error occured; check the server's console log" });
  // }); 

  mg.messages().send(mail, function (err, info) {
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