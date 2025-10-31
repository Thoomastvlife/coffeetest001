document.addEventListener("DOMContentLoaded", ()=> {

  /* ===== 原本功能 ===== */
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

  function showPopup(msg){
    const popup = document.getElementById("popup");
    const backdrop = document.getElementById("modal-backdrop");
    document.getElementById("popup-message").textContent = msg;
    backdrop.style.display = "flex";
    setTimeout(()=>popup.classList.add("show"),10);
    document.getElementById("popup-close").onclick = hidePopup;
    setTimeout(hidePopup,3000);
  }

  function hidePopup(){
    const popup = document.getElementById("popup");
    const backdrop = document.getElementById("modal-backdrop");
    popup.classList.remove("show");
    setTimeout(()=>{ backdrop.style.display="none"; },300);
  }

  function addInput(){
    const container = document.getElementById("inputs-container");
    const div = document.createElement("div");
    div.className="draggable-item";
    div.innerHTML=`<input type="number" class="amount-input" placeholder="輸入金額 (100~50000)">`;
    container.appendChild(div);
    enableDragAndDrop();
  }

  function calculateCoins(amount){
    if(isNaN(amount) || amount<150 || amount>50000){
      showPopup("其他金額請私信");
      return null;
    }
    let rate=1;
    for(let rule of rateRules){
      if(amount>=rule.min){ rate=rule.rate; break; }
    }
    return { amount, rate, coins:(amount*rate).toFixed(2) };
  }

  function calculate(){
    const inputs = document.querySelectorAll(".amount-input");
    const results=[];
    inputs.forEach(input=>{
      const val=parseFloat(input.value.trim());
      const res=calculateCoins(val);
      if(res) results.push(res);
    });
    renderResults(results);
  }

  function renderResults(results){
    const container=document.getElementById("results");
    if(results.length===0){
      container.innerHTML="<p>請輸入金額並點擊計算</p>";
      return;
    }
    container.innerHTML=results.map(r=>`
      <div class="card">
        <strong>輸入金額：${r.amount} TWD</strong><br>
        <small>兌換比例：1 : ${r.rate}</small><br>
        <small>預計可獲得抖幣：${r.coins}</small>
      </div>
    `).join("");
  }

  function enableDragAndDrop(){
    const container = document.getElementById("inputs-container");
    let dragItem=null;
    const items=container.querySelectorAll(".draggable-item");
    items.forEach(item=>{
      item.draggable=true;
      item.ondragstart=e=>{ dragItem=item; setTimeout(()=>item.style.display='none',0); };
      item.ondragend=e=>{ dragItem=null; item.style.display='flex'; };
      item.ondragover=e=>e.preventDefault();
      item.ondrop=e=>{
        e.preventDefault();
        if(dragItem && dragItem!==item){
          const children=Array.from(container.children);
          const dragIndex=children.indexOf(dragItem);
          const dropIndex=children.indexOf(item);
          if(dragIndex<dropIndex) container.insertBefore(dragItem,item.nextSibling);
          else container.insertBefore(dragItem,item);
        }
      };
    });
  }

  enableDragAndDrop();

  /* ===== 公告彈窗 ===== */
  const announcements=[
    "⚠️ 本系統為試算工具，數值僅供參考",
    "🎁 活動請私訊客服",
    "⏰ 高峰期回覆較慢，敬請見諒"
  ];

  const announceList=document.getElementById("announce-list");
  announcements.forEach(text=>{
    const li=document.createElement("li");
    li.textContent=text;
    announceList.appendChild(li);
  });

  const announceBackdrop=document.getElementById("announce-backdrop");
  document.getElementById("announce-close").onclick=()=> announceBackdrop.style.display="none";

  // 載入完成後彈出公告
  setTimeout(()=>announceBackdrop.style.display="flex", 800);

});
