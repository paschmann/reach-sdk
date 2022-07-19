const provider = require("./provider");
const axios = require("axios");

class Line extends provider {

	name = "line";
    
	parameters = {
		required: {
			lineChannelAccessToken: "",
			lineUserID: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let lineApiUrl = "https://api.line.me/v2/bot/message/push";
			let config = {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer " + notification.required.lineChannelAccessToken
				}
			};
			let data = {
				to: notification.required.lineUserID,
				messages: [
					{
						"type": "text",
						"text": notification.required.text
					}
				]
			};


			await axios.post(lineApiUrl, data, config);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Line;