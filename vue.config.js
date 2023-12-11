module.exports = {
	devServer:{
		port:'5173',
		disableHostCheck:true,
		proxy:{
			'/api':{
				target:'http://localhost:8080',
				changeOrigin:true,
				pathRewrite:{
					'^/api': ''
				}
			}
		}
	}
}
