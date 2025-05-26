I/ Ba thành phần của ngành phát triển ứng dụng - Web application development fundamentals consist of 3 building blocks :

In a nutshell, a website / web app is like the combo of HTML, CSS and Javascript that look like the picture below, vắn tắt trang web hay ứng dụng web gồm có 3 thành phần sau: HTML, CSS và Javascript (JS), hình dung như hình, và thành phần thứ tư đó là dữ liệu (thường được cung cấp từ database - nguồn dữ liệu hay còn gọi là cơ sở dữ liệu và được xử lý bởi backend server - máy chủ):

A website has four parts, HTML, CSS, JS, and data.

A very computer science-y answer would be: data is things like "strings", integers (42), objects ({ pizza: true }), etc.

## HTML: Hypertext Markedup Language: ngôn ngữ HTML để viết trang web, ví dụ trang index.html chứa các thẻ căn bản khai báo cho trang web

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<link rel="icon" href="/favicon.ico">

<link rel="stylesheet" href="styles.css"> // thêm file style CSS vào trong web/app

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Expense Tracker</title>

</head>

<body>

<div id="app"></div>

<script type="module" src="/src/main.js"></script> trỏ tới file code Javascript để thực thi các chức năng của web/app bao gồm hiển thị và thao tác xuất, lưu, cập nhật dữ liệu

</body>

</html>

## 2) Cascading Style Sheets (CSS):

is a stylesheet language used to describe the presentation of a document written in HTML or XML

CSS cho phép kiểm soát cách trình bày các yếu tố HTML gồm màu sắc, phông chữ, bố cục, hiệu ứng,… Trang web nếu không có CSS có thể sẽ rất nhàm chán, khó đọc, khó truy cập và không hiệu quả. Nắm vững kiến thức và sử dụng thành thạo CSS giúp Front end Developer tạo ra các website đẹp mắt, thu hút và dễ sử dụng.

https://200lab.io/blog/css-la-gi/

https://itviec.com/blog/css-la-gi/

## 3) Javascript / Typescript:

3.1) Javascript: là gì:

https://aws.amazon.com/vi/what-is/javascript/ (có giải thích tiếng Việt)

Official Web for Javascript tài liệu chính thức của Javascript (MDN - Mozilla developer network) https://developer.mozilla.org/en-US/docs/Web/JavaScript

JavaScript là ngôn ngữ lập trình được nhà phát triển sử dụng để tạo trang web tương tác. Từ làm mới bảng tin trên trang mạng xã hội đến hiển thị hình ảnh động và bản đồ tương tác, các chức năng của JavaScript có thể cải thiện trải nghiệm người dùng của trang web. Là ngôn ngữ kịch bản phía máy khách, JavaScript là một trong những công nghệ cốt lõi của World Wide Web. Ví dụ: khi duyệt internet, bất cứ khi nào bạn thấy quảng cáo quay vòng dạng hình ảnh, menu thả xuống nhấp để hiển thị hoặc màu sắc phần tử thay đổi động trên trang web cũng chính là lúc bạn thấy các hiệu ứng của JavaScript.

Videos học Javascript:

dạyNgheIT: www.youtube.com/watch?v=dmSsjByhPBg&list=PL28Ap55o84DTu8qRGXpvyBcKYUGfVFxy9

thầy Traversy: youtu.be/hdI2bqOjy3c?si=qTu4JnX9NjYBTPAi

3.2 Typescript là gì

TypeScript là một ngôn ngữ lập trình mã nguồn mở phát triển bởi Microsoft. Nó được phát triển dựa trên JavaScript, nhưng bổ sung thêm tính năng kiểu tĩnh (static typing) và một số tính năng nâng cao khác. TypeScript cho phép lập trình viên viết mã JavaScript theo cú pháp của TypeScript, sau đó mã đó có thể được biên dịch (transpile) thành mã JavaScript thuần để chạy trên các trình duyệt hoặc môi trường chạy JavaScript khác nhau.

