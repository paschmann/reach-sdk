const provider = require("./provider");
const axios = require("axios");

class Bark extends provider {

	name = "bark";
    
	parameters = {
		required: {
			barkApiUrl: "",
			deviceKey: "",
			title: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let data = {
				"device_key": notification.required.deviceKey,
				"title": notification.required.title,
				"body": notification.required.text
			};

			await axios.post(notification.required.barkApiUrl + "/push", data);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Bark;