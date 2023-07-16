# 解説

このソースコードは、Vanilla JavaScript（フレームワークやライブラリを使用しないJavaScript）を使ってシングルページアプリケーション（SPA）のルーティングを実現するものです。以下に各部分の詳しい説明をします。

```javascript
const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};
```
この関数は、ブラウザのページ遷移を検知するために使用されます。通常、クリックイベント（またはそれに相当するイベント）によって起動します。`event.preventDefault();`を使って、ブラウザのデフォルトのページリロード動作を停止します。その後、`window.history.pushState()`を使って、新しい履歴エントリーを作成し、遷移先のURLを設定します。最後に、`handleLocation()`関数を呼び出してページの内容を変更します。

```javascript
const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/about": "/pages/about.html",
    "/newpage": "/pages/newpage.html",
};
```
これはオブジェクトリテラルで、SPAの各ルート（URLパス）とそれに対応するHTMLファイルのマッピングを表現しています。

```javascript
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
};
```
この関数は、現在のURLに基づいてページの内容を更新します。`window.location.pathname`を使って現在のURLのパスを取得し、それが`routes`オブジェクトに存在すれば対応するHTMLファイルのパスを取得します。存在しなければ、404ページ（存在しないページを表示するためのページ）のパスを取得します。その後、`fetch()`関数を使ってHTMLファイルを非同期に取得し、その内容をページ内の特定の要素（ここではidが"main-page"の要素）に挿入します。

```javascript
window.onpopstate = handleLocation;
window.route = route;

handleLocation();
```
これらの行は、上で定義した関数をブラウザのグローバルスコープに登録しています。これにより、HTMLファイル内で直接これらの関数を呼び出すことができます。`window.onpopstate = handleLocation;`は、ブラウザの戻るや進むボタンが押されたときに`handleLocation()`関数が呼び出されるように設定しています。最後に、ページが初めてロードされたときに適切なページ内容を表示するために`handleLocation()`を呼び出しています。