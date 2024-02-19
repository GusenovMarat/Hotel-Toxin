import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTupescript from "react-refresh-typescript";
import { BuildOptions } from "./types/types";
import { buildBabelLoader } from "./babel/buildBabelLoader";


export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColors: 'true',
                }
              }
            ]
          }
        }
      }
    ],
  }

  const imageLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const fontLoader = {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  }

  const CssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
      }
    },
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates 'style' nodes from JS strings
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      CssLoaderWithModules,
      // Complites Sass to CSS
      "sass-loader",
    ],
  }

  const tsLoader = {
    // ts-loader
    // если бы мы не использовали typescript: нужен был бы babael-loader
    exclude: /node_modules/,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => (
            {
              before: [isDev && ReactRefreshTupescript()].filter(Boolean),
            }
          )
        }
      }
    ]
  }

  const babelLoader = buildBabelLoader(options);


  return [
    imageLoader,
    fontLoader,
    scssLoader,
    tsLoader,
    babelLoader,
    svgLoader,
  ]
}