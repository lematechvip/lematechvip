---
order: 3
title: 核心概念
group:
  title: 框架使用
nav:
  title: 文档
  path: /docs
  order: 1
---


## 测试用例

测试用例定义参考WIKI：
>A test case is a specification of the inputs, execution conditions, testing procedure, and expected results that define a single test to be executed to achieve a particular software testing objective, such as to exercise a particular program path or to verify compliance with a specific requirement.

概括下来，一条测试用例（testcase）应该是为了测试某个特定的功能逻辑而精心设计的，并且至少包含如下几点：

* 明确的测试目的（achieve a particular software testing objective）
* 明确的输入（inputs）
* 明确的运行环境（execution conditions）
* 明确的测试步骤描述（testing procedure）
* 明确的预期结果（expected results）

对应地，`hrun4j` 的测试用例描述方式进行如下设计：

1. 测试用例应该是完整且独立的，每条测试用例应该是都可以独立运行的；在 `hrun4j` 中，每个 YAML/JSON 文件对应一条测试用例。
2. 测试用例包含 测试脚本 和 测试数据 两部分：
    *     测试用例 = 测试脚本 + 测试数据
    *     测试脚本 重点是描述测试的 业务功能逻辑，包括预置条件、测试步骤、预期结果等，并且可以结合辅助函数（`hrun4j.bsh/MyFunction.java`）实现复杂的运算逻辑；可以将 测试脚本 理解为编程语言中的 类（class）；
    *     测试数据 重点是对应测试的 业务数据逻辑，可以理解为类的实例化数据；
    *     测试数据 和 测试脚本 分离后，就可以比较方便地实现数据驱动测试，通过对测试脚本传入一组数据，实现同一业务功能在不同数据逻辑下的测试验证。

## 测试步骤（teststep）

测试用例是测试步骤的 有序 集合，而对于接口测试来说，每一个测试步骤应该就对应一个 API 的请求描述。

## 测试用例集（testsuite）

`测试用例集` 是 `测试用例` 的 `无序` 集合，集合中的测试用例应该都是相互独立，不存在先后依赖关系的。

如果确实存在先后依赖关系怎么办，例如登录功能和下单功能。正确的做法应该是，在下单测试用例的前置步骤中执行登录操作。

```
config:
  name: order product

teststeps:
  - name: login
    testcase: testcases/login.yml

  - name: add to cart
    api: api/add_cart.yml

  - name: make order
    api: api/make_order.yml
```

## 测试场景

测试场景 和 测试用例集 是同一概念，都是 测试用例 的 无序 集合。

## 数据结构定义

### 公共Schema定义

