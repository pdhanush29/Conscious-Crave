require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { product } = req.body;

    if (!product || !product.product_name) {
      return res.status(400).json({ error: 'Product information is missing.' });
    }

    const prompt = `
    You are a professional nutrition assistant for "Conscious Crave".
    Analyze this packaged food product and return a structured JSON.

    Product Name: ${product.product_name || "Unknown"}
    Brand: ${product.brands || "Unknown"}
    Ingredients: ${product.ingredients_text || "Not available"}
    Nutrients: ${JSON.stringify(product.nutriments || {})}
    Nutri-Score: ${product.nutriscore_grade || "N/A"}

    Return strictly in this JSON format:
    {
      "summary": "1-paragraph short overview",
      "ingredients": ["...","..."],
      "nutrition_table": [
        {"nutrient": "Energy", "value": "xx kcal"},
        {"nutrient": "Sugar", "value": "xx g"},
        {"nutrient": "Fat", "value": "xx g"},
        {"nutrient": "Protein", "value": "xx g"},
        {"nutrient": "Sodium", "value": "xx mg"}
      ],
      "benefits": ["...","..."],
      "concerns": ["...","..."],
      "alternatives": [
        {
          "name": "Product Name",
          "reason": "Why it’s healthier",
          "links": {
            "blinkit": "https://blinkit.com/s/?q=Product+Name",
            "bigbasket": "https://www.bigbasket.com/ps/?q=Product+Name",
            "zepto": "https://www.zepto.com/search?query=Product+Name"
          }
        }
      ],
      "follow_up": [
        "Suggest a healthy recipe using this.",
        "How does this compare to [popular competitor]?",
        "What are the top 3 ingredients to watch out for?"
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a structured data nutrition assistant for Conscious Crave." },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1000,
    });

    let content = completion.choices[0].message.content.trim().replace(/```json|```/g, "").trim();
    res.json(JSON.parse(content));
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error('OpenAI API Error:', error.status, error.message);
      res.status(error.status || 500).json({ error: `OpenAI API Error: ${error.message}` });
    } else {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to analyze product' });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
