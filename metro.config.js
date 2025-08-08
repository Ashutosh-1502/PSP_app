// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

// Get the default configuration
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = require('node-libs-react-native');

config.resolver.assetExts.push('pdb');

module.exports = withNativeWind(config, { input: './global.css' });
