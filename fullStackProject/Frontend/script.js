//resume analyze
document.getElementById("resumeForm")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const file = document.getElementById("resumeFile").files[0];

    if (!file) {
        alert("Select file first");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:8081/api/analyze", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        document.getElementById("result").innerHTML = `
            <h2>Analysis Result</h2>
            <p><strong>Score:</strong> ${data.score}/100</p>

            <p><strong>Skills:</strong></p>
            <ul>
                ${data.skills.map(skill => `<li>✅ ${skill}</li>`).join("")}
            </ul>

            <p><strong>Suggestions:</strong></p>
            <ul>
                ${data.suggestions.map(s => `<li>💡 ${s}</li>`).join("")}
            </ul>
        `;

        //job recommendation
//analyze according to skills
        const skill = data.skills[0];

        fetch(`http://localhost:8081/api/jobs?title=${skill}`)
            .then(res => res.json())
            .then(jobs => {

                let output = "<h3>Recommended Jobs</h3>";

                jobs.forEach(job => {
                    output += `
                    <div style="background:white;padding:10px;margin:10px;border-radius:8px;">
                        <b>${job.title}</b> - ${job.location}
                    </div>
                    `;
                });

                document.getElementById("jobResults").innerHTML = output;
            });

    } catch (err) {
        alert("Error");
    }
});


// search job
function searchJobs() {
    const title = document.getElementById("jobTitle").value.trim();

    if (!title) {
        alert("Enter job title");
        return;
    }

    fetch(`http://localhost:8081/api/jobs?title=${encodeURIComponent(title)}`)
        .then(res => {
            if (!res.ok) {
                throw new Error("Server error");
            }
            return res.json();
        })
        .then(data => {

            if (!data || data.length === 0) {
                document.getElementById("jobResults").innerHTML =
                    "<p>No jobs found!</p>";
                return;
            }

            let output = "<h3>Job Results</h3>";

            data.forEach(job => {
                output += `
                <div style="
                    background:white;
                    padding:15px;
                    margin:10px;
                    border-radius:8px;
                    box-shadow:0 2px 5px rgba(0,0,0,0.1);
                ">
                    <h3>${job.title || "No title"}</h3>
                    <p>📍 ${job.location || "No location"}</p>
                </div>
                `;
            });

            document.getElementById("jobResults").innerHTML = output;
        })
        .catch(err => {
            console.error(err);
            alert("Error fetching jobs");
        });
}


//post jobs
document.getElementById("jobform")?.addEventListener("submit", async function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const company = document.getElementById("cname").value;
    const location = document.getElementById("loc").value;
    const description = document.getElementById("desc").value;
    const contact = document.getElementById("contact").value;

    try {
        const res = await fetch("http://localhost:8081/api/postjob", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                company: company,
                location: location,
                description: description,
                contact: contact
            })
        });

        const data = await res.json();

        alert(data.message);

    } catch (err) {
        console.error(err);
        alert("Error posting job");
    }
});

//email subscribe
function subscribe() {
    
    const email = document.getElementById("emailInput").value;

    if (!email) {
        alert("Enter email first");
        return;
    }

    document.getElementById("subMsg").innerHTML = "✅ Subscribed!";
}