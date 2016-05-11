#基于vue.js重写Cnodejs.org社区的webapp  参考项目 http://shinygang.github.io/cnodevue/ 

###安装

项目地址：（`git clone`）

```shell
git clone https://github.com/ycr6708536/cnode-vuejs.git
```

通过`npm`安装本地服务第三方依赖模块

```
npm install
```
启动服务(http://localhost:8090)

```
node run dev
```
发布代码
```
npm run build
```

###开发

###目录结构
<pre>
.
├── build                   //项目构建文件  来自vue-cli
│   ├──css-loaders.js       //webpack css-loaders规则
│   ├──dev-client.js        //
│   ├──dev-server.js        //开发测试服务器 
│   ├──webpack.base.conf.js //webpack 基本配置
│   ├──webpack.dev.conf.js  //webpack 开发配置
│   ├──webpack.prod.conf.js //webpack 生产配置
├── dist                    // 项目build目录
├── index.html              // 项目入口文件
├── package.json            // 项目配置文件
├── src                     // 生产目录
│   ├── assets              // css js 和图片资源
│   ├── components          // 各种组件
│   ├── views               // 各种页面
│   ├── filters.js          // 各种过滤器
│   └── main.js             // Webpack 预编译入口
└── README.md      
</pre>
###关于
<pre> 
这部分代码是用于学习vue.js抄袭shinygang的项目比较多，还没有整理css样式，希望可以谅解.
最近没有继续完善这个项目的时间，希望以后可以有时间来完善这个项目
</pre>
