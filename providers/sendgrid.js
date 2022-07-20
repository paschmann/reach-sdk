
const provider = require("./provider");
const axios = require("axios");

class SendGrid extends provider {

	name = "sendgrid";

	parameters = {
		required: {
			sendgridApiKey: "",
			to: "",
			from: "",
			subject: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			const sendGridUrl = "https://api.sendgrid.com/v3/mail/send";
			let data = {
				"personalizations":
					[
						{
							"to": 
								[
									{
										"email": notification.required.to
									}
								]
						}
					],
				"from": {
					"email": notification.required.from
				},
				"subject": notification.required.subject,
				"content": [
					{
						"type": "text/plain",
						"value": notification.required.text
					}
				]
			};
			let config = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Authorization": "Bearer " + notification.required.sendgridApiKey,
				}
			};

			await axios.post(sendGridUrl, data, config);

			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = SendGrid;