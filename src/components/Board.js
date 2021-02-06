import React from 'react';
import { View,Text, StyleSheet, FlatList } from 'react-native';
import Photo from './Photo';

let keyValue = 0;

const Board = function(props){
  let photos = props.data;
  const noOfCol = props.noOfCol;
 
  
  const renderItem= ({item}) =>{
    return (<Photo data={item} noOfCol={noOfCol}/>);
  }

  const setKey = function (){
    // console.log('----props.refreshlist value in setkey function---------')
    // console.log(props.refreshList);
    if(props.refreshList)
    {
      keyValue = (Math.random());
    }
    
    return keyValue;
  }
  
  // console.log('----key value below setkey---------')
  // console.log(keyValue);

  return (
      <FlatList
        data={photos}
        renderItem = {renderItem} 
        numColumns= {noOfCol}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
        key={setKey()}
        onEndReached={({ distanceFromEnd }) => { props.onScrollToBottom(false)}}
        onEndReachedThreshold={0.9}
      />
  );
};

const styles = StyleSheet.create({
  Image: {
    width:50,
    height:50
  },
  back:{
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor:'pink'
  },
  row_style:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginVertical: 8,
  },
  inputstyle:{
    flex:1,
    fontSize:18
  },
  iconstyle:{
    fontSize:35,
    alignSelf: 'center',
    marginHorizontal:15
  }
  
});

export default Board;