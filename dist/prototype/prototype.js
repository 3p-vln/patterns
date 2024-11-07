"use strict";
var _a;
class Prototype {
    constructor() {
        this.primitive = null;
        this.component = null;
        this.circularReference = null;
    }
    clone() {
        const clone = Object.create(this);
        if (this.component) {
            clone.component = this.component.cloneNode(true);
        }
        if (this.circularReference) {
            clone.circularReference = new ComponentWithBackReference(clone);
        }
        return clone;
    }
}
class ComponentWithBackReference {
    constructor(prototype) {
        this.prototype = prototype;
    }
}
const widgetPrototype = new Prototype();
widgetPrototype.component = document.createElement("div");
widgetPrototype.component.className = "widget";
widgetPrototype.component.innerHTML = `
    <div class="title">Default Title</div>
    <div class="content">Default content goes here.</div>
    <button class="edit-button">Edit</button>
`;
widgetPrototype.circularReference = new ComponentWithBackReference(widgetPrototype);
function renderWidget(prototype) {
    const widgetContainer = document.getElementById("widget-container");
    if (widgetContainer && prototype.component) {
        widgetContainer.appendChild(prototype.component);
        const editButton = prototype.component.querySelector(".edit-button");
        if (editButton) {
            editButton.addEventListener("click", () => {
                const newTitle = prompt("Enter new title:", "Default Title");
                const newContent = prompt("Enter new content:", "Default content goes here.");
                if (newTitle !== null) {
                    const titleElement = prototype.component.querySelector(".title");
                    if (titleElement)
                        titleElement.textContent = newTitle;
                }
                if (newContent !== null) {
                    const contentElement = prototype.component.querySelector(".content");
                    if (contentElement)
                        contentElement.textContent = newContent;
                }
            });
        }
    }
}
(_a = document
    .getElementById("clone-widget-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const widgetContainer = document.getElementById("widget-container");
    const lastWidget = widgetContainer === null || widgetContainer === void 0 ? void 0 : widgetContainer.lastElementChild;
    if (lastWidget) {
        const prototype = lastWidget.cloneNode(true);
        const newPrototype = new Prototype();
        newPrototype.component = prototype;
        newPrototype.circularReference = new ComponentWithBackReference(newPrototype);
        renderWidget(newPrototype);
    }
});
renderWidget(widgetPrototype);
