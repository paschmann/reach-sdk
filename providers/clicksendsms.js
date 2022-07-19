const provider = require("./provider");
const axios = require("axios");
const Buffer = require("Buffer");

class ClickSendSMS extends provider {

	name = "clicksendsms";
    
	parameters = {
		required: {
			clicksendsmsLogin: "",
			clicksendsmsApiKey: "",
			clicksendsmsToNumber: "",
			clicksendsmsSenderName: "",
			source: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let config = {
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Basic " + Buffer.from(notification.required.clicksendsmsLogin + ":" + notification.required.clicksendsmsApiKey).toString("base64"),
					"Accept": "text/json",
				}
			};
			let data = {
				messages: [
					{
						"body": notification.required.text.replace(/[^\x00-\x7F]/g, ""),
						"to": notification.required.clicksendsmsToNumber,
						"source": notification.optional.source,
						"from": notification.required.clicksendsmsSenderName,
					}
				]
			};
			let resp = await axios.post("https://rest.clicksend.com/v3/sms/send", data, config);
			if (resp.data.data.messages[0].status !== "SUCCESS") {
				let error = resp.data.data.messages[0].status;
				this.throwGeneralAxiosError(error);
			}
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = ClickSendSMS;