const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve(filename){
  return path.resolve(__dirname,filename)
}

const HtmlWebpackPluginConfig = {
  title: 'Hello World !',
  filename: 'start.html', //默认是index.html ， 服务器中设置的首页是index.html 如果这里改成其他名字，那么devServer.index 改成和这里同名的，最终完整的文件路径是output.path+filename, 如果filename 中有子文件夹形式， 如`./ab/cd/front.html` 只取 `./front.html`
  template: resolve('../public/template.html'), //如果觉得插件默认生成的html5 文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，会将打包后的js 文件注入到body结尾处
  inject: true,  //true|body|head|false ，四种值，默认是true true和body是相同的 是将js注入到body结束标签前  head 是将打包的js 文件放在head 结束前， false 是不注入 这时候需要手动在html 中通过<script src="./[jsname].js"></script>
}

module.exports = {
  entry: './src/main', //main.js中的.js可以省略，前面的 ./ 不能省
  output: {
    filename:'./app.[hash].js', //dist 文件夹不存在时，会自动创建
    hashDigestLength:8, //默认长度是 20
    // publicPath: './static/'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'),resolve('test')] 
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)], //实例化后放在plugins这个数组中就可以执行了
  devServer:{
    contentBase: path.join(__dirname,'../dist'), //启动的根目录为 /dist 如果配置不对，会报Cannot GET /
    port: 9003, // 修改启动的端口
    open: true, // 自动打开浏览器
    index: 'start.html', //与HtmlWebpackPlugin 中配置的filename 一样
    inline: true, //默认是true 意思是 在打包时会注入一段代码到最后的js 文件中， 用来监视页面的改动而自动刷新页面， 网页自动刷新的模式时iframe  就是将模板页放在一个frame中
    hot: false,
    compress: true, //压缩
    progress: true,
   // host: '0.0.0.0', //请在dos下，输入ipconfig可以找到当前电脑的ip
    // publicPath: '/static/', //它与output.publicPath的值应该是一样的， 值为上面contentBase 目录的子目录。是存放js,css 图片等静态资源的文件夹，
  }
}