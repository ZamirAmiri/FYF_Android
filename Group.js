import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';

var style = require('./style');

export default class Group extends Component {
  render(){
    return(
      <View style={style.mainWrapper}>
        <User username='Zamir' xLoc='14892' yLoc='213' distance='142342'/>
      </View>
    );
  }
}

class User extends Component{
  constructor(){
    super();
    this.state={
      visible:'none',
    };
  }
  reRender(){
    if(this.state.visible = 'flex'){
      this.setState({visible:'none'});
    }else {
      this.setState({visible:'flex'});
    }
     this.forceUpdate();
  }
  render(){
    return(
      <TouchableOpacity onPress={() => this.reRender()} style={style.user}>
        <Text style={style.username}>{this.props.username}</Text>
        <Text style={{display:this.state.visible}}>{this.props.xLoc}</Text>
        <Text style={{display:this.state.visible}}>{this.props.yLoc}</Text>
        <Text style={{display:this.state.visible}}>{this.props.distance}</Text>
      </TouchableOpacity>
    );
  }
}
