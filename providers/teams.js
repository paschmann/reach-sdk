const provider = require("./provider");
const axios = require("axios");

class Teams extends provider {

	name = "teams";
    
	parameters = {
		required: {
			teamsWebhookUrl: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let data = {
				text: notification.required.text,
			};

			await axios.post(notification.required.teamsWebhookUrl, data);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Teams;