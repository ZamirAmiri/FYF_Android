import { AppRegistry} from 'react-native';
import {TabNavigator } from 'react-navigation';
import Options from './Options';
import Group from './Group';
import Home from './Home';
import {Tabs} from './router';

export default class App extends Component{
  render(){
    return <Tab />;
  }
}


AppRegistry.registerComponent('FYF_Android', () => App);
