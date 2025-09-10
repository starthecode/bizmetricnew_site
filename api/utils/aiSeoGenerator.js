// aiSeoGenerator.js
import { OpenAI } from 'openai'; // or use local LLM

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default async function generateSEO({ title, content }) {
  const prompt = `
    You are an SEO expert. Generate SEO meta info for the following content:

    Title: ${title}
    Content: ${content}

    Output JSON with:
    {
      "seoTitle": "...",
      "seoDescription": "...",
      "focusKeyphrase": ["...", "..."],
      "ogTitle": "...",
      "ogDescription": "...",
      "altText": "...",
      "slug": "auto-generated-url-slug"
    }
  `;

  const response = await openai.chat.completions.create({
    model: 'openai/gpt-4o',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  console.log('response', response);

  return JSON.parse(response.choices[0].message.content);
}
