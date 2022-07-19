const provider = require("./provider");
const axios = require("axios");

class Alerta extends provider {

	name = "alerta";
    
	parameters = {
		required: {
			alertaApiKey: "",
			alertaApiEndpoint: "",
			alertaEnvironment: "",
			group: "",
			event: "",
			resource: "",
			text: ""
		},
		optional: {
			value: "",
			tags: [""],
			origin: "",
			type: "",
			service: [""],
			correlate: [""],
			severity: ""
		}
	};

	async send(notification) {
		try {
			let alertaUrl = notification.required.alertaApiEndpoint;
			let config = {
				headers: {
					"Content-Type": "application/json;charset=UTF-8",
					"Authorization": "Key " + notification.required.alertaApiKey,
				}
			};
			let data = {
				environment: notification.required.alertaEnvironment,
				service: notification.optional.service,
				value: notification.optional.value,
				tags: notification.optional.tags,
				origin: notification.optional.origin,
				type: notification.optional.type,
				correlate: notification.optional.correlate,
				severity: notification.optional.severity
			};

			let postData = Object.assign({
				text: notification.required.text,
				event: notification.required.event,
				group: notification.required.group,
				resource: notification.required.resource,
			}, data);

			await axios.post(alertaUrl, postData, config);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Alerta;