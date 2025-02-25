# 🔥 مجموعة سكريبتات المستخدم لإزيو

<div align="center" dir="rtl">
  <img src="https://img.shields.io/badge/Supports-Chrome-4285F4?logo=google-chrome&logoColor=white&style=for-the-badge">
  <img src="https://img.shields.io/badge/Supports-Firefox-FF7139?logo=firefox-browser&logoColor=white&style=for-the-badge">
  <br>
  <sub style="font-size: 0.9em;">يتطلب <a href="https://violentmonkey.github.io/">ViolentMonkey</a> أو مدير سكريبتات مستخدم متوافق</sub>
</div>

<br>

<!-- ===================================== HEADER / INFO ====================================== -->
<div align="center" dir="rtl">
  <!--<hr style="width: 80%; border: 1px solid #30363d; margin: 2rem auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">-->
  <p style="font-size: 1.1em; font-weight: 500;">حسّن تجربتك في التصفح باستخدام سكريبتات مستخدم مُنتقاة بعناية</p>
</div>
<!-- ==================================== END HEADER / INFO =================================== -->

<br>

<!-- ===================================== FOOTER ====================================== -->
<div align="center" dir="rtl">
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
    <sub style="font-size: 0.85em;">🛠️ مصنوعة بشغف ومُصانة بعناية</sub>
  </div>
</div>
<!-- ==================================== END FOOTER =================================== -->

<br>

<!-- ===================================== CONFIGURATION ====================================== -->

**قبل أن نبدأ، يرجى اتباع تعليمات الإعداد التالية لضمان أفضل أداء:**

## 🦁🛡️ 1. إعداد متصفح بريف

اتبع الخطوات التالية لإضافة قائمة التصفية المخصصة في متصفح بريف:

1. **افتح إعدادات مانع الإعلانات في بريف:**
   - اكتب `brave://adblock` في شريط العناوين واضغط Enter.
2. **أضف قائمة تصفية مخصصة:**
   - قم بالتمرير إلى قسم **قوائم التصفية المخصصة**.
   - انقر لإضافة تصفية مخصصة جديدة.
3. **الصق رابط التصفية:**
   - انسخ والصق الرابط التالي:
     ```
     https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/filters/custom-filters-brave.txt
     ```
4. **احفظ إعداداتك:**
   - قم بتأكيد وحفظ التغييرات.
5. **اختبر إعداداتك:**
   - قم بزيارة أحد المواقع المدعومة (مثل Arabseed أو Cimanow) للتحقق من أن التصفية تعمل بشكل صحيح.

