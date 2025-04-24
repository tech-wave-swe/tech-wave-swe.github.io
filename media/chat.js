// @ts-check
// @ts-ignore
const vscode = acquireVsCodeApi();

document.addEventListener("DOMContentLoaded", function (e) {
  handleEvents();
});

/**
 * @param {string} text
 */
function formatMessageText(text) {
  // @ts-ignore
  return marked(text);
}

function handleEvents() {
  const chatInput = /** @type {HTMLTextAreaElement} */ (
    document.getElementById("chat-input")
  );
  const sendButton = document.getElementById("chat-controls--send-button");
  const clearButton = document.getElementById("chat-controls--clear-button");

  if (!chatInput || !sendButton || !clearButton) {
    console.error("Required DOM elements not found");
    return;
  }

  handleEQEvents();

  // Send message when clicking the send button
  sendButton.addEventListener("click", onSendMessage);

  // Send message when pressing Enter (but not with Shift)
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  });

  // Clear chat history
  clearButton.addEventListener("click", () => {
    vscode.postMessage({ type: "clearHistory" });
  });

  // { data: { type: string; } }
  window.addEventListener(
    "message",
    /** @type {(event: MessageEvent<{  type: string; message: {text: string}; messages: {text: string}[]; isLoading: boolean; }>) => void} */
    (event) => {
      const message = event.data;

      switch (message.type) {
        case "addMessage":
          onAddMessage(message.message);
          break;

        case "setHistory":
          onSetHistory(message.messages);
          break;

        case "clearHistory":
          onClearHistory();
          break;

        case "setLoading":
          onSetLoading(message.isLoading);
          break;

        case "error":
          onError(message.message);
          break;

        case "updateMessage":
          onUpdateMessage(message.message);
          break;
      }
    },
  );

  console.log("Initialize chat history");
  getMessageHistory();
}

/**
 * @param {{ text: string; }} message
 */
function onUpdateMessage(message) {
  if (message) {
    updateMessage(message);
  }
}

/**
 * @param {{ text: string; }} message
 */
