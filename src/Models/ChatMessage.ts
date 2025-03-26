export interface ChatMessage {
  sender: "user" | "model";
  text: string;
  timestamp: number;
}
