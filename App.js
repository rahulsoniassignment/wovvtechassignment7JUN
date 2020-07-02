/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,  
  View,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from 'react-native';
import { isEmpty } from 'lodash';
import Axios from 'axios';
import { SvgUri } from 'react-native-svg';

export default class App extends React.Component{
  constructor(){
    super()
    this.state={
      contry:"",
      contryList:[],
      loading:false,
      capital:{}
    }
  }

  // componentDidMount(){
    // Axios.get(" http://api.weatherstack.com/current?access_key=07dcef97d35ea4a3b3c75ed9a1d77aa2&query=New York")
    // .then(res=>console.log("res=",res)).catch(err=>console.log("err--",err))
  // }
 
  onClick(){
    console.log("this.stTE",this.state.contry)
    this.setState({loading:true})
    Axios.get(`https://restcountries.eu/rest/v2/name/${this.state.contry}`).
    then(res=>this.setState({contryList:res.data,loading:false}))
    .catch(err=>this.setState({loading:false}))
  }

  onWeather=(item)=>{ 
    this.setState({loading:true,contryList:[]})
    Axios.get(`http://api.weatherstack.com/current?access_key=07dcef97d35ea4a3b3c75ed9a1d77aa2&query=${item.capital}`)
    .then(res=>this.setState({loading:false,capital:res.data})).catch(err=>this.setState({loading:false}))
  }
    
   
  render(){
    console.log("this",this.state.capital)  
    let {capital} = this.state 
    return(
      <View style={styles.view}>
        <View style={styles.viewborder}>
        <TextInput 
        style={{ height: 40,  }}
        onChangeText={contry => this.setState({contry})}
        value={this.state.contry}
        placeholder="Enter Contry"
      
       />
        </View>
        <View>
        {

          !isEmpty(this.state.contry) ?
            <TouchableWithoutFeedback onPress={this.onClick.bind(this)}>
              <View style={{height:40,marginHorizontal:20,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:"#000066"}}>
                <Text style={{color:"#fff"}}>Submit</Text>
              </View> 
            </TouchableWithoutFeedback>
            
            :  
            <View style={{height:40,marginHorizontal:20,borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:"gray"}}>
              <Text style={{color:"#fff"}}>Submit</Text>
            </View>
        }
      
      </View>
      <View style={{flex:1,marginVertical:10}}>
        {
          this.state.loading &&
            <ActivityIndicator size="large" color="#0000ff" />
        }
          {
      !isEmpty(capital)  &&
       <View style={{height:150,width:"95%",marginVertical:3,paddingHorizontal:5,marginHorizontal:10,borderRadius:5,elevation:1,backgroundColor:"#fff"}}>
        <Text style={styles.testCapital}>temperature:<Text style={{color:"#000066"}}>{capital.current.temperature}</Text></Text>
        {/* <Text style={styles.testCapital}>weather_icons:<Text style={{color:"#000066"}}>weather_icons</Text></Text> */}
        <Text style={styles.testCapital}>wind_speed:<Text style={{color:"#000066"}}>{capital.current.wind_speed}</Text></Text>
        <Text style={styles.testCapital}>precip:<Text style={{color:"#000066"}}>{capital.current.precip}</Text></Text>
      </View>}

 
       
         <FlatList 
        data={this.state.contryList}
        renderItem={({ item }) => {
          let data = {
            capital:item.capital,
            population:item.population,
            latlng:item.latlng

          }
        return( 
          <View style={{height:150,flexDirection:"row",width:"95%",marginVertical:3,marginHorizontal:10,borderRadius:5,elevation:1,backgroundColor:"#fff"}}>

          <View style={{flex:0.9,justifyContent:"center",alignItems:"center"}}>
             <SvgUri
              width="95" 
              height="100"
              uri={item.flag} 
            /> 
      
          </View>  
          <View style={{flex:1.5,justifyContent:"center",}}>
            <Text style={styles.testList}>capital:<Text style={{color:"#000066"}}>{item.capital}</Text></Text>
            <Text style={styles.testList}>population:<Text style={{color:"#000066"}}>{item.capital}</Text></Text>
            <Text style={styles.testList}>latlng:<Text style={{color:"#000066"}}>{item.latlng}</Text></Text>
             
          </View>      
          <TouchableWithoutFeedback onPress={this.onWeather.bind(this,data)}>
          <View style={{flex:.6,justifyContent:"center",marginRight:5}}>
            <View style={{height:45,backgroundColor:"#368BC1",justifyContent:"center",alignItems:"center"}}>
              <Text numberOfLines={2} style={{textAlign:"center",fontSize:14,fontWeight:"bold",color:"#fff"}}> Capital  Weather</Text> 
            </View>
              
          </View>
          </TouchableWithoutFeedback>
         
                  </View>
        )}}
        keyExtractor={(item,i) => i.toString()}
      />

       </View>
       
    
      </View>
    ) 
  }
} 


const styles = StyleSheet.create({
 
  view:{
    flex:1,
    backgroundColor:"#fff"
  },
  viewborder:{
    height:50,
    marginHorizontal:15,
    borderRadius:5,
    borderWidth:1,
    borderColor:"gray",
    marginVertical:20
  },
  testCapital:{
    flex:1,
    color:"#000",
    fontWeight:"bold",
    fontSize:16
  },
  testList:{
    color:"#000",
    fontWeight:"bold"
  }
});

