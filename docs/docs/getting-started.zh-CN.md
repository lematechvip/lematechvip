---
order: 1
title: 快速上手
group:
  title: 框架使用
nav:
  title: 文档
  path: /docs
  order: 1
---

`hrun4j` 致力于给研发、测试提供愉悦的测试体验。

> `hrun4j` 提供两种集成其能力的方式，一种是`Command Line`模式，简称：`CLI`，另一种是`Maven POM Reference`模式，简称：`POM`，个人更推荐以`POM`模式集成其能力。

**总言之，不管以哪种方式集成`hrun4j`能力，建议先下载命令行工具：`hrun4j.jar`，可配置别名`alias hrun4j='java -jar hrun4j.jar'`，简称：`hrun4j`。**

## 命令行工具下载

命令行工具`hrun4j.jar`提供了一堆命令行工具集，简称`瑞士小军刀`，功能小巧细腻又不失强大，可以用它来快速创建`CLI`或`POM`模式脚手架工程。

`hrun4j.jar`是JAVA语言开发的，跨多种操作系统，支持`Windows/Linux/MacOS`,因此只需要电脑安装了JDK或JRE即可运行，命令行工具下载方式如下：

1. Mac或Linux用户：可通过命令行：`wget http://cdn.lematech.vip/hrun4j.jar`下载
2. Windows用户：直接访问[这里](http://cdn.lematech.vip/hrun4j.jar)即可下载

Linux下载演示案例：
```
[root@iZwz9d74mj3se04xsvz0crZ workplace]# wget https://cdn.lematech.vip/hrun4j.jar
--2021-06-26 10:59:39--  https://cdn.lematech.vip/hrun4j.jar
正在解析主机 cdn.lematech.vip (cdn.lematech.vip)... 59.36.203.41, 121.12.53.41, 14.152.86.41
正在连接 cdn.lematech.vip (cdn.lematech.vip)|59.36.203.41|:443... 已连接。
已发出 HTTP 请求，正在等待回应... 200 OK
长度：25329276 (24M) [application/java-archive]
正在保存至: “hrun4j.jar”

hrun4j.jar                             100%[============================================================================================>]  24.16M  14.7MB/s  用时 1.6s

2021-06-26 10:59:43 (14.7 MB/s) - 已保存 “hrun4j.jar” [25329276/25329276])
```

## Command Line 

**Command Line**即为命令行模式，借助轻量级文本编辑器（`Sublime`、`Editplus`）和命令行工具`hrun4j.jar`即可完成用例编写、编排、执行及报告生成。

`hrun4j.jar`功能丰富，我们可以用它来创建标准工程目录，如果不知道如何使用命令，可通过`java -jar hrun4j.jar  --help`查看帮助。
创建脚手架工程命令`java -jar hrun4j.jar startproject`,详细参数设置如下：
```
Usage: java -jar hrun4j.jar startproject [<project_name>] [--group_id VAL] [--help] [--quiet] [--type VAL] [--version VAL]
 <project_name> : Enter project name
 --group_id VAL : Specify maven project groupId. (default:
                  vip.lematech.hrun4j)
 --help         : show help (default: true)
 --quiet        : suppress all output on stdout (default: false)
 --type VAL     : Project type, default is hrun4j POM type, support
                  CLI/SRPINGBOOT  (default: POM)
 --version VAL  : Specify maven project version. (default: 1.0.0-SNAPSHOT)
```

首先使用命令行`hrun4j.jar`创建`CLI`模式工程，如需创建工程名：`CLI_PROJECT`，其完整命令如下：
`java -jar hrun4j.jar startproject CLI_PROJECT --type CLI`

生成后工程目录规范如下：

```
[root@iZwz9d74mj3se04xsvz0crZ CLI_PROJECT]# tree -a
.
├── apis
│   ├── get.yml
│   ├── postFormData.yml
│   └── postRawText.yml
├── bsh
│   └── test.bsh
├── data
│   └── csvFile.csv
├── .env
├── .gitignore
├── hrun4j.bsh
├── readMe.md
├── testcases
│   ├── get
│   │   └── getScene.yml
│   └── post
│       └── postScene.yml
└── testsuite
    └── testsuite.yml

7 directories, 12 files
```

工程划分如下：`apis`、`bsh`、`data`、`testcases`、`testsuite`、`hrun4j.bsh`、`readMe.md`

1. `apis`：存放API接口定义，建议API接口分类参考Swagger文档接口结构分类，`hrun4j.jar`提供了`swagger2api`命令，可把swagger文档自动转换成接口API定义及参数化
2. `bsh`：存放Beanshell脚本，框架引入Beanshell，可处理复杂的动态业务逻辑及数据校验，可使用内置函数`${BSH(文件相对或绝对路径)}`执行脚本
3. `data`：存放数据文件，可使用内置函数`${P(文件相对或绝对路径)}`引用数据文件
4. `testcases`：存放测试用例，业务逻辑验证、场景编排及数据校验
5. `testsuite`：存放测试用例集
6. `readMe.md`: 别上来就巴拉巴拉写代码，先看看老子 MD
7. `.gitignore`：git代码提交时，可忽略的文件配置
8. `.env`：存放私有秘钥等信息，默认不上传至git代码仓库，可使用内置函数`${ENV(变量名)}`引入参数值
9. `hrun4j.bsh`：非常重要的文件，可以该文件作为工作区根目录。

### 如何运行接口定义、测试用例以及测试用例集呢？

`hrun4j.jar`内置运行引擎，可支持接口定义、测试用例及测试用例执行，可通过`java -jar hrun4j.jar  run --help ` 查看帮助,详细参数设置如下：
```
[root@iZwz9d74mj3se04xsvz0crZ workplace]# java -jar hrun4j.jar run --help
Print run command information.

Usage: java -jar hrun4j.jar run [--bsh FILE] [--dot_env_path FILE] [--ext_name VAL] [--help] [--i18n VAL] [--pkg_name VAL] [--quiet] [--testcase_path <testcase_path>] [--testsuite_path <testsuite_path>]
 --bsh FILE                        : Specify hrun4j.bsh as the project
                                     path, not the current path.
 --dot_env_path FILE               : Specify the path to the.env file
 --ext_name VAL                    : Specify the use case extension. (default:
                                     yml)
 --help                            : show help (default: true)
 --i18n VAL                        : Internationalization support,support
                                     us/cn. (default: CN)
 --pkg_name VAL                    : Specify the project package name.
 --quiet                           : suppress all output on stdout (default:
                                     false)
 --testcase_path <testcase_path>   : list of testcase path to execute
 --testsuite_path <testsuite_path> : Specify the TestSuite path
```

**注意：运行时，先把hrun4j.jar 复制到CLI_PROJEC根目录下。**

1. 如何运行API接口定义，进行请求报文发送呢？

    命令如下：`java -jar hrun4j.jar run --testcase_path apis/get.yml`
    
    完整输出如下：
    ```
    [root@iZwz9d74mj3se04xsvz0crZ CLI_PROJECT]# java -jar hrun4j.jar run --testcase_path apis/get.yml
    2021-06-26 15:55:58.284 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Run mode: CLI
    2021-06-26 15:55:58.302 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - The workspace path：/home/data/workplace/CLI_PROJECT
    [TestNG] Running:
      hrun4j
    
    2021-06-26 15:56:02.484 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@beforeSuite()
    2021-06-26 15:56:02.499 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================get====================]@START
    2021-06-26 15:56:02.519 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Postman Echo GET Request
    2021-06-26 15:56:02.821 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：https://postman-echo.com/get?website=http://lematech.vip_api&project=hrun4j_api&author=lematech_api
    2021-06-26 15:56:02.822 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：GET
    2021-06-26 15:56:06.165 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200
    2021-06-26 15:56:06.166 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"args":{"website":"http://lematech.vip_api","author":"lematech_api","project":"hrun4j_api"},"headers":{"x-amzn-trace-id":"Root=1-60d6dd96-48371bb2411491e345922a58","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip_api&project=hrun4j_api&author=lematech_api"}
    2021-06-26 15:56:06.167 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：419
    2021-06-26 15:56:06.169 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：2.223 秒
    2021-06-26 15:56:06.170 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"date":"Sat, 26 Jun 2021 07:56:06 GMT","content-length":"419","set-cookie":"sails.sid=s%3AwfdljwW_FUc1uG4xjLqACALXRcy58JGn.fDmgYKIU%2FnmQsgbJedf%2BpilgVGA2HqXM6dx8HQUHlj4; Path=/; HttpOnly","vary":"Accept-Encoding","content-type":"application/json; charset=utf-8","etag":"W/\"1a3-JbGZPXoAgWRHiqDMVGTIvnhLjcU\""}
    2021-06-26 15:56:06.170 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie：
    2021-06-26 15:56:06.171 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================get====================]@END
    2021-06-26 15:56:06.193 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@afterSuite()
    
    ===============================================
    hrun4j
    Total tests run: 1, Failures: 0, Skips: 0
    ===============================================
    ```

2. 如何运行单个或者某一个目录下的测试用例呢？

 单个文件执行命令如下：`java -jar hrun4j.jar run --testcase_path testcases/get/getScene.yml`
    
    完整输出如下：
    
    ```
    2021-06-26 16:00:54.349 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Run mode: CLI
    2021-06-26 16:00:54.368 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - The workspace path：/home/data/workplace/CLI_PROJECT
    [TestNG] Running:
      hrun4j
    
    2021-06-26 16:00:58.056 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@beforeSuite()
    2021-06-26 16:00:58.068 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getScene====================]@START
    2021-06-26 16:00:58.080 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Postman Echo GET Request And Reference Api
    hrun4j.bsh文件所在路径即为项目工程路径
    你好，欢迎使用hrun4j！
    官网：http://www.lematech.vip
    微信公众号：lematech
    技术交流微信：wytest
    2021-06-26 16:00:58.467 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}
    2021-06-26 16:00:58.467 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：GET
    2021-06-26 16:01:01.376 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200
    2021-06-26 16:01:01.376 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"args":{"website":"http://lematech.vip","author":"lematech","project":"hrun4j","page":"{page}"},"headers":{"x-amzn-trace-id":"Root=1-60d6debd-4a841a61531b19bf1e6bc8c1","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}"}
    2021-06-26 16:01:01.377 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：423
    2021-06-26 16:01:01.382 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：2.033 秒
    2021-06-26 16:01:01.383 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"date":"Sat, 26 Jun 2021 08:01:01 GMT","content-length":"423","set-cookie":"sails.sid=s%3AVaNvVwXrYiglHQeCdXBzUq90OocJ_Y7P.uK%2FwiPEWJomwZ7LQxTQJRedt%2FuoBuqnFKg599XZftcI; Path=/; HttpOnly","vary":"Accept-Encoding","content-type":"application/json; charset=utf-8","etag":"W/\"1a7-5itilBNxK+JbeEpUNNUS6aGJLQ8\""}
    2021-06-26 16:01:01.383 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie：
    2021-06-26 16:01:01.565 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过
    2021-06-26 16:01:01.572 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：body.args.website，预期值：http://lematech.vip，实际值：http://lematech.vip，测试结论：通过
    2021-06-26 16:01:01.584 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：${author}，预期值：lematech，实际值：lematech，测试结论：通过
    2021-06-26 16:01:01.586 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：^website":"(.*?)"$，预期值：website":"http://lematech.vip"，实际值：website":"http://lematech.vip"，测试结论：通过
    2021-06-26 16:01:01.599 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Reference Api
    2021-06-26 16:01:01.733 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=http://lematech.vip
    2021-06-26 16:01:01.733 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：GET
    2021-06-26 16:01:01.959 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200
    2021-06-26 16:01:01.960 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"args":{"website":"http://lematech.vip","author":"http://lematech.vip","project":"hrun4j"},"headers":{"x-amzn-trace-id":"Root=1-60d6debd-3b1fff487ee9084b154be2f4","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=http://lematech.vip"}
    2021-06-26 16:01:01.961 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：417
    2021-06-26 16:01:01.961 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：0.225 秒
    2021-06-26 16:01:01.961 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"date":"Sat, 26 Jun 2021 08:01:01 GMT","content-length":"417","set-cookie":"sails.sid=s%3ASyp2uNTk2F5Ppgj11n6fHa1J8UA3wxuJ.wHIISqbjXUQ05C6318PHWdWa%2B2l7iFkIHSjSJcpzybo; Path=/; HttpOnly","vary":"Accept-Encoding","content-type":"application/json; charset=utf-8","etag":"W/\"1a1-xWnwgmnNEg+i7HTuFPHJhw1mZpE\""}
    2021-06-26 16:01:01.961 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie：
    2021-06-26 16:01:01.968 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过
    2021-06-26 16:01:01.969 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getScene====================]@END
    2021-06-26 16:01:01.990 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@afterSuite()
    ```

    如果是执行执行某个目录(比如：`post`)下所有用例，执行运行命令：
`java -jar hrun4j.jar run --testcase_path testcases/post`即可

3. 如何运行单个测试用例集呢？

    命令如下：`java -jar hrun4j.jar run --testsuite_path testsuite/testsuite.yml`
    
    完整输出如下：
    ```
    太长，此处省略
    ```

## Maven POM Reference

`Maven POM Reference`即为POM模式，建议在IDEA下完成用例编写、编排、执行及报告生成，POM模式本质是以`MAVEN JAR`引入`hrun4j`，从而集成其能力。

通常做法是新建Maven项目，然后在工程POM加入`hrun4j Maven`配置
配置如下：

```
<!-- https://mvnrepository.com/artifact/vip.lematech/hrun4j-core -->
<dependency>
    <groupId>vip.lematech</groupId>
    <artifactId>hrun4j-core</artifactId>
    <version>1.0.1</version>
</dependency>
```

**注意：当前版本1.0.1，后续如有优化或缺陷修复，通过修改版本号即可修复问题**

如何创建包含`hrun4j`的标准工程呢？

工程目录划分和`CLI`有差异，因`M2_PROJECT`属于JAVA工程，所以应该遵循JAVA工程规范，

在熟悉`POM`模式前，我们先了解JAVA标准工程规范如何划分及定义的？通常划分为业务和测试两块，其结构及定义如下：

```
├── .gitignore
├── pom.xml
├── readMe.md
└── src/main/java           ---业务逻辑代码
└── src/main/resources      ---业务资源文件
└── src/test/java           ---测试代码
└── src/test/resources      ---测试相关资源文件
```
因`apis`、`bsh`、`data`、`testcases`、`testsuite`、`hrun4j.bsh`都属于测试相关的资源，因此全部归属到`src/test/resources`目录下。

其实我们还是可以通过命令行工具`hrun4j.jar`创建标准的规范工程，如需创建工程名：M2_PROJECT，其完整命令如下：
`java -jar hrun4j.jar startproject M2_PROJECT`

生成后工程目录规范如下：

```
[root@iZwz9d74mj3se04xsvz0crZ M2_PROJECT]# tree -a
.
├── .gitignore
├── pom.xml
├── readMe.md
└── src
    ├── main
    │   └── java
    │       └── vip
    │           └── lematech
    │               └── hrun4j
    │                   └── m2_project
    │                       ├── functions
    │                       │   └── MyFunction.java
    │                       └── hrun4j.java
    └── test
        ├── java
        │   └── vip
        │       └── lematech
        │           └── hrun4j
        │               └── m2_project
        │                   └── testcases
        │                       ├── get
        │                       │   └── GetTest.java
        │                       └── post
        │                           └── PostTest.java
        └── resources
            ├── apis
            │   ├── get.yml
            │   ├── postFormData.yml
            │   └── postRawText.yml
            ├── data
            │   └── csvFile.csv
            ├── .env
            ├── hrun4j.bsh
            ├── testcases
            │   ├── get
            │   │   └── getScene.yml
            │   └── post
            │       └── postScene.yml
            └── testsuite
                ├── testsuite_all.xml
                └── testsuite.xml

24 directories, 17 files
```

生成后工程目录规范如下：

1. `其他测试资源`：其他测试资源（即`src/test/resources`）定义，可参考CLI目录划分
2. `hrun4j.java`：初始化运行配置及加载自定义复杂表达式，只支持Aviator表达式编写，非常强大！
3. `function/MyFunction.java`：自定义表达式定义，通常用于处理复杂业务逻辑，定义方式可参考案例，方法定义后需在`hrun4j.java`申明
4. `测试代码testcases`：测试代码，类似于单测用例，需要注意的是：**`src/test/resources/testcases/get`目录下的一条用例，对应GetTest类中的一个方法，测试代码testcases目录需和测试资源testcases目录保持一致**。
5. `测试资源testsuite`：`POM`模式用例集管理可直接复用testng.xml管理方式，简单，构建方便，没有比testng更强大的用例管理了。
 
目录划分如此复杂？那问题来了。

1. 如此复杂的工程，以什么作为项目根目录好呢？
2. 如此复杂的工程，如何能做到参数化构建呢？
3. CLI和POM模式差异有哪些？为何更推荐POM模式？

如果能提出或回答这3个问题，说明说明你一直在思考，很棒！，请继续保持，我们先来看第一个问题。

1. 问题一：如此复杂的工程，以什么作为项目根目录好呢？
  
    如果我们借助CLI模式继续采用`hrun4j.bsh`作为项目根目录，会怎么样呢？ 那会全乱套了！JAVA表达式、测试代码需全部动态编译、测试用例集找不到对应class、文件/BSH脚本/API等资源文件会关联不上，那我们怎么管理好呢？
    
    这里引入一个概念：`类路径即classpath`，Java工程编译过程中会把工程相关的业务/测试代码及相关资源文件全部放到`target/classes`目录下，那我们以类路径做成POM模式根目录，所有问题迎刃而解了。

2. 问题二：如此复杂的工程，如何能做到参数化构建测试呢？

    先来理解何为构建测试？构建是持续集成过程中的重要一环，完成代码拉取、编译及应用打包部署，在应用打包前通常会进行单元测试，而我们现在以单测组织的方式来完成接口测试的管理，未来针对微服务应用集成测试，可根据微服务应用拆分，单独新建测试工程（M2_PROJECT），等应用部署后执行测试用例集完成集成验证，但在实际过程中，每轮测试关注点可能不一样，比如把整个测试划分成冒烟测试、系统测试、回归测试等，因此我们需要把测试用例集进行拆分，拆分成smoke_test.xml/system_test.xml等等，根据配置参数选择测试策略。
    
    POM模式构建测试(冒烟用例)命令：``mvn clean test -DxmlFileName=src/test/resources/testsuite/smoke_test.xml``

3. 问题三：CLI和POM模式差异有哪些？为何更推荐POM模式？

    CLI和POM有一定差异，差异主要表现在根目录、测试用例集组织方式。
    CLI默认以当前路径作为工程根目录，也可通过`--bsh`参数值指定项目根目录，而POM以`类路径即classpath`作为工程根目录，项目编译后会把业务测试代码及测试资源统一放到target/classes目录下。
