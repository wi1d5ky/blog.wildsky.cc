---
title: "讀「我知道你懂 hoisting，可是你了解到多深？」後"
date: 2018-11-11T14:07:41+08:00
draft: false
categories:
  - Web
tags:
  - note
  - f2e
  - JavaScript
---

最近讀了海總的《本末倒置的閱讀習慣》，發現自己也有這個壞習慣。
想要來好好地注意這個問題，避免只砸時間在不用細讀的文章。

剛好小蟹貼了這篇
[《我知道你懂 hoisting，可是你了解到多深？》](我知道你懂 hoisting，可是你了解到多深？)
給我，便決定在舒服的假日午後好好地閱讀一下。
這篇文章就是在記錄自己閱讀過程中的 murmur，順便摘一下，
略微地希望可以替未來的自己省下重新閱讀的時間。

文中列了十個理解程度：

1. 你知道什麼是 hoisting
2. 你知道 hoisting 只會提升宣告而非賦值
3. 你知道 function 宣告、function 的參數以及一般變數宣告同時出現時的提升優先順序
4. 你知道 let 跟 const 沒有 hoisting
5. 你知道第五點是錯的，其實有但只是表現形式不一樣
6. 你知道有關第六點，有個概念叫做 TDZ（Temporal Dead Zone）
7. 你看過 ES3 的規格書，知道裡面是怎麼描述的
8. 你看過 ES6 的規格書，知道裡面是怎麼描述的
9. 你知道 hoisting 背後的原理是什麼
10. 你看過 V8 編譯出來的程式碼

看完文章後，除了 8, 10 之外，我這次應該都有完全吸收，這兩個問題可能需要自己去讀過、跑過、
親身嘗試過才會吸收得更深刻。

## hoisting 的規則

> 1. 變數宣告跟函式宣告都會提升，函式宣告較優先
> 2. 只有宣告會提升，賦值不會提升
> 3. 別忘了函式裡面還有傳進來的參數，會在提升後賦值

讀完這邊就讓我想起之前在 function 中跑預設值處理時，
輸出有點怪怪的，看到這邊文就可以理解規則，並知道「怪」出現的原因，
實際運作的原理還要再往後讀。

不過在講原理之前，會先問這兩個問題：

> 1. 為什麼我們需要 hoisting？
> 2. Hoisting 到底是怎麼運作的？

## 1. 為什麼我們需要 hoisting？

簡單說就是想要兩個東西：

1. mutual recursion
2. avoid painful bottom-up ML-like order

第二個還不太懂是什麼，打算先記下來，之後再去查。

ref: <https://twitter.com/wildskyf/status/1061511004708790272>

## 2. Hoisting 到底是怎麼運作的？

運作原理是，在跑程式的時候後面會有 Execution Context 記錄該 scope 下的相關資訊，
會用一個叫做 Variable Object（簡稱 VO）的東西去記錄。

在跑程式的時候，其實主要也就是「取值」與「賦值」這兩件事，只要配合 VO 的規則就可以學
起來了。這邊是運作的順序：

> 1. 把參數放到 VO 裡面並設定好值，傳什麼進來就是什麼，沒有值的設成 undefined
> 2. 把 function 宣告放到 VO 裡，如果已經有同名的就覆蓋掉
> 3. 把變數宣告放到 VO 裡，如果已經有同名的則忽略（跳過宣告）

接著會講編譯器與直譯器的事，以解答「JS 不是直譯的嗎？為什麼可以做到提升？」的疑惑。

## JS 怎麼做到 hoisting？

其實只要破除「JS 是直譯語言」這句話所產生的誤解，知道「語言歸語言，實作歸實作」就可以解惑。

> 語言一般只會定義抽象語義，不會強制用某種方式實現，像是 C 我們會說它是編譯型語言，可是 C 也有直譯器。所以當我們在說某種程式語言是直譯或編譯型的時候，其實是在指涉「大多數」而不是全部。

> 很多種直譯器內部的運作方式都是先把原始碼編譯成某種中間碼再去執行，所以編譯這個步驟還是很常見的，而 JS 也是這樣運作的。

有了這個觀念就可以把 JS 的底層理解建立起來，
未來遇到問題先有這個底的話，應該會更容易豁然開朗。

後面還講了 Temporal Dead Zone：

> let 與 const 確實有 hoisting，與 var 的差別在於提升之後，
var 宣告的變數會被初始化為 undefined，
而 let 與 const 的宣告不會被初始化為 undefined，
而且如果你在「賦值之前」就存取它，就會拋出錯誤。

TDZ 就是會拋出錯誤的那段「時間」。（這裡的 Zone 是執行的時間順序，不是程式碼順序）

## V8 程式碼的實作

然後最後面有點不意外地，又講到 V8 😂 因為作者好奇「V8 編譯出來的程式碼到底長怎樣？」

作者很細心地把 bytecode 編出來，並加上註解，細看可以知道 hoisting 在 V8 中到底是如何運作的。

然後就會覺得作者真是太硬派了。我承認這段我只有草草地看過去，也許要到未來想讀原
始碼的時候才會去看。

## 結語

> JavaScript 常考的幾個點大家都耳熟能詳：
this、prototype、clousre 跟 hoisting，而這幾個看似不相關的東西，
其實只要你能理解 JavaScript 背後的運作模型，都能夠多少串得起來，成為一個完整的理論。

我現在還停在「知道他們是什麼」的階段，看來之後要細細地去一個一個抓出來理解一下。
把他們的規則和運作原理幫在一起通通懂一輪，才能在有朝一日十分有信心地說出「我懂 JS」。

## 原文提到的延伸閱讀

- [虚拟机随谈（一）：解释器，树遍历解释器，基于栈与基于寄存器，大杂烩](http://rednaxelafx.iteye.com/blog/492667)
- [ECMA-262-5 in detail. Chapter 3.2. Lexical environments: ECMAScript implementation.](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-2-lexical-environments-ecmascript-implementation/)
- [JS 作用域](https://github.com/nightn/front-end-plan/blob/master/js/js-scope.md)
- [解读ECMAScript[1]——执行环境、作用域及闭包](https://www.cnblogs.com/leoo2sk/archive/2010/12/19/ecmascript-scope.htm)

## 其他相關連結

- [《我知道你懂 hoisting，可是你了解到多深？》](我知道你懂 hoisting，可是你了解到多深？)
- [海總](https://twitter.com/tzangms/) 的 [《本末倒置的閱讀習慣》](https://tzangms.com/put-the-cart-before-the-horse-reading-habits/)
- [小蟹](http://twitter.com/wildjcrt)
- [本文的 murmur 推文版](https://twitter.com/wildskyf/status/1061511004708790272)

