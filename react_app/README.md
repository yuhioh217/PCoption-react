# Platypus ReactJS App Development

*請使用NodeJS 7以上的版本進行此應用程式之開發*



## Project Structure

```
​```
.
├── routes            // Server API Routings.
├── src               // Theme system with React.
├── server			  // Network/port/logger control
├── views             // Theme templates of page(html).
└── webpack           // ReactJS webpage module packing.
​```
```



## 安裝套件

進入資料夾與package.json同一層

安裝詳細:  [package.json](https://github.com/dafzheng/Platypus/blob/TASK_0053_20181219/react_app/package.json)

```
npm install
```



## 開發模式

透過nodemon與網頁套件進行動態開發

* 更改html或者css/scss可立即看到網頁更新
* 若是更改到reactJS (.js/jsx)檔案則會重新進行webpack打包

```
npm run dev
```









