export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function sendMessage(messages: ChatMessage[]) {
  const res = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const { reply } = await res.json();
  return reply as string;
}
