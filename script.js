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

// 計算單筆金額的抖幣
function calculateCoins(amount) {
  if (amount < 100 || amount > 50000) return null;

  // 找出對應比例
  let rate = 1;
  for (let rule of rateRules) {
    if (amount >= rule.min) {
      rate = rule.rate;
      break;
    }
  }
  const coins = (amount * rate).toFixed(2);
  return { amount, rate, coins };
}

// 顯示結果
function renderResults(results) {
  const container = document.getElementById("results");
  if (results.length === 0) {
    container.innerHTML = "<p>請輸入金額（100~50000）</p>";
    return;
  }

  container.innerHTML = results.map(r => {
    const displayRate = `1 : ${r.rate}`;
    return `
      <div class="card">
        <div>
          <strong>輸入金額：${r.amount} TWD</strong><br>
          <small>兌換比例：${displayRate}</small><br>
          <small>可獲得抖幣：${r.coins}</small>
        </div>
      </div>
    `;
  }).join("");
}

// 主要計算函數
function calculate() {
  const input1 = parseFloat(document.getElementById("amount1").value.trim());
  const input2 = parseFloat(document.getElementById("amount2").value.trim());

  const results = [];

  const res1 = calculateCoins(input1);
  if (res1) results.push(res1);

  const res2 = calculateCoins(in
