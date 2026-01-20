async function armGet(url, token) {
  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.json();
}

async function getAKS(subId, token) {
  return armGet(
    `https://management.azure.com/subscriptions/${subId}/providers/Microsoft.ContainerService/managedClusters?api-version=2023-05-02-preview`,
    token
  );
}

async function getACR(subId, token) {
  return armGet(
    `https://management.azure.com/subscriptions/${subId}/providers/Microsoft.ContainerRegistry/registries?api-version=2023-01-01-preview`,
    token
  );
}

async function getStorage(subId, token) {
  return armGet(
    `https://management.azure.com/subscriptions/${subId}/providers/Microsoft.Storage/storageAccounts?api-version=2023-01-01`,
    token
  );
}
