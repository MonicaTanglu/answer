/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "" : "/",
    // 输出文件目录
    outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
    assetsDir: "assets",
    lintOnSave: true,
    chainWebpack: config => {
        config.resolve.symlinks(true)
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            config.mode = "production"
        } else {
            // 为开发环境修改配置...
            config.mode = "development"
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                extensions: [".js", ".ts", ".vue", ".json", ".scss", ".tsx"], //请求本地json
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                    "@c": path.resolve(__dirname, "./src/components"),
                    "@v": path.resolve(__dirname, "./src/views"),
                    "@p": path.resolve(__dirname, "./src/pages")
                } // 别名配置
            }
        })
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: true,
    css: {
        extract: false, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?是否在构建样式地图，false将提高构建速度
        // css预设器配置项
        loaderOptions: {
            sass: {
                prependData: `@import "~@/styles/common.scss";`
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        requireModuleExtension: true
    },
    devServer: {
        port: 3200,
        proxy: {
            "/mock": {
                target: "http://10.0.0.113:7300", // 请求本地 需要jeecg-boot后台项目
                ws: false,
                changeOrigin: true
            },
            "/api": {
                target: "http://localhost:3000", // 请求本地 需要jeecg-boot后台项目
                ws: false,
                changeOrigin: true
            }
        }
    }
}
