const recommendButton = document.getElementById('recommend-button');
const restaurantDisplay = document.getElementById('restaurant-display');

recommendButton.addEventListener('click', async () => {
  try {
    restaurantDisplay.innerHTML = '<p>お店を探しています...</p>';
    restaurantDisplay.style.backgroundColor = '#f9f9f9';

    const response = await fetch('/api/recommend');

    if (!response.ok) {
      throw new Error(`サーバーエラー: ${response.status}`);
    }

    const restaurant = await response.json();

    // ★★★ 表示するHTMLに画像タグを追加 ★★★
    const restaurantHTML = `
      <div class="restaurant-card">
        <img src="${restaurant.imageUrl}" alt="${restaurant.name} の画像" class="restaurant-image">
        <h2>${restaurant.name}</h2>
        <p><strong>ジャンル:</strong> ${restaurant.genre}</p>
        <p>
          <a href="${restaurant.tabelogUrl}" target="_blank" rel="noopener noreferrer">
            お店の情報を確認する
          </a>
        </p>
      </div>
    `;

    restaurantDisplay.innerHTML = restaurantHTML;
    restaurantDisplay.style.backgroundColor = '#e6f7ff';

  } catch (error) {
    console.error('おすすめの取得に失敗しました:', error);
    restaurantDisplay.innerHTML = '<p>エラーが発生しました。もう一度お試しください。</p>';
    restaurantDisplay.style.backgroundColor = '#ffebe6';
  }
});
