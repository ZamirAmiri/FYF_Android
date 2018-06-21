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
  FlatList,
  AsyncStorage
} from 'react-native';

var dt = new Array();
var renderedData = new Array();
var style = require('./style');
var geolocation = navigator.geolocation;
var arrow = require('./img/arrow.png');
var refresh = require('./img/refresh.png');
var gps = require('./img/gps.png');
var back = require('./img/back.png');
export default class Group extends Component {
  constructor(){
  super();
  this.state = {
    username:"Zamir",
    groupID:265720,
    Password:'emojiFace',
    xLoc:'0',
    yLoc:'0',
    error:null,
    userID:null,
  }
  this.getDistanceFromLatLonInKm = this.getDistanceFromLatLonInKm.bind(this);
  this.deg2rad = this.deg2rad.bind(this);
  this.getDirectionFromLatLonInRad = this.getDirectionFromLatLonInRad.bind(this);
  this.createUserComponent = this.createUserComponent.bind(this);
  this.addToGroup = this.addToGroup.bind(this);
  this.renderUsers = this.renderUsers.bind(this);
  this.addDevice = this.addDevice.bind(this);
  this.updateDevice = this.updateDevice.bind(this);
  this.updateLocation = this.updateLocation.bind(this);
  this.update = this.update.bind(this);
  this.findID = this.findID.bind(this);
  this.removeDevice = this.removeDevice.bind(this);
  this.updateDistances = this.updateDistances.bind(this);
}
  componentDidMount(){
    this.socket = new WebSocket('ws://192.168.2.7:8080/FYF/actions');

    this.socket.onopen = () => {
      // connection opened
      //Alert.alert('Message recieved'); // send a message
    };

    this.socket.onmessage = (e) => {
      // a message was received
      var device = JSON.parse(e.data);
      if(device.action == "add"){
        this.addDevice(device);
      }else if (device.action == "update") {
        this.updateDevice(device);
      }else if (device.action == "remove") {
        this.removeDevice(device.id);
      }

    };

    this.socket.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    this.socket.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }
  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}


