/* ================================
   Restaurant Billing System — logic
   Subtotal -> 10% discount if >₹1000 -> 5% GST
   ================================ */

function fmt(n){
  return "₹" + Number(n).toLocaleString("en-IN", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function calculateRestaurantBill(){
  const receipt = document.getElementById("billReceipt");
  receipt.classList.add("show");

  const rows = document.querySelectorAll(".menu-item");
  let subtotal = 0;
  const orderedLines = [];

  rows.forEach(row => {
    const name = row.querySelector(".name").textContent;
    const price = parseFloat(row.querySelector(".qty-input").dataset.price);
    const qty = parseInt(row.querySelector(".qty-input").value, 10) || 0;
    if(qty > 0){
      const lineTotal = price * qty;
      subtotal += lineTotal;
      orderedLines.push(`<div class="row"><span>${name} × ${qty}</span><span>${fmt(lineTotal)}</span></div>`);
    }
  });

  if(subtotal <= 0){
    receipt.innerHTML = `<div class="msg error">✘ Please add at least one item to your order.</div>`;
    return;
  }

  const discountRate = subtotal > 1000 ? 0.10 : 0;
  const discountValue = subtotal * discountRate;
  const afterDiscount = subtotal - discountValue;
  const gst = afterDiscount * 0.05;
  const finalBill = afterDiscount + gst;

  receipt.innerHTML = `
    ${orderedLines.join("")}
    <div class="row"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
    <div class="row"><span>Discount ${discountRate > 0 ? "(10%, bill over ₹1,000)" : "(none, bill under ₹1,000)"}</span><span>&minus;${fmt(discountValue)}</span></div>
    <div class="row"><span>GST (5%)</span><span>+${fmt(gst)}</span></div>
    <div class="row total"><span>Final Bill</span><span>${fmt(finalBill)}</span></div>
    <div class="msg success">✔ Bill generated. Enjoy your meal!</div>
  `;
}

function resetMenu(){
  document.querySelectorAll(".qty-input").forEach(input => input.value = 0);
  const receipt = document.getElementById("billReceipt");
  receipt.classList.remove("show");
  receipt.innerHTML = "";
}
