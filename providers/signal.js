
const provider = require("./provider");
const axios = require("axios");

class Signal extends provider {

	name = "signal";
    
	parameters = {
		required: {
			signalUrl: "",
			signalNumber: "",
			signalRecipients: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let data = {
				"message": notification.required.text,
				"number": notification.required.signalNumber,
				"recipients": notification.required.signalRecipients.replace(/\s/g, "").split(","),
			};
			let config = {};

			await axios.post(notification.required.signalUrl, data, config);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Signal;