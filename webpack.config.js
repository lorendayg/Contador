const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Punto de entrada
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // Limpia la carpeta dist antes de cada build
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // Para importar CSS en JS
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Si usas Babel
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // Usa tu index.html de la raíz
      filename: "index.html", // Lo copia a dist/
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 3000, // Puedes cambiar el puerto si quieres
    open: true, // Abre el navegador automáticamente
  },
  mode: "development", // Cambia a "production" cuando lo subas
};
