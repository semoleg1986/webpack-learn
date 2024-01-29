import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | "development";

interface EnvVariables {
  mode: Mode
}

export default (env: EnvVariables) =>{
  const config: webpack.Configuration ={
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
      devServer: {
        port: 4000,
        open: true
      }
    }
    return config
}