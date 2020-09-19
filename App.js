import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,Button,FlatList
} from 'react-native';
import ListItem from './src/Components/ListItem';
import {Provider} from 'react-redux';
import store from './src/react-redux/store';
import { useDispatch } from "react-redux";
import { setData } from './src/react-redux/actions';

const AppWrapper = () => {  
  return (
    <Provider store={store}> 
      <App />
    </Provider>
  )
}
const App = () => {
  const dispatch = useDispatch();
  const [jsonData, setJsonData] = useState('');
  const [index, setIndex] = useState(0);
   const jsonCalling=()=>{
    fetch('https://picsum.photos/list', {
      method: 'GET'
  })
  .then((response) => response.json())
  .then((responseJson) => {
      setJsonData(responseJson);
      dispatch(setData(responseJson));
  })
  .catch((error) => { 
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

export default AppWrapper;
