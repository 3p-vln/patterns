interface IPrototype {
  primitive: any;
  component: HTMLElement | null;
  circularReference: ComponentWithBackReference | null;
  clone(): this;
}

interface IComponentWithBackReference {
  prototype: IPrototype;
}

class Prototype implements IPrototype {
  public primitive: any = null;
  public component: HTMLElement | null = null;
  public circularReference: ComponentWithBackReference | null = null;

  public clone(): this {
    const clone = Object.create(this) as Prototype;

    if (this.component) {
      clone.component = this.component.cloneNode(true) as HTMLElement;
    }

    if (this.circularReference) {
      clone.circularReference = new ComponentWithBackReference(clone);
    }

    return clone as this;
  }
}

class ComponentWithBackReference implements IComponentWithBackReference {
  public prototype: IPrototype;

  constructor(prototype: IPrototype) {
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
widgetPrototype.circularReference = new ComponentWithBackReference(
  widgetPrototype
);

function renderWidget(prototype: IPrototype) {
  const widgetContainer = document.getElementById("widget-container");
  if (widgetContainer && prototype.component) {
    widgetContainer.appendChild(prototype.component);

    const editButton = prototype.component.querySelector(".edit-button");
    if (editButton) {
      editButton.addEventListener("click", () => {
        const newTitle = prompt("Enter new title:", "Default Title");
        const newContent = prompt(
          "Enter new content:",
          "Default content goes here."
        );
        if (newTitle !== null) {
          const titleElement = prototype.component!.querySelector(".title");
          if (titleElement) titleElement.textContent = newTitle;
        }
        if (newContent !== null) {
          const contentElement = prototype.component!.querySelector(".content");
          if (contentElement) contentElement.textContent = newContent;
        }
      });
    }
  }
}

document
  .getElementById("clone-widget-button")
  ?.addEventListener("click", () => {
    const widgetContainer = document.getElementById("widget-container");
    const lastWidget = widgetContainer?.lastElementChild as HTMLElement | null;
    if (lastWidget) {
      const prototype = widgetPrototype.circularReference?.prototype;
      if (prototype) {
        const clonedWidget = prototype.clone();
        renderWidget(clonedWidget);
      }
    }
  });

renderWidget(widgetPrototype);
