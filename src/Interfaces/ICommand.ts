export interface ICommand {
  execute(): Promise<void>;
  getName(): string;
}
