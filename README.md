# Reach SDK
Reach is a node.js module for sending notifications focused on simplicity and extensibility. The project was developed to support my various node.js projects because I got tired of redeveloping the same functionality in each of them.

If you would like to test out the basic concept, check out the <A href='https://www.github.com/paschmann/reach-ui' target='_blank'>Reach UI</a>. It is a basic UI which lets you send test notifications for each provider using your parameters.

## Installing

```
npm install --save reach-sdk
```

## Usage

1. Import, create and instatiate an instance of Reach.

```
const { Reach } = require('reach-sdk');
Reach.init();
```
2. Send a notification (E.g. Slack)

```
const slack_notification = {
    name: 'slack',
    required: {
        slackwebhookURL: "Your webhook URL",
        text: "Your text message"
    },
    optional: {}
}

console.log(Reach.send(slack_notification));
```



## Providers

Notification providers are services which the Reach SDK can send messages to. The Reach SDK has been designed to allow contributors to create or add their own custom provider. If you would like to create, or improve one for a service not currently offered, check out the template in the providers folder, and submit a pull request.

Below are a list of notifications that Reach currently supports.

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
Please follow your hosting providers instructions for setting up and getting the above parameters.

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
TL;DR - Open your workspace settings, create a new app, get the webhook details from the Incoming Webhooks page.

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
In Discord, open the channel settings and select Integrations. Create a new webhook and Copy the Webhook URL into the discordWebhookUrl parameter. The discordUsername can be any string, if empty, it will be the bots name which was provided when creating the webhook.

<hr>

## Telegram

```
    parameters = {
        required: {
            telegramBotToken: "Bot token",
            telegramChatID: "Chat Id",
            text: "Text"
        },
        optional: {}
    };
```

#### Setup
Create a bot using the @botfather channel. Take note of the Access Token.To get the chat_id parameter, create a new group chat and add your new bot, also add @RawDataBot. This will print out the chat object, and in it will be the id.