/* ================================
   ATM Banking System — logic
   Mirrors: password check (123),
   deposit, withdraw, check balance
   ================================ */

const CORRECT_PIN = "123";
let balance = 10000.00; // starting demo balance, resets on page reload (like a fresh Java run)

function fmt(n){
  return "₹" + Number(n).toLocaleString("en-IN", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function verifyPin(){
  const pin = document.getElementById("pin").value.trim();
  const msgBox = document.getElementById("loginMsg");
  msgBox.classList.add("show");

  if(pin === CORRECT_PIN){
    msgBox.innerHTML = `<div class="msg success">✔ PIN verified. Welcome back.</div>`;
    document.getElementById("loginPanel").style.display = "none";
    document.getElementById("atmPanel").style.display = "block";
    updateBalanceLine();
  } else {
    msgBox.innerHTML = `<div class="msg error">✘ Incorrect PIN. Please try again.</div>`;
  }
}

function updateBalanceLine(){
  document.getElementById("balanceLine").textContent = "Current balance: " + fmt(balance);
}

function toggleAmountField(){
  const op = document.getElementById("opType").value;
  document.getElementById("amountField").style.display = (op === "balance") ? "none" : "block";
}

function doTransaction(){
  const op = document.getElementById("opType").value;
  const receipt = document.getElementById("txnReceipt");
  receipt.classList.add("show");

  if(op === "balance"){
    receipt.innerHTML = `
      <div class="row"><span>Account status</span><span>Active</span></div>
      <div class="row total"><span>Balance</span><span>${fmt(balance)}</span></div>
    `;
    return;
  }

  const amountInput = document.getElementById("amount");
  const amount = parseFloat(amountInput.value);

  if(isNaN(amount) || amount <= 0){
    receipt.innerHTML = `<div class="msg error">✘ Enter a valid amount greater than ₹0.</div>`;
    return;
  }

  if(op === "deposit"){
    balance += amount;
    updateBalanceLine();
    receipt.innerHTML = `
      <div class="row"><span>Transaction</span><span>Deposit</span></div>
      <div class="row"><span>Amount</span><span>${fmt(amount)}</span></div>
      <div class="row total"><span>New Balance</span><span>${fmt(balance)}</span></div>
      <div class="msg success">✔ Deposit successful.</div>
    `;
  } else if(op === "withdraw"){
    if(amount > balance){
      receipt.innerHTML = `<div class="msg error">✘ Insufficient balance. Available: ${fmt(balance)}</div>`;
      return;
    }
    balance -= amount;
    updateBalanceLine();
    receipt.innerHTML = `
      <div class="row"><span>Transaction</span><span>Withdraw</span></div>
      <div class="row"><span>Amount</span><span>${fmt(amount)}</span></div>
      <div class="row total"><span>New Balance</span><span>${fmt(balance)}</span></div>
      <div class="msg success">✔ Withdrawal successful. Please collect your cash.</div>
    `;
  }

  amountInput.value = "";
}

function logout(){
  document.getElementById("atmPanel").style.display = "none";
  document.getElementById("loginPanel").style.display = "block";
  document.getElementById("pin").value = "";
  document.getElementById("loginMsg").classList.remove("show");
  document.getElementById("loginMsg").innerHTML = "";
  document.getElementById("txnReceipt").classList.remove("show");
  document.getElementById("txnReceipt").innerHTML = "";
}
