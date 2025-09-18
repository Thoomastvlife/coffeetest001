// 兌換比例規則陣列，可擴充
const rateRules = [
  { min: 10000, rate: 3.05 },
  { min: 8000, rate: 3.04 },
  { min: 5000, rate: 3.035 },
  { min: 3000, rate: 3.03 },
  { min: 2000, rate: 3.02 },
  { min: 1000, rate: 3.01 },
  { min: 100, rate: 3 },
  // 可新增更多規則
];

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

  // 根據規則找到適合的比例
  let rate = 1; // 預設比例
  for (let rule of rateRules) {
    if (amount >= rule.min) {
      rate = rule.rate;
      break; // 找到第一個符合的規則就停止
    }
  }

  const displayRate = rateRules.find(r => r.rate === rate)?.rate === 3.05 ? "1 : 3.05" : "1 : 3";

  const coins = (amount * rate).toFixed(2); // 計算可獲得抖幣

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
