/* * 全国ラーメンデータベース
 * 将来的にはここで47都道府県を管理、または外部JSON読込に変更する
 */
const ramenSpots = [
    // --- [TOKYO] ---
    { id: "t01", name: "ホープ軒 千駄ヶ谷", lat: 35.6791, lng: 139.7136, region: "TOKYO", parking: "路駐多め・タクシー多め", tags: ["CITY", "NIGHT"], desc: "【24h営業】黄色い看板は深夜の灯台。国立競技場を望む、東京ナイトランの聖地。" },
    { id: "t02", name: "ラーメン二郎 三田本店", lat: 35.6481, lng: 139.7416, region: "TOKYO", parking: "近隣CP推奨", tags: ["CITY", "LEGEND"], desc: "【総本山】東京タワーを見ながら走る国道1号線ルート。全ての二郎の原点。" },
    { id: "t03", name: "のんきや (奥多摩)", lat: 35.7905, lng: 139.0505, region: "TOKYO", parking: "店前広場あり", tags: ["WINDING", "MOUNTAIN"], desc: "【峠飯】奥多摩周遊道路を攻めた後の休憩ポイント。手打ち麺と湖の絶景。" },
    { id: "t04", name: "らーめん弁慶 堀切店", lat: 35.7483, lng: 139.8252, region: "TOKYO", parking: "1F駐車場あり", tags: ["CITY", "RIVER"], desc: "【背脂】荒川・綾瀬川沿いの快走路。下町ライダーのガソリンスタンド。" },

    // --- [CHIBA] ---
    { id: "c01", name: "梅乃家 (竹岡式)", lat: 35.2158, lng: 139.8285, region: "CHIBA", parking: "周辺路肩・空地", tags: ["COASTAL", "LEGEND"], desc: "【海沿い】R127内房なぎさライン。チャーシューの煮汁割スープが疲れた体に染みる。" },
    { id: "c02", name: "アリランラーメン 八平", lat: 35.4055, lng: 140.1764, region: "CHIBA", parking: "専用Pあり", tags: ["WINDING", "ADVENTURE"], desc: "【秘境】Googleマップ必須の峠越えルート。玉ねぎとニンニクのスタミナ系。" },
    { id: "c03", name: "一山いけす (海鮮)", lat: 35.6985, lng: 140.8544, region: "CHIBA", parking: "大型P完備", tags: ["COASTAL", "LONG_TOUR"], desc: "【太平洋】九十九里ビーチラインの北端。伊勢海老ラーメンを目指すロングツーリング。" },
    { id: "c04", name: "なりたけ 津田沼店", lat: 35.6917, lng: 140.0206, region: "CHIBA", parking: "近隣CP", tags: ["CITY", "CALORIE"], desc: "【背脂】千葉ライダーのソウルフード。R14/R296でのナイトラン向け。" },

    // --- [SAITAMA] ---
    { id: "s01", name: "秩父 珍達そば", lat: 35.9972, lng: 139.0845, region: "SAITAMA", parking: "店前P", tags: ["WINDING", "MOUNTAIN"], desc: "【R299】正丸トンネルを抜けた先のゴール地点。ネギたっぷりの一杯。" },
    { id: "s02", name: "大滝食堂 (バイク弁当)", lat: 35.9525, lng: 138.9328, region: "SAITAMA", parking: "バイク専用P多数", tags: ["WINDING", "MECCA"], desc: "【聖地】タンク型容器の弁当。彩甲斐街道のワインディングを楽しめる。" },
    { id: "s03", name: "狼煙 (大宮)", lat: 35.9268, lng: 139.6241, region: "SAITAMA", parking: "近隣CP", tags: ["CITY", "HIGHWAY"], desc: "【R17】新大宮バイパスや高速を使ってアクセス良好。埼玉最強の濃厚つけ麺。" },

    // --- [KANAGAWA] ---
    { id: "k01", name: "飯田商店", lat: 35.1436, lng: 139.1065, region: "KANAGAWA", parking: "予約制/Pあり", tags: ["COASTAL", "LEGEND"], desc: "【西湘BP】海沿いの快走路を抜けた先にある至高の店。完全予約制。" },
    { id: "k02", name: "吉村家 (総本山)", lat: 35.4655, lng: 139.6163, region: "KANAGAWA", parking: "近隣CP", tags: ["CITY", "LEGEND"], desc: "【横浜】第三京浜や首都高横羽線からのアクセス。家系の原点。" },
    { id: "k03", name: "ラーメンショップ 椿 (峠)", lat: 35.4190, lng: 139.2315, region: "KANAGAWA", parking: "大型P", tags: ["WINDING", "MORNING"], desc: "【朝ラー】宮ヶ瀬・ヤビツ峠攻めの前の腹ごしらえ。ネギラーメン。" },
    // ==========================================
    // 関東広域拡張パック (IBARAKI, TOCHIGI, GUNMA + More)
    // ==========================================

    // --- [IBARAKI: ラーショと煮干しの激戦区] ---
    {
        id: "ib01",
        name: "ラーメンショップ 牛久結束店",
        lat: 35.9660, lng: 140.1655, // 牛久
        region: "IBARAKI",
        parking: "砂利P広大",
        tags: ["HIGHWAY", "LEGEND"],
        desc: "【日本一のラーショ】全国のラーメンショップの中で最高評価を得る伝説店。圏央道・牛久阿見ICからアクセス良し。"
    },
    {
        id: "ib02",
        name: "煮干中華ソバ イチカワ",
        lat: 36.0834, lng: 140.1112, // つくば
        region: "IBARAKI",
        parking: "近隣CP",
        tags: ["CITY", "LEGEND"],
        desc: "【煮干しの聖地】全国の煮干しマニアが巡礼する店。筑波山ツーリングの帰りに寄るにはハードルが高い（行列・売り切れ）が挑む価値あり。"
    },
    {
        id: "ib03",
        name: "スタミナラーメン がむしゃ",
        lat: 36.0694, lng: 140.1345, // つくば
        region: "IBARAKI",
        parking: "Pあり",
        tags: ["CITY", "STAMINA"],
        desc: "【茨城ご当地】冷たい麺に熱々の甘辛あんかけを乗せる「スタミナ冷やし」。常磐道を走るライダーの栄養源。"
    },
    {
        id: "ib04",
        name: "浜乃家 (大洗)",
        lat: 36.3087, lng: 140.5732, // 大洗
        region: "IBARAKI",
        parking: "Pあり",
        tags: ["COASTAL", "TOUR"],
        desc: "【大洗】海沿いツーリングの鉄板。昔ながらのラーメンと、ライダーに優しい店構え。"
    },

    // --- [TOCHIGI: 佐野ラーメンと餃子の旅] ---
    {
        id: "tc01",
        name: "青竹手打ちラーメン 大和",
        lat: 36.3378, lng: 139.5915, // 佐野
        region: "TOCHIGI",
        parking: "大型P完備",
        tags: ["HIGHWAY", "LEGEND"],
        desc: "【佐野】東北道・佐野藤岡ICからすぐ。平日でも大行列だが、整理券システムあり。透き通ったスープが絶品。"
    },
    {
        id: "tc02",
        name: "手打 焔 (ほむら)",
        lat: 36.9458, lng: 139.9865, // 那須塩原
        region: "TOCHIGI",
        parking: "Pあり",
        tags: ["WINDING", "TOUR"],
        desc: "【那須】東北方面へのロングツーリングの関所。福島白河ラーメンの系譜。スモーキーなチャーシューが特徴。"
    },
    {
        id: "tc03",
        name: "ラーメンショップ 卒島店",
        lat: 36.3688, lng: 139.8327, // 小山
        region: "TOCHIGI",
        parking: "大型P",
        tags: ["HIGHWAY", "MORNING"],
        desc: "【北関東】R50号沿いのオアシス。朝6時から営業しており、日光・那須方面へ向かう朝ツーの朝食に最適。"
    },

    // --- [GUNMA: 峠と小麦の王国] ---
    {
        id: "gm01",
        name: "だるま大使 本店",
        lat: 36.3478, lng: 138.9855, // 高崎
        region: "GUNMA",
        parking: "Pあり",
        tags: ["CITY", "LEGEND"],
        desc: "【群馬豚骨】高崎環状線近く。濃厚こってり豚骨のレジェンド。草津・軽井沢帰りの冷えた体に染みる。"
    },
    {
        id: "gm02",
        name: "支那そば なかじま",
        lat: 36.3662, lng: 139.0440, // 高崎
        region: "GUNMA",
        parking: "Pあり",
        tags: ["CITY", "QUALITY"],
        desc: "【淡麗】こってり系が多い北関東で輝く清湯スープ。並んででも食べる価値のある一杯。"
    },
    {
        id: "gm03",
        name: "永井食堂 (番外編:もつ煮)",
        lat: 36.5458, lng: 139.0225, // 渋川
        region: "GUNMA",
        parking: "大型P (バイク多数)",
        tags: ["WINDING", "MECCA"],
        desc: "【聖地】ラーメン店ではないが、群馬ツーリングといえばココ。R17三国峠へ向かうライダーの9割が吸い込まれるもつ煮定食。"
    },

    // --- [SAITAMA: 埼玉拡張 (R299/R17)] ---
    {
        id: "s04",
        name: "中華そば 四つ葉",
        lat: 35.9752, lng: 139.4755, // 川島町
        region: "SAITAMA",
        parking: "超大型P (砂利・舗装)",
        tags: ["RURAL", "LEGEND"],
        desc: "【孤高の名店】駅からは遠く、車かバイクでしか行けない立地だが日本トップクラスの人気。寿司屋併設。"
    },
    {
        id: "s05",
        name: "頑者 本店",
        lat: 35.9135, lng: 139.4835, // 川越
        region: "SAITAMA",
        parking: "近隣CP",
        tags: ["CITY", "LEGEND"],
        desc: "【小江戸】つけ麺ブームの火付け役。川越観光ツーリングとセットで楽しみたい。"
    },
    
    // --- [KANAGAWA: 神奈川拡張 (山・海)] ---
    {
        id: "k04",
        name: "ZUND-BAR",
        lat: 35.4452, lng: 139.2905, // 厚木（七沢）
        region: "KANAGAWA",
        parking: "専用Pあり",
        tags: ["WINDING", "STYLISH"],
        desc: "【大山・丹沢】AFURIの総本店。山奥にあるお洒落な店。宮ヶ瀬ダムへ抜けるルート上にあり、ツーリングに最適。"
    },
    {
        id: "k05",
        name: "ラーメン クックら",
        lat: 35.5312, lng: 139.4355, // 相模大野
        region: "KANAGAWA",
        parking: "近隣CP",
        tags: ["CITY", "HOUSE"],
        desc: "【家系】王道家直伝のパンチ力。R16号沿いでアクセスが良く、夜の首都圏ツーリングの目的地に。"
    },

    // --- [TOKYO: 東京拡張 (多摩・街道)] ---
    {
        id: "t05",
        name: "ラーメンショップ 椿 (新小金井街道)",
        lat: 35.6925, lng: 139.5032, // 小金井
        region: "TOKYO",
        parking: "Pあり",
        tags: ["CITY", "GARLIC"],
        desc: "【街道沿い】多摩エリアのライダーに愛されるラーショ。ニンニクをガッツリ入れてナイトランへ。"
    }
];
    // --- [KANAGAWA: 神奈川拡張 (山・海)] ---
    {
   
