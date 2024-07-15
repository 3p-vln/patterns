"use strict";
// Concrete Products for Email
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
// Concrete Products for SMS
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
// Concrete Products for Push Notifications
class PushTextMessage {
    sendMessage(content, recipient) {
        console.log(`Sending push notification to ${recipient}: ${content}`);
    }
}
class PushMediaMessage {
    sendMessage(content, recipient, mediaUrl) {
        console.log(`Sending push notification with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`);
    }
}
// Concrete Factories
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
class PushMessageAbstractFactory {
    createTextMessage() {
        return new PushTextMessage();
    }
    createMediaMessage() {
        return new PushMediaMessage();
    }
}
// Client Code
function clientCode(factory) {
    const textMessage = factory.createTextMessage();
    const mediaMessage = factory.createMediaMessage();
    textMessage.sendMessage("Hello World!", "recipient@example.com");
    mediaMessage.sendMessage("Hello World with Media!", "recipient@example.com", "http://example.com/media.jpg");
}
// Testing
console.log("Client: Testing client code with EmailMessageAFactory...");
clientCode(new EmailMessageAbstractFactory());
console.log("");
console.log("Client: Testing client code with SmsMessageFactory...");
clientCode(new SmsMessageAbstractFactory());
console.log("");
console.log("Client: Testing client code with PushMessageFactory...");
clientCode(new PushMessageAbstractFactory());
