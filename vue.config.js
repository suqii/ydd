module.exports = {
  publicPath:'/',
    devServer : {
      // host: "192.168.1.214",
      host: "0.0.0.0",
        proxy : {
            '/api2' : {
                target : 'http://47.108.192.147:9000',
                changeOrigin : true,
                pathRewrite: {'^/api2': ''}
            },
            '/api' : {
              target : 'http://47.108.192.147:9000',
              // target : 'http://localhost:3000',
                changeOrigin : true,
                pathRewrite: {'^/api': ''}
            }
        }
    }
}