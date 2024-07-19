"use strict";
class EmailTextMessage {
    sendMessage(content, recipient) {
        console.log(`Sending email to ${recipient}: ${content}`);
    }
}
class EmailMediaMessage {
    sendMessage(content, recipient, mediaUrl) {
        console.log(`Sending email with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`);
    }
}
class SmsTextMessage {
    sendMessage(content, recipient) {
        console.log(`Sending SMS to ${recipient}: ${content}`);
    }
}
class SmsMediaMessage {
    sendMessage(content, recipient, mediaUrl) {
        console.log(`Sending SMS with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`);
    }
}
class EmailMessageAbstractFactory {
    createTextMessage() {
        return new EmailTextMessage();
    }
    createMediaMessage() {
        return new EmailMediaMessage();
    }
}
class SmsMessageAbstractFactory {
    createTextMessage() {
        return new SmsTextMessage();
    }
    createMediaMessage() {
        return new SmsMediaMessage();
    }
}
function clientCode(factory) {
    const textMessage = factory.createTextMessage();
    const mediaMessage = factory.createMediaMessage();
    textMessage.sendMessage("Hello World!", "recipient@example.com");
    mediaMessage.sendMessage("Hello World with Media!", "recipient@example.com", "http://example.com/media.jpg");
}
console.log("Client: Testing client code with EmailMessageAFactory...");
clientCode(new EmailMessageAbstractFactory());
console.log("");
console.log("Client: Testing client code with SmsMessageFactory...");
clientCode(new SmsMessageAbstractFactory());
console.log("");
