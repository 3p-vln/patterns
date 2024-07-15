// Abstract Factory
interface MessageAbstractFactory {
  createTextMessage(): TextMessage;
  createMediaMessage(): MediaMessage;
}

// Abstract Products
interface TextMessage {
  sendMessage(content: string, recipient: string): void;
}

interface MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void;
}

// Concrete Products for Email
class EmailTextMessage implements TextMessage {
  sendMessage(content: string, recipient: string): void {
      console.log(`Sending email to ${recipient}: ${content}`);
  }
}

class EmailMediaMessage implements MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void {
      console.log(`Sending email with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`);
  }
}

// Concrete Products for SMS
class SmsTextMessage implements TextMessage {
  sendMessage(content: string, recipient: string): void {
      console.log(`Sending SMS to ${recipient}: ${content}`);
  }
}

class SmsMediaMessage implements MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void {
      console.log(`Sending SMS with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`);
  }
}

// Concrete Products for Push Notifications
class PushTextMessage implements TextMessage {
  sendMessage(content: string, recipient: string): void {
      console.log(`Sending push notification to ${recipient}: ${content}`);
  }
}

class PushMediaMessage implements MediaMessage {
  sendMessage(content: string, recipient: string, mediaUrl: string): void {
      console.log(`Sending push notification with media to ${recipient}: ${content}, Media URL: ${mediaUrl}`);
  }
}

// Concrete Factories
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

class PushMessageAbstractFactory implements MessageAbstractFactory {
  createTextMessage(): TextMessage {
      return new PushTextMessage();
  }

  createMediaMessage(): MediaMessage {
      return new PushMediaMessage();
  }
}

// Client Code
function clientCode(factory: MessageAbstractFactory) {
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
