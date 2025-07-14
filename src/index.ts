import express from 'express';
import path from 'path';
// PrismaClientをインポートします
import { PrismaClient } from '@prisma/client';

// PrismaClientのインスタンスを作成
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;

// publicディレクトリ内の静的ファイルを配信するための設定
app.use(express.static(path.join(__dirname, '..', 'public')));

// /api/restaurants というURLにGETリクエストが来た時の処理
app.get('/api/restaurants', async (req, res) => {
  try {
    // データベースから全てのレストランデータを取得します
    const restaurants = await prisma.restaurant.findMany();
    // 取得したデータをJSON形式でクライアントに返します
    res.json(restaurants);
  } catch (error) {
    // エラーが発生した場合は、コンソールにログを出力し、500エラーを返します
    console.error("Failed to fetch restaurants:", error);
    res.status(500).json({ error: 'データベースからレストラン情報を取得できませんでした。' });
  }
});

// サーバーを起動します
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
