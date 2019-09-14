---
title: Nunit 3.0.1 not working
date: 2015-12-14T00:00:00+08:00
categories:
  - 資工
tags:
  - NUnit
  - monodevelop
  - C-sharp
  - 踩雷人生
---

I'm using monodevelop to run a project in class, and recently I found that Nunit 3.0.1 make my test not work.

After googling, I finally found a package to slove my problem:

[NUnit TestAdapter including NUnit 2.6.4 framework](https://www.nuget.org/packages/NUnitTestAdapter.WithFramework/)

You can found it in your nuget! It works in Visual Studio and Monodevelop!
