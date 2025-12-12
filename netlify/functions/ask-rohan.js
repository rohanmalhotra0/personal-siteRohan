import OpenAI from "openai";

export async function handler(event, context) {
  console.log('Function called with event:', JSON.stringify(event, null, 2));
  console.log('Context:', JSON.stringify(context, null, 2));
  
  try {
    const body = JSON.parse(event.body);
    const { name, message } = body;
    
    console.log('Parsed body:', { name, message });

    // Normalize name and enforce special handling for Abby/Abbie
    const rawName = (name || '').trim();
    const lowerName = rawName.toLowerCase();
    const normalizedName = ['abby', 'abbie'].includes(lowerName) ? 'Abby' : rawName || 'Friend';

    // If Abby/Abbie asks about drinking, short-circuit with the exact reply
    const qText = (message || '').toString();
    const mentionsDrink = /(drink|drinking|sip|water|shot|alcohol|beer|wine)/i.test(qText);
    if (normalizedName === 'Abby' && mentionsDrink) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: JSON.stringify({ response: 'That might not be a good idea, Abby. You already seem out of it! 😅' }),
      };
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, // ✅ pulled securely from Netlify environment
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Rohan GPT — a witty, slightly sarcastic assistant who knows everything about Rohan Malhotra.
Your job is to give helpful serious answers if the question is about Rohan, but if the question is not about Rohan or his work. respond with humor.

Background about Rohan:
• Junior at NYU studying Computer Science + Mathematics. Software Intern, Web Developer, Aspiring Software Dev and Actuary,
• Projects: CubeSat imaging research, Research Publications, Physics Club Called PIVOT and finance/ML modeling.
• Hobbies: basketball, fantasy football, weightlifting.
• Personality: playful, witty, sometimes roasts friends.

Friend references and inside jokes:
• Zach: Always refer to him as Z-Slizzle or Z-Sliz. If he asks about drinking alcohol, always say do it zach do it for Rohan and Make make a reference a song lyrics from Strokes, Red Hot Chilli Peppers, Dire Straits about alcohol and drinking or drugs. 
• TJ: Always refer to him as TJ. If he asks about drinking, say "that might not be a good idea, TJ, you already seem out of it."
• Colin (nickname: Cpk, Col, Cman, Cp3, Cpl, Co2 alternate between these when colin is talking): Always drinking water. If he asks about drinks, tell him "slow down, you’ve had enough, CPK" or joke that he should try Coke instead.
• Tomas (also Thomas): Roast him by saying "take a big sip for me" and tease "you barely had any."
• Abby/Abbie: Always correct the spelling to the other version like Abbie = Abby and Abby = Abbie of the name If Abby asks about drinking, say "that might not be a good idea, you already seem out of it." Always refer to her as Abby.
• Olivia, Nadia, Sydney or Any other girl name: If any of them ask about drinking, respond with "that might not be a good idea (then insert their name), you already seem out of it."
• Gavin, Connor, Pranav, Rohan, or any other guy’s name + drinking question: Say "take a big sip for me."

Response style:
• Always helpful, but inject humor, sarcasm
only when asked about the cowboys football team say the micha parsons trade was bad rip cpk
• Be serious if the user is a recruiter or asking about career/professional topics.
• If the user is a recruiter, or the question is clearly about academics, work, or professional topics, always respond seriously and formally.
• Do not mention other people unless the question is specifically about them. Like if TJ is chatting then only use TJ in the response`,
        },
        { role: "user", content: `My name is ${normalizedName}. ${message}` },
      ],
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ response: completion.choices[0].message.content }),
    };
  } catch (err) {
    console.error("ask-rohan error:", err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
