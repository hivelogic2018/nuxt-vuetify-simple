---
date: 2025-05-25
---
*Ngày cập nhật: 2025-05-25*

# Table of Contents

# `Web application development fundamentals`{style="color: green"}
## 1) Ba thành phần của ngành phát triển ứng dụng - Web application development fundamentals consist of 3 building blocks :
In a nutshell, a website / web app is like the combo of HTML, CSS and Javascript that look like the picture below,

Vắn tắt trang web hay ứng dụng web gồm có 3 thành phần sau: HTML, CSS và Javascript (JS),
hình dung như hình sau,
và thành phần thứ tư đó là dữ liệu (thường được cung cấp từ database - nguồn dữ liệu hay còn gọi là cơ sở dữ liệu và được xử lý bởi backend server - máy chủ):

![Web app components](/assets/webcomponents.jpg)

Nguồn source: [webdesigning](https://tutorial.techaltum.com/webdesigning.html)

A website has four parts, HTML, CSS, JS, and data.

A very computer science-y answer for `data`{style="color: green"} would be: things like `"strings"`{style="color: green"}, `integers (42)`{style="color: green"}, `objects ({ pizza: true })`{style="color: green"}, etc.

  ### 1.1) HTML: Hypertext Mark-up Language: ngôn ngữ HTML để viết trang web
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

  ### 1.2) Cascading Style Sheets (CSS):

is a stylesheet language used to describe the presentation of a document written in HTML or XML

CSS cho phép kiểm soát cách trình bày các yếu tố HTML gồm màu sắc, phông chữ, bố cục, hiệu ứng,… Trang web nếu không có CSS có thể sẽ rất nhàm chán, khó đọc, khó truy cập và không hiệu quả. Nắm vững kiến thức và sử dụng thành thạo CSS giúp Front end Developer tạo ra các website đẹp mắt, thu hút và dễ sử dụng.

Tham khảo thêm:

https://www.w3schools.com/css/

https://200lab.io/blog/css-la-gi/

https://itviec.com/blog/css-la-gi/

  ### 1.3) Javascript / Typescript:

    #### 1.3.1) Javascript: là gì:

https://aws.amazon.com/vi/what-is/javascript/ (có giải thích tiếng Việt)

Official Web for Javascript tài liệu chính thức của Javascript (**MDN - Mozilla developer network**) https://developer.mozilla.org/en-US/docs/Web/JavaScript

JavaScript là ngôn ngữ lập trình được nhà phát triển sử dụng để tạo trang web tương tác. Từ làm mới bảng tin trên trang mạng xã hội đến hiển thị hình ảnh động và bản đồ tương tác, các chức năng của JavaScript có thể cải thiện trải nghiệm người dùng của trang web. Là ngôn ngữ kịch bản phía máy khách, JavaScript là một trong những công nghệ cốt lõi của World Wide Web. Ví dụ: khi duyệt internet, bất cứ khi nào bạn thấy quảng cáo quay vòng dạng hình ảnh, menu thả xuống nhấp để hiển thị hoặc màu sắc phần tử thay đổi động trên trang web cũng chính là lúc bạn thấy các hiệu ứng của JavaScript.

Videos học Javascript: kênh dạyNgheIT:

::IVideo
---
embed-url: https://www.youtube.com/embed/videoseries?list=PL28Ap55o84DTu8qRGXpvyBcKYUGfVFxy9
thumbnail-url: https://img.youtube.com/vi/dmSsjByhPBg/hqdefault.jpg
title: 'dạyNghềIT: Học Javascript'
video-id: dmSsjByhPBg
---
::

thầy Traversy video: youtu.be/hdI2bqOjy3c?si=qTu4JnX9NjYBTPAi

**Watch Traversy Media’s JavaScript Crash Course:**

**Xem thêm thầy Traversy dạy JavaScript khá đủ, súc tích trong 1 video:**

::IVideo
---
video-id: hdI2bqOjy3c
title: Traversy Media JavaScript Crash Course
---
::

    #### 1.3.2) Typescript là gì

TypeScript là một ngôn ngữ lập trình mã nguồn mở phát triển bởi Microsoft. Nó được phát triển dựa trên JavaScript, nhưng bổ sung thêm tính năng kiểu tĩnh (static typing) và một số tính năng nâng cao khác. TypeScript cho phép lập trình viên viết mã JavaScript theo cú pháp của TypeScript, sau đó mã đó có thể được biên dịch (transpile) thành mã JavaScript thuần để chạy trên các trình duyệt hoặc môi trường chạy JavaScript khác nhau.

Việc sử dụng kiểu tĩnh trong TypeScript giúp giảm thiểu lỗi trong quá trình phát triển và tăng khả năng tái sử dụng mã. Nó cung cấp kiểm tra kiểu tại thời điểm biên dịch, cho phép phát hiện và sửa lỗi kiểu trước khi chạy chương trình. Điều này giúp cung cấp trải nghiệm phát triển ổn định hơn và tăng hiệu suất trong quá trình phát triển ứng dụng lớn.

TypeScript được sử dụng rộng rãi trong các dự án phát triển web và ứng dụng di động. Nó tích hợp tốt với các framework phổ biến như Angular, React và Node.js, và có một cộng đồng lớn và năng động.

Tham khảo thêm:

https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

https://bootcamp.uxdesign.cc/mastering-typescript-10-essential-features-for-writing-better-code-c89719d6dcc7

https://fptshop.com.vn/tin-tuc/danh-gia/typescript-168823

  ### 1.4) Các thư viện để viết ứng dụng web (web app) - frameworks and libraries to build web app:

Vue 3, React, Angular

để làm (build) mobile app (ứng dụng chạy trên điện thoại Android, iphone iOS) : React Native

để làm (build) desktop app (ứng dụng chạy trên OS: Windows, Mac) : Electron

=== HỌC NGÔN NGỮ JAVASCRIPT: LẬP TRÌNH VIẾT SCRIPT, VIẾT CODE VỚI JAVASCRIPT / TYPESCRIPT ===

## 2) Data types - Các kiểu dữ liệu:

Từ khoá để khai báo variable / biến: **`let`** và **`const`**, giờ rất ít dùng `var`{style="color: purple"}

Khai báo biến dùng **`let`**, khai báo hằng dùng **`const`**

Khai báo array/object có thể dùng `let`{style="color: green"} / `const`{style="color: green"} tuỳ thích, nhưng thường dùng `const`{style="color: green"} để tránh việc thay đổi giá trị của biến array/object

  ### 2.1) PRIMITIVE DATA TYPES: các kiểu dữ liệu đơn, thuần tuý

    #### 2.1.1) Kiểu chuỗi: string

ví dụ:
```js
let name = 'John'

let ten = 'An'
```

khai báo biến name với giá trị tên John, và biến ten với giá trị An

    #### 2.1.2) Kiểu số: number

ví dụ:
```js
let pi = 3.14

let thue = 0.1
```
Khai báo biến pi với giá trị 3.14, và biến thue với giá trị 0.1 ( ~ 10%)

    #### 2.1.3) Kiểu mệnh đề Đúng/Sai : Boolean

ví dụ:
```js
let tren18tuoi = true

let coBangLai = false
```

Khai báo biến tren18tuoi với giá trị true - đúng, và biến coBangLai với giá trị false - sai

  ### 2.2) NON-PRIMITIVE DATA TYPES: các kiểu dữ liệu phức hợp (không thuần tuý):

    #### 2.2.1) Kiểu mảng - Array:

Mảng chứa các phần tử (elements), mỗi phần tử (element) có thể là thuộc một trong đa dạng các kiểu dữ liệu thuần (primitive data type kể trên).

ví dụ: mảng gồm các phần tử số , xét dãy số sau :

`let dayso = [1, 2, 3]`{language="js"}

trong Typescript (có type) sẽ ghi là: let dayso: number[ ] = [1, 2, 3] ý chỉ dayso là mảng các phần tử kiểu số (array of number-type element)

mảng gồm các phần tử kiểu chuỗi (array of elements of string data type)

`let thethao = ['da banh', 'cau long', 'quan vot']`{language="js"}

trong Typescript (có type) sẽ ghi là: `let thethao: string[ ] = ['da banh', 'cau long', 'quan vot']`{language="ts"} ý chỉ thethao là mảng các phần tử kiểu chuỗi (array of string-type element)
```js
let students = [{
  name: 'An',

  age: 30,

  dob: '06/30/1994'

  }, {
  name: 'Binh',
  age: 28,
  dob: '05/15/1996'

  }, {
  name: 'Chau',
  age: 29,
  dob: '04/15/1995'
}]
```
    #### 2.2.2) Kiểu đối tượng hay còn gọi dễ hiểu là kiểu phức hợp:
      vì nó có thể bao gồm các giá trị (property value) đa dạng cho các thuộc tính (property)

(đối tượng tiếng anh gọi là Object, ví dụ đối tượng cá thể, vật thể,...):

ví dụ: đối tượng sinh viên với tên biến là studentObject, có thể đặt tên biến tuỳ ý (sinhVien, doituongSinhVien, NhanVien)

```js
let studentObject = {

ten: 'An',

tuoi: 30,

ngaysinh: '06/30/1994',

courses: [

{ tenlop: 'English101', giaovien: 'co Kim'} ,

{ tenlop: 'Maths', giaovien: 'co Oanh' },

{ tenlop: 'Physics', giaovien: 'co Hue'} ,

{ tenlop: 'Su', giaovien: 'thay Truyen' },

{ tenlop: 'Dia', giaovien: 'thay Quoc' }

],

dangHoc: true,

sothich: ['xem phim', 'nghe nhac', 'choi the thao']

}
```

mỗi thuộc tính là 1 cặp `key-value pair`{style="color: green"}. Như vậy ten (`key`{style="color: green"}) và 'An' (`value`{style="color: green"}) là một cặp thuộc tính và giá trị thuộc tính. Các cặp key-value pairs ở studentObject là ten: 'An', tuoi: 30, và ngaysinh: '06/30/1994', vân..vân..

Giá trị thuộc tính có thể là chuỗi (thuộc kiểu dữ liệu chuỗi: string), hoặc số (thuộc kiểu dữ liệu số: number), hoặc ngày tháng (thuộc kiểu dữ liệu ngày tháng: Date | DateTime | Time ) , hoặc mảng (thuộc kiểu dữ liệu mảng: array, ví dụ ['xem phim', 'nghe nhac', 'choi the thao'] cho thuộc tính sothich - sở thích), hoặc kiểu đúng/sai boolean ví dụ dangHoc là thuộc tính boolean ý chỉ sinh viên còn đang học hay đã ra trường,

hoặc kiểu dữ liệu phức hợp như courses có giá trị là 1 array (mảng) gồm những objects (đối tượng) bên trong.

## 3) Basic looping methods in Javascript : Các vòng lặp phổ biến trong lập trình

`For... Loop`{style="color: green"}: Vòng lặp for

`For ... In`{style="color: green"}: Tự tham khảo thêm

`For ... Of`{style="color: green"}: Tự tham khảo thêm

`While... Loop`{style="color: green"}

`Do ... While`{style="color: green"}

`Recursive - Recursion`{style="color: green"} : Đệ quy: Tự tham khảo thêm

Tham khảo:

https://funix.edu.vn/chia-se-kien-thuc/cac-loai-vong-lap-trong-javascript/

https://viblo.asia/p/cac-loai-vong-lap-trong-javascript-07LKXp82KV4

https://viblo.asia/p/recursive-function-in-javascript-WrJvYXKRkVO

https://niithanoi.edu.vn/recursion-trong-javascript.html

## 4) Javascript native methods - Các hàm tự nhiên trong Javascript

### 4.1) String prototype & functions: Kiểu mẫu String và các hàm thao tác chuỗi ký tự

```js
let ten = '    Ngoc   '

let tenMoi = ten.trim()   - hàm trim, trim (xoá) các ký tự trống, output: kết quả của biến tenMoi là 'Ngoc'

tenMoi.toUpperCase() - hàm toUpperCase, output ra kết quả: 'NGOC'

let income = '10' - thunhap này là một chuỗi ký tự (string) với giá trị là '10'
let incomeNumber = +income - hàm type-casting, chuyển đổi từ chuỗi ký tự sang số, output ra kết quả là 10
```

Để biến giá trị chữ thành số - type-casting (
  type-casting là quá trình chuyển đổi giữa các kiểu dữ liệu khác nhau trong lập trình, ví dụ từ string sang number, hoặc từ number sang string, vân..vân..
) - ví dụ:  string '10' muốn chuyển thành số 10..

thì có nhiều cách làm, gọi là  ví dụ trong Vue:

`+income`{style="color: green"}

các cách khác `income.toString()`{style="color: green"} , `income.toNumber()`{style="color: green"}

### 4.2) Array prototype functions: Kiểu mẫu Array - mảng và các hàm xử lý mảng

Các hàm thao tác với dự liệu kiểu Array trong Javascript

`array.map`{style="color: green"} : vòng lặp

`array.filter`{style="color: green"}

`array.sort`{style="color: green"}

`array.toSorted`{style="color: green"}

`array.reduce`{style="color: green"}

Tham khảo:

https://anhdangcode.com/post/so-sanh-khac-nhau-giua-function-map-va-foreach-trong-javascript

https://codegym.vn/blog/tong-hop-4-ham-xu-ly-array-trong-javascript/

web chính thức: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

liên hệ tới bài học: rút trích, sắp xếp và thao tác danh sách nhân viên dạy riêng

### 4.3) Object prototype functions: Các hàm thao tác với dự liệu kiểu Object trong Javascript

ví dụ:
```js
let studentObject = {

name: 'An',

age: 30,

dob: '06/30/1994'

}

let giaovien = {
  ten: 'cô Kim',
  lop: ['Tiếng Anh', 'Công Nghệ Thông Tin'],
  ngaysinh: '2 tháng 1, 1988',
}
```

    #### 4.3.1) Referencing the property value of an object: **Cách gọi thuộc tính**
```js

studentObject.name // An

studentObject.age // 30

giaovien.ten // Cô Kim

giaovien.ngaysinh // 2 tháng 1, 1988

// Car object has 3 properties: modal, type, color
// Đối tượng xe hơi (car object) có 3 thuộc tính: modal, type, và color
let car = {
  modal : "Lexus",
  type: "500",
  color: "White"
};

// Property accessor: accessing the property OF AN OBJECT by using a dot:
// gọi thuộc tính của 1 Object (đối tượng): xài dấu chấm (dot) để gọi thuộc tính
// kết quả khi gọi như vậy sẽ ra giá trị của thuộc tính đó

car.modal // Lexus

car.type // 500

car.color // White
```
    #### 4.3.2) Assign new property for the studentObject: gán thuộc tính (property) mới vào trong studentObject:

`studentObject.email = 'annguyen@gmail.com'`{language="js"}

`studentObject.key = 'value'`{language="js"}   -> thuộc tính (property) và giá trị của thuộc tính (property value) còn được hiểu là 1 cặp key-value pair (pair tiếng Anh là 1 cặp, ví dụ: a pair of shoes, a pair of jeans)

    #### 4.3.3) Xoá thuộc tính khỏi studentObject:

`delete studentObject.age`{language="js"}   --> dòng lệnh này sẽ xoá thuộc tính tuổi khỏi đối tượng sinh viên

Tham khảo thêm về Object

https://kungfutech.edu.vn/bai-viet/javascript/object-la-gi-object-trong-javascript

https://codelearn.io/sharing/object-trong-javascript

https://viblo.asia/p/doi-tuong-object-trong-javascript-63vKjn6dK2R

## 5) Event handler & Event listener in Javascript - Event handler & & Event listener trong Javascript
...

### 5.1) Event handler: (hàm xử lý sự kiện)

Ví dụ:
```js
const button = document.querySelector(".btn")

button.onclick = function() {

console.log("Hello!");

};
```

OR using Javascript one-liner make you look like a pro 😉 \
Sử dụng Javascript one-liner để làm cho code của bạn trông chuyên nghiệp hơn

`button.onclick = () => {console.log("Hello!")};`{language="js"}

Trong ví dụ này, thuộc tính onclick được sử dụng để khi người dùng nhấp vào button, nó sẽ in ra dòng chữ "Xin chào!" vào console log.
Thuộc tính "onclick" chỉ là một trong những EventHandlercó thể sử dụng được thôi. Dước đây là một số thuộc tính thông dụng có thể dùng.

### 5.2) Event Listener

Bằng cách thêm event listener (xài hàm addEventListener để gắn hàm event handler vào - hàm xử lý sự kiện tương tác của người dùng) vào một đối tượng, chúng ta có thể bắt được một loạt các sự kiện do người dùng hoặc trình duyệt tạo ra.

```js
const button = document.querySelector(".btn")

button.addEventListener("click", function(event) {

console.log("Hello!");

})
```
OR using Javascript one-liners

`button.addEventListener("click", event => console.log("Hello!"))`{language="js"}


Thay vì dùng thuộc tính `onclick`{style="color: green"}, thì ở đây mình dùng method `addEventListener()`{style="color: green"}:

`target.addEventListener(event, function, useCapture);`{language="js"}

Tham khảo:

https://www.w3schools.com/js/js_events.asp

https://www.w3schools.com/js/js_htmldom_eventlistener.asp

https://viblo.asia/p/javascript-event-handlers-va-event-listeners-RQqKLb1rl7z

## 6) Javascript ES6 (version 2015) features

Các tính năng của phiên bản Javascript ES6  (2015) Google & để links các trang tham khảo để ac học thêm:

https://codegym.vn/blog/es6-la-gi/

tài liệu video:

::IVideo
---
video-id: JVqPDKFMhZc
title: 'ES6 ECMAScript là gì'
---
::

## 7) VUE framework: Chương trình khung / thư viện Vue để làm ứng dụng web interface và các chức năng web

### 7.1) Khái quát về Vue:

Gọi tắt là Vue (phát âm là `/vju:/`{style="color: green"}, giống như view trong tiếng Anh),
Vue.js là một framework linh động (nguyên bản tiếng Anh: progressive - tiệm tiến) dùng để xây dựng giao diện người dùng (user interfaces).
Khác với các framework nguyên khối (monolithic), Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước.
Khi phát triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn.
Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) (thành phần từng file đơn) và các thư viện hỗ trợ,
Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều.

