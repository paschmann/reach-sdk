const { Reach } = require("../reach");
Reach.init();

const smtp_notification = {
	name: "smtp",
	required: {
		smtpHost: "",
		smtpPort: "",
		smtpSecure: false,
		smtpFrom: "",
		smtpTo: "",
		subject: "Subject",
		text: "Text"
	},
	optional: {
		smtpIgnoreTLSError: "True/False - Boolean",
		smtpDkimDomain: "",
		smtpDkimKeySelector: "",
		smtpDkimPrivateKey: "",
		smtpDkimHashAlgo: "",
		smtpDkimheaderFieldNames: "",
		smtpDkimskipFields: "",
		smtpUsername: "",
		smtpPassword: "",
		smtpCC: "",
		smtpBCC: "",
		html: "<html><body>Test</body></html>",
		attachments: []
	},
}

const ses_notification = {
	name: "ses",
	required: {
		accessKeyId: "",
		secretAccessKey: "",
		from: "",
		to: "",
		subject: "Subject",
		text: "Text"
	},
	optional: {
		cc: "",
		bcc: "",
		html: "<html><body>Test</body></html>",
		attachments: []
	}
}

const slack_notification = {
	name: "slack",
	required: {
		slackwebhookURL: "",
		text: ""
	},
	optional: {

	}
}

const telegram_notification = {
	name: "telegram",
	required: {
		telegramBotToken: "Bot token",
		telegramChatID: "Chat Id",
		text: "Text"
	},
	optional: {}
};

// Examples
//console.log(Reach.send(smtp_notification));
//console.log(Reach.send(ses_notification));
console.log(Reach.listProviders());
//console.log(Reach.parameters('ses'));