Việc sử dụng kiểu tĩnh trong TypeScript giúp giảm thiểu lỗi trong quá trình phát triển và tăng khả năng tái sử dụng mã. Nó cung cấp kiểm tra kiểu tại thời điểm biên dịch, cho phép phát hiện và sửa lỗi kiểu trước khi chạy chương trình. Điều này giúp cung cấp trải nghiệm phát triển ổn định hơn và tăng hiệu suất trong quá trình phát triển ứng dụng lớn.

TypeScript được sử dụng rộng rãi trong các dự án phát triển web và ứng dụng di động. Nó tích hợp tốt với các framework phổ biến như Angular, React và Node.js, và có một cộng đồng lớn và năng động.

Tham khảo:

https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html

https://bootcamp.uxdesign.cc/mastering-typescript-10-essential-features-for-writing-better-code-c89719d6dcc7

https://fptshop.com.vn/tin-tuc/danh-gia/typescript-168823

4) Các thư viện để viết ứng dụng web (web app) - frameworks and libraries to build web app:

Vue 3, React, Angular

để làm (build) mobile app (ứng dụng chạy trên điện thoại Android, iphone iOS) : React Native

để làm (build) desktop app (ứng dụng chạy trên OS: Windows, Mac) : Electron

II/ Data types - Các kiểu dữ liệu:

Từ khoá để khai báo variable / biến: let và const, giờ rất ít dùng var

Khai báo biến dùng 'let', khai báo hằng dùng const

Khai báo array/object có thể dùng let / const

II. 1/ PRIMITIVE DATA TYPES: các kiểu dữ liệu đơn, thuần tuý

Kiểu chuỗi: string

ví dụ: let name = 'John'

let ten = 'An'

khai báo biến name với giá trị tên John, và biến ten với giá trị An

2) Kiểu số: number

ví dụ: let pi = 3.14

let thue = 0.1

Khai báo biến pi với giá trị 3.14, và biến thue với giá trị 0.1 ( ~ 10%)

3) Kiểu mệnh đề Đúng/Sai : Boolean

ví dụ: let tren18tuoi = true

let coBangLai = false

Khai báo biến tren18tuoi với giá trị true - đúng, và biến coBangLai với giá trị false - sai

II. 2/ NON-PRIMITIVE DATA TYPES: các kiểu dữ liệu phức hợp (không thuần tuý):

4) Kiểu mảng - Array:

Mảng chứa các phần tử (elements), mỗi phần tử (element) có thể là thuộc một trong đa dạng các kiểu dữ liệu thuần (primitive data type kể trên).

ví dụ: mảng gồm các phần tử số , xét dãy số sau :

let dayso = [1, 2, 3]

trong Typescript (có type) sẽ ghi là: let dayso: number[ ] = [1, 2, 3] ý chỉ dayso là mảng các phần tử kiểu số (array of number-type element)

mảng gồm các phần tử kiểu chuỗi (array of elements of string data type)

let thethao = ['da banh', 'cau long', 'quan vot']

trong Typescript (có type) sẽ ghi là: let thethao: string[ ] = ['da banh', 'cau long', 'quan vot'] ý chỉ thethao là mảng các phần tử kiểu chuỗi (array of string-type element)

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

5) Kiểu đối tượng hay còn gọi dễ hiểu là kiểu phức hợp vì nó có thể bao gồm các giá trị (property value) đa dạng cho các thuộc tính (property)

(đối tượng tiếng anh gọi là Object, ví dụ đối tượng cá thể, vật thể,...):

ví dụ: đối tượng sinh viên với tên biến là studentObject, có thể đặt tên biến tuỳ ý (sinhVien, doituongSinhVien, NhanVien)

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

mỗi thuộc tính là 1 cặp key-value pair. Như vậy ten (key) và 'An' (value) là một cặp thuộc tính và giá trị thuộc tính. Các cặp key-value pairs ở studentObject là ten: 'An', tuoi: 30, và ngaysinh: '06/30/1994', vân..vân..

