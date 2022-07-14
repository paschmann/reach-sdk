const provider = require("./provider");
const axios = require("axios");

class Telegram extends provider {

    name = "telegram";
    
    parameters = {
        required: {
            telegramBotToken: "Bot token",
            telegramChatID: "Chat Id",
            text: "Text"
        },
        optional: {}
    };

    async send(notification) {
        try {
            await axios.get(`https://api.telegram.org/bot${notification.required.telegramBotToken}/sendMessage`, {
                params: {
                    chat_id: notification.required.telegramChatID,
                    text: notification.required.text,
                },
            });
    
            return "Sent Successfully.";
        } catch (err) {
            return err;
        }
    }
}

module.exports = Telegram;