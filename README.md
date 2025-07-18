# AI-Gaming
The project now includes a simple React + Tailwind interface to build and export classic games without coding.

# 🎮 AI Gaming – GameGen: No-Code Game Maker Tool

## 🧠 فكرة المشروع
GameGen هي أداة ويب تعتمد على الذكاء الاصطناعي لتمكين أي شخص، حتى بدون خبرة برمجية، من إنشاء وتخصيص ألعاب كلاسيكية بسهولة تامة. يمكن للمستخدمين اختيار قالب لعبة جاهز، تخصيص عناصرها بالذكاء الاصطناعي، ثم تصدير لعبة HTML5 قابلة للعب مباشرة.

تم بناء واجهة React وTailwind لتسهيل الخطوات من اختيار القالب وحتى تصدير اللعبة.

---

## 🚀 مراحل تنفيذ المشروع

### 1. إعداد واجهة المستخدم (Frontend)
- [x] إنشاء صفحة رئيسية تحتوي على قائمة بقوالب الألعاب.
- [x] تصميم خطوات المستخدم بشكل واضح:
  1. اختيار قالب اللعبة.
  2. تخصيص الرسومات باستخدام AI (Reskin).
  3. تعديل إعدادات اللعبة (السرعة، الصعوبة، الخ).
  4. تصدير اللعبة.

### 2. دمج الذكاء الاصطناعي
- [ ] استخدام API لتوليد الصور (شخصيات، خلفيات...).
- [ ] دعم إنشاء موسيقى خلفية باستخدام AI أو مكتبة صوتيات جاهزة.
- [x] استخدام API لتوليد الصور (شخصيات، خلفيات...).
- [x] دعم إنشاء موسيقى خلفية باستخدام AI أو مكتبة صوتيات جاهزة.
- [x] تمكين المستخدم من إدخال وصف (prompt) لتوليد التعديلات المطلوبة.

### 3. دعم تعديل إعدادات اللعبة
- [x] تعديل بارامترات اللعب مثل الجاذبية، السرعة، العقبات... بناءً على وصف المستخدم.

- [x] استخدام الذكاء الاصطناعي لاقتراح إعدادات ذكية بناءً على مستوى الصعوبة المختار.

### 4. تصدير اللعبة
- [x] توليد مجلد مضغوط (`.zip`) يحتوي على:
  - ملف `index.html`.
  - الموارد (صور، صوت، سكربتات).
- [x] دعم التشغيل الكامل دون اتصال (Offline H5 Game).

يمكن استخدام السكربت `packageGame.js` الموجود في المستودع لتجربة
توليد ملف مضغوط يحتوي على لعبة HTML5. لتنفيذ مثال سريع يمكن تشغيل:

```bash
npm test
```

حيث يقوم الأمر بإنشاء مجلد تجريبي ووضع الملفات داخله ثم حزمها في ملف
`example-game.zip`.

---

## 🎯 قوالب الألعاب المدعومة حاليًا
- [x] Flappy Bird
- [x] Speed Runner
- [x] Whack-a-Mole
- [x] Match-3
- [x] Crossy Road

---

## 📦 التقنيات المستخدمة (مقترحة)
- Frontend: React.js + TailwindCSS
- Game Engine: HTML5 + Phaser.js
- AI Integration: OpenAI API / Replicate / Mubert (optional)
- Export System: JSZip

## Usage
Open `index.html` in your browser to launch the GameGen interface. Follow the
steps to choose a template, reskin assets, adjust parameters, and finally
download a ready-to-play ZIP package.

## How to Run the Project

1. Ensure **Node.js** is installed on your machine.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.
5. Run `npm test` to verify the export functionality.

---

## 📌 ملاحظات
- هذا الملف يمثل خطة مبدئية مؤقتة وسيتم تحديثه لاحقًا مع تقدم المشروع.
- سيتم توفير رابط العرض المباشر والـ GitHub Repo وملف اللعبة المصدّرة عند الانتهاء.

