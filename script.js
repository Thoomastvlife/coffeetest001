// 兌換比例規則，可擴充
const rateRules = [
  { min: 10000, rate: 3.05 },
  { min: 8000, rate: 3.04 },
  { min: 5000, rate: 3.035 },
  { min: 3000, rate: 3.03 },
  { min: 2000, rate: 3.02 },
  { min: 1000, rate: 3.01 },
  { min: 100, rate: 3 }
];

// 新增輸入框
function addInput() {
  const container = document.getElementById("inputs-container");
  const input = document.createElement("input");
  input.type = "number";
  input.className = "amount-input";
  input.placeholder = "輸入金額 (100~50000)";
  container.appendChild(input);
}

// 計算單筆金額
function calculateCoins(amount) {
  if (isNaN(amount) || amount < 100 || amount > 50000) return null;

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

// 計算所有輸入框
function calculate() {
  const inputs = document.querySelectorAll(".amount-input");
  const results = [];

  inputs.forEach(input => {
    const val = parseFloat(input.value.trim());
    const res = calculateCoins(val);
    if (res) results.push(res);
  });

  renderResults(results);
}

// 顯示結果
function renderResults(results) {
  const container = document.getElementById("results");
  if (results.length === 0) {
    container.innerHTML = "<p>請輸入金額並點擊計算</p>";
    return;
  }

  container.innerHTML = results.map(r => `
    <div class="card">
      <div>
        <strong>輸入金額：${r.amount} TWD</strong><br>
        <small>兌換比例：1 : ${r.rate}</small><br>
        <small>可獲得抖幣：${r.coins}</small>
      </div>
    </div>
  `).join("");
}