Nếu bạn muốn tìm hiểu thêm về Vue, chúng tôi đã tạo một video clip về những nguyên tắc cốt lõi và một dự án mẫu.

Nếu bạn là một lập trình viên front-end giàu kinh nghiệm và muốn hiểu hơn về tương quan giữa Vue và các thư viện hay framework khác, hãy xem phần So sánh với các framework khác.

Tham khảo:

https://kungfutech.edu.vn/posts/tong-quan-ve-vue-3-cho-nguoi-moi-bat-dau-va-uu-nhuoc-diem-cua-vue-3

### 7.2) Web chính thức Official của VUE3:
- (English) https://vuejs.org/api/application.html

- (English) https://vuejs.org/api/composition-api-setup.html

- (Tiếng Việt dịch) https://vuejs-org.translate.goog/api/application.html?_x_tr_sl=en&_x_tr_tl=vi&_x_tr_hl=en&_x_tr_pto=wapp

https://vi.vuejs.org/v2/guide/ cái hướng dẫn này dành cho Vue2 thôi, đọc chơi cho hiểu về Vue, chớ ưu tiên là ưu tiên học Vue3

Vue 3 là phiên bản mới nhất của framework JavaScript phổ biến Vue.js, được thiết kế để xây dựng giao diện người dùng và ứng dụng một trang (SPA).
Phiên bản này mang lại nhiều cải tiến và tính năng mới so với Vue 2, hứa hẹn sẽ cải thiện hiệu suất, khả năng mở rộng và trải nghiệm phát triển.
Dưới đây là tổng quan về Vue 3 cho người mới bắt đầu, cùng với các ưu và nhược điểm của nó.

