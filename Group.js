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
} from 'react-native';

var style = require('./style');
var geolocation = navigator.geolocation;

export default class Group extends Component {
  constructor(){
    super();
    this.state = {
      xLoc:'',
      yLoc:'',
      error:null,
    }
    this.display = this.display.bind(this);
  }
  display(){
    var geo_success;
    geolocation.getCurrentPosition(
      (geo_success) => {
        this.setState({
          xLoc:geo_success.coords.longitude,
          yLoc:geo_success.coords.latitude,
        });
        Alert.alert("Xloc = " + this.state.xLoc);
      },
    (error) => this.setState({error:error.message}),
    {enableHighAccuracy:true,timeout: 20000, maximumAge: 1000},
    );
    Alert.alert("error = " + this.state.error);
  }
  render(){
    return(
      <View style={style.mainWrapper}>
        <User onPress={() => {this.display()}}username='Zamir' xLoc={this.state.xLoc} yLoc={this.state.yLoc} distance='142342'/>
        <Button onPress = {() => this.display()} title="Show me the Morty"/>
      </View>
    );
  }
}

class User extends Component{
  constructor(){
    super();
    this.state={
      height:'10%',
      display:'none',
    };
  }
  reRender(){
    if(this.state.height == '10%'){
      this.setState({height:'30%'});
      this.setState({display:'flex'});
    }else {
      this.setState({height:'10%'});
      this.setState({display:'none'});
    }
     //this.forceUpdate();
  }


  render(){
    let local = StyleSheet.create ({
      user:{
        borderRadius:40,
        alignItems:'center',
        margin:'2.5%',
        padding:'2%',
        width:'95%',
        backgroundColor:'red',
        height:this.state.height,
        justifyContent:'center',
      }
    });
    return(
      <TouchableOpacity onPress={() => {this.reRender()}} style={local.user}>
        <Text style={style.username}>{this.props.username}</Text>
        <Text style={{display:this.state.display}}>{this.props.xLoc}</Text>
        <Text style={{display:this.state.display}}>{this.props.yLoc}</Text>
        <Text style={{display:this.state.display}}>{this.props.distance}</Text>
      </TouchableOpacity>
    );
  }
}
