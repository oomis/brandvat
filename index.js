const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, ".", "build")));

app.post("/contact/message", (req, res) => {
    console.log(req.body);
    const { name, service, telePhone, email, message } = req.body;
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "Brandvatdigital@gmail.com",
            pass: "11aspilicueta11"
        }
    });

    var mailOptions = {
        from: "Brandvatdigital@gmail.com",
        to: `${email}`,
        subject: "Thank You for contacting us",
        text: `
      Your message has been recieved, we will contact you soonest.

      Yours Sincerely,
      BrandVat Team.
    `
    };

    var mailOptionss = {
        from: "Brandvatdigital@gmail.com",
        to: `Brandvatdigital@gmail.com`,
        subject: `New message from ${email} via website`,
        text: `
     ${name} has sent a message to you from the website.
     Here are the details.
     Name: ${name}
     Email: ${email}
     Telephone: ${telePhone}
     service interested in: ${service}
     How we want to be Help: ${message}

     Yours Sincerely,
     BrandVat Team.
    `
    };

    transporter.sendMail(mailOptionss, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            return res.json({ err: "message not sent" });
        } else {
            console.log("Email sent: " + info.response);
            return res.json({ message: { name: email, data: info.response } });
        }
    });
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, ".", "build", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`express app listening on port ${port}`);