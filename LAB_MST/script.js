const addBtn = document.getElementById("b1");
const amountInput = document.getElementById("amt");
const categorySelect = document.getElementById("Category");

const tableBody = document.querySelector("#tbody");
const totalText = document.getElementById("total");

let total = 0;

addBtn.addEventListener("click", function(){

    const amount = parseFloat(amountInput.value);
    const category = categorySelect.value;

    if(!amount || amount <= 0){
        alert("Enter valid amount");
        return;
    }

    let row = document.createElement("tr");

    row.innerHTML =     "<td>" + amount + "</td>" +
    "<td>" + category + "</td>" +
    "<td><button class='deleteBtn'>Delete</button></td>";

    tableBody.appendChild(row);

    total = total + amount;
    totalText.innerText = "Total Amount: Rs " + total;

    amountInput.value = "";

    row.querySelector(".deleteBtn").onclick = function(){
        total = total - amount;
        totalText.innerText = "Total Amount: Rs " + total;
        row.remove();
    }

});