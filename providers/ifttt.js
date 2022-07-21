
const provider = require("./provider");
const axios = require("axios");

class Ifttt extends provider {

	name = "ifttt";
    
	parameters = {
		required: {
			iftttServiceKey: "",
			eventName: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let data = {
				"text": notification.required.text,
			};
			let config = {};

			let iftttUrl = "https://maker.ifttt.com/trigger/" + notification.required.eventName + "/json/with/key/" + notification.required.iftttServiceKey;

			await axios.post(iftttUrl, data, config);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Ifttt;