import express from 'express';
import path from 'path';

// Expressアプリケーションのインスタンスを作成
const app = express();
// サーバーが待ち受けるポート番号。Renderなどの環境では環境変数で指定されることがあるため、
// process.env.PORTがあればそれを使用し、なければ3000番ポートを使用します。
const PORT = process.env.PORT || 3000;

// 静的ファイルを配信するためのミドルウェアを設定
// 'public'ディレクトリにあるHTMLやCSS、JavaScriptファイルにブラウザからアクセスできるようになります。
app.use(express.static(path.join(__dirname, '..', 'public')));

// ルートURL ('/') にGETリクエストがあった場合に実行される処理
// 今回は静的ファイル配信がメインなので、このルートは必須ではありませんが、
// APIエンドポイントとして残しておくと後々便利です。
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

// 指定したポートでサーバーを起動し、リクエストを待ち受けます
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});