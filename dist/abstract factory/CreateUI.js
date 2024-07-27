"use strict";
var _a;
function addStyles() {
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
class WindowsButton {
    render() {
        return '<button class="button windows-button">Windows Button</button>';
    }
}
class WindowsCheckbox {
    render() {
        return '<div class="windows-checkbox"><input type="checkbox" id="windowsCheckbox"> <label for="windowsCheckbox">Windows Checkbox</label></div>';
    }
}
class MacButton {
    render() {
        return '<button class="button mac-button">Mac Button</button>';
    }
}
class MacCheckbox {
    render() {
        return '<div class="mac-checkbox"><input type="checkbox" id="macCheckbox"> <label for="macCheckbox">Mac Checkbox</label></div>';
    }
}
class ConcreteFactoryWindows {
    createButton() {
        return new WindowsButton();
    }
    createCheckbox() {
        return new WindowsCheckbox();
    }
}
class ConcreteFactoryMac {
    createButton() {
        return new MacButton();
    }
    createCheckbox() {
        return new MacCheckbox();
    }
}
function createUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();
    const uiContainer = document.getElementById("uiContainer");
    if (uiContainer) {
        uiContainer.innerHTML = button.render() + "<br>" + checkbox.render();
    }
}
addStyles();
(_a = document.getElementById("createUI")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    const os = document.getElementById("osSelect").value;
    let factory;
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
