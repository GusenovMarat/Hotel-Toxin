import { ModuleOptions } from "webpack";

export function buildLoaders(): ModuleOptions['rules'] {
  return [
    {
      test: /\.s[ac]ss$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader",
      ],
    },
    {
      // ts-loader
      // если бы мы не использовали typescript: нужен был бы babael-loader
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ]
}