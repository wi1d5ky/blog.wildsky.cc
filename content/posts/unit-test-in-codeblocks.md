---
title: 在 Code::Blocks 開開心心 Unit Test
date: 2015-11-01T00:00:00+08:00
categories:
  - 資工
tags:
  - unit test
  - C-sharp
---

最近軟體工程在教單元測試（Unit Test），可是因為老師是 C# 聖戰士，
所以我們學的就是用 Visual Studio 的內建測試來測 C#，但我又不寫 C#！！
於是乎，這兩個禮拜就瘋狂地在網路上搜尋，但都沒有收穫（或是我太弱了看不懂QwQ），
後來終於在 Facebook 看到 <http://www.github.com/aigecko/>師大貓耳控</a> 學長的動態：

> 專題好像愈改愈炸
> 效能更慘還多了BUG
> 於是把軟工的Google Test拿了出來用用看
> 先把專案的link和search path設定好
>
> 然後define一個標籤讓main可以跑不同模式
> 可以只執行程式也可以只跑單元測試
> 不然BUG有夠難抓
> 就算有git可以幫忙倒帶還是很靠北

其實他在抱怨什麼我完全沒看，但看到單元測試這四個字我就欣喜若狂，
立刻向他請教「如何在 Code:Blocks」上跑單元測試的方法，
因此這篇文章就誕生了！

## 正文

#### 下載 & 建置 Gmock

首先，先去下載 Gmock 最新版：<https://code.google.com/p/googlemock/downloads/list>
然後把他解壓縮到桌面，開啟 Terminal，前往該目錄底下，輸入下面的指令

`./configure`

他會開始跑東西，跑完後輸入

`make`
如果沒有錯誤，那最最基本的步驟就完成了！

#### 專案設定

開啟 code:blocks，新增一個新專案（姑且稱之為 runTest），接著到左邊的 icon 上按右鍵，選擇 Build options&#8230; ，
將位於跳出的視窗上方的 tab 切換到 Linker setting，進行如下的設定（注意相對位置），
我是習慣將 Gmock 資料夾放在專案的上層目錄，所以相對路徑會這樣，你可以自行更動。

![Code:Blocks Linker setting](//wildsky.cc/blog-images/2015-11-01-01-55-51-的螢幕擷圖-1024x576.png)

接著，Tab 切換到 Search directories，加入下面的位置，一樣要注意相對目錄。

![Code:Blocks Search directories - Compiler](//wildsky.cc/blog-images/2015-11-01-01-13-10-的螢幕擷圖-1024x576.png)

Sub-tab 切換到 Linker 一樣進行設定。

![Code:Blocks Search directories - Linker](//wildsky.cc/blog-images/2015-11-01-01-13-12-的螢幕擷圖-1024x576.png)

這樣環境就差不多設定完成了！

#### 跑第一次測試

新增一個 main.cpp 檔，內容輸入如下：
```
#include &lt;stdio.h&gt;
#define TEST_MODE 1
#if TEST_MODE==1
#include "gmock/gmock.h"
#include "gtest/gtest.h"
#include "Test.h"
#endif // TEST_MODE

#if TEST_MODE==1
int main(int argc,char **argv){
  ::testing::InitGoogleTest(&argc, argv);
  return RUN_ALL_TESTS();

#else
  int main(){
    #endif // TEST_MODE
    printf("Run Test!\n");
    return 0;
  }

#include "gmock/gmock.h"
#include "gtest/gtest.h"
class Happy : public ::testing::Test{};
TEST_F(Happy,UnitTest){
  EXPECT_EQ(1,1);
  EXPECT_EQ(1,0);
}
```

這時，按下 F9 就會跑測試了！！為了讓測試是真的有效，我就給了兩個最明顯的測試，1 == 1 以及 1 == 0，所以 run 出來的結果會有一個成功一個失敗，如下圖：

![Running First Test](//wildsky.cc/blog-images/2015-11-01-13-47-48-的螢幕擷圖.png)

這樣就成功跑測試了！如果要測自己寫的 class 的方法，就直接像一般的專案那樣，在 test.h 中 include 要測的檔案，然後在 EXPECT_EQ 中輸入該輸入東西，
因為我也是昨天才建起這個環境的，所以還需要一點時間來摸熟，如果想知道更多可以去翻翻 Gmock 的文件。

話說有一點網路上都沒有提到：如果想要正常建置，只要在 main.cpp 裡面的第 2 行把 `#define TEST_MODE 1`

## 後話

最近在讀〈學徒模式〉這本書，書中提到的「詢問身邊的專家」模式真的很好用 😀

大家有空可以去買來讀讀。

## 相關連結

- 師大貓耳控：<http://www.github.com/aigecko/>
- gmock：<https://code.google.com/p/googlemock/>
- 我的完整專案目錄：<https://www.dropbox.com/s/6mnfw18cfemv0k4/runTest.zip?dl=1>
- 學徒模式－優秀軟體開發者的養成之路：<http://www.tenlong.com.tw/items/986276256X?item_id=338410>
