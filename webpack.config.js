const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = (env) =>{
    return {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: "[name].[contenthash].js",
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html')}),
            new webpack.ProgressPlugin()
        ],
        module: {
          rules: [
            {
              // Регулярное выражение для проверки расширения файла (.tsx)
              test: /\.tsx?$/,
              // Использование 'ts-loader' для обработки TypeScript файлов
              use: 'ts-loader',
              // Исключение из обработки файлов из директории 'node_modules'
              exclude: /node_modules/,
            },
          ],
        },
      // Конфигурация разрешения файлов с указанием поддерживаемых расширений
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
    }
}