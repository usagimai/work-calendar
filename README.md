## 【作品說明】

### ● 名稱：

工作行事曆 (Work Calendar)

### ● 簡介：

透過「行事曆」及「專案/其他」兩個面向進行工作規劃的 APP

### ● 使用技術/工具：

React.js、SASS、Redux、Axios、Firebase 驗證系統、資料庫與託管功能、月曆&日期選擇套件

### ● 特色：

1. 依工作類型，透過「專案」或「其他」建立工作 (「專案」適用於可拆分成多個工作細項的工作類型；「其他」適用於單次的待辦事項)
2. 可於行事曆確認每日工作清單，工作會以完成期限近 → 遠之順序排列，並以不同顏色標示，藉此提醒執行優先順序 (完成期限早於等於今天的工作將顯示紅色、完成期限是明天的工作將顯示橘色，已完成之項目將標示為灰色，並顯示於當日工作清單最後面)
3. 行事曆使用「react-big-calendar」套件、日期挑選使用「react-multi-date-picker」套件、時間管理使用「moment.js」套件
4. 使用 Axios 串接中央氣象局之天氣預報資料；使用者選擇城市後，城市資訊被儲存於 local storage，將做為今後預設顯示的城市

### ● 連結：

[[成品]](https://work-calendar-2e9b0.web.app/)
[[設計稿]](https://www.figma.com/proto/S7efH9oWSc8TWTipCaAC5D/Work-Calendar?node-id=2%3A2)
