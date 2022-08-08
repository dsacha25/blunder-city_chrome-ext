module.exports = {
    webpack: {
        target: "node", 
        configure: (webpackConfig, {env, paths}) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [env === "development" && require.resolve('react-dev-utils/webpackHotDevClient'), paths.appIndexJs].filter(Boolean),
                    content: './src/chrome/content/content.ts', 
                    redux: './src/redux/redux.ts'
                },
                output: {
                    ...webpackConfig.output,
                    filename: 'static/js/[name]/[name].js'
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false
                }

            }     
        }
    }
}