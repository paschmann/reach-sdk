const nodemailer = require('nodemailer');
var ses = require('nodemailer-ses-transport');
const provider = require("./provider");

class SES extends provider {

    name = "ses";
    
    parameters = {
        required: {
            accessKeyId: "accessKeyId",
            secretAccessKey: "secretAccessKey",
            from: "",
            to: ""
        },
        optional: {
            cc: "",
            bcc: ""
        },
        runtime: {
            subject : "",
            text: "",
            html: "",
            attachments: ""
        }
    };

    parameters() {
        return this.parameters;
    }

    async send(notification) {
        
        const config = {
            accessKeyId: notification.required.accessKeyId,
            secretAccessKey: notification.required.secretAccessKey
        };

        let transporter = nodemailer.createTransport(ses(config));

        // send mail with defined transport object
        await transporter.sendMail({
            from: notification.required.from,
            cc: notification.optional.cc,
            bcc: notification.optional.bcc,
            to: notification.required.to,
            subject: notification.runtime.subject,
            text: notification.runtime.text,
            html: notification.runtime.html,
            attachments: notification.runtime.attachments
        });

        return "Sent Successfully.";
    }
}

module.exports = SES;