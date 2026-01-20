async function armGet(url) {
  const token = window.armToken || document.getElementById("token").value;

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return res.json();
}

async function getAKS(sub) {
  return armGet(
    `https://management.azure.com/subscriptions/${sub}/providers/Microsoft.ContainerService/managedClusters?api-version=2023-05-02-preview`
  );
}

async function getACR(sub) {
  return armGet(
    `https://management.azure.com/subscriptions/${sub}/providers/Microsoft.ContainerRegistry/registries?api-version=2023-01-01-preview`
  );
}
