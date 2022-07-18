const provider = require("./provider");
const axios = require("axios");

class Slack extends provider {

	name = "slack";
    
	parameters = {
		required: {
			slackwebhookURL: "",
			text: ""
		},
		optional: {
            
		}
	};

	async send(notification) {
		try {
			let data = {
				"text": notification.required.text
			};

			await axios.post(notification.required.slackwebhookURL, data);
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Slack;