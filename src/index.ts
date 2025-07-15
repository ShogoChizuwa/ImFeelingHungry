import express from 'express';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// publicディレクトリ内の静的ファイルを配信
app.use(express.static(path.join(__dirname, 'public')));

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

// ★★★ 新しく追加したAPI ★★★
// ランダムに1軒おすすめのレストランを返すAPI
app.get('/api/recommend', async (req, res) => {
  try {
    // 1. データベースから全てのレストランデータを取得
    const restaurants = await prisma.restaurant.findMany();

    // 2. レストランデータが1件もなければエラーを返す
    if (restaurants.length === 0) {
      return res.status(404).json({ error: 'おすすめできるレストランがありません。' });
    }

    // 3. ランダムなインデックス番号を計算
    const randomIndex = Math.floor(Math.random() * restaurants.length);

    // 4. ランダムに選ばれたレストランを返す
    const recommendedRestaurant = restaurants[randomIndex];
    res.json(recommendedRestaurant);

  } catch (error) {
    console.error("Failed to fetch recommendation:", error);
    res.status(500).json({ error: 'おすすめの取得中にエラーが発生しました。' });
  }
});


// ルートURLへのリクエストで index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

