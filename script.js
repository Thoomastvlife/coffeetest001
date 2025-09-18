function calculate() {
  const amount = parseFloat(document.getElementById("query").value.trim());

  if (isNaN(amount)) {
    alert("請輸入有效數字！");
    return;
  }

  if (amount < 100 || amount > 50000) {
    alert("金額範圍必須在 100 ~ 50000 之間！");
    return;
  }

  // 判斷兌換比例
  const rate = amount >= 2000 ? 3.05 : 3;
  const displayRate = amount >= 2000 ? "1 : 3.05" : "1 : 3";

  // 計算可獲得抖幣
  const coins = (amount * rate).toFixed(2);

  // 顯示結果
  const results = document.getElementById("results");
  results.innerHTML = `
    <div class="card">
      <div>
        <strong>輸入金額：${amount} TWD</strong><br>
        <small>兌換比例：${displayRate}</small><br>
        <small>可獲得抖幣：${coins}</small>
      </div>
    </div>
  `;
}
