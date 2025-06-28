---
date: 2025-05-25
---
*Ngày cập nhật: 2025-05-25*

# Table of Contents

# `Web application development fundamentals`{style="color: green"}
## A) Ba thành phần của ngành phát triển ứng dụng:
  (Web application development fundamentals consist of 3 building blocks):
In a nutshell, a website / web app is like the combo of HTML, CSS and Javascript that look like the picture below,

Vắn tắt trang web hay ứng dụng web gồm có 3 thành phần sau: HTML, CSS và Javascript (JS),
hình dung như hình sau,
và thành phần thứ tư đó là dữ liệu (thường được cung cấp từ database - nguồn dữ liệu hay còn gọi là cơ sở dữ liệu và được xử lý bởi backend server - máy chủ):

![Web app components](https://raw.githubusercontent.com/hivelogic2018/nuxt-vuetify-simple/main/public/assets/webcomponents.jpg)

Nguồn source: [webdesigning](https://tutorial.techaltum.com/webdesigning.html)

A website has four parts, HTML, CSS, JS, and data.

A very computer science-y answer for `data`{style="color: green"} would be: things like `"strings"`{style="color: green"}, `integers (42)`{style="color: green"}, `objects ({ pizza: true })`{style="color: green"}, etc.

  ### A.1) HTML: Hypertext Markup Language: ngôn ngữ HTML để viết trang web
Hãy xem ví dụ dưới đây về cấu trúc 1 trang web trong file `index.html`{style="color: green"}. File chứa các thẻ căn bản khai báo cho trang web

```html
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<link rel="icon" href="/favicon.ico">

<link rel="stylesheet" href="styles.css"> // file styles.css là file chứa các styles viết theo bài bản CSS (CSS guideline) được gắn vào trang web/app này

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Expense Tracker</title>

</head>

<body>

<div id="app"></div>

<script type="module" src="/src/main.js"></script> // trỏ tới file code Javascript để thực thi các chức năng của web/app bao gồm hiển thị và thao tác xuất, lưu, cập nhật dữ liệu

</body>

</html>
```

  ### A.2) Cascading Style Sheets (CSS):

is a stylesheet language used to describe the presentation of a document written in HTML or XML

CSS cho phép kiểm soát cách trình bày các yếu tố HTML gồm màu sắc, phông chữ, bố cục, hiệu ứng,… Trang web nếu không có CSS có thể sẽ rất nhàm chán, khó đọc, khó truy cập và không hiệu quả. Nắm vững kiến thức và sử dụng thành thạo CSS giúp Front end Developer tạo ra các website đẹp mắt, thu hút và dễ sử dụng.

Tham khảo thêm:

https://www.w3schools.com/css/

https://200lab.io/blog/css-la-gi/

https://itviec.com/blog/css-la-gi/

  ### A.3) Javascript/Typescript:

  #### A.3.1) Javascript: là gì:

https://aws.amazon.com/vi/what-is/javascript/ (có giải thích tiếng Việt)

Official Web for Javascript tài liệu chính thức của Javascript (**MDN - Mozilla developer network**) https://developer.mozilla.org/en-US/docs/Web/JavaScript

JavaScript là ngôn ngữ lập trình được nhà phát triển sử dụng để tạo trang web tương tác. Từ làm mới bảng tin trên trang mạng xã hội đến hiển thị hình ảnh động và bản đồ tương tác, các chức năng của JavaScript có thể cải thiện trải nghiệm người dùng của trang web. Là ngôn ngữ kịch bản phía máy khách, JavaScript là một trong những công nghệ cốt lõi của World Wide Web. Ví dụ: khi duyệt internet, bất cứ khi nào bạn thấy quảng cáo quay vòng dạng hình ảnh, menu thả xuống nhấp để hiển thị hoặc màu sắc phần tử thay đổi động trên trang web cũng chính là lúc bạn thấy các hiệu ứng của JavaScript.

Videos học Javascript: kênh dạyNgheIT:
