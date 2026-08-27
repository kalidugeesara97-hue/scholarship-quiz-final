# සුමිත් සර්ගේ ශිෂ්‍යත්ව පෙරහුරුව | Grade 5 Scholarship Quiz AI Web App 🎓

5 ශ්‍රේණිය ශිෂ්‍යත්ව විභාගයට මුහුණ දෙන දරුවන් සඳහා දිනපතා ස්වයංක්‍රීයව ක්‍රියාත්මක වන AI-Powered Scholarship Quiz Web App එකකි.

---

## 🌟 ප්‍රධාන විශේෂාංග (Key Features)

1. **👦 Frictionless Onboarding:** Password අවශ්‍ය නැත. නම, WhatsApp අංකය සහ දිස්ත්‍රික්කය ලබා දී ක්ෂණිකව ඇතුළු විය හැක.
2. **🎨 Dynamic Daily Themes & Vector Art:** දවසේ විෂය (පරිසරය 🌿, සිංහල 📖, ගණිතය 🔢, සාමාන්‍ය බුද්ධිය 🧩) අනුව Theme එක සහ Graphic Mascot ස්වයංක්‍රීයව වෙනස් වේ.
3. **🔊 Web Audio Haptics:** හරි පිළිතුරට Musical Chime, වැරදි පිළිතුරට Error Boop සහ විභාගය අවසානයේ Victory Fanfare සංගීතය.
4. **🤖 Gemini AI Integration:** දිනපතා අලුත් ප්‍රශ්නාවලි සහ දරුවන්ට තේරෙන සරල සිංහල පැහැදිලි කිරීම්.
5. **📧 Daily Mark Sheet to Teacher:** දවස අවසානයේ සියලු සිසුන්ගේ ලකුණු සහිත වාර්තාව ස්වයංක්‍රීයව `sumithrathu@gmail.com` වෙත Email වේ.
6. **📱 PWA Ready:** Phone එකේ Play Store නැතිව Home Screen එකට Install කරගත හැකි Web App එකකි.
7. **💬 WhatsApp Share:** ප්‍රතිඵල සටහන WhatsApp හරහා 1-Click Share කිරීමේ හැකියාව.

---

## 🚀 Vercel මත Live Host කිරීම (Deployment Guide)

### ක්‍රමය 1: GitHub සහ Vercel Dashboard හරහා (නිර්දේශිතයි)

1. [github.com](https://github.com) හි `scholarship-quiz-app` නමින් New Repository එකක් සාදා මෙම ෆෝල්ඩරයේ ඇති Files Upload කරන්න.
2. [vercel.com](https://vercel.com) වෙත ගොස් ඔබගේ GitHub එකෙන් Sign In වී එම Repository එක **Import** කරන්න.
3. Vercel **Environment Variables** වලට පහත අගයන් එක් කරන්න:
   - `GEMINI_API_KEY`: `AQ.Ab8RN6KaSXuAM36wXWevWiRK83pa-SpETkNUyNVFPfMfL26IHg`
   - `TEACHER_EMAIL`: `sumithrathu@gmail.com`
   - `CRON_SECRET`: `scholarship_quiz_cron_secret_2026`
   - `NEXT_PUBLIC_BASE_URL`: `https://<your-vercel-domain>.vercel.app`
4. **Deploy** ක්ලික් කරන්න.

---

### ක්‍රමය 2: Vercel CLI මඟින් කෙළින්ම Terminal එකෙන්

```bash
npx vercel
```
- ඔබගේ Vercel account එකට Login වීමට link එක Browser එකෙන් open කරන්න.
- ඉන්පසු Project එක auto-deploy වේ.
- Environment variables එක් කිරීමට:
```bash
npx vercel env add GEMINI_API_KEY
npx vercel env add TEACHER_EMAIL
npx vercel --prod
```

---

## ⏰ Automated Cron Schedules (`vercel.json`)

* **06:00 AM Sri Lanka Time (00:30 UTC):** `/api/generate-quiz` ➔ අද දවසේ අලුත් ප්‍රශ්න පත්‍රය Gemini AI මඟින් ජනනය වේ.
* **08:00 PM Sri Lanka Time (14:30 UTC):** `/api/send-daily-report` ➔ දවසේ සම්පූර්ණ Mark Sheet එක `sumithrathu@gmail.com` වෙත Email වේ.
