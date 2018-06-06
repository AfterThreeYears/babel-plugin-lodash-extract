## 简易的babel 插件开发入门例子

主要做的事情是按需加载lodash库
将如下的代码
```javascript
import _ from 'lodash'
import isArray from 'lodash/isArray'
import { toString } from 'lodash'

isArray([])
_.add(1, 2)
toString(1)
_.add(1, 2)
isArray([1])
```
↓↓↓↓↓↓↓↓↓↓↓ 转换成如下的代码
```javascript
import isArray from 'lodash/isArray';
import toString from 'lodash/toString';

isArray([]);
import add from 'lodash/add';
add(1, 2)

toString(1);
add(1, 2)

isArray([1]);
```

# babel-plugin-lodash-extract
平常开发的时候有些同学会不遵守规范或者无意中使用了如下写法
```javascript
import _ from 'lodash'
或
import loadsh from 'lodash'
```
这样会把所有的lodash代码都加载进去
导致大概js文件大小会大70kb左右

如下代码
```javascript
import _ from 'lodash'

_.add(1, 2)

```
结果有71.1kb
```javascript
static/js/vendor.6b317cc799badf6ad864.js    71.1 kB       0  [emitted]  vendor
```

但是这么写的话
```javascript
import add from 'lodash/add'
add(1, 2)
```

发现只有这么大
```javascript
static/js/vendor.d9f1fb9269405aa51217.js    2.24 kB       0  [emitted]  vendor
```

### 下载安装 
``` javascript
npm i --save-dev babel-plugin-lodash-extract
```

#### 示例:  
在babel的配置文件里加上
```json
{
  "plugins": ["babel-plugin-lodash-extract"],
}
```
这样的配置，这里需要注意是plugins的加载顺序是从后往前的,一般的项目都有添加
transform-runtime插件,那么写法需要这样
```json
{
  "plugins": [
    "transform-runtime",
    "babel-plugin-lodash-extract"
  ],
}
```

### 原理说明

wait.....


