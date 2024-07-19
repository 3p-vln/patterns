interface MessageAbstractFactory {
  createTextMessage(): TextMessage;
  createMediaMessage(): MediaMessage;
}

interface TextMessage {
  sendMessage(content: string, recipient: string): void;
}

interface MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void;
}

class EmailTextMessage implements TextMessage {
  sendMessage(content: string, recipient: string): void {
    console.log(`Sending email to ${recipient}: ${content}`);
  }
}

class EmailMediaMessage implements MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void {
    console.log(
      `Sending email with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`
    );
  }
}

class SmsTextMessage implements TextMessage {
  sendMessage(content: string, recipient: string): void {
    console.log(`Sending SMS to ${recipient}: ${content}`);
  }
}

class SmsMediaMessage implements MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void {
    console.log(
      `Sending SMS with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`
    );
  }
}

class EmailMessageAbstractFactory implements MessageAbstractFactory {
  createTextMessage(): TextMessage {
    return new EmailTextMessage();
  }

  createMediaMessage(): MediaMessage {
    return new EmailMediaMessage();
  }
}

class SmsMessageAbstractFactory implements MessageAbstractFactory {
  createTextMessage(): TextMessage {
    return new SmsTextMessage();
  }

  createMediaMessage(): MediaMessage {
    return new SmsMediaMessage();
  }
}

function clientCode(factory: MessageAbstractFactory) {
  const textMessage = factory.createTextMessage();
  const mediaMessage = factory.createMediaMessage();

  textMessage.sendMessage("Hello World!", "recipient@example.com");
  mediaMessage.sendMessage(
    "Hello World with Media!",
    "recipient@example.com",
    "http://example.com/media.jpg"
  );
}

console.log("Client: Testing client code with EmailMessageAFactory...");
clientCode(new EmailMessageAbstractFactory());

console.log("");

console.log("Client: Testing client code with SmsMessageFactory...");
clientCode(new SmsMessageAbstractFactory());

console.log("");
