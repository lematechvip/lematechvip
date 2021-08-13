---
order: 4
title: 命令行工具
group:
  title: 框架使用
nav:
  title: 文档
  path: /docs
  order: 1
---


> `hrun4j`提供一套完整的命令工具集，统称为`瑞士小军刀`，小巧而细腻，功能又强大，我们把整个命令工具全部集中在`hrun4j.jar`命令行工具中

## 瑞士小军刀

![-w910](http://cdn.lematech.vip/mweb/16253624957811.jpg)

二期会支持`case2jmeter`

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



## 查看帮助

通过`java -jar hrun4j.jar --help`可以查看其帮助详细

``` 
java -jar hrun4j.jar --help
Command line interface for hrun4j.

Usage: java -jar hrun4j.jar --help | <command>
 <command> : version|run|viewhar|har2case|swagger2api|startproject
 --help    : show help (default: true)
 --quiet   : suppress all output on stdout (default: false)
```

其中可以看出，`hrun4j`提供了一系列工具命令集，包括`har2case`、`run`、`viewhar`、`version`、`swagger2api`、`startproject`等命令，后期会扩展更多工具。

⚡️温馨提示：每次操作前，都需要输入`java -jar hrun4j `前缀，我们是否可以只需要输入`hrun4j` ？可以滴，配置一个别名即可。

Mac或Linux配置如下：

`alias hrun4j='java -jar hrun4j.jar'`

配置完成后输入：`hrun4j --help`即可

```
 arkhe@arkhe  ~/Desktop  hrun4j --help
Command line interface for hrun4j.

Usage: java -jar hrun4j.jar --help | <command>
 <command> : version|run|viewhar|har2case|swagger2api|startproject
 --help    : show help (default: true)
 --quiet   : suppress all output on stdout (default: false)
```

## 查看版本

>查看版本：`version`命令

通过`hrun4j version`可以查看其版本详细：

```
hrun4j version
1.0.0
```

## 运行命令

>运行命令：`run`，是所有命令中最重要一个。

通过`hrun4j run --help `可以查看当前命令帮助：

```
 arkhe@arkhe  ~/Desktop  hrun4j run --help
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


⚡️温馨提示：

1. `i18n`：用于设置测试输出是以中文还是英文格式输出，默认是中文
2. `bsh`：用于设置`hrun4j.bsh`文件路径，如果设置，则以`bsh`值作为项目根路径，反之则以当前路径为项目根路径。
3. `dot_env_path`：用于设置`.env`文件路径
4. `ext_name`：运行时用于过滤出待执行的测试用例文件后缀
5. `testcase_path`：设置运行的测试用例或接口定义文件路径
6. `testsuite_path`：用于设置测试用例集路径

## 快速创建工程

>快速创建工程：startproject

通过`hrun4j startproject --help`可以查看其创建项目帮助：

```
 arkhe@arkhe  ~/Desktop  hrun4j startproject --help
Print startproject command information.

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

⚡️注意：
1. 项目名必填字段，必须符合Java标识符命令规范（可支持`-`）
2. `type`参数用于设置脚手架的类型，默认是`POM`类型，另外支持`CLI`、`SRPINGBOOT`
    1. `SRPINGBOOT`：生成`SpringBoot`脚手架
3. `groupId`：用于指定工程包名，通常命名：com.公司名.项目名.模块名，其中公司名、项目名及模块名需遵守`总体命名规则`

## 查看HAR文件结构

>查看HAR文件结构：view2har

通过`hrun4j viewhar --file www.bt.cn.har`可以查看当前HAR结构：

```
2021-07-03 21:43:28.459 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Output the calls for this page:
2021-07-03 21:43:28.460 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /linux.html
2021-07-03 21:43:28.461 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/css/bt/reset.css
2021-07-03 21:43:28.461 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/css/bt/common.css
2021-07-03 21:43:28.462 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/css/bt/login.css
2021-07-03 21:43:28.463 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/logo.png
2021-07-03 21:43:28.463 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/banner_linux.png
2021-07-03 21:43:28.463 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/img/btapp.png
2021-07-03 21:43:28.463 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/img/githubstart.png
2021-07-03 21:43:28.464 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/img/panel-case.png
2021-07-03 21:43:28.464 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/linux_pc_free.png
2021-07-03 21:43:28.464 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/web.png
2021-07-03 21:43:28.464 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/jk.png
2021-07-03 21:43:28.465 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/ssh.png
2021-07-03 21:43:28.465 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/crontab.png
2021-07-03 21:43:28.465 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/file.png
2021-07-03 21:43:28.465 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/soft.png
2021-07-03 21:43:28.466 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/bt_logo.png
2021-07-03 21:43:28.466 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/img/bt_wx.jpg
2021-07-03 21:43:28.466 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /labels/label_sm_90020.png
2021-07-03 21:43:28.466 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/js/jquery.js
2021-07-03 21:43:28.466 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/layer/layer.js
2021-07-03 21:43:28.466 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/js/clipboard.min.js
2021-07-03 21:43:28.478 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /hm.js
2021-07-03 21:43:28.481 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/banner_pc.png
2021-07-03 21:43:28.482 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/linux_txt2.png
2021-07-03 21:43:28.483 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/panel/ico-copy.png
2021-07-03 21:43:28.484 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/images/pc.png
2021-07-03 21:43:28.484 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /Public/layer/skin/default/layer.css
2021-07-03 21:43:28.485 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /linksubmit/push.js
2021-07-03 21:43:28.549 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	POST /api/Btparter/get_bt_packages
2021-07-03 21:43:28.550 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif
2021-07-03 21:43:28.550 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /hm.gif
2021-07-03 21:43:28.551 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /hm.gif
2021-07-03 21:43:28.551 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /favicon.ico
```


## HAR文件转用例

>查看HAR文件结构：`har2case`

通过`hrun4j har2case --help `可以查看当前命令帮助：

```
Print har2yml command information.

Usage: java -jar hrun4j.jar har2case [--case_dir FILE] --file FILE [--filter_suffix VAL] [--filter_uri VAL] [--format VAL] [--gen_mode VAL] [--help] [--quiet]
 --case_dir FILE     : Specifies the path  of the generated use case.
 --file FILE         : Specify the HAR file path.
 --filter_suffix VAL : Filter out the specified request suffix, support
                       multiple suffix formats, multiple in English status ';'
                       division.
 --filter_uri VAL    : Filter out the URIs that meet the requirements by
                       keyword, multiple in English status ';' division.
 --format VAL        : Generate use case format, support 2y/2j. (default: 2y)
 --gen_mode VAL      : Specified generation mode, full/easy mode. (default:
                       easy)
 --help              : show help (default: true)
 --quiet             : suppress all output on stdout (default: false)
```

⚡️温馨提示：

1. `filter_suffix`和`filter_uri`参数用于过滤符合要求的流量数据
2. `format`：用于指定生成的用例文件格式，默认是`yml`格式
3. `gen_mode`：用于指定生成用例的数据参数


## Swagger转API

> Swagger 接口结构转变成单个接口文档定义：`swagger2api`

在很多微服务工程中，很多项目接入了swagger，它是一个非常好的接口定义及调试的利器，之所以引入`swagger2api`命令，便于快速收集当前工程的接口及定义

通过`hrun4j swagger2api --help`可以查看帮助：

```
 arkhe@arkhe  ~/Desktop  hrun4j swagger2api --help
Print swagger2api command information.

Usage: java -jar hrun4j.jar swagger2api [--api_dir FILE] --file VAL [--format VAL] [--help] [--quiet]
 --api_dir FILE : Specifies the path  of the generated use case.
 --file VAL     : Specify the HAR file path.
 --format VAL   : Generate use case format, support 2y/2j. (default: 2y)
 --help         : show help (default: true)
 --quiet        : suppress all output on stdout (default: false)
```


演示案例：`hrun4j swagger2api --file https://petstore.swagger.io/v2/swagger.json --api_dir ./swagger2api`

```
2021-07-04 09:41:43.289 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Start generating test cases,testcase format:2y
2021-07-04 09:41:43.350 [main] INFO  io.swagger.parser.Swagger20Parser - reading from https://petstore.swagger.io/v2/swagger.json
2021-07-04 09:41:47.097 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/createUsersWithListInput.yml
2021-07-04 09:41:47.097 [ForkJoinPool.commonPool-worker-3] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/createUsersWithArrayInput.yml
2021-07-04 09:41:47.108 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/getPetById.yml
2021-07-04 09:41:47.170 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/getUserByName.yml
2021-07-04 09:41:47.173 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/updatePetWithForm.yml
2021-07-04 09:41:47.174 [ForkJoinPool.commonPool-worker-3] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/createUser.yml
2021-07-04 09:41:47.174 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/updateUser.yml
2021-07-04 09:41:47.177 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/deletePet.yml
2021-07-04 09:41:47.181 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/findPetsByTags.yml
2021-07-04 09:41:47.182 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/deleteUser.yml
2021-07-04 09:41:47.188 [ForkJoinPool.commonPool-worker-3] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/logoutUser.yml
2021-07-04 09:41:47.189 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/store/placeOrder.yml
2021-07-04 09:41:47.363 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/store/getInventory.yml
2021-07-04 09:41:47.363 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/store/getOrderById.yml
2021-07-04 09:41:47.381 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/updatePet.yml
2021-07-04 09:41:47.388 [ForkJoinPool.commonPool-worker-3] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/user/loginUser.yml
2021-07-04 09:41:47.388 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/store/deleteOrder.yml
2021-07-04 09:41:47.395 [ForkJoinPool.commonPool-worker-3] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/uploadFile.yml
2021-07-04 09:41:47.397 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/addPet.yml
2021-07-04 09:41:47.427 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/swagger2api/pet/findPetsByStatus.yml
```

其中：
1. `file`参数可以指定网络Swagger资源路径


## Postman转用例

> Postman 接口结构转变成接口测试用例：`postman2case`


通过`hrun4j postman2case --help`可以查看帮助：

```
 arkhe@arkhe  ~/Desktop  hrun4j postman2case --help
Print postman2case command information.

Usage: java -jar hrun4j.jar postman2case [--case_dir FILE] --file FILE [--format VAL] [--help] [--quiet]
 --case_dir FILE : Specifies the path  of the generated use case.
 --file FILE     : Specify the Postman file path.
 --format VAL    : Generate use case format, support 2y/2j. (default: 2y)
 --help          : show help (default: true)
```


演示案例：`hrun4j postman2case --file postman_collection.json --case_dir ./postmancase`

```
2021-07-04 10:52:28.585 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Start generating test cases,testcase format:2y
2021-07-04 10:52:29.098 [ForkJoinPool.commonPool-worker-3] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/postmancase/Writing test scripts/Postman Echo GET.yml
2021-07-04 10:52:29.099 [ForkJoinPool.commonPool-worker-2] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/postmancase/Writing test scripts/Postman Echo DELETE.yml
2021-07-04 10:52:29.099 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/postmancase/Writing test scripts/Postman Echo PUT.yml
2021-07-04 10:52:29.103 [ForkJoinPool.commonPool-worker-1] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/postmancase/Writing test scripts/Postman Echo POST.yml

```

## 后续规划

扩展更多的命令行工具，比如`case2jmeter、yapi2api`等，丰富小军刀。
