import assert from "assert";
import { ChatMessage } from "../../Models/ChatMessage";
import { ChatService } from "../../Services/ChatService";
import { InferenceService } from "../../Services/InferenceService";
import { setupTestServices } from "../testSetup";
import { TestWorkspace } from "../testWorkspace";

suite("Chat Integration Tests", () => {
  let workspace: TestWorkspace;
  let chatService: ChatService;
  let inferenceService: InferenceService;

  suiteSetup(async () => {
    workspace = new TestWorkspace();
    await workspace.setup();

    const services = await setupTestServices(workspace.path);
    chatService = services.chatService;
    inferenceService = services.inferenceService;
  });

  test("Should add and retrieve chat messages", async () => {
    const message: ChatMessage = {
      sender: "user",
      text: "How is the authentication implemented?",
      timestamp: Date.now(),
    };

    await chatService.addMessage(message);
    const messages = await chatService.getMessages();

    assert.strictEqual(messages.length, 1);
    assert.strictEqual(messages[0].text, message.text);
  });

  test("Should generate responses using inference service", async () => {
    const question = "Explain the login functionality";
    const response = await inferenceService.query(question);

    assert.ok(response);
    assert.ok(typeof response === "string");
    assert.ok(response.length > 0);
  });

  test("Should clear chat history", async () => {
    await chatService.clearMessages();
    const messages = await chatService.getMessages();
    assert.strictEqual(messages.length, 0);
  });

  // suiteTeardown(() => {
  //   workspace.cleanup();
  // });
});
