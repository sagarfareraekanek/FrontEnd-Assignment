import React from 'react';
import { View,Text, StyleSheet, Image } from 'react-native';

const Photo = function(props){
  const data = props.data;
  switch (props.noOfCol){
    case 3:
      styleSet = styles.Image_3;
      break;
      case 4:
       styleSet = styles.Image_4;
      break;
      default:
       styleSet = styles.Image_2;
  }
 // console.log(`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`)
  return (
    <View >
      <Text style={styleSet}>{`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`}</Text>
      {/* <Image source={{uri: `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}.jpg`}} style={styleSet}/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  Image_4: {
    width:85,
    height:85,
    marginVertical:2
  },
  Image_3: {
    width:115,
    height:115,
    marginVertical:2
  },
  Image_2: {
    width:175,
    height:175,
    marginVertical:2
  },
  inputstyle:{
    flex:1,
    fontSize:18
  },
  iconstyle:{
    fontSize:35,
    alignSelf: 'center',
    
  }
});

export default Photo;
