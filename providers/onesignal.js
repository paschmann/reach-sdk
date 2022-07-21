const provider = require("./provider");
const axios = require("axios");

class OneSignal extends provider {

	name = "onesignal";
    
	parameters = {
		required: {
			onesignalAppId: "",
			onesignalApiKey: "",
			playerId: "",
			text: "",
			subject: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			const serverUrl = "https://onesignal.com/api/v1/notifications";

			const data = {
				app_id: notification.required.onesignalAppId,
				include_player_ids: [notification.required.playerId],
				email_subject: notification.required.subject,
				email_body: notification.required.text
			};

			let config = {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Basic " + notification.required.onesignalApiKey,
					"Accept": "application/json",
				}
			};

			await axios.post(serverUrl, JSON.stringify(data), config);

			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = OneSignal;