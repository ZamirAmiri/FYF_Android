import { AppRegistry,StackNavigator } from 'react-native';
import App from './App';
import Options from './Options';
import Group from './Group';
import Home from './Home';

const TheApp = StackNavigator({
  Home: { screen: Home },
  Options: { screen: Options },
  Group: {screen: Group}
});

AppRegistry.registerComponent('FYF_Android', () => TheApp);
