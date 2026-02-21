let form= document .querySelector("#jobform")
let div= document.querySelector("#sub")

form.addEventListener("submit",addTask)

function addTask(event){
    event.preventDefault();
    let title=document.querySelector("#title").value;
    let cname=document.querySelector("#cname").value;
    let loc=document.querySelector("#loc").value;
    let desc=document.querySelector("#desc").value;
    let contact=document.querySelector("#contact").value;

    let newdiv=document.createElement("div");
    newdiv.classList.add("Job-card");

    newdiv.innerHTML=`
    <h2>${title}</h2>
        <p><strong>Company:</strong> ${cname}</p>
        <p><strong>Location:</strong> ${loc}</p>
        <p><strong>Description:</strong> ${desc}</p>
        <p><strong>Contact:</strong> ${contact}</p>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
`;

div.appendChild(newdiv);
newdiv.querySelector(".delete-btn").addEventListener("click", function () {
        newdiv.remove();
    });

  
    newdiv.querySelector(".edit-btn").addEventListener("click", function () {
        document.querySelector("#title").value = title;
        document.querySelector("#cname").value = cname;
        document.querySelector("#loc").value = loc;
        document.querySelector("#desc").value = desc;
        document.querySelector("#contact").value = contact;

        newdiv.remove(); 
    });

    form.reset(); 
}
