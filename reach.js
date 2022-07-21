const SMTP = require("./providers/smtp");
const SES = require("./providers/ses");
const Slack = require("./providers/slack");
const Telegram = require("./providers/telegram");
const Discord = require("./providers/discord");
const Alerta = require("./providers/alerta");
const ClickSendSMS = require("./providers/clicksendsms");
const GoogleChat = require("./providers/googlechat");
const Line = require("./providers/line");
const Teams = require("./providers/teams");
const Signal = require("./providers/signal");
const SendGrid = require("./providers/sendgrid");
const Webhook = require("./providers/webhook");
const Bark = require("./providers/bark");
const Gitter = require("./providers/gitter");
const Ifttt = require("./providers/ifttt");
const Mailgun = require("./providers/mailgun");
const Matrix = require("./providers/matrix");
const Mattermost = require("./providers/mattermost");
const OneSignal = require("./providers/onesignal");
const PagerDuty = require("./providers/pagerduty");


class Reach {
	providers = {};

	static init() {
		this.providers = {};
		this.providers["smtp"] = new SMTP();
		this.providers["ses"] = new SES();
		this.providers["slack"] = new Slack();
		this.providers["telegram"] = new Telegram();
		this.providers["discord"] = new Discord();
		this.providers["alerta"] = new Alerta();
		this.providers["clicksendsms"] = new ClickSendSMS();
		this.providers["line"] = new Line();
		this.providers["teams"] = new Teams();
		this.providers["googlechat"] = new GoogleChat();
		this.providers["signal"] = new Signal();
		this.providers["webhook"] = new Webhook();
		this.providers["sendgrid"] = new SendGrid();
		this.providers["bark"] = new Bark();
		this.providers["gitter"] = new Gitter();
		this.providers["ifttt"] = new Ifttt();
		this.providers["mailgun"] = new Mailgun();
		this.providers["matrix"] = new Matrix();
		this.providers["mattermost"] = new Mattermost();
		this.providers["onesignal"] = new OneSignal();
		this.providers["pagerduty"] = new PagerDuty();
	}

	static async send(notification) {
		if (this.providers[notification.name]) {
			return this.providers[notification.name].send(notification);
		} else {
			throw new Error("Notification type is not supported");
		}
	}

	static listProviders() {
		var list = [];
		for (let [key] of Object.entries(this.providers)) {
			list.push(key);
		}
		return list;
	}

	static parameters(name) {
		if (this.providers[name]) {
			return this.providers[name].parameters;
		} else {
			throw new Error("Notification type is not supported");
		}
	}
}

module.exports = {
	Reach
};