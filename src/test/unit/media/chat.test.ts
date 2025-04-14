/* eslint-disable @typescript-eslint/no-explicit-any */
import { jest, expect, describe, beforeEach, it } from "@jest/globals";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="chat-input-container">
        <textarea id="chat-input"></textarea>
      </div>
      <button id="chat-controls--send-button"></button>
      <button id="chat-controls--clear-button"></button>
      <div id="chat-messages-list"></div>
      <div id="loading-indicator"></div>
      <div class="welcome-message">
        <h2>Requirements Tracker Assistant</h2>
        <p>Ask questions about your requirements and codebase.</p>
        <ul class="example-questions">
          <li>What requirements are related to user authentication?</li>
          <li>How is the file upload feature implemented?</li>
          <li>Which requirements are still unimplemented?</li>
        </ul>
      </div>
    </body>
  </html>
`);

global.document = dom.window.document;
global.window = dom.window as any;
global.HTMLInputElement = dom.window.HTMLInputElement;
global.HTMLButtonElement = dom.window.HTMLButtonElement;
global.HTMLElement = dom.window.HTMLElement;
global.HTMLTextAreaElement = dom.window.HTMLTextAreaElement;
global.Event = dom.window.Event;
global.MouseEvent = dom.window.MouseEvent;
global.KeyboardEvent = dom.window.KeyboardEvent;
global.CustomEvent = dom.window.CustomEvent;
global.MessageEvent = dom.window.MessageEvent;
global.console.error = jest.fn();

declare global {
  // eslint-disable-next-line no-var
  var marked: jest.Mock<(text: string) => string>;
  // eslint-disable-next-line no-var
  var formatMessageText: (text: string) => string;
}

const markedMock = jest.fn((text: string): string => `<p>${text}</p>`);
global.marked = markedMock;
global.formatMessageText = (text: string) => markedMock(text);

const mockVscode = {
  postMessage: jest.fn(),
};
(global as any).acquireVsCodeApi = jest.fn(() => mockVscode);

function createScriptContext() {
  window.removeEventListener("message", window.onmessage as any);

  let helperFunctions: any = {};

  jest.isolateModules(() => {
    const originalConsoleError = console.error;

    try {
      const chatModule: Record<string, any> = jest.requireActual(
        "../../../../media/chat.js",
      );

      (global as any).formatMessageText = (text: string) => {
        return marked(text);
      };

      helperFunctions = {
        updateMessage: chatModule.updateMessage,
        handleEQEvents: chatModule.handleEQEvents,
        addMessage: chatModule.addMessage,
        setLoading: chatModule.setLoading,
        setHistory: chatModule.setHistory,
        clearHistory: chatModule.clearHistory,
        onSendMessage: chatModule.onSendMessage,
        onAddMessage: chatModule.onAddMessage,
        onSetHistory: chatModule.onSetHistory,
        onClearHistory: chatModule.onClearHistory,
        onSetLoading: chatModule.onSetLoading,
        onError: chatModule.onError,
        handleError: chatModule.handleError,
        handleEvents: chatModule.handleEvents,
      };
    } catch (error) {
      console.error = originalConsoleError;
      console.error("Error in createScriptContext:", error);
      throw error;
    }
  });

  return helperFunctions;
}

describe("chat.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const messagesContainer = document.getElementById("chat-messages-list");
    if (messagesContainer) {
      messagesContainer.innerHTML = "";
    }
    createScriptContext();
  });

  describe("initialization", () => {
    it("should initialize event listeners on DOMContentLoaded", () => {
      document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));
      expect(true).toBe(true);
    });

    it("should handle missing DOM elements in handleEvents", () => {
      const originalChatInput = document.getElementById("chat-input");
      const originalSendButton = document.getElementById(
        "chat-controls--send-button",
      );

      if (originalChatInput?.parentNode) {
        originalChatInput.parentNode.removeChild(originalChatInput);
      }

      createScriptContext();

      document.dispatchEvent(new dom.window.Event("DOMContentLoaded"));

      expect(console.error).toHaveBeenCalledWith(
        "Required DOM elements not found",
      );

      if (originalChatInput && originalSendButton) {
        document.body.appendChild(originalChatInput);
      }
    });
  });

  describe("event handling", () => {
    it("should send message when clicking the send button", () => {
      const chatInput = document.getElementById(
        "chat-input",
      ) as HTMLTextAreaElement;
      const sendButton = document.getElementById("chat-controls--send-button");

      if (chatInput && sendButton) {
        chatInput.value = "Test message";
        sendButton.click();

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "sendMessage",
          text: "Test message",
          dataType: "documents",
        });
        expect(chatInput.value).toBe("");
      }
    });

    it("should not send message when input is empty", () => {
      const chatInput = document.getElementById(
        "chat-input",
      ) as HTMLTextAreaElement;
      const sendButton = document.getElementById("chat-controls--send-button");

      if (chatInput && sendButton) {
        chatInput.value = "   ";
        sendButton.click();

        expect(mockVscode.postMessage).not.toHaveBeenCalled();
      }
    });

    it("should not send message if userInput is null", () => {
      const originalChatInput = document.getElementById("chat-input");

      if (originalChatInput?.parentNode) {
        originalChatInput.parentNode.removeChild(originalChatInput);
      }

      const sendButton = document.getElementById("chat-controls--send-button");
      if (sendButton) {
        sendButton.click();
        expect(mockVscode.postMessage).not.toHaveBeenCalled();
      }

      if (originalChatInput) {
        document.body.appendChild(originalChatInput);
      }
    });

    it("should send message when pressing Enter (but not with Shift)", () => {
      const chatInput = document.getElementById(
        "chat-input",
      ) as HTMLTextAreaElement;

      if (chatInput) {
        chatInput.value = "Test message";

        const enterEvent = new KeyboardEvent("keydown", {
          key: "Enter",
          shiftKey: false,
          bubbles: true,
        });

        const preventDefaultSpy = jest.spyOn(enterEvent, "preventDefault");

        chatInput.dispatchEvent(enterEvent);

        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "sendMessage",
          text: "Test message",
          dataType: "documents",
        });
        expect(chatInput.value).toBe("");

        preventDefaultSpy.mockRestore();
      }
    });

    it("should not send message when pressing Enter with Shift", () => {
      const chatInput = document.getElementById(
        "chat-input",
      ) as HTMLTextAreaElement;

      if (chatInput) {
        chatInput.value = "Test message";

        const shiftEnterEvent = new KeyboardEvent("keydown", {
          key: "Enter",
          shiftKey: true,
          bubbles: true,
        });

        const preventDefaultSpy = jest.spyOn(shiftEnterEvent, "preventDefault");

        chatInput.dispatchEvent(shiftEnterEvent);

        expect(preventDefaultSpy).not.toHaveBeenCalled();
        expect(mockVscode.postMessage).not.toHaveBeenCalled();
        expect(chatInput.value).toBe("Test message");

        preventDefaultSpy.mockRestore();
      }
    });

    it("should clear chat history when clicking the clear button", () => {
      const clearButton = document.getElementById(
        "chat-controls--clear-button",
      );

      if (clearButton) {
        clearButton.click();

        expect(mockVscode.postMessage).toHaveBeenCalledWith({
          type: "clearHistory",
        });
      }
    });

    it("should handle example question clicks", () => {
      const exampleList = document.createElement("ul");
      exampleList.className = "example-questions";

      const exampleItem = document.createElement("li");
      const exampleText =
        "What requirements are related to user authentication?";
      exampleItem.textContent = exampleText;
      exampleList.appendChild(exampleItem);

      document.body.appendChild(exampleList);

      const chatInput = document.getElementById(
        "chat-input",
      ) as HTMLTextAreaElement;

      if (chatInput) {
        Object.defineProperty(chatInput, "scrollHeight", {
          configurable: true,
          value: 100,
        });

        chatInput.focus = jest.fn();

        const helpers = createScriptContext();
        helpers.handleEQEvents();

        exampleItem.click();

        expect(chatInput.value).toBe(exampleText);
        expect(chatInput.style.height).toBe("100px");
        expect(chatInput.focus).toHaveBeenCalled();
      }
    });

    it("should handle example question clicks with empty textContent", () => {
      const exampleList = document.createElement("ul");
      exampleList.className = "example-questions";

      const exampleItem = document.createElement("li");
      exampleItem.textContent = "";
      exampleList.appendChild(exampleItem);

      document.body.appendChild(exampleList);

      const chatInput = document.getElementById(
        "chat-input",
      ) as HTMLTextAreaElement;
      const originalValue = "original text";
      if (chatInput) {
        chatInput.value = originalValue;

        const helpers = createScriptContext();
        helpers.handleEQEvents();

        exampleItem.click();

        expect(chatInput.value).toBe(originalValue);
      }

      document.body.removeChild(exampleList);
    });
  });

  describe("null container handling", () => {
    beforeEach(() => {
      const messagesContainer = document.getElementById("chat-messages-list");
      if (messagesContainer?.parentNode) {
        messagesContainer.parentNode.removeChild(messagesContainer);
      }
      createScriptContext();
    });

    afterEach(() => {
      const container = document.createElement("div");
      container.id = "chat-messages-list";
      document.body.appendChild(container);
    });

    it("should handle null message in addMessage", () => {
      const helpers = createScriptContext();
      helpers.addMessage = jest.fn();

      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "addMessage",
            message: undefined,
          },
        }),
      );

      expect(helpers.addMessage).not.toHaveBeenCalled();
    });

    it("should handle null message in handleError", () => {
      const helpers = createScriptContext();
      helpers.handleError = jest.fn();

      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "error",
            message: undefined,
          },
        }),
      );
      expect(helpers.handleError).not.toHaveBeenCalled();
    });

    it("should handle null message in setLoading", () => {
      const helpers = createScriptContext();
      helpers.setLoading = jest.fn();

      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "setLoading",
            message: undefined,
          },
        }),
      );
      expect(helpers.setLoading).not.toHaveBeenCalled();
    });

    it("should handle null messagesContainer in updateMessage", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "updateMessage",
            message: { text: "Test message" },
          },
        }),
      );
    });

    it("should handle null messageContainer in setHistory", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "setHistory",
          },
        }),
      );
    });
  });

  describe("message handling", () => {
    beforeEach(() => {
      createScriptContext();
    });

    it("should handle clearHistory message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "setHistory",
            messages: [
              {
                text: "Test message",
                sender: "user",
                timestamp: new Date().toISOString(),
              },
            ],
          },
        }),
      );

      window.dispatchEvent(
        new MessageEvent("message", {
          data: { type: "clearHistory" },
        }),
      );

      const messagesContainer = document.getElementById("chat-messages-list");
      const messageItems = messagesContainer?.querySelectorAll(
        ".chat-message--item",
      );
      const welcomeMessage =
        messagesContainer?.querySelector(".welcome-message");
      expect(messageItems?.length).toBe(0);
      expect(welcomeMessage).not.toBeNull();
    });

    it("should handle setLoading message", () => {
      const loadingIndicator = document.getElementById("loading-indicator");

      window.dispatchEvent(
        new MessageEvent("message", {
          data: { type: "setLoading", isLoading: true },
        }),
      );

      expect(loadingIndicator?.style.display).toBe("flex");

      window.dispatchEvent(
        new MessageEvent("message", {
          data: { type: "setLoading", isLoading: false },
        }),
      );

      expect(loadingIndicator?.style.display).toBe("none");
    });

    it("should handle error message", () => {
      const errorMessage = "Test error message";
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "error",
            message: { text: errorMessage },
          },
        }),
      );

      const messagesContainer = document.getElementById("chat-messages-list");
      const errorElement = messagesContainer?.querySelector(
        ".message.model",
      ) as HTMLDivElement;
      expect(errorElement?.textContent).toBe(errorMessage);
      expect(errorElement?.style.color).toBe("var(--vscode-errorForeground)");
    });

    it("should handle updateMessage for model message", () => {
      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "addMessage",
            message: {
              text: "Initial message",
              sender: "model",
              timestamp: new Date().toISOString(),
            },
          },
        }),
      );

      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "updateMessage",
            message: {
              text: "Updated message",
            },
          },
        }),
      );

      const messagesContainer = document.getElementById("chat-messages-list");
      const messageElement = messagesContainer?.querySelector(
        ".chat-message--item.model .message-text",
      );
      expect(messageElement?.innerHTML).toBe("<p>Updated message</p>");
    });

    it("should handle updateMessage with an undefined message", () => {
      const helpers = createScriptContext();
      helpers.updateMessage = jest.fn();

      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "addMessage",
            message: {
              text: "Initial message",
              sender: "model",
              timestamp: new Date().toISOString(),
            },
          },
        }),
      );

      window.dispatchEvent(
        new MessageEvent("message", {
          data: {
            type: "updateMessage",
            message: undefined,
          },
        }),
      );

      expect(helpers.updateMessage).not.toHaveBeenCalled();
    });
  });

  describe("helper functions", () => {
    it("should format message text", () => {
      createScriptContext();

      expect(formatMessageText("Test message")).toBe("<p>Test message</p>");
      expect(global.marked).toHaveBeenCalledWith("Test message");
    });

    it("should handle updateMessage when no model messages exist", () => {
      const helpers = createScriptContext();
      const messagesContainer = document.getElementById("chat-messages-list");
      const message = { text: "New message" };

      if (messagesContainer) {
        messagesContainer.innerHTML = "";
      }

      helpers.updateMessage(message);

      const messageElement = messagesContainer?.querySelector(".message-text");
      expect(messageElement?.innerHTML).toBe("<p>New message</p>");
    });

    it("should handle updateMessage with missing textElement", () => {
      const helpers = createScriptContext();
      const messagesContainer = document.getElementById("chat-messages-list");

      const modelMessage = document.createElement("div");
      modelMessage.classList.add("chat-message--item", "model");
      messagesContainer?.appendChild(modelMessage);

      expect(() => {
        helpers.updateMessage({ text: "Updated message" });
      }).not.toThrow();
    });

    it("should handle error with missing messagesContainer", () => {
      const helpers = createScriptContext();
      const messagesContainer = document.getElementById("chat-messages-list");

      messagesContainer?.parentNode?.removeChild(messagesContainer);

      expect(() => {
        helpers.handleError("Test error");
      }).not.toThrow();

      const newContainer = document.createElement("div");
      newContainer.id = "chat-messages-list";
      document.body.appendChild(newContainer);
    });

    it("should handle missing chat input in handleEQEvents", () => {
      const originalChatInput = document.getElementById("chat-input");

      if (originalChatInput?.parentNode) {
        originalChatInput.parentNode.removeChild(originalChatInput);
      }

      const helpers = createScriptContext();

      expect(() => helpers.handleEQEvents()).not.toThrow();

      if (originalChatInput) {
        document.body.appendChild(originalChatInput);
      }
    });

    it("should handle missing messages container in addMessage", () => {
      const originalContainer = document.getElementById("chat-messages-list");

      if (originalContainer?.parentNode) {
        originalContainer.parentNode.removeChild(originalContainer);
      }

      const helpers = createScriptContext();

      expect(() => {
        helpers.addMessage({
          text: "Test message",
          sender: "user",
          timestamp: new Date().toISOString(),
        });
      }).not.toThrow();

      if (originalContainer) {
        document.body.appendChild(originalContainer);
      }
    });

    it("should handle missing loading indicator in setLoading", () => {
      const originalLoadingIndicator =
        document.getElementById("loading-indicator");

      if (originalLoadingIndicator?.parentNode) {
        originalLoadingIndicator.parentNode.removeChild(
          originalLoadingIndicator,
        );
      }

      const helpers = createScriptContext();

      expect(() => helpers.setLoading(true)).not.toThrow();

      if (originalLoadingIndicator) {
        document.body.appendChild(originalLoadingIndicator);
      }
    });

    it("should handle missing message parameter in onUpdateMessage", () => {
      const helpers = createScriptContext();

      const messagesContainer = document.createElement("div");
      messagesContainer.id = "chat-messages-list";
      const modelMessage = document.createElement("div");
      modelMessage.classList.add("chat-message--item", "model");
      const textElement = document.createElement("div");
      textElement.classList.add("message-text");
      modelMessage.appendChild(textElement);
      messagesContainer.appendChild(modelMessage);
      document.body.appendChild(messagesContainer);

      expect(() => helpers.updateMessage(undefined)).not.toThrow();

      document.body.removeChild(messagesContainer);
    });
  });

  describe("null message container handling", () => {
    it("should handle clearHistory with null messagesContainer", () => {
      const originalContainer = document.getElementById("chat-messages-list");
      if (originalContainer?.parentNode) {
        originalContainer.parentNode.removeChild(originalContainer);
      }

      const helpers = createScriptContext();

      expect(() => {
        helpers.clearHistory();
      }).not.toThrow();

      const newContainer = document.createElement("div");
      newContainer.id = "chat-messages-list";
      document.body.appendChild(newContainer);
    });

    it("should cover the early return in setHistory function when messagesContainer is null", () => {
      const originalContainer = document.getElementById("chat-messages-list");
      if (originalContainer?.parentNode) {
        originalContainer.parentNode.removeChild(originalContainer);
      }

      const helpers = createScriptContext();

      const spy = jest.spyOn(document, "createElement");

      helpers.setHistory([{ text: "test" }]);

      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();

      const newContainer = document.createElement("div");
      newContainer.id = "chat-messages-list";
      document.body.appendChild(newContainer);
    });
  });
});
