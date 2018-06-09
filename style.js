'use strict';

var React = require('react-native');

var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
  mainWrapper:{
    flex:1,
    padding:'2%',
    backgroundColor:'#02b1e4',
    flexDirection:'column',
    //alignItems:'center',
  },
  textField:{
    //backgroundColor:'green',
    textAlign:'center'
  },
  textInput:{
    backgroundColor:'#027497',
    //color:'white',
    height:60,
    borderRadius:20,
    fontSize:20,
    padding:10,
    margin:'2%',
  },
  form:{
    flex:1,
    flexDirection:'column',
    padding:'1%',
    justifyContent:'space-between',
    alignItems:'stretch',
    width:'100%',
    marginBottom:'5%',
    //backgroundColor:'white'
  },
  buttonWrapper:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-start',
    margin:'1%',
    height:'100%',
    //backgroundColor:'black'
  },
  button:{
  //  backgroundColor:'yellow',
    width:180,
    minHeight:70,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    borderWidth:2,
    backgroundColor:'#027497',
    borderColor:'#027497',
  },
  settingsWrapper:{
    height:45,
    marginLeft:'84%',
    width:'15%',
    margin:'1%',
    //backgroundColor:'green',
    alignItems:'flex-end',
  },
  title:{
    fontSize:40,
    color:'white',
    //backgroundColor:'red',
    textAlign:'center',
    padding:'1%',
    borderColor:'#0288b1',
  },
  simpleBorder:{
    height:10,
    borderRadius:10,
    backgroundColor:'#0288b1',
    margin:'2%',
  },
  user:{
    borderRadius:40,
    alignItems:'center',
    margin:'2.5%',
    padding:'2%',
    width:'95%',
    backgroundColor:'red',
  },
  username:{
    fontSize:20,
  }
});
