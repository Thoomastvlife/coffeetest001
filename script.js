// 🔔 公告列表
const announcements = [
  "🎉 歡迎使用咖啡自助查價！",
  "📌 生日專案已自動內建，不需額外詢問",
  "⚠️ 150~50000 金額內可自助查價",
  "📩 特殊方案請私訊"
];

window.onload = () => {
  showAnnouncements();
  enableDragAndDrop();
};

function showAnnouncements() {
  const list = document.getElementById("announce-list");
  list.innerHTML = announcements.map(t => `<li>${t}</li>`).join("");

  const modal = document.getElementById("announce-backdrop");
  const popup = document.getElementById("announce-popup");
  modal.style.display = "flex";
  setTimeout(() => popup.classList.add("show"), 10);
}

function closeAnnounce() {
  const modal = document.getElementById("announce-backdrop");
  const popup = document.getElementById("announce-popup");

  popup.classList.remove("show");
  setTimeout(() => modal.style.display = "none", 300);
}

// 📌 兌換表
const rateRules = [
  { min: 7000, rate: 3.01 },
  { min: 6500, rate: 3.005 },
  { min: 6000, rate: 3.000 },
  { min: 5081, rate: 2.995 },
  { min: 5080, rate: 3.01 },
  { min: 5000, rate: 2.995 },
  { min: 4500, rate: 2.990 },
  { min: 4065, rate: 2.985 },
  { min: 4064, rate: 3.00 },
  { min: 4000, rate: 2.985 },
  { min: 3049, rate: 2.980 },
  { min: 3048, rate: 2.99 },
  { min: 3000, rate: 2.980 },
  { min: 2500, rate: 2.975 },
  { min: 2400, rate: 2.970 },
  { min: 2200, rate: 2.970 },
  { min: 2033, rate: 2.969 },
  { min: 2032, rate: 2.98 },
  { min: 2000, rate: 2.969 },
  { min: 1800, rate: 2.968 },
  { min: 1600, rate: 2.967 },
  { min: 1400, rate: 2.966 },
  { min: 1200, rate: 2.965 },
  { min: 1017, rate: 2.96 },
  { min: 1016, rate: 2.97 },
  { min: 1000, rate: 2.96 },
  { min: 850, rate: 2.958 },
  { min: 700, rate: 2.955 },
  { min: 500, rate: 2.952 },
  { min: 400, rate: 2.951 },
  { min: 350, rate: 2.95 },
  { min: 250, rate: 2.948 },
  { min: 150, rate: 2.945 }
];

// ⚠️ 提示 popup
function showPopup(msg){
  const popup = document.getElementById("popup");
  const backdrop = document.getElementById("modal-backdrop");
  document.getElementById("popup-message").textContent = msg;

  backdrop.style.display = "flex";
  setTimeout(() => popup.classList.add("show"), 10);
  document.getElementById("popup-close").onclick = hidePopup;

  setTimeout(hidePopup, 3000);
}

function hidePopup(){
  const popup = document.getElementById("popup");
  const backdrop = document.getElementById("modal-backdrop");
  popup.classList.remove("show");
  setTimeout(() => backdrop.style.display = "none", 300);
}

// ➕ 新增欄位
function addInput(){
  const div = document.createElement("div");
  div.className = "draggable-item";
  div.innerHTML = `<input type="number" class="amount-input" placeholder="輸入金額 (150~50000)">`;
  document.getElementById("inputs-container").appendChild(div);
  enableDragAndDrop();
}

// 💰 計算邏輯
function calculateCoins(amount){
  if(isNaN(amount)||amount<150||amount>50000){
    showPopup("其他金額請私信");
    return null;
  }
  let rate = 1;
  for(let r of rateRules){
    if(amount >= r.min) { rate = r.rate; break; }
  }
  return { amount, rate, coins:(amount*rate).toFixed(2) };
}

// ▶️ 計算
function calculate(){
  const results=[];
  document.querySelectorAll(".amount-input").forEach(input=>{
    const val = parseFloat(input.value);
    const data = calculateCoins(val);
    if(data) results.push(data);
  });
  renderResults(results);
}

function renderResults(results){
  const c = document.getElementById("results");
  if(!results.length) return c.innerHTML="<p>請輸入金額並計算</p>";

  c.innerHTML = results.map(r=>`
    <div class="card">
      <b>${r.amount} TWD</b><br>
      換算比例：${r.rate}<br>
      可得抖幣：${r.coins}
    </div>
  `).join("");
}

// 🧲 拖曳排序
function enableDragAndDrop(){
  const container = document.getElementById("inputs-container");
  let dragItem=null;
  container.querySelectorAll(".draggable-item").forEach(item=>{
    item.draggable = true;
    item.ondragstart = () => { dragItem = item; setTimeout(()=>item.style.opacity=.3,0); };
    item.ondragend = () => { item.style.opacity=1; };
    item.ondragover = e => e.preventDefault();
    item.ondrop = e => {
      e.preventDefault();
      if(dragItem !== item){
        const children = [...container.children];
        const from = children.indexOf(dragItem);
        const to = children.indexOf(item);
        if(from<to) container.insertBefore(dragItem,item.nextSibling);
        else container.insertBefore(dragItem,item);
      }
    }
  });
}
