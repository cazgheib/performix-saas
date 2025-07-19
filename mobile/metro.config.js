const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.platforms = ['ios', 'android', 'native', 'web'];

config.resolver.alias = {
  '../Utilities/Platform': 'react-native-web/dist/exports/Platform',
  '../../Utilities/Platform': 'react-native-web/dist/exports/Platform',
  'react-native/Libraries/Utilities/Platform': 'react-native-web/dist/exports/Platform',
  'react-native/Libraries/ReactNative/BridgelessUIManager': 'react-native-web/dist/exports/UIManager',
};

module.exports = config;
