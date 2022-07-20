const provider = require("./provider");
const axios = require("axios");

class Webhook extends provider {

	name = "webhook";
    
	parameters = {
		required: {
			webhookUrl: "",
			text: ""
		},
		optional: {
			payload: ""
		}
	};

	async send(notification) {
		try {
			let data = {
				text: notification.required.text,
				payload: notification.optional.payload
			};

			await axios.post(notification.required.webhookUrl, data);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Webhook;