Giá trị thuộc tính có thể là chuỗi (thuộc kiểu dữ liệu chuỗi: string), hoặc số (thuộc kiểu dữ liệu số: number), hoặc ngày tháng (thuộc kiểu dữ liệu ngày tháng: Date | DateTime | Time ) , hoặc mảng (thuộc kiểu dữ liệu mảng: array, ví dụ ['xem phim', 'nghe nhac', 'choi the thao'] cho thuộc tính sothich - sở thích), hoặc kiểu đúng/sai boolean ví dụ dangHoc là thuộc tính boolean ý chỉ sinh viên còn đang học hay đã ra trường,

hoặc kiểu dữ liệu phức hợp như courses có giá trị là 1 array (mảng) gồm những objects (đối tượng) bên trong.

III/ Basic looping methods in Javascript : Các vòng lặp phổ biến trong lập trình

For... Loop: Vòng lặp for

For ... In: Tự tham khảo thêm

For ... Of: Tự tham khảo thêm

While... Loop

Do ... While

Recursive - Recursion : Đệ quy: Tự tham khảo thêm

https://funix.edu.vn/chia-se-kien-thuc/cac-loai-vong-lap-trong-javascript/

https://viblo.asia/p/cac-loai-vong-lap-trong-javascript-07LKXp82KV4

https://viblo.asia/p/recursive-function-in-javascript-WrJvYXKRkVO

https://niithanoi.edu.vn/recursion-trong-javascript.html

IV/ Javascript native methods - Các hàm tự nhiên trong Javascript

## String prototype & functions: Kiểu mẫu String và các hàm thao tác chuỗi ký tự

let ten = '    Ngoc   '

let tenMoi = ten.trim()   - hàm trim, trim (xoá) các ký tự trống, output: kết quả của biến tenMoi là 'Ngoc'

tenMoi.toUpperCase() - hàm toUpperCase, output ra kết quả: 'NGOC'

let income = '10'

để biến giá trị thành số - string '10' thì có nhiều cách làm, ví dụ trong Vue:

+income

các cách khác income.toString() , income.toNumber()

## 2) Array prototype functions: Kiểu mẫu Array - mảng và các hàm xử lý mảng

Các hàm thao tác với dự liệu kiểu Array trong Javascript

array.map : vòng lặp

array.filter

array.sort

array.toSorted

array.reduce

Tham khảo:

https://anhdangcode.com/post/so-sanh-khac-nhau-giua-function-map-va-foreach-trong-javascript

https://codegym.vn/blog/tong-hop-4-ham-xu-ly-array-trong-javascript/

web chính thức: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

liên hệ tới bài học: rút trích, sắp xếp và thao tác danh sách nhân viên đã dạy

## 3) Object prototype functions: Các hàm thao tác với dự liệu kiểu Object trong Javascript

ví dụ:

let studentObject = {

name: 'An',

age: 30,

dob: '06/30/1994'

}

3.1) Referencing the property value of an object: Cách gọi thuộc tính

studentObject.name // An

studentObject.age // 30

let car = {

modal : "Lexus",

type: "500",

color: "White"

};

car.modal // Lexus

car.type // 500

car.color // White

3.2) Assign new property for the studentObject: gán thuộc tính (property) mới vào trong studentObject:

studentObject.email = 'annguyen@gmail.com'

studentObject.key = 'value'   -> thuộc tính (property) và giá trị của thuộc tính (property value) còn được hiểu là 1 cặp key-value pair (pair tiếng Anh là 1 cặp, ví dụ: a pair of shoes, a pair of jeans)

3.3) Xoá thuộc tính khỏi studentObject:

delete studentObject.age   --> dòng lệnh này sẽ xoá thuộc tính tuổi khỏi đối tượng sinh viên

Tham khảo thêm về Object

https://kungfutech.edu.vn/bai-viet/javascript/object-la-gi-object-trong-javascript

https://codelearn.io/sharing/object-trong-javascript

https://viblo.asia/p/doi-tuong-object-trong-javascript-63vKjn6dK2R

