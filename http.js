/*
Usage: (WIP + Not working correctly)

const ReachHttp = require("./../http");
var http = new ReachHttp();

//await http.post(notification.required.teamsWebhookUrl, {}, data);

*/


const https = require("https");
const Buffer = require("Buffer");

class ReachHttp {

	async post(url, config, data) {
		const dataString = JSON.stringify(data);

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			timeout: 1000, // in ms
		};

		options.headers = { ...options.headers, config};

		return new Promise((resolve, reject) => {
			const req = https.request(url, options, (res) => {
				if (res.statusCode < 200 || res.statusCode > 299) {
					return reject(new Error(`HTTP status code ${res.statusCode}`));
				}

				const body = [];
				res.on("data", (chunk) => body.push(chunk));
				res.on("end", () => {
					const resString = Buffer.concat(body).toString();
					resolve(resString);
				});
			});

			req.on("error", (err) => {
				reject(err);
			});

			req.on("timeout", () => {
				req.destroy();
				reject(new Error("Request time out"));
			});

			req.write(dataString);
			req.end();
		});
	}
}

module.exports = ReachHttp;