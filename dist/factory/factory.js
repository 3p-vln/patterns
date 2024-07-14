"use strict";
class MessageFactory {
}
class EmailMessage {
    send() {
        console.log("Отправка электронного письма...");
    }
}
class EmailMessageFactory extends MessageFactory {
    createMessage() {
        return new EmailMessage();
    }
}
class SMSMessage {
    send() {
        console.log("Отправка SMS...");
    }
}
class SMSMessageFactory extends MessageFactory {
    createMessage() {
        return new SMSMessage();
    }
}
class PushMessage {
    send() {
        console.log("Отправка push-уведомления...");
    }
}
class PushMessageFactory extends MessageFactory {
    createMessage() {
        return new PushMessage();
    }
}
function sendMessage(factory) {
    const message = factory.createMessage();
    message.send();
}
console.log("App: Отправка сообщения с помощью Email.");
sendMessage(new EmailMessageFactory());
console.log("");
console.log("App: Отправка сообщения с помощью SMS.");
sendMessage(new SMSMessageFactory());
console.log("");
console.log("App: Отправка сообщения с помощью Push.");
sendMessage(new PushMessageFactory());
