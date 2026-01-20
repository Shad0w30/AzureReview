function evaluateAKS(aks) {
  const findings = [];

  aks.value.forEach(c => {
    if (!c.properties.enableRBAC) {
      findings.push({
        service: "AKS",
        resource: c.name,
        severity: "High",
        issue: "RBAC disabled",
        recommendation: "Enable Azure RBAC on AKS"
      });
    }

    if (!c.properties.apiServerAccessProfile?.authorizedIPRanges) {
      findings.push({
        service: "AKS",
        resource: c.name,
        severity: "Critical",
        issue: "API server publicly accessible",
        recommendation: "Restrict API server IP ranges"
      });
    }
  });

  return findings;
}

function evaluateACR(acr) {
  return acr.value.map(r => {
    if (r.properties.adminUserEnabled) {
      return {
        service: "ACR",
        resource: r.name,
        severity: "High",
        issue: "Admin user enabled",
        recommendation: "Disable admin user and use AAD auth"
      };
    }
  }).filter(Boolean);
}