Composition API là một trong những tính năng đáng chú ý nhất của Vue 3, cho phép các nhà phát triển tổ chức mã theo logic thay vì dựa trên các tùy chọn đối tượng. Điều này làm cho mã dễ tái sử dụng và bảo trì hơn. Ví dụ, bạn có thể tạo ra các hàm riêng biệt để xử lý logic nghiệp vụ, sau đó tái sử dụng chúng trong nhiều thành phần khác nhau.

Improved Reactivity System

Vue 3 giới thiệu hệ thống phản ứng cải tiến, sử dụng Proxies thay vì Object.defineProperty, cho phép Vue theo dõi các thay đổi trên các đối tượng lồng nhau một cách hiệu quả hơn.

**Ưu điểm của Vue 3**

  Hiệu suất tốt hơn: Vue 3 nhẹ hơn và nhanh hơn Vue 2 nhờ vào cơ chế phản ứng cải tiến và cây ảo (Virtual DOM) tối ưu hơn.

  Khả năng mở rộng cao: Composition API và multiple root elements làm cho Vue 3 linh hoạt hơn trong việc xây dựng các ứng dụng phức tạp.

  Hỗ trợ TypeScript tốt hơn: Vue 3 được thiết kế để tương thích tốt hơn với TypeScript, mang lại trải nghiệm phát triển mạnh mẽ hơn cho các nhà phát triển sử dụng TypeScript.

