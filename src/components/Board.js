import React,{ useState } from 'react';
import {ScrollView, View,Text, StyleSheet, Image, Button, FlatList } from 'react-native';
import Photo from './Photo';
import Dropdown from "./Dropdown";

let index = 0;

const Board = function(props){
  
  let photos = props.data;
  const noOfCol = props.noOfCol;
  const[refresh, setRefresh] = useState(true);
  let myFlatListRef = null
  
  // console.log(photos[0]);
  const renderImage= function(photo)
  {
    return (<Photo data={photo}/>);
  }

  const genrateRow =function(index){
    let row = [];
    let i;
    for(i=index;i<index+noOfCol && i<photos.length;i++)
    {
      row.push(renderImage(photos[i]));    
    }
    return row;
  }

//   const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
//     return layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
//  }

  const genrateGrid = function(){
    let grid = [];
    let i;
    
    for(i=0;i<photos.length;i=i+noOfCol)
    {
      grid.push(
        <View style={styles.row_style}>
       { genrateRow(i)}
        </View>);
    }
    return grid;
  }

  const renderItem= ({item}) =>{
    return (<Photo data={item} noOfCol={noOfCol}/>);
  }

  // if(photos.length)
  // {
  //   myFlatListRef.scrollToIndex({animated:false, index:photos.length/2});
  // }
 
  return (
    <View style={{height:550}}>
      <FlatList
        data={photos}
        renderItem = {renderItem} 
        numColumns= {noOfCol}
        keyExtractor={(item) => '_' + Math.random().toString(36).substr(2, 9)}
        columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
        key={props.refreshList ? Math.floor((Math.random() * 147))  : 0}
        onEndReached={({ distanceFromEnd }) => {
          console.log('========I am the end=====')
          console.log(distanceFromEnd)
          console.log('======api need to envoke=========')
          props.onScrollToBottom(false)
          // index = myFlatListRef.index
        }}
        onEndReachedThreshold={0.9}
        // ref = {ref=> myFlatListRef=ref}
        
        // onScroll={({nativeEvent}) => {
        //   if(isCloseToBottom(nativeEvent)) {
        //     console.log("we are in bottom of scrollview")
        //     props.onScrollToBottom(false)
        //   }
        // }}
      />
      {/* <ScrollView
      alwaysBounceVertical
      onScroll={({nativeEvent}) => {
        if(isCloseToBottom(nativeEvent)) {
          console.log("we are in bottom of scrollview")
          props.onScrollToBottom(false)
        }
      }}
      >
      {genrateGrid()}
    </ScrollView> */}
    </View>
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