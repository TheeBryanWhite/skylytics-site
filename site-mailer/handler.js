'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

function sendEmail(formData, callback) {

  const emailParams = {
    Source: '',
    ReplyToAddresses: [formData.email],
    Destination: {
      ToAddresses: [''],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Good news, everyone! We just got a submission from the Contact Form from ${formData.name}\n\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\n\nMessage\n${formData.message}`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `Contact form submission from ${formData.company}`,
      },
    },
  };

  SES.sendEmail(emailParams, callback);
}

module.exports.staticSiteMailer = (event, context, callback) => {
  const formData = JSON.parse(event.body);
  
  sendEmail(formData, function mailCB(err, data) {
    const response = {
      statusCode: err ? 502 : 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
      },
      body: JSON.stringify({
        message: err ? err.message : data,
      }),
    };
    
    callback(null, response);
  });
};
