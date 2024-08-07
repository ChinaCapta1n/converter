// number string boolean null undefined symbol bigint object
let str = 'hello';

// any 类型
let a: any = 'aaa';

// 字面量类型
// 声明时是什么类型就是什么类型
const b = 'abc'; // abc类型
const c = null; // null类型

let d: 'world';
d = 'world';  // 只能给world


// 一些情况下，一个值可能是多种类型
// 联合类型
let v1: string | number;
v1 = 'abc';
v1 = 123;

let v2: '男' | '女';
v2 = '男';


// ========= 数组类型 =========
// 两种表示方式
// 类型[]
// Array<类型>
// 空数组赋值，在strict严格检查下，默认是any类型
const arr1: string[] = ['a', 'b'];
const arr2: Array<number> = [1, 2, 3];
// 数组也能用联合类型
const arr3: (string | number)[] = [1, 'a'];
const arr4: Array<string | number> = [1, 'b'];
const arr5: string[] | number[] = [1, 2, 3];



// ========= 元组类型 =========
// 也是一种数组，只是规定得更加具体
const tuple1: [string, number] = ['a', 1]; // 顺序必须是string、number，并且只有这两个值
// 使用场景：坐标
let position: [number, number] = [34.123, 54.2113];
// 一个容易混淆的情况
let tuple2: [] = []; // 这个是空元组，不是空数组