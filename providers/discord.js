const provider = require("./provider");
const axios = require("axios");

class Discord extends provider {

	name = "discord";
    
	parameters = {
		required: {
			discordWebhookUrl: "",
			text: ""
		},
		optional: {
			discordUsername: ""
		}
	};

	async send(notification) {
		try {
			let data = {
				username: notification.optional.discordUsername,
				content: notification.required.text,
			};

			await axios.post(notification.required.discordWebhookUrl, data);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Discord;