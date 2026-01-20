async function startScan() {
  const subId = document.getElementById("subscriptionId").value;
  const token = document.getElementById("token").value;

  const aks = await getAKS(subId, token);
  const acr = await getACR(subId, token);

  let findings = [];
  findings.push(...evaluateAKS(aks));
  findings.push(...evaluateACR(acr));

  window.allFindings = findings;
  renderDashboard(findings);
}