V/ Event handler & Event listener in Javascript - Event handler & & Event listener trong Javascript

các sự kiện người dùng tương tác: onClick, onKeyPressed, onBlur, onMouseOver, và các hàm handlers để xử lý cho các sự kiện đó

## 1) Event handler: (hàm xử lý sự kiện)

Ví dụ:

const button = document.querySelector(".btn")

button.onclick = function() {

console.log("Hello!");

};

// OR using Javascript one-liners make you look like a pro

button.onclick = () => {console.log("Hello!")};

Trong ví dụ này, thuộc tính onclick được sử dụng để khi người dùng nhấp vào button, nó sẽ in ra dòng chữ "Xin chào!" vào console log.
Thuộc tính "onclick" chỉ là một trong những EventHandlercó thể sử dụng được thôi. Dước đây là một số thuộc tính thông dụng có thể dùng.

## 2) Event Listener

Bằng cách thêm event listener (xài hàm addEventListener để gắn hàm event handler vào - hàm xử lý sự kiện tương tác của người dùng) vào một đối tượng, chúng ta có thể bắt được một loạt các sự kiện do người dùng hoặc trình duyệt tạo ra.

const button = document.querySelector(".btn")

button.addEventListener("click", function(event) {

console.log("Hello!");

})

// OR using Javascript one-liners

button.addEventListener("click", event => console.log("Hello!"))

Thay vì dùng thuộc tính onclick, thì ở đây mình dùng method addEventListener():

target.addEventListener(event, function, useCapture);

Tham khảo:

https://www.w3schools.com/js/js_events.asp

https://www.w3schools.com/js/js_htmldom_eventlistener.asp

https://viblo.asia/p/javascript-event-handlers-va-event-listeners-RQqKLb1rl7z

VI/ Javascript ES6 (version 2015) features

Các tính năng của phiên bản Javascript ES6  (2015) Google & để links các trang tham khảo để ac học thêm:

https://codegym.vn/blog/es6-la-gi/

tài liệu video:

https://youtu.be/JVqPDKFMhZc?si=mQDqmW71E2dLlkch

VII/ VUE framework: Chương trình khung / thư viện Vue để làm ứng dụng web interface và các chức năng web

1) Khái quát về Vue:

Gọi tắt là Vue (phát âm là /vjuː/, giống như view trong tiếng Anh), Vue.js là một framework linh động (nguyên bản tiếng Anh: progressive – tiệm tiến) dùng để xây dựng giao diện người dùng (user interfaces). Khác với các framework nguyên khối (monolithic), Vue được thiết kế từ đầu theo hướng cho phép và khuyến khích việc phát triển ứng dụng theo từng bước. Khi phát triển lớp giao diện (view layer), người dùng chỉ cần dùng thư viện lõi (core library) của Vue, vốn rất dễ học và tích hợp với các thư viện hoặc dự án có sẵn. Cùng lúc đó, nếu kết hợp với những kĩ thuật hiện đại như SFC (single file components) (thành phần từng file đơn) và các thư viện hỗ trợ, Vue cũng đáp ứng được dễ dàng nhu cầu xây dựng những ứng dụng một trang (SPA - Single-Page Applications) với độ phức tạp cao hơn nhiều.

Nếu bạn muốn tìm hiểu thêm về Vue, chúng tôi đã tạo một video clip về những nguyên tắc cốt lõi và một dự án mẫu.

Nếu bạn là một lập trình viên front-end giàu kinh nghiệm và muốn hiểu hơn về tương quan giữa Vue và các thư viện hay framework khác, hãy xem phần So sánh với các framework khác.

Tham khảo:

https://kungfutech.edu.vn/posts/tong-quan-ve-vue-3-cho-nguoi-moi-bat-dau-va-uu-nhuoc-diem-cua-vue-3

Web chính của VUE3:

https://vuejs.org/api/application.html

https://vuejs.org/api/composition-api-setup.html

