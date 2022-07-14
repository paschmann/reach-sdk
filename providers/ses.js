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
            to: "",
            subject : "",
            text: ""
        },
        optional: {
            cc: "",
            bcc: "",
            html: "",
            attachments: ""
        }
    };

    parameters() {
        return this.parameters;
    }

    async send(notification) {
        try {
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
                subject: notification.required.subject,
                text: notification.required.text,
                html: notification.optional.html,
                attachments: notification.optional.attachments
            });
    
            return "Sent Successfully.";
        } catch (err) {
            return err;
        }
    }
}

module.exports = SES;