deg2rad(deg) {
  return deg * (Math.PI/180)
}
getDirectionFromLatLonInRad(lat1,lon1,lat2,lon2){
  var dLon = lon2-lon1;
  var y = Math.sin(dLon)*Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2)-Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  var bearing = Math.atan2(x,y)*180/Math.PI;
  /*
  var x = Math.log(Math.tan(lat2/2 + Math.PI/4)/Math.tan(lat1/2 + Math.PI/4));
  var lon = Math.abs(lon1-lon2)%180;
  var bearing = Math.atan2(lon,x);
  */
  return bearing;
}
  createUserComponent(device)
  {
    var i = <User
            onPress={() => {this.display()}}
            username={device.name}
            xLoc={device.xLoc}
            yLoc={device.yLoc}
            distance={device.distance}
            rotate = {device.direction}
          />
    return i;
  }
  addToData(device,distance,degree){
    //Alert.alert(dt.length.toString());
    var usr = {
      name:device.name,
      id:device.id,
      xLoc:device.xLoc,
      yLoc:device.yLoc,
      distance:distance,
      direction:degree
    };
    dt.push(usr);
    //Alert.alert(dt.length.toString());
  }
  renderUsers(){
    renderedData = new Array();
    for(var i=0;i<dt.length;i++)
    {
      renderedData.push(this.createUserComponent(dt[i]));
    }
  }
  distanceToString(distance){
    var distanceString=null;
    if(distance>1000)
    {
      distance = distance/1000;
      if(distance > 1000)
      {
        distance = distance/1000;
        distance = Math.round(distance);
        distanceString = (distance.toString()).concat('Gm')
      }
      distance = Math.round(distance);
      distanceString = (distance.toString()).concat('km')
    }else {
      distance = Math.round(distance);
      distanceString = (distance.toString()).concat('m')
    }
    return distanceString;
  }
  getDistance(xLoc,yLoc){
    var distance = this.getDistanceFromLatLonInKm(this.state.xLoc,this.state.yLoc,xLoc,yLoc)*1000;
    return this.distanceToString(distance);
  }
  getDirection(xLoc,yLoc){
    var degree = this.getDirectionFromLatLonInRad(this.state.xLoc,this.state.yLoc,xLoc,yLoc);
    return degree.toString().concat('deg');
  }
  addDevice(device){
    if(device.name != this.state.username)
    {
      var distanceString = this.getDistance(device.xLoc,device.yLoc);
      var degreeString = this.getDirection(device.xLoc,device.yLoc);
      var usr = this.addToData(device,distanceString,degreeString);
      this.renderUsers();
      this.forceUpdate();
    }else {
      this.setState({userID:device.id});
    }
  }
  updateDevice(device){
    var index = this.findID(device.id);
    if(index != -1){
      dt[index].xLoc = device.xLoc;
      dt[index].yLoc = device.yLoc;
      dt[index].distance = this.getDistance(device.xLoc,device.yLoc);
      dt[index].direction = this.getDirection(device.xLoc,device.yLoc);
      this.renderUsers();
      this.forceUpdate();
    }
  }
  updateDistances(){
    for(var i=0;i<dt.length;i++)
    {
      this.updateDevice(dt[i]);
    }
  }
  removeDevice(id){
    var index = this.findID(id);
    if(index != -1)
    {
      dt.splice(index, 1);
      renderedData.splice(index,1);
      this.forceUpdate();
    }
  }
  updateLocation(){
  var geo_success;
  geolocation.getCurrentPosition(
     (geo_success)  => {
       this.setState({
        xLoc:geo_success.coords.longitude.toString(),
        yLoc:geo_success.coords.latitude.toString(),
      });
      Alert.alert(this.state.xLoc);
      this.update();
      this.updateDistances();
    },
  (error) => this.setState({error:error.message}),
  {enableHighAccuracy:true,timeout: 20000, maximumAge: 1000},
  );
  Alert.alert("error: "+ this.state.error);
  }
  addToGroup(){
    var DeviceAction = {
        action: "add",
        name: this.state.username,
        groupid:this.state.groupID,
        xLoc: this.state.xLoc,
        yLoc: this.state.yLoc,
    };
    this.socket.send(JSON.stringify(DeviceAction));
  }
  update(){
    var DeviceAction = {
        action: "update",
        id:this.state.userID,
        name: this.state.username,
        groupid:this.state.groupID,
        xLoc: this.state.xLoc,
        yLoc: this.state.yLoc,
    };
    this.socket.send(JSON.stringify(DeviceAction));
  }
  findID(id){
    for(var i=0;i<dt.length;i++)
    {
      if(dt[i].id == id){
        return i;
      }
    }
    return -1;
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={{flex:1}}>
      <View style={style.menu}>
        <TouchableOpacity style={{width:'15%'}}>
          <Image
            style={{flex:1,maxWidth:40}}
            source={back}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress ={()=>Alert.alert("Password:" + this.state.Password)} style={{width:'70%',alignItems:'center'}}>
          <Text style={{fontSize:24}}>Group:{this.state.groupID}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.updateLocation()} style={{width:'15%',alignItems:'flex-end'}}>
          <Image
            style={{flex:1,maxWidth:40}}
            source={gps}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Button onPress = {() => this.addToGroup()} title="Join the group"/>
        <ScrollView style={style.mainWrapper}>
          <User
           onPress={() => {this.updateLocation()}}
           username='Zamir'
           xLoc={this.state.xLoc}
           yLoc={this.state.yLoc}
           rotate={'0deg'}
           distance='200m'/>
           {renderedData}
        </ScrollView>
      </View>
    );
  }
}


/* Er meot nog veel gebeuren*/
class User extends Component{
  constructor(props){
    super(props);
    this.state={
      height:'10%',
      display:'none',
      rotate:90,
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
      borderRadius:10,
      flexDirection:'row',
      alignItems:'center',
      margin:10,
      width:'95%',
      backgroundColor:'white',
      height:74,
      justifyContent:'flex-start',
    },
  });
    return(
      <View onPress={() => {this.reRender()}} style={local.user}>
        <Text style={style.username}>{this.props.username}</Text>
        <Text style={{width:'30%',fontSize:25,textAlign:'right'}}>{this.props.distance}</Text>
        <View style={style.compassContainer}>
          <Image
            source={arrow}
            style={{
              width:60,
              height:74,
              transform:[
              {rotateZ:this.props.rotate}
              ]
            }}
            resizeMode="contain"
            />
        </View>
      </View>
    );
  }
}
