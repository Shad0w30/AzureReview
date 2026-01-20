function renderDashboard(findings) {
  document.getElementById("dashboard").style.display = "block";

  const counts = { Critical:0, High:0, Medium:0, Low:0 };
  findings.forEach(f => counts[f.severity]++);

  new Chart(document.getElementById("severityChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(counts),
      datasets: [{ data: Object.values(counts) }]
    }
  });

  const div = document.getElementById("findings");
  div.innerHTML = findings.map(f => `
    <div class="card ${f.severity}">
      <b>${f.service}</b> - ${f.resource}<br>
      <b>${f.issue}</b><br>
      ${f.recommendation}
    </div>
  `).join("");
}
