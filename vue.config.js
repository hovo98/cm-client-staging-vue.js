module.exports = {
	publicPath: '/',
	chainWebpack: config => {
		config.module.rules.delete('svg')
		config.module.rule('svg')
		.test(/\.(svg)(\?.*)?$/)
		.use('babel-loader')
		.loader('babel-loader')
		.end()
		.use('vue-svg-loader')
		.loader('vue-svg-loader')
	},
	css: {
        extract: {
            filename: 'css/[name].css?_hash=[hash:8]',
            chunkFilename: 'css/[name].css?_hash=[hash:8]',
        },
		loaderOptions: {
			sass: {
				additionalData: `
                    @import "./src/assets/scss/config/_variables.scss";
                    @import "./src/assets/scss/helpers/_mixins.scss";
                `,
			},
		},
	},
}