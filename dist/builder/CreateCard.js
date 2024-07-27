"use strict";
var _a, _b, _c;
class SimpleCardBuilder {
    constructor() {
        this.elements = [];
    }
    addElement(type, content) {
        this.elements.push({ type, content });
        return this;
    }
    build() {
        let cardHtml = `<div class="card simple">`;
        this.elements.forEach((el) => {
            if (el.type === "image") {
                cardHtml += `<img src="${el.content}">`;
            }
            else if (el.type === "title") {
                cardHtml += `<div class="card-title">${el.content}</div>`;
            }
            else if (el.type === "description") {
                cardHtml += `<div class="card-description">${el.content}</div>`;
            }
            else if (el.type === "button") {
                cardHtml += `<a href="#" class="card-button">${el.content}</a>`;
            }
        });
        cardHtml += `</div>`;
        return cardHtml;
    }
    reset() {
        this.elements = [];
    }
}
class DetailedCardBuilder {
    constructor() {
        this.elements = [];
    }
    addElement(type, content) {
        this.elements.push({ type, content });
        return this;
    }
    build() {
        let cardHtml = `<div class="card detailed">`;
        this.elements.forEach((el) => {
            if (el.type === "image") {
                cardHtml += `<img src="${el.content}">`;
            }
            else if (el.type === "title") {
                cardHtml += `<div class="card-title">${el.content}</div>`;
            }
            else if (el.type === "description") {
                cardHtml += `<div class="card-description">${el.content}</div>`;
            }
            else if (el.type === "button") {
                cardHtml += `<a href="#" class="card-button">${el.content}</a>`;
            }
        });
        cardHtml += `</div>`;
        return cardHtml;
    }
    reset() {
        this.elements = [];
    }
}
class Director {
    constructor() {
        this.builder = null;
    }
    setBuilder(builder) {
        this.builder = builder;
    }
    constructSimpleCard() {
        if (this.builder) {
            this.builder
                .addElement("title", "Simple Card Title")
                .addElement("description", "This is a simple card.")
                .addElement("button", "Learn More");
        }
    }
    constructDetailedCard() {
        if (this.builder) {
            this.builder
                .addElement("title", "Detailed Card Title")
                .addElement("image", "https://via.placeholder.com/150")
                .addElement("description", "This is a detailed card with more content.")
                .addElement("button", "Read More");
        }
    }
}
function getCardBuilder(cardType) {
    switch (cardType) {
        case "simple":
            return new SimpleCardBuilder();
        case "detailed":
            return new DetailedCardBuilder();
        default:
            throw new Error("Unknown card type");
    }
}
let currentBuilder = null;
function buildAndDisplayCard() {
    const cardType = document.getElementById("cardType")
        .value;
    if (currentBuilder === null ||
        currentBuilder.constructor.name.toLowerCase() !== cardType + "cardbuilder") {
        currentBuilder = getCardBuilder(cardType);
    }
    const elementType = document.getElementById("elementType").value;
    const elementContent = document.getElementById("elementContent").value;
    currentBuilder.addElement(elementType, elementContent);
    const cardHtml = currentBuilder.build();
    const cardContainer = document.getElementById("cardContainer");
    if (cardContainer) {
        cardContainer.innerHTML = cardHtml;
    }
}
function resetCardBuilder() {
    currentBuilder = null;
    const cardContainer = document.getElementById("cardContainer");
    if (cardContainer) {
        cardContainer.innerHTML = "";
    }
    document.getElementById("elementType").value = "title";
    document.getElementById("elementContent").value = "";
    document.getElementById("cardType").value = "simple";
}
(_a = document.getElementById("addElement")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    buildAndDisplayCard();
});
(_b = document
    .getElementById("buildCard")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", buildAndDisplayCard);
(_c = document
    .getElementById("resetCard")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", resetCardBuilder);
