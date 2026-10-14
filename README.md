# 直播紀錄庫

直播與社群活動的錄影、逐字稿與重建報告。講者以「講者A／B／C」代稱，其他被提及的人以「[某成員]」代稱；錄影未做去識別化。

**網站：** https://yung13yubabie.github.io/livestream-archive/

## 直播列表

| 日期 | 活動 | 頁面 | 完整錄影 |
|---|---|---|---|
| 2026-10-14 | 自由工坊 AI讀書會（Discord）：公會平台、Grok 信箱自動化、匹克球遊戲與光雕、11/13 自由派對、Project Hub。有人聲的只有 23:23:48–00:01:03 | [活動頁](https://yung13yubabie.github.io/livestream-archive/streams/2026-10-14-ai-reading-club/)・[逐字稿](docs/streams/2026-10-14-ai-reading-club/transcript-full.md)・[報告 A](docs/streams/2026-10-14-ai-reading-club/report-a.md)・[報告 B](docs/streams/2026-10-14-ai-reading-club/report-b.md) | [Release stream-2026-10-14](https://github.com/yung13yubabie/livestream-archive/releases/tag/stream-2026-10-14)（22:33–02:47，約 937MB） |

### 2026-10-14 相關連結

| 名稱 | 說明 | 連結 |
|---|---|---|
| 自由工坊 平台（公會／技能書） | 社群的公會、技能書與合作平台 | https://freetwai.com/ |
| Grok | 講者B 用來串接信箱、每天整理 | https://grok.com/ |
| ChatGPT | 講者B 拿來比較 | https://chatgpt.com/ |
| Codex | OpenAI 的程式開發代理 | https://chatgpt.com/codex |
| Claude／Claude Code | Anthropic 的 AI 助理與程式開發代理 | https://claude.com/product/claude-code |
| Gemini | Project Hub 的備援生圖模型 | https://gemini.google.com/ |
| Tailscale | 遠端連線工具，約 00:50 的畫面分享中出現 | https://tailscale.com/ |

## 資料夾結構

```
docs/                      GitHub Pages 根目錄
  index.html               直播列表（每場一張卡片）
  style.css                共用樣式
  streams/<YYYY-MM-DD-名稱>/
    index.html             活動頁：摘要、錄影、相關連結
    transcript-full.md/.html  第一部分：基本資料與完整逐字稿
    report-a.md/.html      第二部分：主題分類報告
    report-b.md/.html      第三部分：時間順序報告
    files/                 逐字稿 txt、短片段 mp4
    img/                   插圖
```

新增一場直播：建立 `docs/streams/<日期-名稱>/`，在 `docs/index.html` 加一張卡片，在上方表格加一列。超過 100MB 的完整錄影上傳到 GitHub Release（tag `stream-<日期>`），不要 commit 進 git。
