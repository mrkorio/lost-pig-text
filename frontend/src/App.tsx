import { useState } from "react";
import { sendMessage, type ChatMessage } from "./ChatService";

export function App() {
  const [log, setLog] = useState<ChatMessage[]>([
    { role: "system", content: "Eres un narrador que guía a un niño escapando de un hogar violento. El jugador se llama Mauro. El jugador gana cuando el niño escapo de su hogar. En ese caso deja de aceptar prompts" },
    {
      role: "assistant",
      content:
        "Te despiertas en la oscuridad de tu habitación. Afuera, las voces suben de tono y las maderas crujen bajo sus pisadas. " +
        "Tienes que encontrar una salida antes de que tus padres te descubran. ¿Qué harás?"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input } as ChatMessage;
    const newLog = [...log, userMsg];
    setLog(newLog);
    setInput("");
    const reply = await sendMessage(newLog);
    setLog([...newLog, { role: "assistant", content: reply }]);
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Escape del Hogar</h1>
      <p>Eres Mauro, un pequeno que quiere escapar de su hogar. Cual es tu accion?</p>
      <div style={{ minHeight: 300, border: "1px solid #ccc", padding: "1rem", overflowY: "auto" }}>
        {log.filter(m => m.role !== "system").map((m, i) => (
          <p key={i} style={{ textAlign: m.role === "user" ? "right" : "left" }}>
            <strong>{m.role === "user" ? "Tú" : "Narrador"}:</strong> {m.content}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "1rem" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{ flex: 1, padding: "0.5rem" }}
          placeholder="Escribe tu acción..."
        />
        <button type="submit" style={{ marginLeft: "0.5rem" }}>Enviar</button>
      </form>
    </div>
  );
}
