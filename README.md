# Reach SDK
Reach is a node.js module for sending notifications focused on simplicity and extensibility. The project was developed to support my various node.js projects, because I got tired of redeveloping the same functionality in each of them. What's unique about this project? In most cases apps traditionally support a limited set fo notification methods, such as email, push notifications or sms, but in some cases, users would prefer being notified in some other way, such as Slack, Whatsapp, Telegram or Discord, or even all of them. The Reach SDK lets your app users select and configure their own notification methods. 

Some more context, I built the module to support a project called <a href="https://www.github.com/paschmann/changd" target="_blank">Changd</a>, which is a website monitoring tool. Using the Reach SDK allows users to select a myriad of notification methods to be used, without the the underlying project having to implement, manage or maintain these options.

If you would like to test out the concept, check out the <A href='https://www.github.com/paschmann/reach-ui' target='_blank'>Reach UI</a>. It is a basic web app that lets you configure and send test notifications for each provider using your own parameters.

## Installing

```
npm install --save reach-sdk
```

## Usage

All notification providers have one common required parameter, named text. The property name is the same across all provider types to ensure that the recipient recieves the notification on any of their selected platforms.

1. Import, create, and instantiate an instance of Reach.

```
const { Reach } = require('reach-sdk');
Reach.init();
```
2. Send a notification (E.g. Slack)

```
const text = "Your order has been received!";

const slack_notification = {
    name: "slack",
    required: {
        slackwebhookURL: "The users webhook URL",
        text: text
    }
}

const discord_notification = {
    name: "discord",
    required: {
		discordWebhookUrl: "The users discord webhook URL",
		text: text
	},
}

console.log(Reach.send(slack_notification));
```



## Providers

Notification providers are services to which the Reach SDK can send messages to. The Reach SDK has been designed to allow contributors to create or add their own custom providers. If you would like to create or improve one for a service not currently offered, check out the <a href="providers/_template.js" target="_blank">_template</a> in the provider's folder, and submit a pull request.

Below is a list of notifications that Reach currently supports.

<hr>

## Amazon SES
#### Parameters
```
        required: {
            accessKeyId: "accessKeyId",
            secretAccessKey: "secretAccessKey",
            from: "",
            to: "",
            subject : "",
            text: ""
        },
        optional: {
            cc: "",
            bcc: "",
            html: "",
            attachments: ""
        }
```

#### Setup
Please follow this document to setup SES: <a href='https://docs.aws.amazon.com/ses/latest/dg/setting-up.html' target='_blank'>Guide</a>

<hr>

## Discord

#### Parameters
```
        required: {
            discordWebhookUrl: "",
            text: ""
        },
        optional: {
            discordUsername: ""
        }
```
#### Setup
In Discord, open the channel settings and select Integrations. Create a new webhook and Copy the Webhook URL into the discordWebhookUrl parameter. The discordUsername can be any string, if empty, it will be the bots name that was provided when creating the webhook.

<hr>

## SMTP
```
        required: {
            smtpHost: "Server Host",
            smtpPort: "Server Port",
            smtpFrom: "",
            smtpTo: "",
            subject : "",
            text: ""
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
            smtpSecure: "TLS?",
            smtpCC: "",
            smtpBCC: "",
            html: "",
            attachments: ""
        }
```

#### Setup
Please follow your hosting providers' instructions for setting up and getting the above parameters.

<hr>

## Slack
```
        required: {
            slackwebhookURL: "",
            text: ""
        },
        optional: {}
```
#### Setup
Follow this guide to create a webhook: <a href='https://api.slack.com/messaging/webhooks'>Guide</a>. 
TL;DR - Open your workspace settings, create a new app and get the webhook details from the Incoming Webhooks page.

<hr>

## Telegram

```
        required: {
            telegramBotToken: "Bot token",
            telegramChatID: "Chat Id",
            text: "Text"
        },
        optional: {}
```

#### Setup
Create a bot using the @botfather channel. Take note of the Access Token. To get the chat_id parameter, create a new group chat and add your new bot, also add @RawDataBot. This will print out the chat object, and in the object will be the TelegramChatID.