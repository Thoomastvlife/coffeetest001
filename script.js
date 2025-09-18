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
  const item = document.createElement("div");
  item.className = "draggable-item";
  item.innerHTML = `<input type="number" class="amount-input" placeholder="輸入金額 (100~50000)">`;
  container.appendChild(item);
  enableDragAndDrop(); // 每次新增框都啟用拖曳
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

// 拖曳功能
function enableDragAndDrop() {
  const container = document.getElementById("inputs-container");
  let dragItem = null;

  const items = container.querySelectorAll(".draggable-item");
  items.forEach(item => {
    item.draggable = true;

    item.ondragstart = e => {
      dragItem = item;
      setTimeout(() => item.style.display = 'none', 0);
    };

    item.ondragend = e => {
      dragItem = null;
      item.style.display = 'flex';
    };

    item.ondragover = e => e.preventDefault();

    item.ondrop = e => {
      e.preventDefault();
      if (dragItem && dragItem !== item) {
        const children = Array.from(container.children);
        const dragIndex = children.indexOf(dragItem);
        const dropIndex = children.indexOf(item);
        if (dragIndex < dropIndex) {
          container.insertBefore(dragItem, item.nextSibling);
        } else {
          container.insertBefore(dragItem, item);
        }
      }
    };
  });
}

// 初始啟用拖曳
enableDragAndDrop();