function updateMessage(message) {
  console.log("updateMessage", message);

  const messagesContainer = document.getElementById("chat-messages-list");
  if (!messagesContainer) return;

  // Find the last message from the model
  const modelMessages = messagesContainer.querySelectorAll(
    ".chat-message--item.model",
  );
  if (modelMessages.length === 0) {
    if (!message) return;
    addMessage(message);
    return;
  }

  const lastModelMessage = modelMessages[modelMessages.length - 1];
  const textElement = lastModelMessage.querySelector(".message-text");
  if (textElement && message) {
    textElement.innerHTML = formatMessageText(message.text);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

function handleEQEvents() {
  const chatInput = /** @type {HTMLTextAreaElement} */ (
    document.getElementById("chat-input")
  );
  if (!chatInput) return;

  document.querySelectorAll(".example-questions li").forEach((li) => {
    li.addEventListener("click", () => {
      if (li.textContent) {
        chatInput.value = li.textContent;
        chatInput.style.height = "auto";
        chatInput.style.height = chatInput.scrollHeight + "px";
        chatInput.focus();
      }
    });
  });
}

// Events Handler

function onSendMessage() {
  const userInput = /** @type {HTMLTextAreaElement} */ (
    document.getElementById("chat-input")
  );
  if (!userInput) return;

  const text = userInput.value.trim();
  if (text) {
    vscode.postMessage({
      type: "sendMessage",
      text: text,
      dataType: "documents",
    });

    userInput.value = "";
  }
}

/**
 * @param {{ text: string; }} message
 */
function onAddMessage(message) {
  if (message) {
    addMessage(message);
  }
}

/**
 * @param {{ text: string; }[]} messages
 */
function onSetHistory(messages) {
  if (messages && messages.length > 0) {
    setHistory(messages);
  }
}

function onClearHistory() {
  clearHistory();
}

/**
 * @param {boolean} isLoading
 */
function onSetLoading(isLoading) {
  if (isLoading !== undefined) {
    setLoading(isLoading);
  }
}

/**
 * @param {{ text: string; }} message
 */
function onError(message) {
  if (message) {
    handleError(message.text);
  }
}

// Event actions

/**
 * @param {string} message
 */
function handleError(message) {
  console.error(message);

  vscode.postMessage({
    type: "sendMessage",
    text: `Error: ${message}`,
  });

  const messagesContainer = document.getElementById("chat-messages-list");
  if (!messagesContainer) return;

  const errorElement = document.createElement("div");
  errorElement.classList.add("message", "model");
  errorElement.textContent = message;
  errorElement.style.color = "var(--vscode-errorForeground)";

  messagesContainer.appendChild(errorElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * @param {{ text: any; sender?: any; timestamp?: any; }} message
 */
function addMessage(message) {
  console.log("addMessage", message);

  const messagesContainer = document.getElementById("chat-messages-list");
  if (!messagesContainer) return;

  const messageElement = document.createElement("li");
  messageElement.classList.add("chat-message--item");
  messageElement.classList.add(message.sender === "user" ? "user" : "model");

  const messageHeader = document.createElement("div");
  messageHeader.classList.add("chat-item--header");

  const avatar = document.createElement("div");
  avatar.classList.add("chat-item--avatar");

  const avatarIcon = document.createElement("i");
  avatarIcon.classList.add("codicon");
  avatarIcon.classList.add(
    message.sender === "user" ? "codicon-account" : "codicon-robot",
  );

  const name = document.createElement("h2");
  name.textContent = message.sender;

  avatar.appendChild(avatarIcon);
  messageHeader.appendChild(avatar);
  messageHeader.appendChild(name);
  messageElement.appendChild(messageHeader);

  const chatContent = document.createElement("div");
  chatContent.classList.add("chat-message--content");

  const text = document.createElement("div");
  text.classList.add("message-text");
  text.innerHTML = formatMessageText(message.text);

  chatContent.appendChild(text);
  messageElement.appendChild(chatContent);

  const date = document.createElement("p");
  date.classList.add("chat-item--timestamp");
  date.textContent = new Date(message.timestamp).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  messageElement.appendChild(date);

  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * @param {boolean} isLoading
 */
function setLoading(isLoading) {
  const loadingElement = document.getElementById("loading-indicator");
  if (!loadingElement) return;

  loadingElement.style.display = isLoading ? "flex" : "none";
}

function getMessageHistory() {
  vscode.postMessage({
    type: "getMessageHistory",
  });
}

/**
 * @param {{ text: string; }[]} messages
 */
function setHistory(messages) {
  const messagesContainer = document.getElementById("chat-messages-list");
  if (!messagesContainer) return;

  messagesContainer.innerHTML = "";

  // Add welcome message first
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "welcome-message";
  welcomeMessage.innerHTML = `
                    <h2>Requirements Tracker Assistant</h2>
                    <p>Ask questions about your requirements and codebase.</p>
                    <ul class="example-questions">
                        <li>What requirements are related to user authentication?</li>
                        <li>How is the file upload feature implemented?</li>
                        <li>Which requirements are still unimplemented?</li>
                    </ul>
                `;
  messagesContainer.appendChild(welcomeMessage);

  messages.forEach((msg) => addMessage(msg));

  handleEQEvents();
}

function clearHistory() {
  const messagesContainer = document.getElementById("chat-messages-list");
  if (!messagesContainer) return;

  messagesContainer.innerHTML = "";

  // Add welcome message first
  const welcomeMessage = document.createElement("div");
  welcomeMessage.className = "welcome-message";
  welcomeMessage.innerHTML = `
                    <h2>Requirements Tracker Assistant</h2>
                    <p>Ask questions about your requirements and codebase.</p>
                    <ul class="example-questions">
                        <li>What requirements are related to user authentication?</li>
                        <li>How is the file upload feature implemented?</li>
                        <li>Which requirements are still unimplemented?</li>
                    </ul>
                `;

  messagesContainer.appendChild(welcomeMessage);

  handleEQEvents();
}

/* istanbul ignore next */
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    formatMessageText,
    handleEvents,
    handleEQEvents,
    onSendMessage,
    onAddMessage,
    onSetHistory,
    onClearHistory,
    onSetLoading,
    onError,
    handleError,
    addMessage,
    setLoading,
    setHistory,
    clearHistory,
    updateMessage,
  };
}
