# מחשבון ריבית דה ריבית

אתר מחשבוני ריבית דה ריבית בעברית, בנוי עם React.

## פריסה ל-GitHub Pages

### שלב 1 — הכנה
```bash
# התקן dependencies
npm install
```

### שלב 2 — עדכן את שם המשתמש שלך
פתח את `package.json` ואת `public/index.html`
ושנה `YOUR_USERNAME` לשם המשתמש שלך ב-GitHub.

### שלב 3 — צור repository ב-GitHub
1. לך ל-github.com
2. לחץ על "New repository"
3. שם: `compound-interest`
4. השאר public
5. אל תסמן כלום אחר — לחץ Create

### שלב 4 — חבר ופרוס
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/compound-interest.git
git push -u origin main

# פרוס ל-GitHub Pages
npm run deploy
```

### שלב 5 — הפעל Pages
1. ב-GitHub, לך ל-Settings → Pages
2. תחת Source בחר: `gh-pages` branch
3. לחץ Save
4. תוך כמה דקות האתר יהיה חי בכתובת:
   `https://YOUR_USERNAME.github.io/compound-interest`

## עדכון עתידי
```bash
npm run deploy
```
זה הכל — זה יבנה ויעלה אוטומטית.

## מבנה הפרויקט
```
src/
  App.js              - קומפוננטה ראשית
  components/
    Navbar.js         - ניווט
    Hero.js           - כותרת ראשית
    Calculator.js     - המחשבון הראשי
    About.js          - תוכן SEO על ריבית דה ריבית
    Footer.js         - פוטר
public/
  index.html          - HTML עם meta tags לSEO
```
