import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function generateTest() {
  const res = await client.messages.create({
    model: 'claude-haiku-4-5',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: `
Generate a Gherkin feature file for a Fraud Contact form.

STRICT RULES:
- ONLY use these steps:
  "I am on the Fraud Management contact page"
  "I fill in the contact form with valid data"
  "I submit the form"
  "the form should be successfully submitted"
  "error messages should be displayed for required fields"

- DO NOT create new step definitions
- DO NOT use steps like "I fill in firstName as ..."
- Reuse existing steps ONLY

- Create scenarios:
  positive
  invalid email
  missing required fields

Return ONLY the .feature content.
`,
      },
    ],
  });

  // 🔥 extraction propre du contenu
  const block = res.content[0];

  if (block && block.type === 'text') {
    const cleanCode = block.text
      .replace(/```typescript/g, '')
      .replace(/```/g, '')
      .trim();

    fs.writeFileSync('./features/fraud-contact-ai.feature', cleanCode);
    console.log('Feature file generated ✅');
  } else {
    console.error('Unexpected response format:', res.content);
  }
}

generateTest();
