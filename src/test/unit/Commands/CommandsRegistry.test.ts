import {jest, expect} from "@jest/globals";
import vscode, {commands} from "vscode";
import {CommandRegistry} from "../../../Commands/CommandsRegistry";
import {ICommand} from "../../../Interfaces/ICommand";

describe("CommandsRegistry", () => {

  let commandRegistry: CommandRegistry;
  let mockContext: vscode.ExtensionContext;
  let mockCommand: ICommand;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  let registeredCallback: Function;
  let mockDisposable: { dispose: jest.Mock };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create mock context with subscriptions array
    mockContext = {
      subscriptions: []
    } as unknown as vscode.ExtensionContext;

    // Create mock command
    mockCommand = {
      getName: jest.fn<() => string>().mockReturnValue('test.command'),
      execute: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
    };

    mockDisposable = { dispose: jest.fn() };

    (vscode.commands.registerCommand as jest.Mock).mockImplementation(
      (commandName, callback) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        registeredCallback = callback as Function;
        return mockDisposable;
      }
    );

    // Create instance of command registry
    commandRegistry = new CommandRegistry(mockContext);
  });

  describe("registerCommand", () => {

    it("should register a command and add it to the context subscriptions", () => {
      // Register the command
      commandRegistry.registerCommand(mockCommand);

      // Verify command was added to internal map
      expect(commandRegistry.getCommand('test.command')).toBe(mockCommand);

      // Verify vscode.commands.registerCommand was called with correct args
      expect(commands.registerCommand).toHaveBeenCalledWith(
        'test.command',
        expect.any(Function)
      );

      // Verify disposable was added to context subscriptions
      expect(mockContext.subscriptions).toContain(mockDisposable);
    });

  });

  describe("registerCommands", () => {
    it("should register multiple commands", () => {
      // Create additional mock command
      const mockCommand2 = {
        getName: jest.fn<() => string>().mockReturnValue('test.command2'),
        execute: jest.fn<() => Promise<void>>().mockResolvedValue(undefined)
      };

      // Mock the disposables returned by registerCommand
      const mockDisposable1 = {dispose: jest.fn()};
      const mockDisposable2 = {dispose: jest.fn()};
      (vscode.commands.registerCommand as jest.Mock)
        .mockReturnValueOnce(mockDisposable1)
        .mockReturnValueOnce(mockDisposable2);

      // Register multiple commands
      commandRegistry.registerCommands([mockCommand, mockCommand2]);

      // Verify commands were added to internal map
      expect(commandRegistry.getCommand('test.command')).toBe(mockCommand);
      expect(commandRegistry.getCommand('test.command2')).toBe(mockCommand2);

      // Verify vscode.commands.registerCommand was called for each command
      expect(vscode.commands.registerCommand).toHaveBeenCalledTimes(2);

      // Verify disposables were added to context subscriptions
      expect(mockContext.subscriptions).toContain(mockDisposable1);
      expect(mockContext.subscriptions).toContain(mockDisposable2);
    });
  });

  describe("getCommand", () => {
    it("should return the command if it exists", () => {
      // Register a command first
      commandRegistry.registerCommand(mockCommand);

      // Get the command
      const retrievedCommand = commandRegistry.getCommand('test.command');

      // Verify it's the same command object we registered
      expect(retrievedCommand).toBe(mockCommand);
    });

    it('should throw error when getting a non-existent command', () => {
      expect(() => {
        commandRegistry.getCommand('non.existent.command');
      }).toThrow('Command non.existent.command not found');
    });
  });

  it('should execute command.execute() when command is triggered', async () => {
    // Register the command
    commandRegistry.registerCommand(mockCommand);

    // Simulate command being triggered through VS Code
    await registeredCallback();

    // Verify command.execute was called
    expect(mockCommand.execute).toHaveBeenCalledTimes(1);
  });
});