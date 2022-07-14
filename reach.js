const SMTP = require("./providers/smtp");
const SES = require("./providers/ses");
const Slack = require("./providers/slack");

class Reach {
    providers = {};

    static init() {
        this.providers = {};
        this.providers['smtp'] = new SMTP();
        this.providers['ses'] = new SES();
        this.providers['slack'] = new Slack();
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
        for (let [key, _value] of Object.entries(this.providers)) {
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