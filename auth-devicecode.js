const CLIENT_ID = "YOUR_APP_CLIENT_ID";
const TENANT = "organizations";

async function deviceCodeLogin() {
  const res = await fetch(
    `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/devicecode`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        scope: "https://management.azure.com/.default"
      })
    }
  );

  const dc = await res.json();

  document.getElementById("authStatus").innerHTML =
    `Go to <b>${dc.verification_uri}</b> and enter code <b>${dc.user_code}</b>`;

  pollToken(dc.device_code);
}

async function pollToken(deviceCode) {
  while (true) {
    await new Promise(r => setTimeout(r, 5000));

    const res = await fetch(
      `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:device_code",
          client_id: CLIENT_ID,
          device_code: deviceCode
        })
      }
    );

    const json = await res.json();
    if (json.access_token) {
      window.armToken = json.access_token;
      document.getElementById("authStatus").innerText =
        "Authenticated successfully ✔";
      return;
    }
  }
}

