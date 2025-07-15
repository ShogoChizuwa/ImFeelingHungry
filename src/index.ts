import express from 'express';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// コンパイル後のJSファイル(src/index.js)から見て、一つ上の階層にあるpublicディレクトリを指すように修正
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// レストラン一覧を返すAPI
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    res.status(500).json({ error: 'データベースからレストラン情報を取得できませんでした。' });
  }
});

// ランダムに1軒おすすめのレストランを返すAPI
app.get('/api/recommend', async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    if (restaurants.length === 0) {
      return res.status(404).json({ error: 'おすすめできるレストランがありません。' });
    }
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const recommendedRestaurant = restaurants[randomIndex];
    res.json(recommendedRestaurant);
  } catch (error) {
    console.error("Failed to fetch recommendation:", error);
    res.status(500).json({ error: 'おすすめの取得中にエラーが発生しました。' });
  }
});

// ルートURLへのリクエストで index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
