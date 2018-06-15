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
  ScrollView,
  AsyncStorage
} from 'react-native';

var style = require('./style');

export default class Options extends Component{
  constructor(props)
  {
      super(props);
      this._save = this._save.bind(this);
      this.state = {username: '', password:''}
      this._saveKey = this._saveKey.bind(this);
      this._getKey = this._getKey.bind(this);
  }

  async _save()
  {
      this._saveKey('password',this.state.password);
      this._saveKey('username',this.state.username);
      await this._getKey('password');
      Alert.alert(response);

  }


async _getKey(key) {
  try {
      var value = await AsyncStorage.getItem(key);
      response = value;
      response.notify();
  } catch (error) {
    console.log("Error retrieving data" + error);
  }
}

async _saveKey(key,value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error saving data" + error);
  }
}
  render(){
    return(
      <View style={style.mainWrapper}>
        <Text style={style.title}>Settings</Text>
        <View style={style.simpleBorder}/>
        <View style={{flex:1}}>
          <TextInput onChangeText={(username) => this.setState({username})} placeholder='Default Name' style={style.textInput}/>
          <TextInput onChangeText={(password) => this.setState({password})} placeholder='Default Password' style={style.textInput}/>
        </View>
        <View style={{width:'60%', marginLeft:'20%',marginRight:'20%',marginBottom:'10%',}}>
          <Button onPress = {() => this._save()} title="Save"/>
        </View>
      </View>
    );
  }
}
