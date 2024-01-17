const path = require('path');
const rootPath = path.resolve(__dirname, '../');

module.exports = {
    stories: ['../**/*.stories.ts'],
    webpackFinal: async (config, configType, defaultConfig) => {
        config.resolve.alias['~'] = rootPath;
        config.resolve.alias['@'] = rootPath;

        config.module.rules = config.module.rules.map(data => {
            if (/svg\|/.test(String(data.test)))
                data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
            return data;
        });

        config.module.rules.push({
            test: /\.svg$/,
            use: [
                'babel-loader',
                'vue-svg-loader'
            ]
        });

        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            path.resolve(__dirname, '../src/assets/scss/config/_variables.scss'),
                            path.resolve(__dirname, '../src/assets/scss/helpers/_mixins.scss')
                        ]
                    }
                }
            ]
        });

        config.module.rules.push({
            test: /\.(ts|tsx)$/,
            use: [
                'ts-loader'
            ],
        });

        config.resolve.extensions.push('.ts', '.tsx');

        // Return the altered config
        return config;
    }
};
