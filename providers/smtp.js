const nodemailer = require("nodemailer");
const provider = require("./provider");

class SMTP extends provider {

    name = "smtp";
    
    parameters = {
        required: {
            smtpHost: "Server Host",
            smtpPort: "Server Port",
            smtpSecure: "TLS?",
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
            smtpCC: "",
            smtpBCC: "",
            html: "",
            attachments: ""
        }
    };

    parameters() {
        return this.parameters;
    }

    async send(notification) {

        const config = {
            host: notification.required.smtpHost,
            port: notification.required.smtpPort,
            secure: notification.required.smtpSecure,
            tls: {
                rejectUnauthorized: notification.optional.smtpIgnoreTLSError || false,
            }
        };

        // Fix #1129
        if (notification.optional.smtpDkimDomain) {
            config.dkim = {
                domainName: notification.optional.smtpDkimDomain,
                keySelector: notification.optional.smtpDkimKeySelector,
                privateKey: notification.optional.smtpDkimPrivateKey,
                hashAlgo: notification.optional.smtpDkimHashAlgo,
                headerFieldNames: notification.optional.smtpDkimheaderFieldNames,
                skipFields: notification.optional.smtpDkimskipFields,
            };
        }

        // Should fix the issue in https://github.com/louislam/uptime-kuma/issues/26#issuecomment-896373904
        if (notification.optional.smtpUsername || notification.optional.smtpPassword) {
            config.auth = {
                user: notification.optional.smtpUsername,
                pass: notification.optional.smtpPassword,
            };
        }

        let transporter = nodemailer.createTransport(config);

        // send mail with defined transport object
        await transporter.sendMail({
            from: notification.required.smtpFrom,
            cc: notification.optional.smtpCC,
            bcc: notification.optional.smtpBCC,
            to: notification.required.smtpTo,
            subject: notification.required.subject,
            text: notification.required.text,
            html: notification.optional.html,
            attachments: notification.optional.attachments
        });

        return "Sent Successfully.";
    }
}

module.exports = SMTP;