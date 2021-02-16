# Cash Can 零錢罐

##### 紀錄荷包的一點一滴 d(`･∀･)b

##### DEMO：https://cashcan.000webhostapp.com/
---
專案說明：
* 前端畫面使用 vue 所構築
* 資料透過使用 PHP 所建立簡易的 RESTful API 來獲得
* 採用 RWD，讓 mobile/desktop 端皆能有良好的體驗
* 這個專案只包括了前端 vue 的程式碼，後端的會找時間放上來

現有功能：
* 零錢罐的建立/修改/刪除
* 零錢罐細項的建立/修改/刪除
* 項目分類的的建立/修改/刪除
* 登入/登出 (含使用 Google oAuth 登入)

預計完成功能：
* 零錢罐/細項的排序
* 整理報表並輸出為 .xlsx 或 .csv 檔案
* 相關功能的防呆/例外處理
* 會員註冊
* FB 登入

待修 BUG：
* Vue Router 在 history 模式下 Refresh 非 / 的頁面會出現 404

v0.3.0 新增功能：
* 登入/登出 (含使用 Google oAuth 登入)
* 使用 SweetAlert 取代多數的 alert
* 後端 API SERVER 增加前端資料的驗證

##### 目前版本：v0.3.0
##### 共同製作：chiaoshin
