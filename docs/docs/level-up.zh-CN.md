---
order: 6
title: 框架进阶
group:
  title: 框架使用
nav:
  title: 文档
  path: /docs
  order: 1
---

## 框架内置属性

### 内置对象

框架响应数据内置对象有：
1. `status_code`：Integer类型，用于存储响应码
2. `headers`：Map类型，用于存储响应头信息
3. `time`：Double类型，用于存储响应时间
4. `body`：对象类型，用于存储响应体信息
5. `cookies`：Map类型，用于存储cookie信息信息
6. `contentLength`：Long类型，用于存储响应长度

### 内置方法

框架提供多个内置方法，方法引用方式：${方法名(方法参数)}：

1. `helloWorld`：用于输出`hello,hrun4j`
2. `ENV`：用于提取`.env`文件中某个变量值
3. `BSH`：用于执行指定BSH脚本并完成赋值的
4. `P`：用于读取指定目录下的数据文件

## 提取

`hrun4j`提供多种响应数据提取方式，支持`正则表达式/Jsonpath/Jmespath/对象提取`

1. `Jsonpath`：可以通过`$.对象.属性`获取，对象即为框架内置对象
2. `正则表达式`：通过正则获取，值必须以`^`开头并以`$`结尾
3. `对象提取`：通过框架提供的内置对象获取,`对象`或者`对象.属性`方式获取
4. `Jmespath`：和方式三类似，但可以支持更复杂的表达式提取，属`Jmespath`专有表达式

## 断言

因框架是通过反射机制构造`org.hamcrest.Matchers`对象进行断言代码生成的，因此`Matchers`类型所有方法均可以使用，现只支持预期和实际参数断言，方法非常多，列罗常用方法如下：

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


## 上传和下载

### 上传

`hrun4j`支持多文件上传，指定files参数列表值即可，使用非常简单！

```
  files:
    file1: uploadFile1.txt
    file2: uploadFile2.txt
```

不仅支持多文件上传，框架还支持上传过程中进度显示，非常贴心。

### 下载


`hrun4j`支持单下载，默认下载到工作区，把脚本`stream`参数设置成`false`即可，使用非常简单！

```
  stream: false
```

不仅支持单文件下载，框架还支持下载过程中进度显示，非常贴心。

## 处理复杂业务逻辑

框架支持使用`Aviator`或者`BeanShell`来编写脚本，非常强大，体验很好，强烈建议：`CLI`模式下只使用`BeanShell`脚本处理业务逻辑，`POM`随意。

## 国际化

参考国际化篇章

## 校验器

参考断言篇章

补充说明：
1. 在使用校验器过程中，校验器预期值可通过表达式方式赋值

## 处理器

框架提供了`config`和`teststep`前后置处理器，用于数据准备或者数据清洗，保障用例可循环使用。

### 前置处理器

通过指定`setup_hooks`参数值，进行前置逻辑处理：

```
    setup_hooks:
      - "${1+2}"
      - "${hook(xteststep_setup_hooks2)}"
      - "${hook(xteststep_setup_hooks3)}"
      - "${hook(xteststep_setup_hooks4)}"
      - total1: '${add(1, 5)}'
      - total2: '${add(3, 5)}'
```

其中支持：`v`和`k-v`模式，关于模式说明：

1. `v`模式：只完成业务逻辑处理，无返回值
2. `k-v`模式：不仅完成业务逻辑处理，把处理的结果赋值给k变量

### 后置处理器


通过指定`teardown_hooks`参数值，进行前置逻辑处理：

```
    teardown_hooks:
      - "${1+2}"
      - "${hook(xteststep_setup_hooks2)}"
      - "${hook(xteststep_setup_hooks3)}"
      - "${hook(xteststep_setup_hooks4)}"
      - total1: '${add(1, 5)}'
      - total2: '${add(3, 5)}'
```

其中支持：`v`和`k-v`模式，关于模式说明：

1. `v`模式：只完成业务逻辑处理，无返回值
2. `k-v`模式：不仅完成业务逻辑处理，把处理的结果赋值给k变量


## 更多案例

框架在开发过程中，一边开发一遍写单测及思考各种使用场景，所以把框架使用过程程中可能涉及到的场景全部单独编写了测试用例，全部汇总到`hrun4j-test-demo`测试用例里面，如果有上面为介绍的，可查看案例说明。

### 基础案例说明

```
├── testApiReferenceDemo.yml
├── testAviatorExpDemo.yml
├── testBeanShellDemo.yml
├── testComplexSingleDemo.yml
├── testCurrentStepRequestAndResponseDataDemo.yml
├── testDataAssociatedProviderDemo.yml
├── testDataProviderFromCsvDemo.yml
├── testDefineRequestConfigDemo.yml
├── testFileDownloadDemo.yml
├── testMoreComplexSingleDemo.yml
├── testMultipleGetDataDemo.yml
├── testReferenceEnvDemo.yml
├── testSimpleSingleDemo.yml
├── testTestCaseReferenceDemo.yml
├── testVariablePriorityDemo.yml

```
标题简单明了，基本知道用途。

### 业务场景案例说明

```
├── delAssignUserInfo.yml
├── loginAndAddUser.yml
├── loginAndResetAll.yml
├── loginAndUpdateUser.yml
├── loginAndUploadUser.yml
└── queryAssignUserInfo.yml
```