```
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "description": "common json schema definitions for hrun4j api/testcase",
  "definitions": {
    "name": {
      "description": "used as api/teststep/testcase identification",
      "type": "string",
      "examples": [
        "basic test for httpbin"
      ]
    },
    "base_url": {
      "description": "The base_url will be used with relative URI",
      "type": "string",
      "examples": [
        "https://httpbin.org"
      ]
    },
    "variables": {
      "description": "define variables for api/teststep/testcase/testsuite",
      "oneOf": [
        {
          "type": "object",
          "examples": [
            {
              "var1": "value1",
              "var2": "value2"
            }
          ]
        },
        {
          "type": "array",
          "items": {
            "type": "object",
            "maxProperties": 1,
            "minProperties": 1
          },
          "examples": [
            {
              "var1": "value1"
            },
            {
              "var2": "value2"
            }
          ]
        },
        {
          "type": "string",
          "pattern": "^\\$.*",
          "examples": [
            "${prepared_variables}",
            "${prepare_variables()}",
            "${prepare_variables($a, $b)}"
          ]
        }
      ]
    },
    "verify": {
      "description": "whether to verify the server’s TLS certificate",
      "type": "boolean",
      "examples": [
        true,
        false
      ]
    },
    "hook": {
      "description": "used to define setup_hooks/teardown_hooks for api/teststep/testcase",
      "type": "array",
      "items": {
        "oneOf": [
          {
            "description": "call setup/teardown hook functions, return value and assign to variable",
            "type": "object",
            "examples": [
              {
                "total": "${sum_two(1, 5)}",
                "filed_name": "get_decoded_response_field($response)"
              }
            ]
          }
        ]
      }
    },
    "config": {
      "description": "used in testcase to configure common fields",
      "type": "object",
      "properties": {
        "name": {
          "$ref": "#/definitions/name"
        },
        "base_url": {
          "$ref": "#/definitions/base_url"
        },
        "variables": {
          "$ref": "#/definitions/variables"
        },
        "setup_hooks": {
          "$ref": "#/definitions/hook"
        },
        "teardown_hooks": {
          "$ref": "#/definitions/hook"
        },
        "verify": {
          "$ref": "#/definitions/verify"
        }
      },
      "required": [
        "name"
      ]
    },
    "request": {
      "description": "used to define a api request. properties is the same as python package `requests.request`",
      "type": "object",
      "properties": {
        "method": {
          "type": "string",
          "description": "request method",
          "enum": [
            "GET",
            "POST",
            "OPTIONS",
            "HEAD",
            "PUT",
            "PATCH",
            "DELETE",
            "CONNECT",
            "TRACE"
          ]
        },
        "url": {
          "description": "request url, may be absolute or relative URI",
          "type": "string",
          "examples": [
            "http://httpbin.org/get?a=1&b=2",
            "/get?a=1&b=2",
            "get?a=1&b=2"
          ]
        },
        "params": {
          "description": "query string for request url",
          "type": "object",
          "examples": [
            {
              "a": 1,
              "b": 2
            }
          ]
        },
        "data": {
          "anyOf": [
            {
              "description": "request body in json format",
              "type": "object",
              "examples": [
                {
                  "a": 1,
                  "b": 2
                }
              ]
            },
            {
              "description": "request body in application/x-www-form-urlencoded format",
              "type": "string",
              "examples": [
                "a=1&b=2"
              ]
            },
            {
              "description": "request body prepared with function, or reference a variable",
              "type": "string",
              "examples": [
                "${post_data}",
                "${prepare_data(a, b)}"
              ]
            }
          ]
        },
        "json": {
          "oneOf": [
            {
              "description": "request body in json format",
              "type": "object"
            },
            {
              "description": "request body prepared with function, or reference a variable",
              "type": "string",
              "pattern": "^\\$.*",
              "examples": [
                "${post_data}",
                "${prepare_post_data($a, $b)}"
              ]
            }
          ]
        },
        "headers": {
          "description": "request headers",
          "oneOf": [
            {
              "description": "request headers in json format",
              "type": "object",
              "examples": [
                {
                  "User-Agent": "python-requests/2.18.4",
                  "Content-Type": "application/json"
                }
              ]
            },
            {
              "description": "request headers prepared with function, or reference a variable",
              "type": "string",
              "examples": [
                "${prepared_headers}",
                "${prepare_headers(a, b)}"
              ]
            }
          ]
        },
        "cookies": {
          "description": "request cookies",
          "type": "object"
        },
        "files": {
          "description": "request files, used to upload files",
          "type": "object"
        },
        "auth": {
          "description": "Auth tuple to enable Basic/Digest/Custom HTTP Auth.",
          "type": "array"
        },
        "connectTimeout": {
          "description": "the maximum time for the client to connect to the server",
          "type": "integer",
          "examples": [
            120
          ]
        },
        "writeTimeout": {
          "description": "the maximum time for the client to write the requested data to the server after connecting to the server",
          "type": "integer",
          "examples": [
            120
          ]
        },
        "readTimeout": {
          "description": "The maximum amount of time the client waits for the server to respond to the request data after writing it",
          "type": "integer",
          "examples": [
            120
          ]
        },
        "allow_redirects": {
          "description": "Enable/disable GET/OPTIONS/POST/PUT/PATCH/DELETE/HEAD redirection. Defaults to True",
          "type": "boolean"
        },
        "proxy": {
          "description": "Dictionary mapping protocol to the URL of the proxy",
          "type": "object",
          "properties": {
            "hostname": {
              "type": "string"
            },
            "port": {
              "type": "integer"
            }
          },
          "required": [
            "hostname",
            "port"
          ],
          "examples": [
            {
              "hostname": "10.10.10.10",
              "port": 8080
            }
          ]
        },
        "verify": {
          "description": "configure verify for current api/teststep",
          "$ref": "#/definitions/verify"
        },
        "stream": {
          "description": "if False, the response content will be immediately downloaded.",
          "type": "boolean"
        }
      },
      "required": [
        "method",
        "url"
      ]
    },
    "extract": {
      "description": "used to extract session variables for later requests",
      "oneOf": [
        {
          "type": "object",
          "patternProperties": {
            "^[A-Za-z_][A-Za-z0-9_]*$": {
              "description": "extraction rule for session variable, maybe in jsonpath/regex/jmespath",
              "type": "string"
            }
          },
          "examples": [
            {
              "code__by_jsonpath": "$.code",
              "item_id__by_jsonpath": "$..items.*.id",
              "var_name__by_regex": "\"LB[\\d]*(.*)RB[\\d]*\"",
              "content_type": "headers.content-type",
              "first_name": "content.person.name.first_name"
            }
          ]
        },
        {
          "type": "array",
          "items": {
            "type": "object",
            "patternProperties": {
              "^[A-Za-z_][A-Za-z0-9_]*$": {
                "description": "extraction rule for session variable, maybe in jsonpath/regex/jmespath",
                "type": "string"
              }
            },
            "minProperties": 1,
            "maxProperties": 1
          },
          "examples": [
            {
              "code__by_jsonpath": "$.code"
            },
            {
              "item_id__by_jsonpath": "$..items.*.id"
            },
            {
              "var_name__by_regex": "\"LB[\\d]*(.*)RB[\\d]*\""
            },
            {
              "content_type": "headers.content-type"
            },
            {
              "first_name": "content.person.name.first_name"
            }
          ]
        }
      ]
    },
    "validate": {
      "description": "used to validate response fields",
      "type": "array",
      "items": {
        "description": "one validator definition",
        "oneOf": [
          {
            "type": "object",
            "properties": {
              "check": {
                "type": "string"
              },
              "comparator": {
                "type": "string"
              },
              "expect": {
                "description": "expected value"
              }
            },
            "required": [
              "check",
              "expect"
            ],
            "examples": [
              {
                "check": "body.code",
                "comparator": "gt",
                "expect": 0
              },
              {
                "check": "status_code",
                "expect": 200
              }
            ]
          },
          {
            "type": "object",
            "patternProperties": {
              "^[A-Za-z_][A-Za-z0-9_]*$": {
                "description": "validate_func_name: [check_value, expect_value]",
                "type": "array",
                "minItems": 2,
                "maxItems": 2
              }
            },
            "examples": [
              {
                "eq": [
                  "status_code",
                  200
                ]
              },
              {
                "gt": [
                  "body.code",
                  0
                ]
              }
            ]
          }
        ]
      }
    }
  }
}
```


