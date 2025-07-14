import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 投入するレストランのモックデータ（食べログURL版）
const restaurantData = [
  { name: 'ハイ，ハウ アー ユー', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14040637/', genre: 'カレー' },
  { name: '日吉 大勝軒', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14033593/', genre: 'ラーメン・つけ麺' },
  { name: '極楽汁麺 らすた', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14000095/', genre: 'ラーメン・つけ麺' },
  { name: '武蔵家 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14007923/', genre: 'ラーメン' },
  { name: 'とんかつ 和栗', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14057269/', genre: 'とんかつ・カレー' },
  { name: 'アルピノ', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14000353/', genre: 'イタリアン・パスタ・ピザ' },
  { name: 'ラーメンどん', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14014795/', genre: 'ラーメン・つけ麺' },
  { name: '家系ラーメン大輝家 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14090003/', genre: 'ラーメン' },
  { name: 'BURDIGALA 日吉東急店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14067132/', genre: 'パン・カフェ' },
  { name: '麺場 ハマトラ 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14004981/', genre: 'ラーメン・油そば・まぜそば・つけ麺' },
  { name: 'らーめん柴田商店ver.2.0', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14058110/', genre: 'ラーメン' },
  { name: 'ホアホア', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14006626/', genre: 'ベトナム料理・ダイニングバー・カフェ' },
  { name: 'とらひげ', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14000094/', genre: '洋食・食堂' },
  { name: '貝麺 あおみ', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14095532/', genre: 'ラーメン・油そば・まぜそば' },
  { name: 'やながわ精肉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14061323/', genre: 'ハンバーグ・ステーキ・洋食' },
  { name: 'まちノ食堂', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14086562/', genre: '居酒屋・鳥料理' },
  { name: '王府', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14016152/', genre: '中華料理・担々麺' },
  { name: 'ド・マーレ湘南 日吉', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14008606/', genre: 'パスタ・イタリアン' },
  { name: 'ベンダーキッチン 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14037451/', genre: 'アメリカ料理・洋食' },
  { name: '沖縄食堂チャンプル×チャンプル', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14063856/', genre: '沖縄料理・食堂' },
];

async function main() {
  console.log(`Start seeding ...`);

  // 既存のデータを更新し、なければ新規作成する 'upsert' を使います
  for (const r of restaurantData) {
    const restaurant = await prisma.restaurant.upsert({
      where: { name: r.name }, // 店名でレストランを探す
      update: r, // 見つかったらデータを更新
      create: r, // 見つからなければデータを作成
    });
    console.log(`Created or updated restaurant with id: ${restaurant.id}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
