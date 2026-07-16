# ec-portfolio

陳冠鈞（Evan Chen）個人履歷 / Portfolio 網站。以 Nuxt 4 打造，支援中英雙語切換、深色模式、響應式設計與首屏動效。

## 功能

- 單頁履歷：關於、工作經歷、技能、學歷、聯絡方式
- 中英語言切換（偏好儲存於 cookie）
- 深色 / 淺色主題（尊重系統偏好）
- 每日唯一裝置瀏覽量（Nuxt API + Upstash Redis）
- 頁面預渲染、API 部署為 Vercel Function
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

## API 環境變數

瀏覽量計數器使用 Upstash Redis。從 Vercel Marketplace 連接 Upstash 後，Vercel 會自動提供以下變數；本機開發則複製 `.env.example` 為 `.env` 並填入：

```bash
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

若未設定，履歷仍可正常顯示，但會隱藏瀏覽量。

## 建置、測試與預覽

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm preview
```

列印 PDF 指令仍會另外產生靜態版本：

```bash
pnpm resume:pdf
```

## 部署

### Vercel（已設定）

專案已連接 GitHub：[github.com/dampion/ec-portfolio](https://github.com/dampion/ec-portfolio)

Vercel 會自動偵測 Nuxt，使用 `pnpm build` 建置預渲染頁面與 API Function。Node.js 使用 `24.x`（見 `package.json` engines）。

首次啟用瀏覽量前，在 Vercel Marketplace 建立 Upstash Redis、連接此專案，確認 Production 與 Preview 均取得環境變數，然後重新部署。

**首次 / 手動部署：**

```bash
pnpm dlx vercel --prod
```

之後每次 push 到 `main` 會自動部署。

**Dashboard：** [vercel.com/dashboard](https://vercel.com/dashboard) → `ec-portfolio`

GitHub Pages 等純靜態平台無法執行此專案的瀏覽量 API；如需保留 counter，請部署至支援 Nuxt/Nitro server routes 的平台。

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
server/api/           # Nitro API routes
server/utils/         # Server-side counter logic
shared/types/         # App/API 共用型別
```

## 技術棧

- [Nuxt 4](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [@nuxtjs/i18n](https://i18n.nuxtjs.org)
- [@nuxtjs/color-mode](https://color-mode.nuxtjs.org)
- [Upstash Redis](https://upstash.com/docs/redis/howto/vercelintegration)
