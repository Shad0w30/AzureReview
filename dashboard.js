function renderDashboard(findings) {
  document.getElementById("dashboard").classList.remove("hidden");

  const counts = { Critical:0, High:0, Medium:0, Low:0 };
  findings.forEach(f => counts[f.severity]++);

  new Chart(document.getElementById("severityChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts) }]
    }
  });

  const fDiv = document.getElementById("findings");
  fDiv.innerHTML = findings.map(f => `
    <div class="finding ${f.severity}">
      <h4>${f.service} – ${f.resource}</h4>
      <b>${f.issue}</b>
      <p>${f.recommendation}</p>
    </div>
  `).join("");
}
