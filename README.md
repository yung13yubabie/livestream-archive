# 直播紀錄庫

直播與社群活動的錄影、逐字稿與重建報告。講者以「講者A／B／C」代稱，其他被提及的人以「[某成員]」代稱；錄影未做去識別化。

**網站：** https://yung13yubabie.github.io/livestream-archive/

## 直播列表

| 日期 | 活動 | 頁面 | 完整錄影 |
|---|---|---|---|
| 2026-10-14 | 自由工坊 AI讀書會（Discord）：公會平台、Grok 信箱自動化、匹克球遊戲與光雕、11/13 自由派對、Project Hub。有人聲的只有 23:23:48–00:01:03 | [活動頁](https://yung13yubabie.github.io/livestream-archive/streams/2026-10-14-ai-reading-club/)・[逐字稿](docs/streams/2026-10-14-ai-reading-club/transcript-full.md)・[報告 A](docs/streams/2026-10-14-ai-reading-club/report-a.md)・[報告 B](docs/streams/2026-10-14-ai-reading-club/report-b.md) | 未剪輯，目前公開前 6 段，見下表 |

### 2026-10-14 完整錄影

時間偏移取自 ffprobe 的影片時間戳；台北時間＝22:33:26＋偏移。錄影實際在 02:47 左右結束，但影片時間戳總長 4:46:24，比實際經過時間多約 33 分鐘，所以 00:01 之後的台北時間只是推算、會偏晚。有人聲的只有 23:23:48–00:01:03（VT 0:50:22–1:27:37），在第 3–5 段。

| 段 | 影片時間 | 台北時間 | 大小 |
|---|---|---|---|
| [full-part01.mp4](docs/streams/2026-10-14-ai-reading-club/files/full/full-part01.mp4) | 0:00:00–0:16:18 | 22:33:26–22:49:44 | 90MB |
| [full-part02.mp4](docs/streams/2026-10-14-ai-reading-club/files/full/full-part02.mp4) | 0:16:18–0:32:34 | 22:49:44–23:06:00 | 90MB |
| [full-part03.mp4](docs/streams/2026-10-14-ai-reading-club/files/full/full-part03.mp4) | 0:32:34–1:01:06 | 23:06:00–23:34:32 | 90MB |
| [full-part04.mp4](docs/streams/2026-10-14-ai-reading-club/files/full/full-part04.mp4) | 1:01:06–1:17:44 | 23:34:32–23:51:10 | 90MB |
| [full-part05.mp4](docs/streams/2026-10-14-ai-reading-club/files/full/full-part05.mp4) | 1:17:44–1:49:43 | 23:51:10–00:23:08 | 90MB |
| [full-part06.mp4](docs/streams/2026-10-14-ai-reading-club/files/full/full-part06.mp4) | 1:49:43–2:13:07 | 00:23:08–00:46:32 | 90MB |

### 2026-10-14 字幕

語音辨識（SenseVoice）加詞彙修正，未經人工校對，時間為每句；人名已替換為 [某成員]。第 1、2、6 段無人聲，不附字幕。

| 影片 | 字幕 |
|---|---|
| full-part03.mp4 | [.vtt](docs/streams/2026-10-14-ai-reading-club/files/full/full-part03.zh-Hant.vtt)・[.srt](docs/streams/2026-10-14-ai-reading-club/files/full/full-part03.zh-Hant.srt) |
| full-part04.mp4 | [.vtt](docs/streams/2026-10-14-ai-reading-club/files/full/full-part04.zh-Hant.vtt)・[.srt](docs/streams/2026-10-14-ai-reading-club/files/full/full-part04.zh-Hant.srt) |
| full-part05.mp4 | [.vtt](docs/streams/2026-10-14-ai-reading-club/files/full/full-part05.zh-Hant.vtt)・[.srt](docs/streams/2026-10-14-ai-reading-club/files/full/full-part05.zh-Hant.srt) |
| AI-reading-club-20261014-2323-0002.mp4（有聲段） | [.vtt](docs/streams/2026-10-14-ai-reading-club/files/AI-reading-club-20261014-2323-0002.zh-Hant.vtt)・[.srt](docs/streams/2026-10-14-ai-reading-club/files/AI-reading-club-20261014-2323-0002.zh-Hant.srt) |

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
  index.html               首頁：hero、直播列表（搜尋／平台／標籤篩選）
  streams.json             直播列表資料（首頁由此渲染）
  style.css                共用設計系統：tokens、版面、元件、深色模式、列印
  site.js                  共用互動：目錄、閱讀進度、回到頂端、影片載入／錯誤狀態、列表篩選
  one-video.js             同時只播放一支影片
  404.html                 找不到頁面
  streams/<YYYY-MM-DD-名稱>/
    index.html             活動頁：摘要、錄影、時間軸、相關連結
    transcript-full.md/.html  第一部分：基本資料與完整逐字稿
    report-a.md/.html      第二部分：主題分類報告
    report-b.md/.html      第三部分：時間順序報告
    transcript.html        CLEAN 逐字稿單頁
    files/                 逐字稿 txt、有聲段 mp4 與字幕
    files/full/            完整錄影分段 mp4（每段 <95MB）與有人聲段的字幕（*.zh-Hant.vtt/.srt）
    img/                   插圖
```

新增一場直播：建立 `docs/streams/<日期-名稱>/`（沿用上列頁面結構與 `style.css` 的元件 class），在 `docs/streams.json` 加一筆，在上方表格加一列。完整錄影用 `ffmpeg -c copy -f segment` 在關鍵影格切成每段 95MB 以下，放在 `files/full/`。