⚡️注意：
1. `request`结构定义关于请求响应时间拆分为：`connectTimeout`、`writeTimeout`、`readTimeout`
    1. connectTimeout: 链接超时设置
    2. writeTimeout：写入超时设置
    3. readTimeout：读取超时设置
2. 在`request`中剔除`upload`自定义，文件上传由`files`来完成，支持多文件上传

### API接口Schema定义

```
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "description": "hrun4j api schema definition",
  "type": "object",
  "properties": {
    "name": {
      "$ref": "resource:/schemas/common.json#/definitions/name"
    },
    "base_url": {
      "$ref": "resource:/schemas/common.json#/definitions/base_url"
    },
    "variables": {
      "$ref": "resource:/schemas/common.json#/definitions/variables"
    },
    "request": {
      "$ref": "resource:/schemas/common.json#/definitions/request"
    },
    "setup_hooks": {
      "$ref": "resource:/schemas/common.json#/definitions/hook"
    },
    "teardown_hooks": {
      "$ref": "resource:/schemas/common.json#/definitions/hook"
    },
    "extract": {
      "$ref": "resource:/schemas/common.json#/definitions/extract"
    },
    "validate": {
      "$ref": "resource:/schemas/common.json#/definitions/validate"
    }
  },
  "required": [
    "name",
    "request"
  ],
  "examples": [
    {
      "name": "demo api",
      "variables": {
        "var1": "value1",
        "var2": "value2"
      },
      "request": {
        "url": "/api/path/$var1",
        "method": "POST",
        "headers": {
          "Content-Type": "application/json"
        },
        "json": {
          "key": "$var2"
        },
        "validate": [
          {
            "eq": [
              "status_code",
              200
            ]
          }
        ]
      }
    }
  ]
}
```

