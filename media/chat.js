let vscode;

document.addEventListener("DOMContentLoaded", function (e) {
    vscode = acquireVsCodeApi();

    handleEvents();
})

function formatMessageText(text) {
    // Replace newlines with <br>
    text = text.replace(/\n/g, "<br>");

    // Format code blocks (```code```)
    text = text.replace(
        /```([\s\S]*?)```/g,
        '<pre class="code-block">$1</pre>',
    );

    // Format inline code (`code`)
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");

    return text;
}

function handleEvents() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-controls--send-button');
    const clearButton = document.getElementById('chat-controls--clear-button');

    // const chatTextArea = document.getElementById('chat-input');
    // const chatSendButton = document.getElementById('chat-controls-send-msg');
    // const chatClearButton = document.getElementById('chat-controls-clear-history');

    handleEQEvents();

    // Send message when clicking the send button
    sendButton.addEventListener('click', onSendMessage);

    // Send message when pressing Enter (but not with Shift)
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();

            onSendMessage();
        }
    });

    // Clear chat history
    clearButton.addEventListener('click', () => {
        vscode.postMessage({ type: 'clearHistory' });
    });

    window.addEventListener('message', event => {
        const message = event.data;

        switch (message.type) {
            case 'addMessage':
                onAddMessage(message.message);
                break;

            case 'setHistory':
                onSetHistory(message.messages);
                break;

            case 'clearHistory':
                onClearHistory();
                break;

            case 'setLoading':
                onSetLoading(message.isLoading);
                break;

            case 'error':
                onError(message);
                break;
        }
    });
}

function handleEQEvents() {
    const chatInput = document.getElementById("chat-input");

    document.querySelectorAll(".example-questions li").forEach((li) => {
        li.addEventListener("click", () => {
            chatInput.value = li.textContent;
            chatInput.style.height = "auto";
            chatInput.style.height = chatInput.scrollHeight + "px";
            chatInput.focus();
        });
    });
}

// Events Handler

function onSendMessage() {
    const userInput = document.getElementById('chat-input');
    if (!userInput) return;

    const text = userInput.value.trim();
    if (text) {
        vscode.postMessage({
            type: 'sendMessage',
            text: text,
            dataType: 'documents'
        });

        userInput.value = '';
    }
}

function onAddMessage(message) {
    if (message) {
        addMessage(message);
    }
}

function onSetHistory(messages) {
    if (messages && messages.length > 0) {
        setHistory(messages);
    }
}

function onClearHistory() {
    clearHistory();
}

function onSetLoading(isLoading) {
    if (isLoading !== undefined) {
        setLoading(isLoading);
    }
}

function onError(message) {
    if (message) {
        handleError(message);
    }
}

// Event actions

function handleError(message) {
    console.error(message.message);

    vscode.postMessage({
        type: "sendMessage",
        text: `Error: ${message.message}`,
    });

    const messagesContainer = document.getElementById('chat-messages-list');
    if (!messagesContainer) return;

    const errorElement = document.createElement('div');
    errorElement.classList.add('message', 'model');
    errorElement.textContent = message.message;
    errorElement.style.color = 'var(--vscode-errorForeground)';

    messagesContainer.appendChild(errorElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addMessage(message) {
    console.log("addMessage", message);

    const messagesContainer = document.getElementById('chat-messages-list');
    if (!messagesContainer) return;

    const messageElement = document.createElement('li');
    messageElement.classList.add('chat-message--item');
    messageElement.classList.add(message.sender === "user" ? 'user' : 'model');

    const messageHeader = document.createElement('div');
    messageHeader.classList.add('chat-item--header');

    const avatar = document.createElement('div');
    avatar.classList.add('chat-item--avatar');

    const avatarIcon = document.createElement('i');
    avatarIcon.classList.add('codicon');
    avatarIcon.classList.add(message.sender === "user" ? 'codicon-account' : 'codicon-robot');

    const name = document.createElement('h2');
    name.textContent = message.sender;

    avatar.appendChild(avatarIcon);
    messageHeader.appendChild(avatar);
    messageHeader.appendChild(name);
    messageElement.appendChild(messageHeader);

    const chatContent = document.createElement('div');
    chatContent.classList.add('chat-message--content');

    const text = document.createElement('p');
    text.textContent = message.text;

    chatContent.appendChild(text);
    messageElement.appendChild(chatContent);

    const date = document.createElement('p');
    date.classList.add('chat-item--timestamp');
    date.textContent = new Date(message.timestamp).toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    messageElement.appendChild(date);

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function setLoading(isLoading) {
    const loadingElement = document.getElementById('loading-indicator');
    if (!loadingElement) return;

    loadingElement.style.display = isLoading ? 'flex' : 'none';
}

function setHistory(messages) {
    const messagesContainer = document.getElementById('chat-messages-list');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';

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

    messages.forEach(msg => addMessage(msg));

    handleEQEvents()
}

function clearHistory() {
    const messagesContainer = document.getElementById('chat-messages-list');
    if (!messagesContainer) return;

    messagesContainer.innerHTML = '';

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
