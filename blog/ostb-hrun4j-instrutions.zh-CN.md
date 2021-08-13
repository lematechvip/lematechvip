---
order: 6
title: 【开源hrun4j】又一接口测试利器发布，网友：真香！
group:
  title: 开源共建
nav:
  title: 技术博客
  path: /blog
  order: 3
time: 2021-08-14
---

## ✨关于hrun4j

>`hrun4j`是由`乐马技术`推出的开源一站式接口测试解决方案，它不仅仅只是一个Java版的httprunner，现阶段规划解决方案包括四部分：

1. `hrun4j-core`：框架核心，提供完整的运行机制、数据驱动、多种表达式引擎、多种数据检查机制及测试报告生成（已完成）
2. `hrun4j-plugin`：Intellij Idea插件，赋能研发，插件式集成至IDEA，提供智能补全、快速填充及在线调试运行功能（实现中）
3. `hrun4j-platform`: 官方Web平台，赋能测试，提供完整的API测试生命周期管理（规划中）
4. `hrun4j-sync`: 同步中心，增强研发测试协作，采用双向同步机制，支持研发本地接口文档、用例上传或远程用例下载自测（规划中）

## ✨ 核心特性

1. 支持以`CLI`和`POM`模式集成`hrun4j`能力，如以`POM`模式集成，可以无缝融入Spring 生态链
2. 集成纯粹且优雅的`Okhttps`，即使是复杂场景（比如上传/下载进度控制），它都能轻松搞定
3. 借助`TestNG`实现YML或JSON格式数据驱动、测试用例组织与执行
4. 借助`ReportNG`，生成优雅详细的测试报告
5. 支持多种数据提取方式，比如：`正则表达式/Jsonpath/Jmespath/对象提取`，支持丰富的校验方式，比如：`startsWith/endsWith/equalTo/not/containsString`等
6. 内置强大的表达式引擎，支持`Aviator`和`BeanShell`脚本，借助他们即可轻松实现复杂的动态业务逻辑
7. 测试前后支持完善的`hook`机制
8. 提供强大且贴心CLI工具集，即`瑞士小军刀`，目前支持`har2yml|json`、`viewhar`、`run`、`startproject CLI/POM`、`swagger2api`、`postman2case`
9. 插件式集成至IDEA，提供智能补全、快速填充及在线调试运行功能（实现中）
10. 内置国际化支持，配置`I18N`参数即可轻松切换中英文输出
11. 框架核心实现充分利用JAVA语言特性，把面向对象、继承、设计模式及反射机制发挥淋漓尽致

## 关于项目

### 开源地址

* GitHub开源地址：https://github.com/lematechvip/hrun4j
* Gitee开源地址：https://gitee.com/lematechvip/hrun4j

### 工程划分

工程模块划分如下：
```
├── hrun4j-api: 提供api接口方便扩展成平台（纳入平台规划）
├── hrun4j-cli: 提供命令行支持，支持用例录制，可快速创建脚手架、测试用例集运行及调试（已完成）
├── hrun4j-core: 工程核心模块，提供完整的运行机制、数据驱动、表达式引擎及测试报告生成（已完成）
├── hrun4j-plugins: 插件式集成至IDEA，提供智能补全、快速填充及在线调试运行功能（开发中）
├── hrun4j-test-demo: 常用基本、核心、特殊案例使用说明（已完成）
├── hrun4j-test-server：内置测试服务，基于springboot开发，工程规范标准（已完成）
```

## 框架秀点

### 提供多种方式集成hrun4j能力

提供多种方式集成`hrun4j`能力，分别是`CLI`、`POM`、`API`，其中`API`可细分为：`Idea Plugin`、`Platform`,一期主要集中在`CLI`、`POM`。

1. Command Line即为命令行模式，简称为`CLI`，借助轻量级文本编辑器（Sublime、Editplus）和命令行工具hrun4j.jar即可完成用例编写、编排、执行及报告生成。
2. Maven POM Reference即为POM模式，简称为`POM`，在IDEA下完成用例编写、编排、执行及报告生成，POM模式本质是以MAVEN JAR引入`hrun4j`，从而集成其能力。

### 灵活且强大的数据提取机制

`hrun4j`提供多种响应数据提取方式，支持`正则表达式/Jsonpath/Jmespath/对象提取`