إذا واجهت أي مشاكل (مثل تحذيرات اكتشاف المتصفح، أو حجب السكريبت، أو عمليات إعادة توجيه غير متوقعة)، يرجى [الإبلاغ عنها هنا](https://github.com/EzioTheGoat/EzioUserscripts/issues/new?template=blocked-site.md).

---

## 🛡️ 2. إعداد uBlock Origin لمتصفحات أخرى

إذا كنت تستخدم متصفحات مثل Chrome، Firefox، أو Edge مع تثبيت uBlock Origin، اتبع الخطوات التالية:

1. **افتح لوحة تحكم uBlock Origin:**
   - **Chrome/Edge:** انقر على أيقونة uBlock Origin واختر **لوحة التحكم**.
   - **Firefox:** انقر على أيقونة uBlock Origin واختر **التفضيلات**.
2. **انتقل إلى تبويب "قوائم التصفية":**
   - ابحث عن قسم قوائم التصفية.
3. **أضف تصفية مخصصة:**
   - قم بالتمرير إلى قسم **مخصص**.
   - انقر على **استيراد...** (أو الصق الرابط مباشرة إذا طُلب منك ذلك).
4. **الصق رابط التصفية:**
   - انسخ والصق الرابط التالي:
     ```
     https://raw.githubusercontent.com/EzioTheGoat/EzioUserscripts/main/filters/custom-filters-brave.txt
     ```
5. **احفظ وقم بتحديث الصفحة:**
   - احفظ التغييرات.
   - قم بتحديث المتصفح لتفعيل التصفية الجديدة.
6. **تحقق من الإعداد:**
   - قم بزيارة أحد المواقع المدعومة للتأكد من أن التصفية نشطة وتعمل بشكل صحيح.

إذا واجهت مشاكل مثل تحذيرات الاكتشاف، أو حجب السكريبتات، أو عمليات إعادة توجيه غير متوقعة، يرجى [الإبلاغ عنها هنا](https://github.com/EzioTheGoat/EzioUserscripts/issues/new?template=blocked-site.md).

---

## 🔧 السكريبتات المميزة

<table>
  <tr>
    <td width="80" align="center">
      <img src="https://i.imgur.com/purcqbc.png" width="64" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    </td>
    <td>
      <h3>🔗 تخطي عرب سيد</h3>
      <p style="margin: 8px 0; font-size: 0.9em; color: #666;">
        🇪🇬 موقع بث عربي | عرب سيد | 
        <a href="https://asd.rest/main/" target="_blank">https://asd.rest/main/</a>
      </p>
      <strong>يتخطى تلقائياً:</strong><br>
      <table>
        <tr>
          <td>✅ العدادات التنازلية</td>
          <td>✅ النوافذ المنبثقة والإعلانات</td>
        </tr>
        <tr>
          <td>✅ إعادة التوجيه الوهمية</td>
          <td>✅ فتح صفحة التنزيل</td>
        </tr>
      </table>
      
  <!-- قسم العرض التوضيحي GIF الاحترافي -->
  <div align="center" style="margin: 12px 0;">
        <img src="https://i.imgur.com/fdcEMhn.gif" alt="عرض توضيحي لعرب سيد" style="max-width: 100%; border: 1px solid #e1e4e8; border-radius: 8px;">
  </div>
      
  <div align="center">
        <a href="https://greasyfork.org/en/scripts/527229-bypass-arabseed">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="تثبيت" style="margin-top: 12px;">
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
      <h3>🎥 تخطي سيما ناو</h3>
      <p style="margin: 8px 0; font-size: 0.9em; color: #666;">
        🇪🇬 موقع بث عربي | سيما ناو | 
        <a href="https://cimanow.cc" target="_blank">https://cimanow.cc</a>
      </p>
      <strong>تلاعب ذكي في الروابط:</strong><br>
      <table>
        <tr>
          <td>🔗 يضيف تلقائياً "watching/"</td>
          <td>🚀 تحسينات في الأداء</td>
        </tr>
        <tr>
          <td>📛 إدارة الاستثناءات</td>
          <td>⚡ معالجة الأخطاء</td>
        </tr>
      </table>

  <!-- عرض توضيحي GIF -->
<div align="center">
  <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGRvdnZkd2JpNDFubGg1dHExZDRjdTIzdHAyNWR6NHE3ZmJsamR2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/V6YBk0eHvLN4mBM4Ly/giphy.gif" alt="عرض توضيحي لسيما ناو" style="max-width: 100%; border: 1px solid #e1e4e8; border-radius: 8px;">
</div>

  <div align="center">
        <a href="https://greasyfork.org/en/scripts/527232-bypass-cimanow">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="تثبيت" style="margin-top: 12px;">
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
      <h3>🤖 مجدِّد DeepSeek</h3>
      <strong>تحسينات مدعومة بالذكاء الاصطناعي:</strong><br>
      <table>
        <tr>
          <td>🔄 تجديد تلقائي</td>
          <td>⏳ اكتشاف الخادم</td>
        </tr>
        <tr>
          <td>📈 استعادة الأخطاء</td>
          <td>🤖 إعادة المحاولة الذكية</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://greasyfork.org/en/scripts/527233-auto-regenerate-on-server-busy-deepseek">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="تثبيت" style="margin-top: 12px">
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
      <h3>🖥 تبديل الشريط الجانبي في Reddit</h3>
      <strong>تحسينات واجهة المستخدم:</strong><br>
      <table>
        <tr>
          <td>🎛 حالة ثابتة</td>
          <td>🔄 تبديل بنقرة واحدة</td>
        </tr>
        <tr>
          <td>📱 تصميم متجاوب</td>
          <td>⚙️ اتساق عبر الصفحات</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://greasyfork.org/en/scripts/527240-reddit-sidebar-toggle">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="تثبيت" style="margin-top: 12px">
        </a>
      </div>
    </td>
  </tr>
</table>

---

<table>
  <tr>
    <td width="80" align="center">
      <img src="https://img.icons8.com/ios-filled/64/000000/picture-in-picture.png" width="64" style="border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1)">
    </td>
    <td>
      <h3>🎥 التبديل التلقائي لوضع الصورة داخل الصورة (PiP)</h3>
      <p style="margin: 8px 0; font-size: 0.9em; color: #666;">
        يدخل تلقائيًا إلى وضع الصورة داخل الصورة (PiP) للفيديوهات عند تبديل التبويبات، ويخرج من وضع PiP عند العودة. يعمل على جميع متصفحات كروميوم.
      </p>
      <strong>الميزات الرئيسية:</strong><br>
      <table>
        <tr>
          <td>✅ تفعيل PiP تلقائي عند تبديل التبويب</td>
          <td>✅ الخروج من PiP عند العودة</td>
        </tr>
        <tr>
          <td>✅ يعمل على معظم مواقع الفيديو</td>
          <td>✅ يتخطى إذا كان الفيديو متوقفًا</td>
        </tr>
      </table>
      <div align="center">
        <a href="https://greasyfork.org/en/scripts/527239-auto-picture-in-picture-on-tab-change">
          <img src="https://img.shields.io/badge/INSTALL_SCRIPT-00B894?style=for-the-badge&logo=open-source-initiative&logoColor=white" alt="تثبيت" style="margin-top: 12px">
        </a>
      </div>
    </td>
  </tr>
</table>

---

## 🔧 كيفية التثبيت

1. **قم بتثبيت Violentmonkey على متصفحك:**
   - 🦊 **فايرفوكس:** [الحصول على الإضافة](https://addons.mozilla.org/en-US/firefox/addon/violentmonkey/)
   - 🌐 **كروميوم (Chrome, Edge, إلخ):** [الحصول على الامتداد](https://violentmonkey.github.io/get-it/)
2. انقر على زر **تثبيت السكريبت** للأداة التي ترغب بها.
3. قم بتأكيد التثبيت في نافذة الإضافة.
4. استمتع بتصفح محسّن! 🎉

---

# 📱 دليل إعداد الهواتف المحمولة

<div style="border: 2px solid #FF9500; border-radius: 10px; padding: 20px; background-color: #fff4e6; margin: 20px 0;" dir="rtl">

## 🤖 إعدادات أندرويد

<div style="display: flex; align-items: center; gap: 15px; margin: 15px 0;">
  <img src="https://img.icons8.com/color/48/000000/firefox.png" width="40">
  <div>
    <h3 style="margin: 0;">فايرفوكس + الإضافات</h3>
    <ol>
      <li>قم بتثبيت <a href="https://play.google.com/store/apps/details?id=org.mozilla.firefox">Firefox لنظام أندرويد</a></li>
      <li>اضغط على القائمة → الإضافات
        <ul>
          <li><a href="https://addons.mozilla.org/en-US/android/addon/ublock-origin/">uBlock Origin</a></li>
          <li><a href="https://addons.mozilla.org/en-US/android/addon/violentmonkey/">Violentmonkey</a></li>
        </ul>
      </li>
      <li>قم بتثبيت السكريبتات باستخدام أزرار التثبيت على نمط سطح المكتب</li>
    </ol>
  </div>
</div>

## 🍎 إعدادات iOS

<div style="display: flex; align-items: center; gap: 15px; margin: 15px 0;">
  <img src="https://img.icons8.com/ios-filled/50/000000/safari--v1.png" width="40">
  <div>
    <h3 style="margin: 0;">إعداد متصفح Orion</h3>
    <ol>
      <li>قم بتثبيت <a href="https://apps.apple.com/us/app/orion-browser-by-kagi/id1484498200">متصفح Orion بواسطة Kagi</a></li>
      <li>قم بتمكين الإضافات:
        <ul>
          <li>الإعدادات → الإضافات → تفعيل "Violentmonkey" أو "Tampermonkey"</li>
        </ul>
      </li>
      <li>قم بتثبيت السكريبتات عبر واجهة Violentmonkey أو Tampermonkey</li>
    </ol>
    <p style="font-size: 0.9em; color: #666;">
      <strong>ملاحظة:</strong> قد تقيد قيود Apple بعض الوظائف مقارنة بسطح المكتب
    </p>
  </div>
</div>

</div>

<div style="border-left: 4px solid #34a853; padding: 12px; margin: 20px 0; background-color: #e6f4ea;" dir="rtl">
  <h3>📱 نصائح لتحسين الأداء على الهواتف المحمولة</h3>
  <ul>
    <li>استخدم خيار <code>طلب موقع سطح المكتب</code> لتحسين توافق السكريبتات</li>
    <li>فعّل وضع "الثبات" في إعدادات Violentmonkey</li>
    <li>قم بإضافة مواقع الفيديو إلى القائمة البيضاء في أوضاع توفير البطارية</li>
  </ul>
</div>

---

## 🎨 التخصيص والمساهمة

🔧 **هل ترغب في تحسين هذه السكريبتات؟**

1. قم بفورك (نسخ) هذا المستودع.
2. أنشئ فرع الميزة الخاص بك (`git checkout -b feature/AmazingFeature`).
3. قم بعمل commit للتغييرات (`git commit -m 'إضافة ميزة مذهلة'`).
4. ادفع الفرع إلى المستودع (`git push origin feature/AmazingFeature`).
5. افتح طلب سحب.

🐞 **هل وجدت مشكلة؟**  
[افتح مشكلة على GitHub](https://github.com/EzioTheGoat/EzioUserscripts/issues)
