![PPMessage Demo](/ppmessage/doc/ppkefu-ppcom.gif)

[In English](/README.md)

# PPMessage - 皮皮消息，即插即用，在线客服，移动应用内即时通讯，开源，纯Python实现。

PPMessage 是一个开源的在线客服平台。PPMessage能够帮助你在第一时间与你的客户建立联系，开发人员可以非常容易的将 PPMessage 集成到你的网站或者 iOS、Android 的应用中。PPMessage 的前端后端都是开源的，后端全部基于 Python，简洁高效。前端根据不同平台提供原生的SDK。

基于 PPMessage 还能实现私有的·微信·功能，在企业内部或者私有云上建立自主的·微信·服务器；也可以将 PPMessage 与企业业务系统整合，实现自建的·钉钉·系统。

PPMessage 后端建议部署到 Linux 上，推荐使用 Debian 或者 Ubuntu，同时支持 Mac OS X 系统，方便开发者测试。

PPMessage 提供了完整而清晰的 API 和 OAuth 系统，所有前端应用和 SDK 都是通过调用或者封装后端的 API 而实现。PPMessage 能够做到最大程度和最底层的整合开发。


PPMessage 的前端开发 SDK 称为 PPCom，PPCom 会被集成到你的企业 Web 站点，Android、iOS 应用之中，为你的客户提供建立联系的入口；给客服和企业组织内部人员使用的前端应用叫做 PPKefu，PPKefu 可以运行在 Web 端，Windows、Mac 和 Linux 桌面端，Android、iOS 移动应用端，几乎支持所有的可以运行应用的平台，让你的客服人员随时随地为你的客户提供服务或者建立联系。

PPMessage 同时提供了一个 Web 管理界面，称之为 PPConsole，当然也是开源的，PPConsole 提供一个管理界面去管理配置 PPMessage。PPConsole 同时也集成了一些企业运营所需的常用功能，探索使用 PPConsole 让它为你的企业业务服务。通过使用 PPConsole 上的企业应用，PPMessage 完全成为了一个自主、自建的企业微信，或者是阿里钉钉，但是数据和程序以及安全性却能得到充分的保障。 


## 子项目

* [PPCom iOS SDK](https://github.com/PPMESSAGE/ppcom-ios-sdk)

* [PPCom Android SDK](https://github.com/PPMESSAGE/ppcom-android-sdk)


## 快速上手

### 下载代码

```bash
git clone https://github.com/PPMESSAGE/ppmessage
cd ppmessage
```

### 安装依赖

> Debian/Ubuntu

```bash
bash ppmessage/scripts/set-up-ppmessage-on-linux.sh
```

> macOS


```bash
bash ppmessage/scripts/set-up-mac-on-linux.sh
```


### 执行


```bash
./main.py
```
> 删除文件 ppmessage/bootstrap/config.json，再运行 main.py 就可以重新配置。

> 就是这些，不工作？请将日志贴到 Github issue 中，谢谢！

 
> 完全参考手册，请关注 PPMessage 在 GitBook 上的持续更新

* [中文手册](https://ppmessage.gitbooks.io/ppbook/content/)


> 应网友之强烈要求，要有个 QQ 群 348015072


![](/ppmessage/doc/348015072.png)


## 版权 

> 使用前请仔细阅读版权声明。

PPMessage 源代码是按照 Apache License Version 2 开源的，其版权归属于原作者，并且只允许在单网站或者单应用上使用 PPMessage 及其衍生项目，如果想利用 PPMessage 的全部或者部分代码提供多租户（多站点）服务，请联系作者获取商业许可。

[Apache License Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

Copyright (c) 2010-2017, PPMESSAGE team and contributors - https://www.ppmessage.com and https://github.com/PPMESSAGE/ppmessage

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.



