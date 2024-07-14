interface Message {
  send(): void;
}

abstract class MessageFactory {
  public abstract createMessage(): Message;
}

class EmailMessage implements Message {
  send() {
    console.log("Отправка электронного письма...");
  }
}

class EmailMessageFactory extends MessageFactory {
  createMessage(): Message {
    return new EmailMessage();
  }
}

class SMSMessage implements Message {
  send() {
    console.log("Отправка SMS...");
  }
}

class SMSMessageFactory extends MessageFactory {
  createMessage(): Message {
    return new SMSMessage();
  }
}

class PushMessage implements Message {
  send() {
    console.log("Отправка push-уведомления...");
  }
}

class PushMessageFactory extends MessageFactory {
  createMessage(): Message {
    return new PushMessage();
  }
}

function sendMessage(factory: MessageFactory) {
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
