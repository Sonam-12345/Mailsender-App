const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set("view engine", "ejs");

//create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "palsonam6307@gmail.com",
    pass: "rdhxjvxhcoloizte"
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/send", function(req, res){
  res.render("send");
})

app.post("/", function(req, res){

  let mailOptions = {
    to: req.body.to,                                      //"palpriyanka8960@gmail.com"
    from: "palsonam6307@gmail.com",
    subject:req.body.subject ,                            //"nodemailer"
    text: req.body.content                               //"This is my Second mail to you"

  };
  console.log(mailOptions);

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) {
      console.log(err);

    } else {
      console.log(' mail sent');
      res.redirect("send");
    }
  });


})

 // send mail with defined transport object



app.listen(3000, function(){
  console.log("Server running on 3000 port");
});
