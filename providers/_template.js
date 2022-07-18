// This is a non-functioning template to use as a reference when creating a new provider
// Please import this provider and declare it in root reach.js file

const provider = require("./provider");

// Import any dependencies, be sure to include them in the package.json file
const axios = require("axios");

// Change the class name
class Slack extends provider {

	// Required - name of the provider
	name = "slack";
    
	// Define the required and optional parameters for the provider
	parameters = {
		required: {
			auth: "accessKey",
			subject : "",
			text: ""
		},
		optional: {
			cc: "",
			bcc: ""
		}
	};

	async send(notification) {
		try {
			// Use this send method to process the notification, you should reference the parameters using notificiation.required or notification.optional
            
			// Example: Send email with defined transporter object
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