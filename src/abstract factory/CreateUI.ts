function addStyles(): void {
  const style = document.createElement("style");
  style.textContent = `
      /* Загальні стилі для кнопок */
      .button {
          padding: 10px;
          border: none;
          cursor: pointer;
          font-size: 16px;
          border-radius: 5px;
          margin: 5px;
      }

      /* Стилі для кнопок Windows */
      .windows-button {
          background-color: red;
          color: white;
      }

      /* Стилі для кнопок Mac */
      .mac-button {
          background-color: black;
          color: white;
      }

      /* Стилі для чекбоксів Windows */
      .windows-checkbox input[type="checkbox"] {
          accent-color: #0078D7;
      }

      /* Стилі для чекбоксів Mac */
      .mac-checkbox input[type="checkbox"] {
          accent-color: #007AFF;
      }
  `;
  document.head.appendChild(style);
}

interface AbstractButton {
  render(): string;
}

interface AbstractCheckbox {
  render(): string;
}

class WindowsButton implements AbstractButton {
  render(): string {
    return '<button class="button windows-button">Windows Button</button>';
  }
}

class WindowsCheckbox implements AbstractCheckbox {
  render(): string {
    return '<div class="windows-checkbox"><input type="checkbox" id="windowsCheckbox"> <label for="windowsCheckbox">Windows Checkbox</label></div>';
  }
}

class MacButton implements AbstractButton {
  render(): string {
    return '<button class="button mac-button">Mac Button</button>';
  }
}

class MacCheckbox implements AbstractCheckbox {
  render(): string {
    return '<div class="mac-checkbox"><input type="checkbox" id="macCheckbox"> <label for="macCheckbox">Mac Checkbox</label></div>';
  }
}

interface AbstractFactory {
  createButton(): AbstractButton;
  createCheckbox(): AbstractCheckbox;
}

class ConcreteFactoryWindows implements AbstractFactory {
  createButton(): AbstractButton {
    return new WindowsButton();
  }
  createCheckbox(): AbstractCheckbox {
    return new WindowsCheckbox();
  }
}

class ConcreteFactoryMac implements AbstractFactory {
  createButton(): AbstractButton {
    return new MacButton();
  }
  createCheckbox(): AbstractCheckbox {
    return new MacCheckbox();
  }
}

function createUI(factory: AbstractFactory): void {
  const button = factory.createButton();
  const checkbox = factory.createCheckbox();

  const uiContainer = document.getElementById("uiContainer");
  if (uiContainer) {
    uiContainer.innerHTML = button.render() + "<br>" + checkbox.render();
  }
}

addStyles();

document.getElementById("createUI")?.addEventListener("click", () => {
  const os = (document.getElementById("osSelect") as HTMLSelectElement).value;
  let factory: AbstractFactory;

  switch (os) {
    case "windows":
      factory = new ConcreteFactoryWindows();
      break;
    case "mac":
      factory = new ConcreteFactoryMac();
      break;
    default:
      throw new Error("Unsupported OS");
  }

  createUI(factory);
});
