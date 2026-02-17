/* * MOTO-GACHA APP LOGIC
 */

let systemState = {
    locationMode: 'GPS', 
    rangeMode: 'SHORT',
    userPos: null,
    isSpinning: false
};

const BASE_POS = { lat: 35.6812, lng: 139.7671 }; // 東京駅

// 音源を用意しても面白いが、今回は視覚効果のみで実装

// 設定切り替え関数
function setLoc(mode) {
    systemState.locationMode = mode;
    if(mode === 'GPS') {
        navigator.geolocation.getCurrentPosition(
            (pos) => { systemState.userPos = { lat: pos.coords.latitude, lng: pos.coords.longitude }; },
            (err) => { alert("GPS失敗！マニュアルモードにします"); document.getElementById('manual').checked = true; setLoc('MANUAL'); }
        );
    }
}

function setRng(mode) { systemState.rangeMode = mode; }

// 距離計算
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ★メイン：ガチャを回す演出★
function spinGacha() {
    if(systemState.isSpinning) return;

    // 1. 準備：位置情報チェック
    let startPos = systemState.userPos;
    if (systemState.locationMode === 'MANUAL') startPos = BASE_POS;
    else if (!startPos) {
        alert("GPS探索中...もう一度押してね");
        setLoc('GPS');
        return;
    }

    // 2. 候補リスト作成
    const candidates = ramenSpots.map(shop => {
        return { ...shop, dist: getDistance(startPos.lat, startPos.lng, shop.lat, shop.lng) };
    }).filter(shop => {
        if (systemState.rangeMode === 'SHORT') return shop.dist <= 35;
        return shop.dist > 35;
    });

    if (candidates.length === 0) {
        alert("この範囲にお店がない！設定を変えてみて！");
        return;
    }

    // 3. スピン開始！
    systemState.isSpinning = true;
    document.getElementById('result-overlay').classList.remove('show'); // 結果を隠す
    
    const reel = document.getElementById('reel-text');
    const display = document.querySelector('.display-window');
    
    // ガタガタ揺らす
    display.classList.add('shake');
    
    // ドラムロール演出 (名前をパラパラ変える)
    let count = 0;
    const maxCount = 20; // 何回切り替わるか
    const interval = setInterval(() => {
        // ランダムに店名を表示
        const randomName = ramenSpots[Math.floor(Math.random() * ramenSpots.length)].name;
        reel.innerText = randomName;
        reel.style.color = count % 2 === 0 ? '#ffde00' : '#fff'; // チカチカさせる
        
        count++;
        if (count > maxCount) {
            clearInterval(interval);
            display.classList.remove('shake');
            // 4. 確定！
            const winner = candidates[Math.floor(Math.random() * candidates.length)];
            showResult(winner);
            systemState.isSpinning = false;
        }
    }, 100); // 0.1秒ごとに切り替え
}

// 結果表示
function showResult(shop) {
    const overlay = document.getElementById('result-overlay');
    
    // データの注入
    document.getElementById('res-name').innerText = shop.name;
    document.getElementById('res-area').innerText = shop.region;
    document.getElementById('res-desc').innerText = shop.desc;
    
    // 時間計算
    const timeEst = Math.round(shop.dist / 30 * 60);
    const timeText = timeEst > 60 ? Math.floor(timeEst/60) + "時間" + (timeEst%60) + "分" : timeEst + "分";
    document.getElementById('res-time').innerText = "片道 " + timeText;

    // ランク演出（距離によってレア度を変える遊び心）
    const rank = document.getElementById('res-rank');
    if(shop.dist > 100) { rank.innerText = "UR"; rank.style.background = "linear-gradient(45deg, #ffd700, #fff)"; } // 遠いほどレア
    else if(shop.dist > 50) { rank.innerText = "SSR"; rank.style.background = "#ff00cc"; }
    else { rank.innerText = "SR"; rank.style.background = "#00ffff"; }

    // マップボタン設定
    const mapBtn = document.getElementById('btn-open-map');
    mapBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + " " + shop.region)}`;

    // ババン！と表示
    overlay.classList.add('show');
}

function resetGacha() {
    document.getElementById('result-overlay').classList.remove('show');
    document.getElementById('reel-text').innerText = "PRESS START";
}

// 初期化
window.onload = function() {
    setLoc('GPS'); // 最初はGPS取得トライ
};
