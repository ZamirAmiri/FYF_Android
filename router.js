import React from 'react';
import {TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import Home from "./Home";
import Group from "./Group";
import Options from "./Options";

export const Tabs = TabNavigator({
  Home:{
    screen: Home
  },
  Options:{
    screen:Options
  },
  Group:{
    screen:Group
  },
})
