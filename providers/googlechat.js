const provider = require("./provider");
const axios = require("axios");

class GoogleChat extends provider {

	name = "googlechat";
    
	parameters = {
		required: {
			googleChatWebhookUrl: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let data = {
				text: notification.required.text,
			};

			await axios.post(notification.required.googleChatWebhookUrl, data);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = GoogleChat;