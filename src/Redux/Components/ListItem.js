import React from 'react';
import { View, Image,StyleSheet,Text ,Linking} from 'react-native';
const ListItem = ({Item}) =>{
    console.log(Item);
    return(
        <View style = {styles.itemContainer}>
            <Image style = {styles.image} source={{uri:`https://picsum.photos/200/300?image=${Item.id}`}} />
            <Text style ={styles.name}>{Item.author}</Text>
            <View style={styles.horizontal}>

            <Text style ={styles.link} onPress = {()=>{
                Linking.openURL(Item.author_url)
                .catch(err => console.error("Couldn't load page", err))
            }  
            }>{`more about Author->`}</Text>

            <Text style ={styles.link} onPress={()=>{
                Linking.openURL(Item.post_url)
                .catch(err => console.error("Couldn't load page", err));
            }}>{`more about Post->`}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: 'white',
    },
    itemContainer:{
      height:'95%',
      margin:10,
      elevation:10,
      borderRadius:5,
      paddingHorizontal:30,
    }, 
    image:{
        height:300,
        width:200,
        marginTop:50,
        justifyContent:'center',
        alignSelf:"center"
    },
    name:{
        textAlign:'center',
        padding:10,
        fontSize:20,
        fontWeight:'bold'
    },horizontal:{
        justifyContent:'space-between',
        padding:20,
    },link:{
        textAlign:'center',
        padding:5,
        textDecorationLine: 'underline'
    }
  });
  export default ListItem;