const provider = require("./provider");
const axios = require("axios");

class Matrix extends provider {

	name = "matrix";
    
	parameters = {
		required: {
			matrixHomeServerUrl: "",
			matrixAccessToken: "",
			matrixRoomId: "",
			text: ""
		},
		optional: {}
	};

	async send(notification) {
		try {
			let serverUrl = notification.required.matrixHomeServerUrl + "/_matrix/client/r0/rooms/" + notification.required.matrixRoomId + "/send/m.room.message?access_token=" + notification.required.matrixAccessToken;
			let config = {
				headers: {
					"Content-Type": "application/json"
				}
			};
			let data = {
				"msgtype": "m.text",
				"body": notification.required.text
			};


			await axios.post(serverUrl, data, config);
            
			return "Sent Successfully.";
		} catch (err) {
			return err;
		}
	}
}

module.exports = Matrix;