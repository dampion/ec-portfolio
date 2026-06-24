# ec-portfolio

陳冠鈞（Evan Chen）個人履歷 / Portfolio 網站。以 Nuxt 4 打造，支援中英雙語切換、深色模式、響應式設計與首屏動效。

## 功能

- 單頁履歷：關於、工作經歷、技能、學歷、聯絡方式
- 中英語言切換（偏好儲存於 cookie）
- 深色 / 淺色主題（尊重系統偏好）
- 靜態輸出，可部署至 Vercel、Netlify、GitHub Pages
- 列印友善樣式（瀏覽器列印或匯出 PDF）

## 環境需求

- Node.js **24.17.0**（見 [`.nvmrc`](.nvmrc) / [`.node-version`](.node-version)）
- pnpm **11.8.0**

```bash
# fnm / nvm 使用者
fnm use   # 或 nvm use

pnpm install
pnpm dev
```

開啟 [http://localhost:3000](http://localhost:3000)

## 更新履歷內容

編輯 [`data/resume.ts`](data/resume.ts)，每個文字欄位以 `{ zh, en }` 提供雙語內容：

```ts
profile: {
  name: 'Your Name',
  title: { zh: '前端工程師', en: 'Frontend Engineer' },
  // ...
}
```

UI 文案（導覽、區塊標題等）在 [`i18n/locales/`](i18n/locales/) 的 `zh.json` 與 `en.json`。

## 建置與預覽

```bash
# 產生靜態檔案至 .output/public
pnpm generate

# 本地預覽靜態站
pnpm dlx serve .output/public
```

## 部署

### Vercel（已設定）

專案已連接 GitHub：[github.com/dampion/ec-portfolio](https://github.com/dampion/ec-portfolio)

[`vercel.json`](vercel.json) 設定：

- Install Command：`pnpm install`
- Build Command：`pnpm generate`
- Output Directory：`.output/public`
- Node.js：`24.17.0`（見 `package.json` engines）

**首次 / 手動部署：**

```bash
pnpm dlx vercel --prod
```

之後每次 push 到 `main` 會自動部署。

**Dashboard：** [vercel.com/dashboard](https://vercel.com/dashboard) → `ec-portfolio`

### GitHub Pages（子路徑）

若部署至 `https://username.github.io/repo-name/`，在 `nuxt.config.ts` 設定：

```ts
app: {
  baseURL: '/repo-name/',
}
```

## 專案結構

```
app/
├── app.vue
├── pages/index.vue
├── components/       # 履歷區塊元件
├── composables/      # useResume、useScrollReveal
└── assets/css/       # Tailwind 與 print 樣式
data/resume.ts        # 履歷資料（雙語）
i18n/locales/         # UI 文案
```

## 技術棧

- [Nuxt 4](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org)
- [@nuxtjs/color-mode](https://color-mode.nuxtjs.org)
