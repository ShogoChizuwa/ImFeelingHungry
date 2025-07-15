// HTMLの要素を取得
const recommendButton = document.getElementById('recommend-button');
const restaurantDisplay = document.getElementById('restaurant-display');

// ボタンがクリックされたときの処理を登録
recommendButton.addEventListener('click', async () => {
  try {
    // 1. ローディング表示
    restaurantDisplay.innerHTML = '<p>お店を探しています...</p>';
    restaurantDisplay.style.backgroundColor = '#f9f9f9';

    // 2. サーバーのAPIにリクエストを送信
    const response = await fetch('/api/recommend');

    // 3. レスポンスが正常でなければエラーを投げる
    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    // 4. レスポンスのJSONをJavaScriptのオブジェクトに変換
    const restaurant = await response.json();

    // 5. 取得したレストラン情報を使って、表示するHTMLを生成
    const restaurantHTML = `
      <div class="restaurant-card">
        <h2>${restaurant.name}</h2>
        <p><strong>ジャンル:</strong> ${restaurant.genre}</p>
        <p>
          <a href="${restaurant.tabelogUrl}" target="_blank" rel="noopener noreferrer">
            お店の情報を確認する
          </a>
        </p>
      </div>
    `;

    // 6. 生成したHTMLを表示エリアに挿入
    restaurantDisplay.innerHTML = restaurantHTML;
    restaurantDisplay.style.backgroundColor = '#e6f7ff';

  } catch (error) {
    // エラーが発生した場合の処理
    console.error('おすすめの取得に失敗しました:', error);
    restaurantDisplay.innerHTML = '<p>エラーが発生しました。もう一度お試しください。</p>';
    restaurantDisplay.style.backgroundColor = '#ffebe6';
  }
});
