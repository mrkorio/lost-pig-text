import OpenAI from 'openai';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors(), express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 200,
    });
    res.json({ reply: completion.choices[0].message?.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error calling OpenAI" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
