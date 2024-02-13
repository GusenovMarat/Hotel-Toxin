import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

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

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
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
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  return [
		assetLoader,
    scssLoader,
    tsLoader,
		svgLoader,
  ]
}