⚡️注意：
1. `name`和`request`必填字段

### 测试用例Schema定义

```
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "description": "hrun4j testcase schema v2 definition",
  "type": "object",
  "definitions": {
    "teststep": {
      "type": "object",
      "oneOf": [
        {
          "properties": {
            "name": {
              "$ref": "resource:/schemas/common.json#/definitions/name"
            },
            "request": {
              "description": "define api request directly",
              "$ref": "resource:/schemas/common.json#/definitions/request"
            },
            "variables": {
              "$ref": "resource:/schemas/common.json#/definitions/variables"
            },
            "extract": {
              "$ref": "resource:/schemas/common.json#/definitions/extract"
            },
            "validate": {
              "$ref": "resource:/schemas/common.json#/definitions/validate"
            },
            "setup_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            },
            "teardown_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            }
          },
          "required": [
            "name",
            "request"
          ]
        },
        {
          "properties": {
            "name": {
              "$ref": "resource:/schemas/common.json#/definitions/name"
            },
            "api": {
              "description": "api reference, value is api file relative path",
              "type": "string"
            },
            "variables": {
              "$ref": "resource:/schemas/common.json#/definitions/variables"
            },
            "extract": {
              "oneOf": [
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                {
                  "$ref": "resource:/schemas/common.json#/definitions/extract"
                }
              ]
            },
            "request": {
              "description": "define api request directly",
              "$ref": "resource:/schemas/common.json#/definitions/request"
            },
            "validate": {
              "$ref": "resource:/schemas/common.json#/definitions/validate"
            },
            "setup_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            },
            "teardown_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            }
          },
          "required": [
            "name",
            "api",
            "request"
          ]
        },
        {
          "properties": {
            "name": {
              "$ref": "resource:/schemas/common.json#/definitions/name"
            },
            "api": {
              "description": "api reference, value is api file relative path",
              "type": "string"
            },
            "variables": {
              "$ref": "resource:/schemas/common.json#/definitions/variables"
            },
            "extract": {
              "oneOf": [
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                {
                  "$ref": "resource:/schemas/common.json#/definitions/extract"
                }
              ]
            },
            "validate": {
              "$ref": "resource:/schemas/common.json#/definitions/validate"
            },
            "setup_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            },
            "teardown_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            }
          },
          "required": [
            "name",
            "api"
          ]
        },
        {
          "properties": {
            "name": {
              "$ref": "resource:/schemas/common.json#/definitions/name"
            },
            "testcase": {
              "description": "testcase reference, value is testcase file relative path",
              "type": "string"
            },
            "variables": {
              "$ref": "resource:/schemas/common.json#/definitions/variables"
            },
            "extract": {
              "oneOf": [
                {
                  "type": "array",
                  "items": {
                    "type": "string"
                  }
                },
                {
                  "$ref": "resource:/schemas/common.json#/definitions/extract"
                }
              ]
            },
            "validate": {
              "$ref": "resource:/schemas/common.json#/definitions/validate"
            },
            "setup_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            },
            "teardown_hooks": {
              "$ref": "resource:/schemas/common.json#/definitions/hook"
            }
          },
          "required": [
            "name",
            "testcase"
          ]
        }
      ]
    }
  },
  "properties": {
    "config": {
      "$ref": "resource:/schemas/common.json#/definitions/config"
    },
    "teststeps": {
      "description": "teststep of a testcase",
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/teststep"
      }
    }
  },
  "required": [
    "config",
    "teststeps"
  ],
  "examples": [
    {
      "config": {
        "name": "testcase name"
      },
      "teststeps": [
        {
          "name": "api 1",
          "api": "/path/to/api1"
        },
        {
          "name": "api 2",
          "api": "/path/to/api2"
        }
      ]
    },
    {
      "config": {
        "name": "demo testcase",
        "variables": {
          "device_sn": "ABC",
          "username": "${ENV(USERNAME)}",
          "password": "${ENV(PASSWORD)}"
        },
        "base_url": "http://127.0.0.1:5000"
      },
      "teststeps": [
        {
          "name": "demo step 1",
          "api": "path/to/api1.yml",
          "variables": {
            "user_agent": "iOS/10.3",
            "device_sn": "$device_sn"
          },
          "extract": [
            {
              "token": "content.token"
            }
          ],
          "validate": [
            {
              "eq": [
                "status_code",
                200
              ]
            }
          ]
        },
        {
          "name": "demo step 2",
          "api": "path/to/api2.yml",
          "variables": {
            "token": "$token"
          }
        }
      ]
    }
  ]
}
```

