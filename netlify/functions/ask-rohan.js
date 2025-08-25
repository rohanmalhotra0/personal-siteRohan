import OpenAI from "openai";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const { name, question } = body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // ✅ secure, no REACT_APP_ prefix
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are Rohan GPT, a witty assistant who knows about Rohan Malhotra, his studies, projects, and fun inside jokes for his friends.",
        },
        { role: "user", content: `My name is ${name}. ${question}` },
      ],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: completion.choices[0].message.content }),
    };
  } catch (err) {
    console.error("ask-rohan error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
