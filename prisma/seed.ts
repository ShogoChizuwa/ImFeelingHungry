import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// 投入するレストランのモックデータ（食べログURL版）
const restaurantData: Prisma.RestaurantCreateInput[] = [
  { name: 'ハイ，ハウ アー ユー', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14040637/', genre: 'カレー', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/208382/640x640_rect_b4275232376f0d3700a93f5b35be1b64.jpg' },
  { name: '日吉 大勝軒', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14033593/', genre: 'ラーメン・つけ麺', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/298444/640x640_rect_ed6389b63bb2617c59665bedb85853ad.jpg' },
  { name: '極楽汁麺 らすた', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14000095/', genre: 'ラーメン・つけ麺', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/195243/640x640_rect_ca354b22e3964ccebe31713266919c0b.jpg' },
  { name: '武蔵家 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14007923/', genre: 'ラーメン', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/296788/640x640_rect_ef3837687252b417da0b81ba7e8088c4.jpg' },
  { name: 'とんかつ 和栗', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14057269/', genre: 'とんかつ・カレー', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/234004/640x640_rect_574b50e96b6b2bf2dc73e7f356e71496.jpg' },
  { name: 'アルピノ', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14000353/', genre: 'イタリアン・パスタ・ピザ', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/43683/640x640_rect_43683294.jpg' },
  { name: 'ラーメンどん', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14014795/', genre: 'ラーメン・つけ麺', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/307786/640x640_rect_c93b9430195ca5496bd34a131803cd61.jpg' },
  { name: '家系ラーメン大輝家 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14090003/', genre: 'ラーメン', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/307344/640x640_rect_a73939648ab0bed51c6800fe38fad15b.jpg' },
  { name: 'BURDIGALA 日吉東急店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14067132/', genre: 'パン・カフェ', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/306535/640x640_rect_f68d24668602f5979db931708c0d994a.jpg' },
  { name: '麺場 ハマトラ 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14004981/', genre: 'ラーメン・油そば・まぜそば・つけ麺', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/288359/640x640_rect_64ac742e269a805bc944d77cbf762cb7.jpg' },
  { name: 'らーめん柴田商店ver.2.0', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14058110/', genre: 'ラーメン', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/279703/640x640_rect_9d77e50ce52d571790216b7ac4c80c29.jpg' },
  { name: 'ホアホア', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14006626/', genre: 'ベトナム料理・ダイニングバー・カフェ', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/78360/640x640_rect_78360506.jpg' },
  { name: 'とらひげ', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14000094/', genre: '洋食・食堂', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/307872/640x640_rect_c8944fafdbfcec5d1db748c6eb18a47c.jpg' },
  { name: '貝麺 あおみ', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14095532/', genre: 'ラーメン・油そば・まぜそば', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/305431/640x640_rect_1c0c334841d5f4a056c531c2d1a68933.jpg' },
  { name: 'やながわ精肉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14061323/', genre: 'ハンバーグ・ステーキ・洋食', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/301736/640x640_rect_58e31dcfc418fa459bc161fcbdbb2561.jpg' },
  { name: 'まちノ食堂', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14086562/', genre: '居酒屋・鳥料理', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/290001/640x640_rect_d497bb91c82bb690ceef8be8e9a940fa.jpg' },
  { name: '王府', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14016152/', genre: '中華料理・担々麺', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/308085/640x640_rect_d374d4209d4f1759c5c48b50f8193659.jpg' },
  { name: 'ド・マーレ湘南 日吉', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14008606/', genre: 'パスタ・イタリアン', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/290167/640x640_rect_a9e366e41f2e33eba3755e1ad422a31b.jpg' },
  { name: 'ベンダーキッチン 日吉店', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14037451/', genre: 'アメリカ料理・洋食', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/268936/640x640_rect_36d056edc58eb9461d8d99d11a8ec45f.jpg' },
  { name: '沖縄食堂チャンプル×チャンプル', tabelogUrl: 'https://tabelog.com/kanagawa/A1401/A140204/14063856/', genre: '沖縄料理・食堂', imageUrl: 'https://tblg.k-img.com/restaurant/images/Rvw/257652/640x640_rect_86d681c8cb592f9cda7ead384bd71a9c.jpg' }
];

async function main() {
  console.log(`Start seeding ...`);

  console.log('Deleting existing restaurant data...');
  await prisma.restaurant.deleteMany();
  console.log('Existing data deleted.');

  for (const r of restaurantData) {
    await prisma.restaurant.create({
      data: r,
    });
    console.log(`Created restaurant: ${r.name}`);
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