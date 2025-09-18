// 假資料庫
const products = [
  { id: "1001", name: "抖幣 100", price: XXX, currency: "TWD" },
  { id: "1002", name: "抖幣 10000", price: 3333, currency: "TWD" },
  { id: "2001", name: "代儲服務-快速", price: XXX, currency: "TWD" },
  { id: "3001", name: "代儲服務-大額", price: XXX, currency: "TWD" },
  { id: "4001", name: "超大額專屬方案", price: XXX, currency: "TWD" },
  { id: "5001", name: "超大額 VIP", price: 50000, currency: "TWD" }
];

function search() {
  const q = parseInt(document.getElementById("query").value.trim(), 10);

  if (isNaN(q)) {
    alert("請輸入有效數字！");
    return;
  }

  if (q < 100 || q > 50000) {
    alert("價格範圍必須在 100 ~ 50000 之間！");
    return;
  }

  // 範圍查詢：顯示價格 ≥100 且 ≤輸入價格的商品
  const results = products.filter(p => p.price >= 100 && p.price <= q);
  render(results);
}

function showAll() {
  document.getElementById("query").value = "";
  render(products.filter(p => p.price >= 100));
}

function render(items) {
  const results = document.getElementById("results");
  if (items.length === 0) {
    results.innerHTML = "<p>查無商品</p>";
    return;
  }

  results.innerHTML = items.map(p => {
    const rate = p.price >= 1000 ? 3.05 : 3;
    const displayRate = p.price >= 1000 ? "1 : 3.05" : "1 : 3";
    const coins = (p.price * rate).toFixed(2); // 計算可獲得抖幣數量

    return `
      <div class="card">
        <div>
          <strong>${p.name}</strong><br>
          <small>ID: ${p.id}</small>
        </div>
        <div>
          <strong>${p.price} ${p.currency}</strong><br>
          <small>兌換比例：${displayRate}</small><br>
          <small>可獲得抖幣：${coins}</small>
        </div>
      </div>
    `;
  }).join("");
}

// 預設載入全部（價格 ≥100）
showAll();