**Nhược điểm của Vue 3**

  Con đường học tập: Những người mới làm quen với Vue có thể thấy khó khăn khi tiếp cận với các khái niệm như Composition API.

  Cộng đồng và tài nguyên: Mặc dù Vue 3 đang ngày càng phổ biến, nhưng số lượng tài nguyên và thư viện hỗ trợ vẫn còn ít hơn so với Vue 2.

  Cần cập nhật: Các dự án hiện tại sử dụng Vue 2 có thể cần phải cập nhật và thích ứng với các API mới của Vue 3, điều này có thể đòi hỏi công sức và thời gian đáng kể.

  Vue 3 mang lại nhiều cải tiến đáng kể so với phiên bản trước, làm cho nó trở thành một lựa chọn hấp dẫn cho cả các dự án mới và việc nâng cấp các ứng dụng hiện tại. Tuy nhiên, như mọi công nghệ mới, nó cũng đòi hỏi sự đầu tư thời gian để học hỏi và thích nghi.

Khoá học vue3 tiếng Việt trên youtube:
::IVideo
---
embed-url: https://youtu.be/Vg9n_YRGPIY?si=ANmrE_RhBOc094B8
thumbnail-url: https://img.youtube.com/vi/Vg9n_YRGPIY/hqdefault.jpg
title: Khoá học Vue3 trên Youtube
video-id: Vg9n_YRGPIY
---
::

