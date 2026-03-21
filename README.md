<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Ezio Userscripts</title>

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

<style>
* { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(180deg, #0a0d14, #05070c);
  color: #e8ecf1;
}

.container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
}

/* Banner */
.banner {
  width: 100%;
  border-radius: 22px;
  margin-top: 20px;
  box-shadow: 0 25px 70px rgba(0,0,0,0.6);
}

/* Hero */
.hero {
  text-align: center;
  margin-top: 50px;
}

.hero h1 {
  font-size: 44px;
}

.hero p {
  margin-top: 10px;
  color: #9aa4b2;
}

/* Buttons */
.buttons {
  margin-top: 40px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 15px auto;
  padding: 18px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 16px;
  text-decoration: none;
  color: white;
  max-width: 420px;
  transition: 0.25s;
}

.btn img {
  width: 26px;
  height: 26px;
}

.btn-red {
  background: linear-gradient(135deg, #ff3b3b, #7a0000);
}

.btn-green {
  background: linear-gradient(135deg, #2ecc71, #145a32);
}

.btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

/* Cards */
.section {
  margin-top: 70px;
}

.card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  padding: 28px;
  border-radius: 18px;
  margin-bottom: 20px;
}

.card h2 {
  margin-bottom: 12px;
}

ul {
  padding-left: 18px;
}

li {
  margin-bottom: 8px;
}

/* Copy box */
.copy-box {
  background: #0f1420;
  padding: 12px;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;
  transition: 0.2s;
  word-break: break-all;
}

.copy-box:hover {
  background: #1a2230;
}

.footer {
  text-align: center;
  margin-top: 60px;
  color: #777;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: #2ecc71;
  color: black;
  padding: 10px 20px;
  border-radius: 10px;
  opacity: 0;
  transition: 0.3s;
}

.toast.show {
  opacity: 1;
}
</style>
</head>

<body>

<div class="container">

<img src="https://i.ibb.co/zWChc0Z9/q.png" class="banner">

<div class="hero">
  <h1>Fix CimaNow & Arabseed</h1>
  <p>Remove ads, bypass anti adblock, and stop redirects</p>

  <div class="buttons">
    <a class="btn btn-red" href="https://github.com/EzioTheGoat/EzioUserscripts/raw/refs/heads/main/bypass-cimanow.user.js">
      <img src="https://i.imgur.com/blh1X07.png">
      Install CimaNow Script
    </a>

    <a class="btn btn-green" href="https://github.com/EzioTheGoat/EzioUserscripts/raw/refs/heads/main/bypass-arabseed.user.js">
      <img src="https://i.imgur.com/purcqbc.png">
      Install Arabseed Script
    </a>
  </div>
</div>

<div class="section">

  <div class="card">
    <h2>Step 1. Install Firefox</h2>
    <ul>
      <li>Download Firefox on PC or Android</li>
      <li>Open Firefox after install</li>
    </ul>
  </div>

  <div class="card">
    <h2>Step 2. Install uBlock Origin</h2>
    <ul>
      <li>Open Firefox Add-ons</li>
      <li>Search for uBlock Origin</li>
      <li>Click Add to Firefox</li>
    </ul>
  </div>

  <div class="card">
    <h2>Step 3. Install Userscript Manager</h2>
    <ul>
      <li>Install Tampermonkey or Violentmonkey</li>
      <li>Enable the extension</li>
    </ul>
  </div>

  <div class="card">
    <h2>Step 4. Install Script</h2>
    <ul>
      <li>Click one of the install buttons above</li>
      <li>Press Install</li>
    </ul>
  </div>

  <div class="card">
    <h2>Step 5. Add Filter List</h2>
    <ul>
      <li>Open uBlock Origin dashboard</li>
      <li>Go to Filter Lists</li>
      <li>Scroll to Custom</li>
      <li>Click below to copy</li>
    </ul>

    <div class="copy-box" onclick="copyText()">
https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/filters/custom-filters-brave.txt
    </div>
  </div>

</div>

<div class="footer">
  Built for Arabic streaming users
</div>

</div>

<div class="toast" id="toast">Copied</div>

<script>
function copyText() {
  const text = "https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/filters/custom-filters-brave.txt";
  navigator.clipboard.writeText(text);

  const toast = document.getElementById("toast");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}
</script>

</body>
</html>
