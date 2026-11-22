# 湯旅 YU ATLAS — Taiwan Hot Spring Guide

為日本、韓國與國際旅客設計的台灣溫泉地圖，支援繁體中文、英文、日文、韓文。

GitHub Pages 網址：<https://stevemarauder.github.io/hotspring_in_Taiwan/>

## 功能

- 19 個溫泉區與 12 家飯店／浴場；互動地圖、區域示意圖、清單與條件篩選。
- 每張卡片都有對應設施的官網實景照片，點選可查看大圖、照片來源及原圖。
- 地點搜尋支援四語名稱；可依地區、體驗及已知成人入場預算篩選。
- 三組有理由的編輯行程選單、泡湯指南、價格條件與來源說明。
- 四語網址、語系記憶及僅儲存在目前瀏覽器的收藏。
- 手機與桌面版面、圖片載入失敗提示及鍵盤可操作詳情視窗。

## 開發與檢查

Node.js 18+；沒有 npm 安裝依賴。

```sh
npm start
npm run check
npm run check:photos
npm run build
node scripts/check-pages.mjs
```

一般本機預覽：<http://127.0.0.1:4173/zh-TW/>。

要模擬 GitHub Pages 的子目錄路徑：

```sh
node server.mjs --pages
```

開啟 <http://127.0.0.1:4173/hotspring_in_Taiwan/zh-TW/>。

## GitHub Pages 發布

`npm run build` 產生 `docs/`。Pages 設定為從 `main` 分支的 `/docs` 發布；每次修改原始碼後，重新產生 `docs/`，一起 commit 並 push。

建置工具處理專案子目錄、四語入口、canonical、hreflang、sitemap 與 `.nojekyll`，不需要伺服器或付費 API。

單檔預覽可由 `npm run preview:bundle` 產生 `preview.html`。示意圖與介面可離線操作，官網照片仍需要網路。

## 結構

- `dist/`：可維護的網站原始碼與本地資產。
- `dist/data.js`：區域、設施、公開價格方案及來源。
- `dist/photos.js`：12 張官網照片、圖像類型、來源與權利人。
- `dist/i18n.js`：四語介面與指南內容。
- `dist/app.js`：互動與支援部署子目錄的語系路徑。
- `scripts/`：資料檢查、照片連線檢查、Pages 建置與單檔打包。
- `docs/`：已產生的 GitHub Pages 發布內容。
- `PHOTO_SOURCES.md`、`ASSETS.md`：照片來源與其他素材說明。

## 內容界線

價格是截至 2026-11-22 查核的官網參考方案，不是即時報價或空房保證。沒有可比較價格的住宿連至官網查詢；預算只涵蓋已知成人入場起價，不混入套裝或住宿。

圖釘為溫泉區概略中心，不是飯店地址；各店導航以店名及城市開啟 Google Maps 搜尋。外文內容為編輯翻譯初稿，仍可持續校對。

卡片及詳情照片由飯店官方來源外部載入，不將第三方照片檔案打包進 repository，來源連結與版權歸屬不代表取得再利用授權。第三方來源可能更換網址或限制外連；失敗時提供明確提示與官方來源入口。

頁首主視覺為 AI 生成的氛圍圖，不代表任何實際飯店。詳細素材資訊見 `ASSETS.md`。
