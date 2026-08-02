import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API endpoint for generating personalized Gemini AI Friendship wishes
  app.post('/api/friendship-wish', async (req, res) => {
    try {
      const { name, tone } = req.body;
      const targetName = name || 'Friend';

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          wish: null,
          message: 'Gemini API key not configured',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const tonePrompts = {
        sweet: `Write a short, heartwarming, and sweet Friendship Day message (3-4 sentences) for my friend named "${targetName}". Include warm emoji accents.`,
        playful: `Write a fun, playful, slightly humorous Friendship Day message for my friend "${targetName}". Keep it joyful and lighthearted with fun emojis.`,
        nostalgic: `Write a nostalgic Friendship Day wish for "${targetName}" reminiscing about shared laughter and cherished memories together.`,
        poetic: `Write a beautiful 4-line poem dedicated to "${targetName}" for Friendship Day with a sweet rhyming rhythm and floral theme.`,
      };

      const prompt = tonePrompts[tone as keyof typeof tonePrompts] || tonePrompts.sweet;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const wishText = response.text || '';
      return res.json({ wish: wishText.trim() });
    } catch (err) {
      console.error('Error generating AI wish:', err);
      return res.status(500).json({ error: 'Failed to generate wish' });
    }
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Friendship Day App server listening on http://localhost:${PORT}`);
  });
}

startServer();
