const provider = require("./provider");
const axios = require("axios");

class Gitter extends provider {

	name = "gitter";
    
	parameters = {
		required: {
			accessToken: "",
			roomId: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			const gitterHost = "https://api.gitter.im/v1";
			let config = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Accept": "application/json",
					"Authorization": "Bearer " + notification.required.accessToken,
				}
			};
			const gitterMessagesUrl = gitterHost + "/rooms/" + notification.required.roomId + "/chatMessages";
			let data = {
				text: notification.required.text,
			};

			await axios.post(gitterMessagesUrl, data, config);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Gitter;