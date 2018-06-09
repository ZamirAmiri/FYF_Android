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

export default class Options extends Component{
  render(){
    return(
      <View style={style.mainWrapper}>
        <Text style={style.title}>Settings</Text>
        <View style={style.simpleBorder}/>
        <View style={{flex:1}}>
          <TextInput placeholder='Default Name' style={style.textInput}/>
          <TextInput placeholder='Default Password' style={style.textInput}/>
        </View>
        <View style={{width:'60%', marginLeft:'20%',marginRight:'20%',marginBottom:'10%',}}>
          <Button title="Save"/>
        </View>
      </View>
    );
  }
}
