import { set } from 'core-js/fn/dict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Button,FlatList
} from 'react-native';
import ListItem from './src/Redux/Components/ListItem';

const App = () => {
  const [jsonData, setJsonData] = useState('');
  const [index, setIndex] = useState(0);
   const jsonCalling=()=>{
    fetch('https://picsum.photos/list', {
      method: 'GET'
      //Request Type 
  })
  .then((response) => response.json())
  //If response is in json then in success
  .then((responseJson) => {
      //Success 
      setJsonData(responseJson);
      //console.log(responseJson);
  })
  //If response is not in json then in error
  .catch((error) => {
      //Error 
      console.error(error);
  });
   }
   const refresh=()=>{
    jsonCalling();
    setIndex(Math.floor(Math.random() * 100))
   }

   useEffect(() => {
     refresh();
  }, []);


  return (
    <View>
      <StatusBar barStyle="dark-content" />
        <View>
        <Text style={styles.heading}>ImageSlider</Text>
        <FlatList
          data={jsonData.slice(index, index+15)}
          renderItem={({item}) => (
                  <ListItem
                    Item={item}
                  />
                )}
          horizontal={true}
          scrollEnabled={true}
          keyExtractor={item => item.id}
          contentContainerStyle={{
             flexGrow: 1,
               }}
        /> 
        <Button title={'Reload'} onPress={()=>{
          refresh();
        }}/>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  heading:{
    textAlign:'center',
    fontSize:20,
    padding:10,
  }
});

export default App;