https://vi.vuejs.org/v2/guide/ cái hướng dẫn này dành cho Vue2 thôi, đọc chơi cho hiểu về Vue, chớ ưu tiên là ưu tiên học Vue3

Vue 3 là phiên bản mới nhất của framework JavaScript phổ biến Vue.js, được thiết kế để xây dựng giao diện người dùng và ứng dụng một trang (SPA). Phiên bản này mang lại nhiều cải tiến và tính năng mới so với Vue 2, hứa hẹn sẽ cải thiện hiệu suất, khả năng mở rộng và trải nghiệm phát triển. Dưới đây là tổng quan về Vue 3 cho người mới bắt đầu, cùng với các ưu và nhược điểm của nó.

Composition API là một trong những tính năng đáng chú ý nhất của Vue 3, cho phép các nhà phát triển tổ chức mã theo logic thay vì dựa trên các tùy chọn đối tượng. Điều này làm cho mã dễ tái sử dụng và bảo trì hơn. Ví dụ, bạn có thể tạo ra các hàm riêng biệt để xử lý logic nghiệp vụ, sau đó tái sử dụng chúng trong nhiều thành phần khác nhau.

Improved Reactivity System

Vue 3 giới thiệu hệ thống phản ứng cải tiến, sử dụng Proxies thay vì Object.defineProperty, cho phép Vue theo dõi các thay đổi trên các đối tượng lồng nhau một cách hiệu quả hơn.

Ưu điểm của Vue 3

Hiệu suất tốt hơn: Vue 3 nhẹ hơn và nhanh hơn Vue 2 nhờ vào cơ chế phản ứng cải tiến và cây ảo (Virtual DOM) tối ưu hơn.

Khả năng mở rộng cao: Composition API và multiple root elements làm cho Vue 3 linh hoạt hơn trong việc xây dựng các ứng dụng phức tạp.

Hỗ trợ TypeScript tốt hơn: Vue 3 được thiết kế để tương thích tốt hơn với TypeScript, mang lại trải nghiệm phát triển mạnh mẽ hơn cho các nhà phát triển sử dụng TypeScript.

Nhược điểm của Vue 3

Con đường học tập: Những người mới làm quen với Vue có thể thấy khó khăn khi tiếp cận với các khái niệm như Composition API.

Cộng đồng và tài nguyên: Mặc dù Vue 3 đang ngày càng phổ biến, nhưng số lượng tài nguyên và thư viện hỗ trợ vẫn còn ít hơn so với Vue 2.

Cần cập nhật: Các dự án hiện tại sử dụng Vue 2 có thể cần phải cập nhật và thích ứng với các API mới của Vue 3, điều này có thể đòi hỏi công sức và thời gian đáng kể.

Vue 3 mang lại nhiều cải tiến đáng kể so với phiên bản trước, làm cho nó trở thành một lựa chọn hấp dẫn cho cả các dự án mới và việc nâng cấp các ứng dụng hiện tại. Tuy nhiên, như mọi công nghệ mới, nó cũng đòi hỏi sự đầu tư thời gian để học hỏi và thích nghi.

Khoá học vue3 trên youtube: https://www.youtube.com/playlist?list=PLwJIrGynFq9B_BQJZJi-ikWDDkYKVUpM5

2) Vue Learning experience: Những kinh nghiệm đúc kết trong quá trình học & dợt Vue 1 tuần qua:

Vue: directives: từ khoá chỉ thị: (v-if, v-for, v-model)

Vue data binding: gắn và truyền dữ liệu: (với dấu : , ví dụ: :income  , gắn và truyền dữ liệu giữa các components - các thành tố của ứng dụng web),

Vue event handler: cách xử lý sự kiện: (với dấu @ , các sự kiện người dùng tương tác: onClick, onKeyPressed, onBlur và các hàm handlers để xử lý cho các sự kiện đó) - thêm nội dung và ví dụ

Tham khảo:

https://vuejs.org/api/built-in-directives.html

youtu.be/VeNfHj6MhgA?si=5--QI3-uOHqLPLvd