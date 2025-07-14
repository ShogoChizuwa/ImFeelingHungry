import express from 'express';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// publicディレクトリ内の静的ファイルを配信するための設定
// ビルド時に public ディレクトリが dist/public にコピーされることを想定しています
app.use(express.static(path.join(__dirname, 'public')));

// /api/restaurants というURLにGETリクエストが来た時の処理
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    res.json(restaurants);
  } catch (error) {
    console.error("Failed to fetch restaurants:", error);
    res.status(500).json({ error: 'データベースからレストラン情報を取得できませんでした。' });
  }
});

// ルートURLへのリクエストで index.html を返す
// express.staticがこれを処理しますが、念のためフォールバックとして設定
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
