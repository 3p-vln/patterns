interface BaseCardBuilder {
  addElement(type: string, content: string): BaseCardBuilder;
  build(): string;
}

class SimpleCardBuilder implements BaseCardBuilder {
  private elements: { type: string; content: string }[] = [];

  public addElement(type: string, content: string): BaseCardBuilder {
    this.elements.push({ type, content });
    return this;
  }

  public build(): string {
    let cardHtml = `<div class="card simple">`;
    this.elements.forEach((el) => {
      if (el.type === "image") {
        cardHtml += `<img src="${el.content}">`;
      } else if (el.type === "title") {
        cardHtml += `<div class="card-title">${el.content}</div>`;
      } else if (el.type === "description") {
        cardHtml += `<div class="card-description">${el.content}</div>`;
      } else if (el.type === "button") {
        cardHtml += `<a href="#" class="card-button">${el.content}</a>`;
      }
    });
    cardHtml += `</div>`;
    return cardHtml;
  }

  public reset(): void {
    this.elements = [];
  }
}

class DetailedCardBuilder implements BaseCardBuilder {
  private elements: { type: string; content: string }[] = [];

  public addElement(type: string, content: string): BaseCardBuilder {
    this.elements.push({ type, content });
    return this;
  }

  public build(): string {
    let cardHtml = `<div class="card detailed">`;
    this.elements.forEach((el) => {
      if (el.type === "image") {
        cardHtml += `<img src="${el.content}">`;
      } else if (el.type === "title") {
        cardHtml += `<div class="card-title">${el.content}</div>`;
      } else if (el.type === "description") {
        cardHtml += `<div class="card-description">${el.content}</div>`;
      } else if (el.type === "button") {
        cardHtml += `<a href="#" class="card-button">${el.content}</a>`;
      }
    });
    cardHtml += `</div>`;
    return cardHtml;
  }

  public reset(): void {
    this.elements = [];
  }
}

class Director {
  private builder: BaseCardBuilder | null = null;

  public setBuilder(builder: BaseCardBuilder): void {
    this.builder = builder;
  }

  public constructSimpleCard(): void {
    if (this.builder) {
      this.builder
        .addElement("title", "Simple Card Title")
        .addElement("description", "This is a simple card.")
        .addElement("button", "Learn More");
    }
  }

  public constructDetailedCard(): void {
    if (this.builder) {
      this.builder
        .addElement("title", "Detailed Card Title")
        .addElement("image", "https://via.placeholder.com/150")
        .addElement("description", "This is a detailed card with more content.")
        .addElement("button", "Read More");
    }
  }
}

function getCardBuilder(cardType: string): BaseCardBuilder {
  switch (cardType) {
    case "simple":
      return new SimpleCardBuilder();
    case "detailed":
      return new DetailedCardBuilder();
    default:
      throw new Error("Unknown card type");
  }
}

let currentBuilder: BaseCardBuilder | null = null;

function buildAndDisplayCard(): void {
  const cardType = (document.getElementById("cardType") as HTMLSelectElement)
    .value;

  if (
    currentBuilder === null ||
    currentBuilder.constructor.name.toLowerCase() !== cardType + "cardbuilder"
  ) {
    currentBuilder = getCardBuilder(cardType);
  }

  const elementType = (
    document.getElementById("elementType") as HTMLSelectElement
  ).value;
  const elementContent = (
    document.getElementById("elementContent") as HTMLInputElement
  ).value;

  currentBuilder.addElement(elementType, elementContent);

  const cardHtml = currentBuilder.build();
  const cardContainer = document.getElementById("cardContainer");
  if (cardContainer) {
    cardContainer.innerHTML = cardHtml;
  }
}

function resetCardBuilder(): void {
  currentBuilder = null;

  const cardContainer = document.getElementById("cardContainer");
  if (cardContainer) {
    cardContainer.innerHTML = "";
  }

  (document.getElementById("elementType") as HTMLSelectElement).value = "title";
  (document.getElementById("elementContent") as HTMLInputElement).value = "";
  (document.getElementById("cardType") as HTMLSelectElement).value = "simple";
}

document.getElementById("addElement")?.addEventListener("click", () => {
  buildAndDisplayCard();
});
document
  .getElementById("buildCard")
  ?.addEventListener("click", buildAndDisplayCard);
document
  .getElementById("resetCard")
  ?.addEventListener("click", resetCardBuilder);
