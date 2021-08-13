---
order: 2
title: 最佳实践
group:
  title: 框架使用
nav:
  title: 文档
  path: /docs
  order: 1
---

> 通过本篇带大家快速了解如何基于`hrun4j`编写自动化脚本并集成到部署流水线。

⚡️ 注意：初次学习`hrun4j`建议先快速了解框架`核心概念`篇

## 工程下载

### 下载本地

为便于大家快速上手使用，工程代码包含多个模块，内置测试服务端模块，可直接把整个代码工程克隆至本地，代码克隆地址: `git clone https://github.com/lematechvip/hrun4j.git`

备注：如果网络不好，通过gitee下载，下载方式：`https://gitee.com/lematechvip/hrun4j.git`

工程目录划分如下：

```
├── hrun4j-api: 提供api接口方便扩展成平台
├── hrun4j-cli: 提供CLI命令行支持，支持用例录制，可快速创建脚手架、测试用例集运行及调试
├── hrun4j-core: 工程核心模块，提供完整的运行机制、数据驱动、表达式引擎及测试报告生成
├── hrun4j-plugins: 插件式集成至IDEA，提供智能补全、快速填充及在线调试运行功能
├── hrun4j-test-demo: 常用案例使用说明
├── hrun4j-test-server：内置测试服务，基于springboot开发，工程规范标准
```

### 导入IDEA

该工程为多模块项目，打开IDEA按照`File->New->Project From Existing Sources`步骤选择`hrun4j`即可完成工程导入，导入之后等待Maven Sync同步完整即可，效果如下图：

