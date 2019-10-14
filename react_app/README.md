# PCoption-react App Development

_請使用 NodeJS 7 以上的版本進行此應用程式之開發_

## Project Structure

````
​```
.
├── routes            // Server API Routings.
├── src               // Theme system with React.
├── server			  // Network/port/logger control
├── views             // Theme templates of page(html).
└── webpack           // ReactJS webpage module packing.
​```
````

## 安裝套件

進入資料夾與 package.json 同一層

安裝詳細: [package.json](https://github.com/dafzheng/Platypus/blob/TASK_0053_20181219/react_app/package.json)

```
npm install
```

## 開發模式

透過 nodemon 與網頁套件進行動態開發

- 更改 html 或者 css/scss 可立即看到網頁更新
- 若是更改到 reactJS (.js/jsx)檔案則會重新進行 webpack 打包

```
npm run dev
```
