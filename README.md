# 🔥 Ezio's Userscript Collection

<div align="center">
  <img src="https://img.shields.io/badge/Supports-Chrome-4285F4?logo=google-chrome&logoColor=white&style=for-the-badge">
  <img src="https://img.shields.io/badge/Supports-Firefox-FF7139?logo=firefox-browser&logoColor=white&style=for-the-badge">
  <br>
  <sub>Requires <a href="https://violentmonkey.github.io/">ViolentMonkey</a> or compatible userscript manager</sub>
</div>

<br>

**Before we start, if you're a Brave user, please check out the following configuration:**

# 🦁🛡️ Brave Browser Configuration

<details>
<summary><strong>Essential Setup for Arabseed & Cimanow (click to expand ▼)</strong></summary>

### 1. Required Tools 🛠️

[![User Agent Switcher](https://img.shields.io/badge/Install_UA_Switcher-4285F4?style=flat-square&logo=brave&logoColor=white)](https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg)

### 2. Filter Subscription 🔗

Add this to Brave's custom filters:

```bash
https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/filters/custom-filters-brave.txt
```

### 3. Configuration Steps ⚙️

1. Open `brave://adblock`
2. Paste the filter URL in **Custom filter lists**
3. Set User Agent Switcher to mimic Chrome:
   ```text
   Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
   ```

### 4. Verify & Report 📝

[Report New Blocks](https://github.com/EzioTheGoat/EzioUserscripts/issues/new?template=blocked-site.md) if you encounter:

- Browser detection warnings
- Script blocking issues
- Unexpected redirects

</details>

## 🛠 Featured Scripts

<table>
  <tr>
    <td width="80" align="center">
      <img src="https://i.imgur.com/purcqbc.png" width="64" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
    </td>
    <td>
      <h3>🔗 Bypass Arabseed</h3>
      <p style="margin: 8px 0; font-size: 0.9em; color: #666;">
        🇪🇬 Arabic Streaming Site | عرب سيد | 
        <a href="https://asd.rest/main/" target="_blank">https://asd.rest/main/</a>
      </p>
      <strong>Automatically bypasses:</strong><br>
      <table>
        <tr>
          <td>✅ Countdown timers</td>
          <td>✅ Popups & ads</td>
        </tr>
        <tr>
          <td>✅ Fake redirects</td>
          <td>✅ Download page unlock</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/refs/heads/main/bypass-arabseed.user.js">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="Install" style="margin-top: 12px">
        </a>
      </div>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td width="80" align="center">
      <img src="https://i.imgur.com/blh1X07.png" width="64" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
    </td>
    <td>
      <h3>🎥 Bypass Cimanow</h3>
      <p style="margin: 8px 0; font-size: 0.9em; color: #666;">
        🇪🇬 Arabic Streaming Site | سيما ناو | 
        <a href="https://cimanow.cc" target="_blank">https://cimanow.cc</a>
      </p>
      <strong>Smart URL manipulation:</strong><br>
      <table>
        <tr>
          <td>🔗 Auto-appends "watching/"</td>
          <td>🚀 Performance optimizations</td>
        </tr>
        <tr>
          <td>📛 Exception management</td>
          <td>⚡ Error handling</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/refs/heads/main/bypass-cimanow.user.js">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="Install" style="margin-top: 12px">
        </a>
      </div>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td width="80" align="center">
      <img src="https://i.imgur.com/3RqMFdM.png" width="64" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
    </td>
    <td>
      <h3>🤖 DeepSeek Regenerator</h3>
      <strong>AI-powered enhancements:</strong><br>
      <table>
        <tr>
          <td>🔄 Automatic regeneration</td>
          <td>⏳ Server detection</td>
        </tr>
        <tr>
          <td>📈 Error recovery</td>
          <td>🤖 Smart retries</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/refs/heads/main/DeepSeek-regenerate.user.js">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="Install" style="margin-top: 12px">
        </a>
      </div>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td width="80" align="center">
      <img src="https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png" width="64" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
    </td>
    <td>
      <h3>🖥 Reddit Sidebar Toggle</h3>
      <strong>UI improvements:</strong><br>
      <table>
        <tr>
          <td>🎛 Persistent state</td>
          <td>🔄 One-click toggle</td>
        </tr>
        <tr>
          <td>📱 Responsive design</td>
          <td>⚙️ Cross-page consistency</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/refs/heads/main/Reddit-Sidebar-Toggle.user.js">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="Install" style="margin-top: 12px">
        </a>
      </div>
    </td>
  </tr>
</table>

## 🔧 How to Install

1. **Install Violentmonkey** on your browser:
   - 🦊 **Firefox:** [Get Add-on](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
   - 🌐 **Chromium (Chrome, Edge, etc.):** [Get Extension](https://violentmonkey.github.io/get-it/)
2. Click the **Install Script** button for your desired tool
3. Confirm installation in the extension popup
4. Enjoy enhanced browsing! 🎉

---

## 🎨 Customization & Contribution

🔧 **Want to improve these scripts?**

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

🐞 **Found an issue?**  
[Open a GitHub Issue](https://github.com/EzioTheGoat/EzioUserscripts/issues)

<!-- ===================================== FOOTER ====================================== -->
<br>
<br>

<div align="center">
  <hr style="width: 60%; border: 1px solid #30363d; margin: 2rem auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
  
  <div style="display: flex; gap: 1.5rem; justify-content: center; align-items: center; margin: 1.5rem 0;">
    <a href="https://github.com/EzioTheGoat">
      <img src="https://img.shields.io/badge/MAINTAINED%20BY-EZIO%20AUDITORE-181717?style=for-the-badge&logo=github">
    </a>
    <img src="https://img.shields.io/badge/BUILT%20WITH-❤️%20%26%20☕-FF006E?style=for-the-badge&logo=heart&logoColor=white&labelColor=6F4E37">
  </div>

  <div style="display: flex; gap: 1.5rem; justify-content: center; margin-bottom: 1.5rem;">
    <a href="https://ko-fi.com/ezio_auditore">
      <img src="https://img.shields.io/badge/SUPPORT%20THIS%20PROJECT-00B9FE?style=for-the-badge&logo=kofi&logoColor=white">
    </a>
  </div>

  <div style="margin-top: 1rem;">
    <img src="https://img.shields.io/badge/LICENSE-MIT-97CA00?style=for-the-badge&logo=open-source-initiative">
    <img src="https://img.shields.io/badge/STATUS-ACTIVE%20DEVELOPMENT-6CC644?style=for-the-badge">
  </div>

  <div style="margin-top: 1.5rem;">
    <sub>🛠️ Crafted with passion and maintained with care</sub>
  </div>
</div>
<!-- ==================================== END FOOTER =================================== -->
