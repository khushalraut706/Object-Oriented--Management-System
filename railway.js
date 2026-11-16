/* ================================
   Railway Ticket Fare Calculator — logic
   Base fare + age concession + gender concession
   ================================ */

const BASE_FARE = 500;

function fmt(n){
  return "₹" + Number(n).toLocaleString("en-IN", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function escapeHtml(str){
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function calculateFare(){
  const receipt = document.getElementById("fareReceipt");
  receipt.classList.add("show");

  const name = document.getElementById("passName").value.trim();
  const age = parseInt(document.getElementById("passAge").value, 10);
  const gender = document.getElementById("passGender").value;

  if(!name){
    receipt.innerHTML = `<div class="msg error">✘ Please enter the passenger name.</div>`;
    return;
  }
  if(isNaN(age) || age < 0 || age > 120){
    receipt.innerHTML = `<div class="msg error">✘ Enter a valid age between 0 and 120.</div>`;
    return;
  }

  let fare = BASE_FARE;
  let ageNote = "Full fare";

  if(age < 5){
    fare = 0;
    ageNote = "Under 5 — travels free";
  } else if(age < 12){
    fare = BASE_FARE * 0.5;
    ageNote = "Child (5–11) — 50% fare";
  } else if(age >= 60){
    fare = BASE_FARE * 0.7;
    ageNote = "Senior citizen — 30% off";
  }

  let genderNote = "No concession";
  if(gender === "female" && fare > 0){
    fare = fare * 0.9;
    genderNote = "Women's concession — extra 10% off";
  }

  fare = Math.round(fare * 100) / 100;

  receipt.innerHTML = `
    <div class="row"><span>Passenger</span><span>${escapeHtml(name)}</span></div>
    <div class="row"><span>Age / Gender</span><span>${age} / ${capitalize(gender)}</span></div>
    <div class="row"><span>Base Fare</span><span>${fmt(BASE_FARE)}</span></div>
    <div class="row"><span>Age Concession</span><span>${ageNote}</span></div>
    <div class="row"><span>Gender Concession</span><span>${genderNote}</span></div>
    <div class="row total"><span>Fare Payable</span><span>${fmt(fare)}</span></div>
    <div class="msg success">✔ Ticket ready for booking.</div>
  `;
}

function capitalize(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}
