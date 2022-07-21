const provider = require("./provider");
const axios = require("axios");

class PagerDuty extends provider {

	name = "pagerduty";
    
	parameters = {
		required: {
			pagerDutyApiKey: "",
			pagerDutyRoutingKey: "",
			eventAction: "",
			source: "",
			severity: "",
			text: "Test"
		},
		optional: {
			dedup_key: "",
			timestamp: "",
			component: "",
			group: "",
			class: "",
			custom_details: {}
		}
	};

	async send(notification) {
		try {
			const serverUrl = "https://events.pagerduty.com/v2/enqueue";

			const data = {
				routing_key: notification.required.pagerDutyRoutingKey,
				event_action: notification.required.eventAction,
				... (notification.optional.dedup_key && { timestamp: notification.optional.dedup_key }),
				payload: {
					summary: notification.required.text,
					source: notification.required.source,
					severity: notification.required.severity,
					... (notification.optional.timestamp && { timestamp: notification.optional.timestamp }),
					... (notification.optional.component && { component: notification.optional.component }),
					... (notification.optional.group && { group: notification.optional.group }),
					... (notification.optional.class && { class: notification.optional.class }),
					... (notification.optional.custom_details && { custom_details: notification.optional.custom_details })
				}
			};

			let config = {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Basic " + notification.required.pagerDutyApiKey,
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

module.exports = PagerDuty;