### 7.3) Vue Learning experience: Những kinh nghiệm đúc kết trong quá trình học & dợt Vue 1 tuần qua:

  Vue: directives: từ khoá chỉ thị: (`v-if`{style="color: green"}, `v-for`{style="color: green"}, `v-model`{style="color: green"})

  Vue data binding: gắn và truyền dữ liệu: (với dấu : , ví dụ: `:income`{style="color: green"} , gắn và truyền dữ liệu giữa các components - các thành tố của ứng dụng web),

  Vue event handler: cách xử lý sự kiện: (với dấu `@`{style="color: green"} , các sự kiện người dùng tương tác: `onClick`{style="color: green"}, `onKeyPressed`{style="color: green"}, `onBlur`{style="color: green"} và các hàm handlers để xử lý cho các sự kiện đó) - thêm nội dung và ví dụ

## 8) Tham khảo thêm:

1. ### Testplay/Dợt/Vọc chơi thử với các built-in-directives của Vue3
    [INTERACTIVE PLAYGROUND: built-in-directives](https://vuejs.org/api/built-in-directives.html)
    [Vue3 playground](https://vuejs.org/play/#code/C4TwDgpgBAMw)
    [Vue3 playcode](https://playcode.io/vue)

2. ### Video: Javascript ES6 Features
<iVideo
  embed-url="https://www.youtube.com/embed/VeNfHj6MhgA"
  video-id="VeNfHj6MhgA"
  thumbnail-url="https://img.youtube.com/vi/VeNfHj6MhgA/hqdefault.jpg"
  title="Javascript ES6 Features"
/>

3. ### Video: Typescript Crash Course
https://youtu.be/BCg4U1FzODs?si=ZTF9oSAWs6f5OMHD

4. ### Video: Học Typescript cấp tốc
https://www.youtube.com/watch?v=8pzeG4yjRqs

4. ### Video: Admin Dashboard From Scratch - Next.js, TypeScript, Shadcn/ui
https://www.youtube.com/watch?v=hhudoSMM0yU

5. ### Video: Freelance Web Developer Roadmap
https://www.youtube.com/watch?v=PoFkd42WvQA

6. ### Video: Full Stack JavaScript Developer Roadmap 2025
https://www.youtube.com/watch?v=ZDRZvFNK-ek

7. ### Video: React Native Crash Course+ | Build a Mobile App In 3 Hours
https://www.youtube.com/watch?v=bCpFbERgj7s

<!-- Markdeep: --><style class="fallback">body{visibility:hidden;white-space:pre;font-family:monospace}</style><script src="markdeep.min.js" charset="utf-8"></script><script src="https://casual-effects.com/markdeep/latest/markdeep.min.js" charset="utf-8"></script><script>window.alreadyProcessedMarkdeep||(document.body.style.visibility="visible")</script>