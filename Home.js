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
var logo = require('./img/logo.png');
var cog = require('./img/cog.png');

export default class Home extends Component{
  render(){
    return(
      <View  style={style.mainWrapper}>
        <ScrollView centerContent={true}>
          <Settings/>
          <Image style={{flex:1, width:'100%',minHeight:'40%',marginBottom:'5%'}}
            source={cog}
            resizeMode="contain"
            source={logo}
          />
          <Form/>
          <ButtonWrapper/>
        </ScrollView>
      </View>
    );
  };
}


class Form extends Component{
  constructor(props){
    super(props);
    this.state ={
      groupID:'',
      password:'',
    };
  }
  render(){
    return(
      <View style={style.form}>
        <TextInput onChandgeText = {(text) => this.setState({groupID})} placeholder="groupID" keyboardType='numeric' style={style.textInput} underlineColorAndroid='transparent'/>
        <TextInput onChandgeText = {(text) => this.setState({password})} placeholder="Group Password" keyboardType='default' style={style.textInput} underlineColorAndroid='transparent'/>
      </View>
    );
  }

}

class ButtonWrapper extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <View style={style.buttonWrapper}>
        <TouchableOpacity style={style.button}>
          <Text style={{fontSize:20, marginBottom:'5%', color:'white'}}>Create Group</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button}>
          <Text style={{fontSize:20, marginBottom:'5%', color:'white'}}>Join Group</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class Settings extends Component{
  render(){
    return(
      <TouchableOpacity onPress={() => navigate('Options')} style={style.settingsWrapper}>
      <Image
        style={{flex:1,maxWidth:50}}
        source={cog}
        resizeMode="contain"
      />
      </TouchableOpacity>
    );
  }
}
