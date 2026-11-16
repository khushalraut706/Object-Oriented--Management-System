/* ================================
   Online Shopping Discount Calculator — logic
   Tiered discount + premium member bonus
   ================================ */

function fmt(n){
  return "₹" + Number(n).toLocaleString("en-IN", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function calculateShopping(){
  const receipt = document.getElementById("shopReceipt");
  receipt.classList.add("show");

  const name = document.getElementById("custName").value.trim();
  const amount = parseFloat(document.getElementById("purchaseAmount").value);
  const premium = document.querySelector('input[name="premium"]:checked').value;

  if(!name){
    receipt.innerHTML = `<div class="msg error">✘ Please enter the customer name.</div>`;
    return;
  }
  if(isNaN(amount) || amount <= 0){
    receipt.innerHTML = `<div class="msg error">✘ Enter a valid purchase amount greater than ₹0.</div>`;
    return;
  }

  // Tiered base discount, same logic as the Java version
  let discountPercent = 0;
  if(amount > 10000){
    discountPercent = 20;
  } else if(amount > 5000){
    discountPercent = 10;
  } else if(amount > 1000){
    discountPercent = 5;
  }

  // Premium members get a flat +5% bonus discount
  const isPremium = premium === "yes";
  if(isPremium){
    discountPercent += 5;
  }

  const discountValue = (amount * discountPercent) / 100;
  const finalBill = amount - discountValue;

  receipt.innerHTML = `
    <div class="row"><span>Customer</span><span>${escapeHtml(name)}</span></div>
    <div class="row"><span>Purchase Amount</span><span>${fmt(amount)}</span></div>
    <div class="row"><span>Premium Member</span><span>${isPremium ? "Yes (+5%)" : "No"}</span></div>
    <div class="row"><span>Discount Applied</span><span>${discountPercent}% (&minus;${fmt(discountValue)})</span></div>
    <div class="row total"><span>Final Bill</span><span>${fmt(finalBill)}</span></div>
    <div class="msg success">✔ Bill generated successfully.</div>
  `;
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
