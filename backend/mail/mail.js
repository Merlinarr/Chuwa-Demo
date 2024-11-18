"use strict";
const { attachment } = require("express/lib/response");
const nodemailer = require("nodemailer");
const fs = require("fs");

// async..await is not allowed in global scope, must use a wrapper
exports.Send_Mail = async function (mailTxT, username) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "", // generated ethereal password
    },
  });
  const options = {
    from: ``, // sender address
    to: username, // list of receivers
    bcc: "",
    subject: ``, // Subject line
    // text: mailTxT, // plain text body
    html: mailTxT, // html body
  };
  // send mail with defined transport object
  await transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    // fs.appendFile(
    //   "email_noreply.txt",
    //   `\n*********************\n[${new Date().toLocaleString()}]\n*********************\nFrom: ${
    //     options.from
    //   }\nTo: ${options.to}\nSubject: ${options.subject}\nMessage: ${
    //     options.text
    //   }\nEmail sent: ${info.response}\n`,
    //   (err) => {
    //     if (err) throw err;
    //     console.log("Email log updated.");
    //   }
    // );
  });
};