![-w1348](http://cdn.lematech.vip/mweb/16250550561839.jpg)

## 被测应用

### 启动服务

如上可知：`hrun4j-test-server`即为测试服务，在`DemoApplication`右键`Run`运行即可启动层析，启动输出如下：

```
 _____                                _                 __
|_   _|                              / |_              [  |
  | |      .---.  _ .--..--.   ,--. `| |-'.---.  .---.  | |--.
  | |   _ / /__\\[ `.-. .-. | `'_\ : | | / /__\\/ /'`\] | .-. |
 _| |__/ || \__., | | | | | | // | |,| |,| \__.,| \__.  | | | |
|________| '.__.'[___||__||__]\'-;__/\__/ '.__.''.___.'[___]|__]


2021-06-30 20:12:20.948 [main] INFO  vip.lematech.hrun4j.DemoApplication - Starting DemoApplication on arkhe.local with PID 6282 (/Users/arkhe/Documents/lema/others/hrun4j/hrun4j-test-server/target/classes started by arkhe in /Users/arkhe/Documents/lema/others/hrun4j) 
2021-06-30 20:12:20.951 [main] INFO  vip.lematech.hrun4j.DemoApplication - The following profiles are active: prod 
2021-06-30 20:12:25.275 [main] INFO  o.s.boot.web.embedded.tomcat.TomcatWebServer - Tomcat initialized with port(s): 8000 (http) 
2021-06-30 20:12:25.291 [main] INFO  org.apache.coyote.http11.Http11NioProtocol - Initializing ProtocolHandler ["http-nio-8000"] 
2021-06-30 20:12:25.302 [main] INFO  org.apache.catalina.core.StandardService - Starting service [Tomcat] 
2021-06-30 20:12:25.304 [main] INFO  org.apache.catalina.core.StandardEngine - Starting Servlet engine: [Apache Tomcat/9.0.21] 
2021-06-30 20:12:25.591 [main] INFO  o.a.c.core.ContainerBase.[Tomcat].[localhost].[/] - Initializing Spring embedded WebApplicationContext 
2021-06-30 20:12:25.592 [main] INFO  org.springframework.web.context.ContextLoader - Root WebApplicationContext: initialization completed in 4201 ms 
2021-06-30 20:12:26.056 [main] INFO  o.s.scheduling.concurrent.ThreadPoolTaskExecutor - Initializing ExecutorService 'applicationTaskExecutor' 
2021-06-30 20:12:26.706 [main] INFO  org.apache.coyote.http11.Http11NioProtocol - Starting ProtocolHandler ["http-nio-8000"] 
2021-06-30 20:12:26.740 [main] INFO  o.s.boot.web.embedded.tomcat.TomcatWebServer - Tomcat started on port(s): 8000 (http) with context path '' 
2021-06-30 20:12:26.744 [main] INFO  vip.lematech.hrun4j.DemoApplication - Started DemoApplication in 6.362 seconds (JVM running for 8.651) 

```

没有异常，说明服务正常启动！

### 访问接口文档

测试服务工程内置Swagger，通过Swagger平台链接即可查看接口信息，访问地址：`http://127.0.0.1:8000/swagger-ui.html`

接口文档列表信息如下：
![-w989](http://cdn.lematech.vip/mweb/16250557476804.jpg)

该测试服务是一个简单的用户管理系统，提供多个API进行用户管理操作。

### 业务场景

![-w1081](http://cdn.lematech.vip/mweb/16251050770619.jpg)

### 业务要求（须读）

业务场景说明🔥🔥🔥：

1. 除用户首页或获取登录态接口无需登录外，其他接口需带正确的登录态才能正常访问
2. 通过登录态接口`/api/get-token`动态生成签名（sign），签名（sign）生成规则：拼接`device_sn,os_platform,app_version`参数值，然后通过`HmacSHA1`进行`hrun4j`加签，具体的生成sign代码实现逻辑如下：
      
    ```
        StringBuffer content = new StringBuffer();content.append(device_sn).append(os_platform).append(app_version);
        String crypContent = content.toString();
        String sign = SecureUtil.hmac(HmacAlgorithm.HmacSHA1, "hrun4j").digestHex(crypContent);
        LogHelper.info("加密秘钥：{},加密内容：{},生成的签名：{}", TOKEN_KEY, crypContent, sign);
    ```


3. 用户管理其他需认证接口请求头必须带上device_sn和token才能正确访问



## 测试服务

### 快速创建测试工程

> 最佳实践采用`POM`模式进行工程演示

⚡️  **注意：**`POM`和`CLI`虽然有差异，但核心资源文件目录划分基本一致，主要差异在表达式使用及持续集成上，强烈建议：基于`POM`模式，建议使用`Aviator`编写复杂的业务场景，`CLI`模式下，使用`BeanShell`处理复杂业务场景 

1. Mac命令行工具下载：`wget http://cdn.lematech.vip/hrun4j.jar`
2. 快速创建`POM`工程：`java -jar hrun4j.jar startproject quick-start-demo`
3. quick-start-demo工程目录结构划分：

   ```
    ├── pom.xml
    ├── quick-start-demo.iml
    ├── readMe.md
    └── src
        ├── main
        │   └── java
        │       └── vip
        │           └── lematech
        │               └── hrun4j
        │                   └── quickstartdemo
        │                       ├── hrun4j.java
        │                       └── functions
        │                           └── MyFunction.java
        └── test
            ├── java
            │   └── vip
            │       └── lematech
            │           └── hrun4j
            │               └── quickstartdemo
            │                   └── testcases
            │                       ├── get
            │                       │   └── GetTest.java
            │                       └── post
            │                           └── PostTest.java
            └── resources
                ├── hrun4j.bsh
                ├── apis
                │   ├── get.yml
                │   ├── postFormData.yml
                │   └── postRawText.yml
                ├── data
                │   └── csvFile.csv
                ├── testcases
                │   ├── get
                │   │   └── getScene.yml
                │   └── post
                │       └── postScene.yml
                └── testsuite
                    ├── testsuite.xml
                    └── testsuite_all.xml
    
    24 directories, 16 files
   ```
   
   提示：导入工程会自动下载`hrun4j-core`相关的依赖包，脚本编写前，建议先读工程`ReadMe.md`文档。
   
   
### 运行演示案例
   
   生成的工程内置多份演示案例，先启动测试服务工程，然后运行案例，看下环境是否都正常。
   打开测试代码区`GetTest.java`文件，选择`getScene`方法右键运行，输出信息如下：
   
```
2021-07-01 16:10:35.907 [main] INFO  vip.lematech.hrun4j.helper.LogHelper -  Add function to static code block ! 
2021-07-01 16:10:38.796 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getScene====================]@START 
2021-07-01 16:10:38.815 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Postman Echo GET Request And Reference Api 
hrun4j.bsh文件所在路径即为项目工程路径
你好，欢迎使用hrun4j！
官网：http://www.lematech.vip
微信公众号：lematech
技术交流微信：wytest
2021-07-01 16:10:38.942 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 正在执行：shFunction方法，方法参数：page=<JavaType, page, null, null>,count=<JavaType, type, null, null>,type=<JavaType, count, null, null> 
2021-07-01 16:10:38.961 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page} 
2021-07-01 16:10:38.961 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：GET 
2021-07-01 16:10:41.034 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200 
2021-07-01 16:10:41.035 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"args":{"website":"http://lematech.vip","author":"lematech","project":"hrun4j","page":"{page}"},"headers":{"x-amzn-trace-id":"Root=1-60dd7880-68ac7f19592408a335ca7d4b","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}"} 
2021-07-01 16:10:41.035 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：423 
2021-07-01 16:10:41.035 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：1.751 秒 
2021-07-01 16:10:41.035 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"set-cookie":"sails.sid=s%3AexqY4rjbgTaeJYlNtjzrSjDl-Cv5LzIR.VpouynKdue7dEn2nxfebUi997lp5AE3mpibjaAhM7U4; Path=/; HttpOnly","ETag":"W/\"1a7-gWFNTHhk2lISIN3if/nYDXmiGf4\"","Connection":"keep-alive","Vary":"Accept-Encoding","Content-Length":"423","Date":"Thu, 01 Jul 2021 08:10:40 GMT","Content-Type":"application/json; charset=utf-8"} 
2021-07-01 16:10:41.035 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie： 
2021-07-01 16:10:41.036 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 正在执行：tdFunction方法，方法参数：<String, This is a joke!> 
2021-07-01 16:10:41.037 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前请求参数详细信息：RequestEntity(method=GET, url=https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}, params=null, data=null, json=null, headers=null, connectTimeout=null, allowRedirects=true, writeTimeout=null, readTimeout=null, cookies=null, files={}, auth=null, proxy=null, stream=true) 
2021-07-01 16:10:41.037 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前响应参数详细信息：ResponseEntity(statusCode=200, headers={set-cookie=sails.sid=s%3AexqY4rjbgTaeJYlNtjzrSjDl-Cv5LzIR.VpouynKdue7dEn2nxfebUi997lp5AE3mpibjaAhM7U4; Path=/; HttpOnly, ETag=W/"1a7-gWFNTHhk2lISIN3if/nYDXmiGf4", Connection=keep-alive, Vary=Accept-Encoding, Content-Length=423, Date=Thu, 01 Jul 2021 08:10:40 GMT, Content-Type=application/json; charset=utf-8}, time=1.751, body={"args":{"website":"http://lematech.vip","author":"lematech","project":"hrun4j","page":"{page}"},"headers":{"x-amzn-trace-id":"Root=1-60dd7880-68ac7f19592408a335ca7d4b","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}"}, cookies=null, contentLength=423) 
2021-07-01 16:10:41.037 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [variables]：{author=lematech} 
2021-07-01 16:10:41.038 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [extract]：{website=http://lematech.vip, author=lematech, project=hrun4j, $RESPONSE=ResponseEntity(statusCode=200, headers={set-cookie=sails.sid=s%3AexqY4rjbgTaeJYlNtjzrSjDl-Cv5LzIR.VpouynKdue7dEn2nxfebUi997lp5AE3mpibjaAhM7U4; Path=/; HttpOnly, ETag=W/"1a7-gWFNTHhk2lISIN3if/nYDXmiGf4", Connection=keep-alive, Vary=Accept-Encoding, Content-Length=423, Date=Thu, 01 Jul 2021 08:10:40 GMT, Content-Type=application/json; charset=utf-8}, time=1.751, body={"args":{"website":"http://lematech.vip","author":"lematech","project":"hrun4j","page":"{page}"},"headers":{"x-amzn-trace-id":"Root=1-60dd7880-68ac7f19592408a335ca7d4b","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}"}, cookies=null, contentLength=423), $REQUEST=RequestEntity(method=GET, url=https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematech&page={page}, params=null, data=null, json=null, headers=null, connectTimeout=null, allowRedirects=true, writeTimeout=null, readTimeout=null, cookies=null, files={}, auth=null, proxy=null, stream=true)} 
2021-07-01 16:10:41.153 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过 
2021-07-01 16:10:41.158 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：body.args.website，预期值：http://lematech.vip，实际值：http://lematech.vip，测试结论：通过 
2021-07-01 16:10:41.159 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：${author}，预期值：lematech，实际值：lematech，测试结论：通过 
2021-07-01 16:10:41.161 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：^website":"(.*?)"$，预期值：website":"http://lematech.vip"，实际值：website":"http://lematech.vip"，测试结论：通过 
2021-07-01 16:10:41.162 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Reference Api 
2021-07-01 16:10:41.294 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematechvip 
2021-07-01 16:10:41.295 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：GET 
2021-07-01 16:10:41.536 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200 
2021-07-01 16:10:41.537 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"args":{"website":"http://lematech.vip","author":"lematechvip","project":"hrun4j"},"headers":{"x-amzn-trace-id":"Root=1-60dd7881-728e758b7690139541707437","x-forwarded-proto":"https","host":"postman-echo.com","x-forwarded-port":"443","accept-encoding":"gzip","user-agent":"okhttp/3.14.9"},"url":"https://postman-echo.com/get?website=http://lematech.vip&project=hrun4j&author=lematechvip"} 
2021-07-01 16:10:41.537 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：401 
2021-07-01 16:10:41.538 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：0.241 秒 
2021-07-01 16:10:41.538 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"set-cookie":"sails.sid=s%3AvEy4XRNDyRlNfTNGxF3pSZ0tiijBOaHw.hMo7ZhqW33C5Kiwpsx5dxoHA6wfDVlJYuOssnaUvXQw; Path=/; HttpOnly","ETag":"W/\"191-1Ennk6U67LZ9hEX4nyWDm81hj8c\"","Connection":"keep-alive","Vary":"Accept-Encoding","Content-Length":"401","Date":"Thu, 01 Jul 2021 08:10:41 GMT","Content-Type":"application/json; charset=utf-8"} 
2021-07-01 16:10:41.538 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie： 
2021-07-01 16:10:41.541 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过 
2021-07-01 16:10:41.542 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getScene====================]@END 
2021-07-01 16:10:41.544 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@afterSuite() 
```

没有报错，说明环境、依赖配置均成功，可以开始编写业务测试用例了。

### 快速录制回放首页案例

>通过Swagger在线测试工具，导出HAR请求报文，并借助`har2case`生成测试用例

打开[Swagger文档链接](http://127.0.0.1:8000/swagger-ui.html)，通过Swagger在线测试工具，测试`/api/`首页接口并导出HAR文件，再借助`har2case`自动生成首页请求接口用例，操作步骤如下：

1. 打开[Swagger文档链接](http://127.0.0.1:8000/swagger-ui.html)
2. Chrome浏览器按住F12即可打开调试窗口，在线测试`/api/`接口获取接口响应信息
3. 调试模式下选择请求记录并右键，导出HAR文件格式，格式命名：`apiIndex.har`

如图：
![-w992](http://cdn.lematech.vip/mweb/16251291307979.jpg)

### 回放流量并生成用例

命令行工具（`hrun4j.jar`）内置基于HAR流量文件转换成可执行测试用例，如果不知道har2case命令如何使用，可使用`java -jar hrun4j.jar har2case --help`查看帮助，帮助信息如下：

```
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

流量回放命令：`java -jar hrun4j.jar har2case --file apiIndex.har`，命令输出如下：

```
2021-07-01 16:51:15.032 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Start generating test cases,testcase format:2y
2021-07-01 16:51:15.191 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Number of pages viewed: 1
2021-07-01 16:51:15.192 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [Page: http://127.0.0.1:8000/webjars/springfox-swagger-ui/images/throbber.gif (For RESTful API requests) ]
2021-07-01 16:51:15.192 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Output the calls for this page:
2021-07-01 16:51:15.192 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /webjars/springfox-swagger-ui/images/throbber.gif
2021-07-01 16:51:15.197 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 	GET /api/
2021-07-01 16:51:15.615 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - Generated successfully! File path:/Users/arkhe/Desktop/apiIndex.yml
```
生成成功！当前生成`apiIndex.yml`测试用例，生成用例信息如下：

```
config:
  name: Testcase Description
  variables: {}
  verify: false
teststeps:
- name: Request api:/webjars/springfox-swagger-ui/images/throbber.gif
  request:
    url: http://127.0.0.1:8000/webjars/springfox-swagger-ui/images/throbber.gif
    method: GET
    headers:
      sec-ch-ua: '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"'
      sec-ch-ua-mobile: ?0
      Referer: http://127.0.0.1:8000/webjars/springfox-swagger-ui/css/screen.css
      User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
        (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36
    allowRedirects: true
    stream: true
  validate:
  - eq:
    - status_code
    - 200
- name: Request api:/api/
  request:
    url: http://127.0.0.1:8000/api/
    method: GET
    headers:
      sec-ch-ua: '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"'
      sec-ch-ua-mobile: ?0
      Accept: '*/*'
      Connection: keep-alive
      User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
        (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36
      Referer: http://127.0.0.1:8000/swagger-ui.html
      Sec-Fetch-Site: same-origin
      Sec-Fetch-Dest: empty
      Host: 127.0.0.1:8000
      Accept-Encoding: gzip, deflate, br
      Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
      Sec-Fetch-Mode: cors
    allowRedirects: true
    stream: true
  validate:
  - eq:
    - status_code
    - 200
  - eq:
    - body.code
    - '00'
```

然后把`apiIndex.yml`复制到`resources/testcases`目录下。
因`POM`模式下遵循规则如下：

1. 测试工程包名由groupId+artifactId组合而成，作为类路径查找测试数据文件的根目录，如上案例，类路径默认按照：`/vip/lematech/hrun4j/quickstartdemo`路径作为系统根路径去查找数据文件，如果包名变更需同步修改运行配置，修改方式如下：` RunnerConfig.getInstance().setPkgName("新的包名");`

2. 包根路径下的`testcases`必须存在，它和资源路径下的`testcases`是映射关系，具体的映射关系如下：
  
    1. 一个测试Java类对应一个文件夹，如果文件夹名是demo，那么Java类名则为DemoTest.java，测试Java类必须继承`hrun4j`，从而引入`hrun4j`能力。
    
    2. 类中一个方法对应一份测试用例，如果测试用例名为`getScene.yml`，那么类中Java方法名为`getScene`，且方法申请如下：
       
        ```
        @Test(dataProvider = "dataProvider")
        public void getScene(TestCase testCase) {
                TestCaseExecutorEngine.getInstance().execute(testCase);
        }
        ```
        
### 编写首页案例并运行

1. 创建`IndexTest.java`类，并新增`apiIndex`方法，核心代码如下：
    
    ```
    public class IndexTest extends hrun4j {
        @Test(dataProvider = "dataProvider")
        public void apiIndex(TestCase testCase) {
            TestCaseExecutorEngine.getInstance().execute(testCase);
        }
    }
    ```

2. 右键运行apiIndex用例

3. 执行通过，执行输出信息如下：

```
2021-07-01 17:48:47.403 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Request api:/api/ 
2021-07-01 17:48:47.405 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：http://127.0.0.1:8000/api/ 
2021-07-01 17:48:47.409 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：GET 
2021-07-01 17:48:47.409 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求头：{sec-ch-ua=" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91", sec-ch-ua-mobile=?0, Accept=*/*, Connection=keep-alive, User-Agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36, Referer=http://127.0.0.1:8000/swagger-ui.html, Sec-Fetch-Site=same-origin, Sec-Fetch-Dest=empty, Host=127.0.0.1:8000, Accept-Encoding=gzip, deflate, br, Accept-Language=zh-CN,zh;q=0.9,en;q=0.8, Sec-Fetch-Mode=cors} 
2021-07-01 17:48:47.434 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200 
2021-07-01 17:48:47.434 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"code":"00","message":"Hello,Lematech~!","timestamp":1625132927423} 
2021-07-01 17:48:47.435 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：0 
2021-07-01 17:48:47.435 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：0.024 秒 
2021-07-01 17:48:47.435 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"Transfer-Encoding":"chunked","Date":"Thu, 01 Jul 2021 09:48:47 GMT","Content-Type":"application/json;charset=UTF-8"} 
2021-07-01 17:48:47.436 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie： 
2021-07-01 17:48:47.441 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过 
2021-07-01 17:48:47.448 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：body.code，预期值：00，实际值：00，测试结论：通过 
2021-07-01 17:48:47.453 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================apiIndex====================]@END 
2021-07-01 17:48:47.455 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@afterSuite() 
```

🔥🔥🔥恭喜你! 你基于POM模式已经完成了第一个案例录制回放，继续看，后面还有更多有意思的东西等着你！

**关于测试用例数据文件格式，可参考李隆兄`HttpRunner`格式：[这里](https://v2.httprunner.org/prepare/testcase-structure/)**

### 编写获取登录态案例

上面是一个非常简单的案例，我们接下来会继续完善其他测试用例，我们可以以同样方式生成getToken测试用例，运行之后效果如下：

```
2021-07-01 18:21:58.355 [main] INFO  vip.lematech.hrun4j.helper.LogHelper -  Add function to static code block ! 
2021-07-01 18:22:00.966 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getToken====================]@START 
2021-07-01 18:22:00.978 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Request api:/api/get-token 
2021-07-01 18:22:00.983 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：http://127.0.0.1:8000/api/get-token 
2021-07-01 18:22:00.984 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：POST 
2021-07-01 18:22:01.220 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求头：{Origin=http://127.0.0.1:8000, Accept=*/*, device_sn=lematech, app_version=1.0.0, os_platform=pc, Connection=keep-alive, User-Agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36, Referer=http://127.0.0.1:8000/swagger-ui.html, Sec-Fetch-Site=same-origin, Sec-Fetch-Dest=empty, Host=127.0.0.1:8000, Accept-Encoding=gzip, deflate, br, Sec-Fetch-Mode=cors, sec-ch-ua=" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91", sec-ch-ua-mobile=?0, Accept-Language=zh-CN,zh;q=0.9,en;q=0.8, Content-Length=22, Content-Type=application/json} 
2021-07-01 18:22:01.221 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求json：{"sign":"string"} 
2021-07-01 18:22:01.317 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200 
2021-07-01 18:22:01.318 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"code":"403","message":"认证失败！","timestamp":1625134921280} 
2021-07-01 18:22:01.318 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：0 
2021-07-01 18:22:01.318 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：0.069 秒 
2021-07-01 18:22:01.319 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"Transfer-Encoding":"chunked","Date":"Thu, 01 Jul 2021 10:22:01 GMT","Content-Type":"application/json;charset=UTF-8"} 
2021-07-01 18:22:01.319 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie： 
2021-07-01 18:22:01.426 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过 
2021-07-01 18:22:01.429 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：body.code，预期值：403，实际值：403，测试结论：通过 
2021-07-01 18:22:01.431 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getToken====================]@END 
2021-07-01 18:22:01.435 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@afterSuite() 
```

通过上面的信息，我们发现接口跑通了，但**认证失败🐞🐞🐞**了！！！

为何接口会认证失败？在业务要求说明曾经说过，token生成需要传sign且sign值需要经过一系列动态加密生成的才符合要求，因此sign生成需要借助表达式来完成。

`hrun4j`提供两种表达式脚本，一种是`BeanShell`，另一种是`Aviator`，两种脚本差异性及使用，参考FAQ和脚本使用方法，这里我们选择`Aviator`完成动态Sign的生成。

#### 编写Aviator自定义脚本

>⚡️ 注意：`hrun4j`涉及到变量引用、表达式引用、脚本引用及文件引用，一律采用${变量|表达式|内置函数}方式
> 1. 引用变量a：${a}
> 2. 引用自定义表达式：${defineMethod(param1,param2,param3)}
> 3. 引用内置函数：${helloWorld()}
> 4. 引用测试数据：${P(文件相对或绝对路径)}
> 5. 引用BeanShell脚本：${BSH(脚本相对或绝对路径)}
> 6. 引用Aviator表达式：${aviator语法}

非常强大，非常方便！

自定义Aviator表达式定义方式如下：

1. 自定义一个Java类`SignGenerateFunction`继承`AbstractFunction`类
2. 重写`call`和`getName`方法，关于重写的方法说明如下：
    * call方法：函数内部业务逻辑实现,用于处理复杂业务逻辑，可通过`env`接收上下文环境变量信息，可通过`AviatorObject... args` 接收多个可变自定义参数
    * getName：表达式名称或自定义函数名字
3. `MyFunction`用于归纳自定义表达式类，可把`SignGenerateFunction`类放到`MyFunction`中管理

最终自定义表达式代码如下：

```
public class MyFunction {
    public static final String TOKEN_KEY = "hrun4j";
    public static class SignGenerateFunction extends AbstractFunction {
        @Override
        public AviatorObject call(Map<String, Object> env, AviatorObject arg1, AviatorObject arg2, AviatorObject arg3) {
            StringBuffer content = new StringBuffer();
            content.append(arg1.getValue(env)).append(arg2.getValue(env)).append(arg3.getValue(env));
            String crypContent = content.toString();
            String sign = SecureUtil.hmac(HmacAlgorithm.HmacSHA1, TOKEN_KEY).digestHex(crypContent);
            LogHelper.info("加密秘钥：{},加密内容：{},生成的签名：{}", TOKEN_KEY, crypContent, sign);
            return new AviatorString(sign);
        }
        @Override
        public String getName() {
            return "signGenerate";
        }
    }
}
```

表达式说明：该表达式名称是`signGenerate`,可接收3个自定义参数及上下文变量（默认带）

是不是表达式写好了就可以了吗？ 不是的，还需要把自定义函数添加到表达式管理器中，具体添加表达式代码很简单：

```
AviatorEvaluator.addFunction(new MyFunction.SetupHookFunction());
```

其中AviatorEvaluator为单例模式，因此可以调用直接添加新的函数。

⚡️ **注意：`hrun4j`规定：添加表达式、初始化运行配置及hrun4j能力继承，全部集中在`hrun4j.java`文件中管理**

因此最后`Hrun4j.java`代码结构如下：

```
public class Hrun4j extends TestBase {
    @Override
    @BeforeSuite
    public void beforeSuite(){
        LogHelper.info(" Add function to static code block !");
        AviatorEvaluator.addFunction(new MyFunction.SetupHookFunction());
        AviatorEvaluator.addFunction(new MyFunction.TearDownHookFunction());
        AviatorEvaluator.addFunction(new MyFunction.SignGenerateFunction());

        /**
        * 包名，资源路径下查找测试用例前置，默认：vip.lematech.hrun4j
        */
        RunnerConfig.getInstance().setPkgName("vip.lematech.hrun4j.quickstartdemo");
        /**
        * Test case file suffix
        */
        RunnerConfig.getInstance().setTestCaseExtName(Constant.SUPPORT_TEST_CASE_FILE_EXT_YML_NAME);
    }
}
```
包含了加载自定义表达式、初始化配置及测试能力继承，后续测试代码类可直接集成`hrun4j`完成初始化操作。

#### 编写BeanShell自定义脚本

如果觉得aviator有点麻烦，我们可以通过编写`Beanshell`脚本来解决复杂业务逻辑问题，他不仅可以实现复杂业务逻辑，还能进行复杂业务验证哦！

1. 在测试资源（`resources`）创建`bsh`目录，`bsh`目录用于存储`BeanShell`脚本
2. 编写`BeanShell`，并命名成`signGenerate.bsh`，用于处理`sign`生成
    
    ```
        #!/bin/java bsh.Interpreter
        import cn.hutool.crypto.SecureUtil;
        import cn.hutool.crypto.digest.HmacAlgorithm;
        import vip.lematech.hrun4j.helper.LogHelper;
        public static final String TOKEN_KEY = "hrun4j";
        print("BeanShell脚本处理复杂业务逻辑");
        print("请求参数："+$REQUEST);
        print("响应参数："+$RESPONSE);
        print("上下文参数："+$ENV);
        print("上下文参数："+$ENV.get("device_sn"));
        StringBuffer content = new StringBuffer();
    content.append($ENV.get("device_sn")).append($ENV.get("os_platform")).append($ENV.get("app_version"));
        String crypContent = content.toString();
        String sign = SecureUtil.hmac(HmacAlgorithm.HmacSHA1, TOKEN_KEY).digestHex(crypContent);
        return sign;
    ```
    
3. 新增`getTokenByBSH.yml`文件，通过`$BSH('bsh/signGenerate.bsh')`引用并赋值
   
   ```
           config:
          name: Testcase Description
        teststeps:
        - name: Request api:/api/get-token
          variables:
            device_sn: lematech
            os_platform: pc
            app_version: 1.0.0
          request:
            url: http://127.0.0.1:8000/api/get-token
            method: POST
            headers:
              device_sn: ${device_sn}
              app_version: ${app_version}
              os_platform: ${os_platform}
            json:
              sign: ${BSH('bsh/signGenerate.bsh')}
          validate:
          - eq:
            - status_code
            - 200
          - eq:
            - body.code
            - '00'
          extract:
            - token: body.data.token
   ```

⚡️注意：关于BeanShell脚本编写
1. `$REQUEST`：框架内置对象，用于存储当前接口请求参数
2. `$RESPONSE`：框架内置对象，用于存储当前接口响应参数
3. `ENV`：框架内置对象，用于存储上下文参数
4. `BeanShell`：通过`return value`，完成参数赋值
    
#### 在脚本中使用自定义表达式

1. 编辑getToken.yml，在sign的取值时通过表达式生成即`${signGenerate(device_sn,os_platform,app_version)}`

2. 把加签相关参数`device_sn|os_platform|app_version`抽取出来，作为自定义变量，放到`teststep.variables`也可以放到`config.variables`
   
   ⚡️**注意：如果不抽取出放在variables，三个参数值均为null**

3. 改造后（校验、表达式）脚本如下：
    
    ```
        config:
          name: Testcase Description
    teststeps:
    - name: Request api:/api/get-token
          variables:
             device_sn: lematech
             os_platform: pc
             app_version: 1.0.0
          request:
             url: http://127.0.0.1:8000/api/get-token
             method: POST
             headers:
               device_sn: ${device_sn}
               app_version: ${app_version}
               os_platform: ${os_platform}
            json:
              sign: ${signGenerate(device_sn,os_platform,app_version)}
          validate:
          - eq:
             - status_code
             - 200
          - eq:
             - body.code
             - '403'

    ```
    
    ⚡️注意：
    1. 步骤相关的变量存放在`teststep.variables`,配置相关的变量存放在`config.variables`
    2. 变量、方法引用方式：`${变量名|方法名}`，其中方法名里面的参数不需要再加`${变量名}`


#### 调试获取登录态测试用例

再次调试，发现脚本依然执行失败，但通过日志查看，脚本已经成功生成Token，只是录制回放的`body.code`值设置成403，把脚本body.code调整成00即可，完整日志输出如下：

```
2021-07-01 22:56:05.313 [main] INFO  vip.lematech.hrun4j.helper.LogHelper -  Add function to static code block ! 
2021-07-01 22:56:07.959 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getToken====================]@START 
2021-07-01 22:56:07.984 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Request api:/api/get-token 
2021-07-01 22:56:08.291 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 加密秘钥：hrun4j,加密内容：lematechpc1.0.0,生成的签名：d7993d412279a0f32437733fbb277ba3c70a58d0 
2021-07-01 22:56:08.298 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：http://127.0.0.1:8000/api/get-token 
2021-07-01 22:56:08.298 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：POST 
2021-07-01 22:56:08.428 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求头：{device_sn=lematech, app_version=1.0.0, os_platform=pc} 
2021-07-01 22:56:08.429 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求json：{"sign":"d7993d412279a0f32437733fbb277ba3c70a58d0"} 
2021-07-01 22:56:08.547 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200 
2021-07-01 22:56:08.548 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"code":"00","data":{"token":"u8nxnss22hsvh3hl"},"message":"ok！","timestamp":1625151368509} 
2021-07-01 22:56:08.548 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：0 
2021-07-01 22:56:08.548 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：0.089 秒 
2021-07-01 22:56:08.548 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"Transfer-Encoding":"chunked","Date":"Thu, 01 Jul 2021 14:56:08 GMT","Content-Type":"application/json;charset=UTF-8"} 
2021-07-01 22:56:08.549 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie： 
2021-07-01 22:56:08.712 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：status_code，预期值：200，实际值：200，测试结论：通过 
2021-07-01 22:56:08.715 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 检查点：body.code，预期值：00，实际值：00，测试结论：通过 
2021-07-01 22:56:08.722 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [====================getToken====================]@END 
2021-07-01 22:56:08.725 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - [========================================]@afterSuite() 

```

至此，获取登录态案例已经写完了，是不是很简单啊！！！

### 编写添加用户用例

通过以上两个案例，已经对`hrun4j POM`有一定了解，接下来我们继续什么学习其规则：

#### 编写添加用例脚本

以同样方式（`har2case`）生成添加用户测试用例，请求接口：`POST /api/user/{uid}`，然后生成添加用户`addUser.yml`脚本如下：

```
config:
  name: Testcase Description
  variables: {}
  verify: false
teststeps:
- name: Request api:/api/user/123
  request:
    url: http://127.0.0.1:8000/api/user/123
    method: POST
    headers:
      Origin: http://127.0.0.1:8000
      Accept: '*/*'
      Connection: keep-alive
      User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36
        (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36
      Referer: http://127.0.0.1:8000/swagger-ui.html
      Sec-Fetch-Site: same-origin
      Sec-Fetch-Dest: empty
      Host: 127.0.0.1:8000
      Accept-Encoding: gzip, deflate, br
      Sec-Fetch-Mode: cors
      sec-ch-ua: '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"'
      sec-ch-ua-mobile: ?0
      Accept-Language: zh-CN,zh;q=0.9,en;q=0.8
      Content-Length: '45'
      Content-Type: application/json
    json:
      password: passwod
      name: name
    allowRedirects: true
    stream: true
  validate:
  - eq:
    - status_code
    - 200
  - eq:
    - body.code
    - '09'
```

这个接口虽然录制回放成功了，但接口不属于正常业务场景，因上面请求后台会提示：`{"code":"09","message":" header device_sn is required","data":null,"timestamp":1625281678543}`，这个提示是正常的。

我们先来看添加用户后端接口定义：

```java
    @PostMapping(value = "/get-token")
    public R getToken(@RequestHeader(value = "device_sn") String deviceSN,
                      @RequestHeader(value = "os_platform", required = false) String osPlatform,
                      @RequestHeader(value = "app_version", required = false) String appVersion,
                      @RequestBody TokenVO tokenVO) {
        String expectSign = tokenServiceImpl.generateToken(deviceSN, osPlatform, appVersion);
        log.info("sign: {}", expectSign);
        boolean validateResult = tokenServiceImpl.validateToken(tokenVO.getSign(), expectSign);
        if (!validateResult) {
            return R.fail(CommonBusinessCode.Authorization_FAILED_EXCEPTION);
        }
        String token = RandomUtil.randomString(16);
        tokenServiceImpl.storyToken(deviceSN, token);
        Map resultData = Maps.newHashMap();
        resultData.put("token", token);
        return R.ok(resultData);
    }
```

通过对控制层接口定义，可以看出来，当前接口请求头必须带`device_sn`


在把`addUser.yml`脚本拷贝在`resources/testcases`目录前，我们先创建user目录，这个目录用于管理用户模块业务场景，创建完成后把`addUser.yml`拷贝过去，因测试用例及所在目录和测试代码存在映射关系，因此我们得在代码区创建`user`子包和`UserTest.java`文件并添加`addUser`方法。

最终目录结构如下：

![-w648](http://cdn.lematech.vip/mweb/16252828669484.jpg)

测试代码如下：

![-w1084](http://cdn.lematech.vip/mweb/16252829098853.jpg)

⚡️注意：新增测试代码类必须集成`hrun4j`才能引入其能力，测试方法是规定格式要求（数据驱动、测试方法执行及方法名和测试脚本名一致）

我们继续优化测试脚本，需要修改`addUser.yml`脚本，添加`device_sn`请求头，但请求头哪里来的呢？首先他是通过`get-token`用例生成的，其次我们需要把他提取出来，给`addUser`用例用。 

这两部操作在接口测试定义成：**测试用例依赖&数据依赖**，`hrun4j`已经提供了一套较为完善的解决方案。

1. 测试用例依赖
    在测试步骤`teststep`中，可直接引用其他用例(`testcase: 用例路径`)，从而解决用例依赖问题，因此我们修改`addUser.yml`脚本步骤，在添加用户前，先登录，最终脚本如下：
    
    ```
        config:
          name: Testcase Description
          variables: {}
          verify: false
    teststeps:
        - name: 用户登录
          testcase: getToken.yml
        - name: Request api:/api/user/123
          request:
            url: http://127.0.0.1:8000/api/user/123
            method: POST
            headers:
              device_sn: lematech
              Content-Type: application/json
            json:
              password: passwod
              name: name
          validate:
          - eq:
            - status_code
            - 200
          - eq:
            - body.code
            - '09'
    ```
    
    ⚡️注意：`teststep`通过指定`testcase`参数引用其他用例
2. 数据依赖
    
    上面虽然解决了用例依赖问题，但跑完发现，添加登录接口依然提示需要登录（`{"code":"09","message":" header token is required","timestamp":1625283730633} `），因为没有传token值，那token值是从哪里来的呢？`token`的值是通过上个接口生成的，因此我们需要把上一个参数返回的结果提取出来，然后在下一个接口中使用。
    
* 参数如何提取？

    返回结果数据提取方式有4种，`hrun4j`支持`jsonpath/jmespath/正则/对象提取`，极大的方便了数据提取方式，我们先来看返回结果存储在什么位置及结构如何：
    
    ```
    2021-07-03 11:42:09.916 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 当前步骤：Request api:/api/get-token 
2021-07-03 11:42:10.207 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 加密秘钥：hrun4j,加密内容：lematechpc1.0.0,生成的签名：d7993d412279a0f32437733fbb277ba3c70a58d0 
2021-07-03 11:42:10.217 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求地址：http://127.0.0.1:8000/api/get-token 
2021-07-03 11:42:10.218 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求类型：POST 
2021-07-03 11:42:10.295 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求头：{device_sn=lematech, app_version=1.0.0, os_platform=pc} 
2021-07-03 11:42:10.296 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 请求json：{"sign":"d7993d412279a0f32437733fbb277ba3c70a58d0"} 
2021-07-03 11:42:10.433 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应码：200 
2021-07-03 11:42:10.434 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应体：{"code":"00","data":{"token":"9et5witl0o791k7m"},"message":"ok！","timestamp":1625283730378} 
2021-07-03 11:42:10.434 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应内容长度：0 
2021-07-03 11:42:10.435 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应时间：0.101 秒 
2021-07-03 11:42:10.436 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应头：{"Transfer-Encoding":"chunked","Date":"Sat, 03 Jul 2021 03:42:10 GMT","Content-Type":"application/json;charset=UTF-8"} 
2021-07-03 11:42:10.436 [main] INFO  vip.lematech.hrun4j.helper.LogHelper - 响应cookie： 
    ```
    
    可以看出`token`存储在响应结构体中即`body`，那我们完全可以基于对象方式提取token，提取的表达式：`body.data.token`，提取完后存储在某个变量token中，因此最后的规则：`token: body.data.token`

* 参数如何引用？
    
    上面我们已经把token提取出来了，那我们如何引用呢？`hrun4j`引用规则：`${提取的变量名}`，即可完成参数引用
    

最终优化的脚本如下：

1. `getToken.yml`脚本：

    ```
    config:
      name: Testcase Description
    teststeps:
    - name: Request api:/api/get-token
      variables:
        device_sn: lematech
        os_platform: pc
        app_version: 1.0.0
      request:
        url: http://127.0.0.1:8000/api/get-token
        method: POST
        headers:
          device_sn: ${device_sn}
          app_version: ${app_version}
          os_platform: ${os_platform}
        json:
          sign: ${signGenerate(device_sn,os_platform,app_version)}
      validate:
      - eq:
        - status_code
        - 200
      - eq:
        - body.code
        - '00'
      extract:
        - token: body.data.token
    ```
    
2. `addUser.yml`脚本：

    ```
    config:
      name: Testcase Description
      variables: {}
      verify: false
    teststeps:
    - name: 用户登录
      testcase: getToken.yml
    - name: Request api:/api/user/123
      request:
        url: http://127.0.0.1:8000/api/user/123
        method: POST
        headers:
          device_sn: lematech
          token: ${token}
          Content-Type: application/json
        json:
          password: passwod
          name: name
      validate:
      - eq:
        - status_code
        - 200
      - eq:
        - body.code
        - '09'
    
    ```
    
    至此，我们已经完成了3个案例编写，对于框架使用有了基本了解。
    
    
### 测试用例集编写
    
在实际使用过程中，我们都是根据测试阶段或者测试用例属性来进行测试用例分类的，会划分成`冒烟用例`、`集成用例`、`回归用例`、`系统用例`等，然后把他们归纳成某一类测试用例集(全部统一放到`resources/testsuite`)，每次运行时，直接跑一遍然后生成测试报告。

`hrun4j`提供两种测试用例集编写的方式，一种编写`testsuite.yml`，另一种是编写`testng.xml`，关于两种差异性如下：

1. `testng.xml`是基于`POM`模式下专用的，其底层是想直接复用testng能力，因为它太强大了！
2. `testsuite.yml`也可以配置测试用例集，它可以用在`POM`和`CLI`，但在`POM`如果涉及到自定义`aviator`脚本编写时，不可用！
因此建议`CLI`下使用`testsuite.yml`,`POM`模式下使用`testng.xml`编写测试用例集。

最后我们把我们编写好的三个用例组装成测试用例集并命名成：`best_practice.xml`，其配置如下：

```xml
<!DOCTYPE suite SYSTEM "http://testng.org/testng-1.0.dtd" >
<suite name="Best Practice HttpRunner 4J demo testsuite" parallel="false">
    <listeners>
        <listener class-name="org.uncommons.reportng.HTMLReporter"/>
        <listener class-name="org.uncommons.reportng.JUnitXMLReporter"/>
    </listeners>
    <test name="Hello hrun4j">
        <classes>
            <class name="vip.lematech.hrun4j.quickstartdemo.testcases.IndexTest">
            </class>
        </classes>
    </test>
    <test name="用户模块">
        <classes>
            <class name="vip.lematech.hrun4j.quickstartdemo.testcases.user.UserTest">
            </class>
        </classes>
    </test>
</suite>

```

选择文件右边运行，效果如下：
![-w1321](http://cdn.lematech.vip/mweb/16252975653020.jpg)

是不是很简单啊！！！

之所以考虑借助testng来组织测试用例及运行，因为他太强大了，它是各类端到端的测试解决方案。

### 查看测试报告

测试用例集跑完之后，会在当前工程下生成测试报告，报告目录在：`test-output`，打开报告`html/index.html`页面，报告效果如下：

1. 概览报告：
    ![-w1435](http://cdn.lematech.vip/mweb/16252978070550.jpg)
2. 详细报告：
    ![-w1434](http://cdn.lematech.vip/mweb/16252978468039.jpg)
3. 详细日志
    ![-w1429](http://cdn.lematech.vip/mweb/16252978879567.jpg)


### 持续集成

在实际使用过程中，我们接口自动化测试都是跟流水线打通的，也就是开发部署完后，自动触发自动化测试用例集进行构建，构建完了把测试报告发送到相关研发测试邮箱中，那我们如何把工程内建到流水线中呢？

在内建到流水线前，我们先了解如何把工程下的测试用例集通过`maven`命令跑起来，我们可以直接在工程根目录下执行`mvn clean test`命令，这个命令会把当前工程下的所有测试用例全部跑了，但我们只需要跑我们配置好的测试用例，如何设置呢？

先看`pom.xml`配置：

```
<plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <configuration>
                    <suiteXmlFiles>
                        <suiteXmlFile>${xmlFileName}</suiteXmlFile>
                    </suiteXmlFiles>
                </configuration>
            </plugin>
        </plugins>
```
可以看出pom构建的的时候可以指定跑那个测试用例集配置文件的，因此
构建命令可指定某个测试用例集（即`参数化构建`）,参数化构建命令如下：

`mvn clean test -DxmlFileName=src/test/resources/testsuite/best_practice.xml`

如果要做持续集成，可直接把整个工程提交到git，然后在Jenkins配置好Maven和新增测试用例集变量，即可完成参数化构建内置到流水线中。

## 补充说明

### 关于脚手架工程说明

不过`CLI`还是`POM`模式下，生成的脚手架，有非常详细的说明，几乎已经包含了框架核心知识点，完全可以通过脚手架自学，在开发脚本前，建议先读`ReadMe.md`文档，了解项目组织架构及功能模块划分。

### 觉得`CLI`模式更方便？

如果你习惯使用`CLI`模式，可直接把`POM`下的`resources`转变成`CLI`项目工程，然后把`Aviator`脚本切换成`BeanShell`即可，再通过`testsuite.yml`管理测试用例集。

### 最佳实践工程下载

按上面操作没成功？ 点击[这里](https://cdn.lematech.vip/quick-start-demo.zip)，下载工程代码
