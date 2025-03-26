//@ts-check
document.addEventListener("DOMContentLoaded", function () {
  // @ts-ignore
  const vscode = acquireVsCodeApi();

  /**
   * @typedef {Object} WebviewMessage
   * @property {string} type
   * @property {ChatMessage[]} [messages]
   * @property {ChatMessage} [message]
   * @property {number} [index]
   * @property {string} [text]
   */
  /**
   * Converts markdown code blocks to HTML with syntax highlighting
   * @param {string} text
   * @returns {string}
   */
  function processCodeBlocks(text) {
    return text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
      const language = lang || "";
      return `<pre class="code-block ${language}"><code>${code.trim()}</code></pre>`;
    });
  }
  /**
   * @param {MessageEvent} event
   */
  window.addEventListener("message", (event) => {
    /** @type {WebviewMessage} */
    const message = event.data;

    switch (message.type) {
      case "syncMessages":
        if (message.messages) {
          message.messages.forEach((msg) => {
            appendMessage(msg);
          });
        }
        break;
      case "newMessage":
        if (message.message) {
          appendMessage(message.message);
        }
        break;
      case "updateMessage":
        if (typeof message.index === "number" && message.text) {
          updateMessage(message.index, message.text);
        }
        break;
      case "error":
        if (message.text) {
          handleError(message.text);
        }
        break;
      case "clearHistory":
      case "clearHistoryConfirmed":
        const messageContainer = document.getElementById("chatbot-messages");
        if (messageContainer) {
          messageContainer.innerHTML = "";
        }
        break;
    }
  });

  /**
   * @typedef {Object} ChatMessage
   * @property {string} sender
   * @property {string} text
   * @property {string} timestamp
   */

  /**
   * @param {ChatMessage} msg
   */
  function appendMessage(msg) {
    const messageContainer = document.getElementById("chatbot-messages");
    if (!messageContainer) return;

    const messageBubble = document.createElement("div");
    const isUser = msg.sender === "You";

    messageBubble.classList.add("message");
    messageBubble.classList.add(isUser ? "user" : "ai");

    const messageHeader = document.createElement("div");
    messageHeader.classList.add("message-header");

    const senderName = document.createElement("span");
    senderName.classList.add("message-sender");
    senderName.textContent = msg.sender;

    const timestamp = document.createElement("span");
    timestamp.classList.add("message-timestamp");
    timestamp.textContent = new Date(msg.timestamp).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    messageHeader.appendChild(senderName);
    messageHeader.appendChild(timestamp);

    const textElement = document.createElement("div");
    textElement.classList.add("message-text");

    if (!isUser) {
      textElement.innerHTML = processCodeBlocks(msg.text);
    } else {
      textElement.textContent = msg.text;
    }

    messageBubble.appendChild(messageHeader);
    messageBubble.appendChild(textElement);

    messageContainer.appendChild(messageBubble);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  /**
   * @param {number} index
   * @param {string} newText
   */
  function updateMessage(index, newText) {
    const messageContainer = document.getElementById("chatbot-messages");
    if (!messageContainer) return;

    const messages = messageContainer.getElementsByClassName("message");
    if (index < messages.length) {
      const textElement = messages[index].querySelector(".message-text");
      if (textElement) {
        const isAiMessage = messages[index].classList.contains("ai");
        if (isAiMessage) {
          textElement.innerHTML = processCodeBlocks(newText);
        } else {
          textElement.textContent = newText;
        }
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }
  }

  /**
   * @param {string} errorMessage
   */
  function handleError(errorMessage) {
    const messageContainer = document.getElementById("chatbot-messages");
    if (!messageContainer) return;

    const errorBubble = document.createElement("div");
    errorBubble.classList.add("message", "error");
    errorBubble.textContent = `Error: ${errorMessage}`;
    messageContainer.appendChild(errorBubble);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  const chatInput = document.getElementById("chatbot-input");
  if (chatInput instanceof HTMLTextAreaElement) {
    chatInput.addEventListener("keydown", function (event) {
      if (this.scrollHeight > this.clientHeight) {
        this.style.height = this.scrollHeight + "px";
      } else if (this.value === "") {
        this.style.height = "auto";
      }

      if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        const text = this.value;
        if (text) {
          vscode.postMessage({
            type: "sendMessage",
            message: text,
          });
          this.value = "";
          this.style.height = "auto";
        }
      }
    });
  }

  const clearButton = document.getElementById("clear-history");
  if (clearButton) {
    clearButton.addEventListener("click", function () {
      vscode.postMessage({
        type: "confirmClearHistory",
      });
    });
  }
});