1. `Jsonpath`：可以通过`$.对象.属性`获取，对象即为框架内置对象
2. `正则表达式`：通过正则获取，值必须以`^`开头并以`$`结尾
3. `对象提取`：通过框架提供的内置对象获取,`对象`或者`对象.属性`方式获取
4. `Jmespath`：和方式三类似，但可以支持更复杂的表达式提取，属`Jmespath`专有表达式


### 完善的校验选择器

`hrun4j`是通过反射机制构造`org.hamcrest.Matchers`对象进行断言代码生成的，因此`Matchers`类型所有方法均可以使用，现只支持预期和实际参数断言，方法非常多，列罗常用方法如下：

1. `equalTo`：比较两个对象相同，可缩写成`eq`
2. `startsWith`：某字符串以某某开始
3. `endsWith`：某字符串以某某结束
4. `not`：不相等，可缩写成`ne`
5. `containsString`：某字符串包含某某
6. `lessThan`：小于，可缩写成`lt`
7. `greaterThan`：大于，可缩写成`gt`
8. `lessThanOrEqualTo`：小于或等于，可缩写`le`
9. `greaterThanOrEqualTo`：大于或等于，可缩写成`ge`

更多方法及使用查看`org.hamcrest.Matchers`

### 小巧而细腻的命令行工具集

hrun4j`提供一套完整的命令工具集，统称为`瑞士小军刀`，小巧而细腻，功能又强大。

![-w910](http://cdn.lematech.vip/mweb/16253624957811.jpg)

后期会扩展更多命令行支持。

### 内置强大的表达式引擎

内置强大的表达式引擎，支持Aviator和BeanShell脚本，借助他们即可轻松实现复杂的动态业务逻辑。

1. Aviator 是一门高性能、轻量级寄宿于 JVM 之上的脚本语言，非常轻量级、好使，支持数字、字符串、正则表达式、布尔值、正则表达式等基本类型，完整支持所有 Java 运算符及优先级等，更多用法[这里](https://github.com/killme2008/aviatorscript)
2. BeanShell is dynamically interpreted Java, plus a scripting language and flexible environment all rolled into one clean package，更多用法[这里](https://beanshell.github.io/)

关于表达式使用，在实际接口测试过程中有很多的业务场景需要进行动态运算或者业务定制化功能开发。如果框架只支持简单数据报文发送、接收以及结果校验，远远无法解决问题，因此需要引入表达式的支持。`hrun4j`支持Aviator和BeanShell脚本，使用方法非常简单：`${Aviator表达式内容|内置方法}`，更多用法参考：更多用法[这里](https://www.lematech.vip/docs/react/level-up-cn)


### 丰富的内置属性

### 内置对象
框架响应数据内置对象有： 1. status_code：Integer类型，用于存储响应码

1. headers：Map类型，用于存储响应头信息
2. time：Double类型，用于存储响应时间
3. body：对象类型，用于存储响应体信息
4. cookies：Map类型，用于存储cookie信息信息
5. contentLength：Long类型，用于存储响应长度

### 内置方法

框架提供多个内置方法，方法引用方式：${方法名(方法参数)}：

1. helloWorld：用于输出hello,hrun4j
2. ENV：用于提取.env文件中某个变量值
3. BSH：用于执行指定BSH脚本并完成赋值的
4. P：用于读取指定目录下的数据文件

### 贴心国际化支持

`hrun4j`支持中英文切换，只需要一个参数即可轻松切换。

1. CLI模式下，其中国际化支持可通过i18n设置，如果想使用英文，运行时加入--i18n=us参数即可
2. POM模式下设置中英文非常简单，在初始化运行配置时，通过代码设置i18n方法参数即可

备注：**i18n全称为internationalization**

## 使用文档

限于篇幅，该文主要是概览性介绍`hrun4j`核心知识，如果想对项目深入了解可访问

### 乐马技术

- [乐马技术](https://www.lematech.vip/)
- [hrun4j官方文档](https://www.lematech.vip/docs/react/introduce-cn)

### 参与开源共建

![-w376](http://cdn.lematech.vip/mweb/16257987099898.jpg)
如果入群方式已关闭，框架使用上若有疑问，可先加微信【`wytest`】（请备注 hrun4j）再入群交流


## 鸣谢

感谢DebugTalk（李隆），为行业带来这么优秀的测试框架HttpRunner。


## 问答

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/104172832)
