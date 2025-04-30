// -----------------------------
// 月ごとの利用者管理 main.js
// -----------------------------

// 月リストを自動生成（例：過去12ヶ月）
const userMonthSelect = document.getElementById("userMonthSelect");
const now = new Date();
for (let i = 0; i < 12; i++) {
  const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
  const ym = d.toISOString().slice(0, 7); // "YYYY-MM"
  const option = document.createElement("option");
  option.value = ym;
  option.textContent = `${ym} 月`;
  userMonthSelect.appendChild(option);
}

// 最新月を初期表示に
userMonthSelect.selectedIndex = 0;

let currentMonth = userMonthSelect.value;

// 利用者フォームイベントなど（あなたの main.js の既存コードをここに組み込んでください）
// この例では、localStorage のキーを `nursingUsers_YYYY-MM` にして月ごと保存します

function getStorageKey() {
  return `nursingUsers_${currentMonth}`;
}

function loadUsersForMonth() {
  const userTableBody = document.querySelector("#userTable tbody");
  userTableBody.innerHTML = "";
  const saved = JSON.parse(localStorage.getItem(getStorageKey())) || [];
  saved.forEach(u => addUserRow(u));
}

function addUserRow(user) {
  const userTableBody = document.querySelector("#userTable tbody");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${user.name}</td><td>${user.insurance}</td><td>${user.copay}</td><td>${user.publicSupport}</td>
    <td>${user.limitAmount}</td><td>${user.publicUseAmount}</td><td>${user.publicCopayAmount}</td><td>${user.welfareMedical}</td>
    <td>${user.marufuku}</td><td>${user.selfPay}</td><td>${user.privatePay}</td><td>${user.collectionMethod}</td>
    <td><button class="deleteUserButton">削除</button></td>
  `;
  userTableBody.appendChild(row);
  row.querySelector(".deleteUserButton").addEventListener("click", () => row.remove());
}

// 保存処理
const saveBtn = document.getElementById("saveToStorageButton");
saveBtn.addEventListener("click", () => {
  const userTableBody = document.querySelector("#userTable tbody");
  const rows = userTableBody.querySelectorAll("tr");
  const users = Array.from(rows).map(row => {
    const cells = row.querySelectorAll("td");
    return {
      name: cells[0].textContent,
      insurance: cells[1].textContent,
      copay: cells[2].textContent,
      publicSupport: cells[3].textContent,
      limitAmount: cells[4].textContent,
      publicUseAmount: cells[5].textContent,
      publicCopayAmount: cells[6].textContent,
      welfareMedical: cells[7].textContent,
      marufuku: cells[8].textContent,
      selfPay: cells[9].textContent,
      privatePay: cells[10].textContent,
      collectionMethod: cells[11].textContent,
    };
  });
  localStorage.setItem(getStorageKey(), JSON.stringify(users));
  alert("保存しました！");
});

// 月切り替え時のイベント
userMonthSelect.addEventListener("change", () => {
  currentMonth = userMonthSelect.value;
  loadUsersForMonth();
});

// 初回読み込み
window.addEventListener("load", () => {
  loadUsersForMonth();
});
