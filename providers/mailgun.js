const provider = require("./provider");
const nodemailer = require('nodemailer');

class MailGun extends provider {

	name = "mailgun";
    
	parameters = {
		required: {
			smtpUsername: "",
			smtpPassword: "",
			smtpFrom: "",
			smtpTo: "",
			subject : "",
			text: ""
		},
		optional: {
			smtpCC: "",
			smtpBCC: "",
			html: "",
			attachments: ""
		}
	};

	async send(notification) {
		try {
			const config = {
				host: "smtp.mailgun.org",
				port: "587",
				secure: false,
				tls: {
					rejectUnauthorized: false,
				},
				auth: {
					user: notification.required.smtpUsername,
					pass: notification.required.smtpPassword,
				}
			};
    
			let transporter = nodemailer.createTransport(config);
    
			await transporter.sendMail({
				from: notification.required.smtpFrom,
				cc: notification.optional.smtpCC,
				bcc: notification.optional.smtpBCC,
				to: notification.required.smtpTo,
				subject: notification.required.subject,
				text: notification.required.text,
				html: notification.optional.html,
				attachments: notification.optional.attachments
			});
    
			return "Message Sent";
		} catch (err) {
			return err;
		}
	}
}

module.exports = MailGun;