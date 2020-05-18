# Highlight.js

[![Build Status](https://travis-ci.org/highlightjs/highlight.js.svg?branch=master)](https://travis-ci.org/highlightjs/highlight.js) [![Greenkeeper badge](https://badges.greenkeeper.io/highlightjs/highlight.js.svg)](https://greenkeeper.io/) [![install size](https://packagephobia.now.sh/badge?p=highlight.js)](https://packagephobia.now.sh/result?p=highlight.js)

js是一个用JavaScript编写的语法高亮体。它工作在浏览器以及服务器。它几乎适用于任何情况标记，不依赖于任何框架，并具有自动语言检测。

## 从版本9升级

版本10是一段时间以来最大的版本之一。如果你从版本9升级，有一些打破的变化和事情，你可能我想先再确认一下。

Please read [VERSION_10_UPGRADE.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_UPGRADE.md) for  high-level summary of breaking changes and any actions you may need to take. See [VERSION_10_BREAKING_CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/VERSION_10_BREAKING_CHANGES.md) for a more detailed list and [CHANGES.md](https://github.com/highlightjs/highlight.js/blob/master/CHANGES.md) to learn what else is new.

## 入门指南

在web页面上使用highlight.js的最低限度是链接到库中的一种样式和调用
[`initHighlightingOnLoad`][1]:

```html
<link rel="stylesheet" href="/path/to/styles/default.css">
<script src="/path/to/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
```

这将找到并highlight显示`<pre><code>`标签内的代码;它尝试自动检测语言。如果自动检测没有为您工作，您可以指定语言的class属性:

```html
<pre><code class="html">...</code></pre>
```

Classes 也可能以“language-”或“lang-”作为前缀。

```html
<pre><code class="language-html">...</code></pre>
```

### 明文和禁用高亮

若要对任意文本(如代码)样式化，但不高亮显示，请使用`plaintext` class

```html
<pre><code class="plaintext">...</code></pre>
```

若要完全禁用标记的突出显示，请使用 `nohighlight` class:

```html
<pre><code class="nohighlight">...</code></pre>
```

### 支持的语言

js在核心库中支持超过180种不同的语言。还有第三方的其他语言插件。您可以找到支持的语言的完整列表
in [SUPPORTED_LANGUAGES.md][9].

## 自定义初始化

当您需要对初始化进行更多的控制时的highlight.js, 你可以使用[`highlightBlock`][3] and [`configure`][4]功能。这允许你控制*what* to highlight and *when*.

这里有一个类似的调用方法 [`initHighlightingOnLoad`][1] 使用
vanilla JS:

```js
document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightBlock(block);
  });
});
```

您可以使用任何标记来代替 `<pre><code>` 来标记你的代码。如果您没有使用保存需要的换行符的容器配置highlight.js以使用`<br>` 标签:

```js
hljs.configure({useBR: true});

document.querySelectorAll('div.code').forEach((block) => {
  hljs.highlightBlock(block);
});
```

有关其他选项，请参阅相关文档 [`configure`][4].


## Web Workers

可以在web worker中运行高亮显示，以避免冻结浏览器窗口，同时处理非常大的代码块。

In your main script:

```js
addEventListener('load', () => {
  const code = document.querySelector('#code');
  const worker = new Worker('worker.js');
  worker.onmessage = (event) => { code.innerHTML = event.data; }
  worker.postMessage(code.textContent);
});
```

In worker.js:

```js
onmessage = (event) => {
  importScripts('<path>/highlight.min.js');
  const result = self.hljs.highlightAuto(event.data);
  postMessage(result.value);
};
```

## Node.js

在将内容发送到浏览器之前，可以使用node的highlight.js高亮显示内容。
Make sure to use the `.value` property to get the formatted html.
For more info about the returned object refer to the api docs https://highlightjs.readthedocs.io/en/latest/api.html


```js
// require the highlight.js library, including all languages
const hljs = require('./highlight.js');
const highlightedCode = hljs.highlightAuto('<span>Hello World!</span>').value
```

Or for a smaller footprint... load just the languages you need.

```js
const hljs = require("highlight.js/lib/core");  // require only the core library
// separately require languages
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

const highlightedCode = hljs.highlight('xml', '<span>Hello World!</span>').value
```


## ES6 Modules

首先，您可能要安装via`npm` or `yarn` -- see [Getting the Library](#getting-the-library) below.

在您的应用程序:

```js
import hljs from 'highlight.js';
```

默认导入所有语言。因此，只导入库和需要的语言可能会更有效:

```js
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);
```

要设置语法突出显示样式，如果您的构建工具从您的JavaScript入口点处理CSS，您还可以直接将样式表作为模块导入:

```js
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/github.css';
```


## Getting the Library

你可以获得highlight.js作为宿主，或自定义构建，浏览器脚本或作为服务器模块。浏览器脚本支持开箱即用都AMD和CommonJS，所以如果你希望你可以使用RequireJS或Browserify不需要从源代码构建。服务器模块也是在Browserify中工作得非常好，但是也有使用a的选项构建特定于浏览器而不是针对服务器的东西。


**不直接链接到GitHub.** 图书馆不应该直接工作从源头上讲，它需要构建。如果没有预先打包的选项工作为你参考的[building documentation][6].

**On Almond.** 您需要使用优化器为模块命名。为例子:

```bash
r.js -o name=hljs paths.hljs=/path/to/highlight out=highlight.js
```

### CDN Hosted

与许多通用语言绑定的highlight.js的预构建版本由以下CDNs托管:

**cdnjs** ([link](https://cdnjs.com/libraries/highlight.js))

```html
<link rel="stylesheet"
      href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/styles/default.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js"></script>
<!-- and it's easy to individually load additional languages -->
<script charset="UTF-8"
 src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/languages/go.min.js"></script>
```

**jsdelivr** ([link](https://www.jsdelivr.com/package/gh/highlightjs/cdn-release))

```html
<link rel="stylesheet"
      href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/styles/default.min.css">
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.0/build/highlight.min.js"></script>
```

**Note:** *The CDN-hosted `highlight.min.js` package并不能绑定所有语言。它会是
非常大。您可以找到我们的列表“公共”语言，我们默认捆绑在我们的 [download page][5].

### Self Hosting

The [download page][5] 可以快速生成一个定制包，其中只包含您需要的语言。

或者，您可以构建一个浏览器包 [source](#source):

```
node tools/build.js -t browser :common
```

查看我们的[building documentation][6] 获取更多信息.

**Note:** 从源构建应该总是产生最小尺寸的构建。网站下载页面的优化是为了速度，而不是大小


#### Prebuilt CDN assets

You can also download and self-host the same assets we serve up via our own CDNs.  We publish those builds to the [cdn-release](https://github.com/highlightjs/cdn-release) GitHub repository.  You can easily pull individual files off the CDN endpoints with `curl`, etc; if say you only needed `highlight.min.js` and a single CSS file.

There is also an npm package [@highlightjs/cdn-assets](https://www.npmjs.com/package/@highlightjs/cdn-assets) if pulling the assets in via `npm` or `yarn` would be easier for your build process.


### NPM / Node.js server module

Highlight.js 也可以在服务器上使用。可以从其中安装具有所有受支持语言的包 NPM or Yarn:

```bash
npm install highlight.js
# or
yarn add highlight.js
```

Alternatively, you can build it from [source](#source):

```bash
node tools/build.js -t node
```

See our [building documentation][6] for more information.


### Source

[Current source][10] is always available on GitHub.


## License

Highlight.js is released under the BSD License. See [LICENSE][7] file
for details.


## Links

The official site for the library is at <https://highlightjs.org/>.

Further in-depth documentation for the API and other topics is at
<http://highlightjs.readthedocs.io/>.

Authors and contributors are listed in the [AUTHORS.txt][8] file.

[1]: http://highlightjs.readthedocs.io/en/latest/api.html#inithighlightingonload
[2]: http://highlightjs.readthedocs.io/en/latest/css-classes-reference.html
[3]: http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
[4]: http://highlightjs.readthedocs.io/en/latest/api.html#configure-options
[5]: https://highlightjs.org/download/
[6]: http://highlightjs.readthedocs.io/en/latest/building-testing.html
[7]: https://github.com/highlightjs/highlight.js/blob/master/LICENSE
[8]: https://github.com/highlightjs/highlight.js/blob/master/AUTHORS.txt
[9]: https://github.com/highlightjs/highlight.js/blob/master/SUPPORTED_LANGUAGES.md
[10]: https://github.com/highlightjs/