⚡️注意：

1. 测试用例定义必填字段分为4类：
    1. `name`和`request`必填
    2. `name`和`api`必填
    3. `name`和`testcase`必填
    4. `name`、`testcase`、`api`必填 (扩展)
2. 关于引入`name`、`request`、`api`必填 (扩展)说明
    1. `request`从`api`定义中继承初始值
    2. `request`中新增的属性值即扩展值，从而保证了`api`定义的重复利用性
   
### 测试用例集Schema定义

```
{
  "$schema": "http://json-schema.org/draft-07/schema",
  "description": "hrun4j testsuite schema v2 definition",
  "type": "object",
  "definitions": {
    "testcase": {
      "type": "object",
      "properties": {
        "name": {
          "$ref": "resource:/schemas/common.json#/definitions/name"
        },
        "variables": {
          "$ref": "resource:/schemas/common.json#/definitions/variables"
        },
        "parameters": {
          "description": "generate cartesian product variables with parameters, each group of variables will be run once",
          "type": "object"
        },
        "testcase": {
          "description": "testcase reference, value is testcase file relative path",
          "type": "string"
        }
      },
      "required": [
        "testcase"
      ]
    }
  },
  "properties": {
    "config": {
      "$ref": "resource:/schemas/common.json#/definitions/config"
    },
    "testcases": {
      "description": "testcase of a testsuite",
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "resource:/schemas/testsuite.json#/definitions/testcase"
      }
    }
  },
  "required": [
    "config",
    "testcases"
  ],
  "examples": [
    {
      "config": {
        "name": "testsuite name"
      },
      "testcases": [
        {
          "name": "testcase 1",
          "testcase": "/path/to/testcase1"
        },
        {
          "name": "testcase 2",
          "testcase": "/path/to/testcase2"
        }
      ]
    },
    {
      "config": {
        "name": "demo testsuite",
        "variables": {
          "device_sn": "XYZ"
        },
        "base_url": "http://127.0.0.1:5000"
      },
      "testcases": [
        {
          "name": "call demo_testcase with data 1",
          "testcase": "path/to/demo_testcase.yml",
          "variables": {
            "device_sn": "${device_sn}"
          }
        },
        {
          "name": "call demo_testcase with data 2",
          "testcase": "path/to/demo_testcase.yml",
          "variables": {
            "device_sn": "${device_sn}"
          }
        }
      ]
    }
  ]
}

```   

⚡️注意：

1. 运行测试用例集时，测试用例的参数化配置需要在`testsuite`中指定`parameters`，而不会使用`testcase`的`parameters`值。
