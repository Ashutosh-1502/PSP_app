module.exports = function (api) {
  api.cache(true);

   process.env.EXPO_ROUTER_APP_ROOT = "./src/app";

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {'@': './src'},
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
      ],
      "react-native-reanimated/plugin"
    ],
  };
};
