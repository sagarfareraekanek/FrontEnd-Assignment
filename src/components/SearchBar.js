import React from 'react';
import { View,Text, StyleSheet, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = function({term,onTermChange, onTermSubmit}){
  return (
    <View style={styles.backgroundstyle}>
      <Feather name='search' style={styles.iconstyle}/>
      <TextInput style={styles.inputstyle}placeholder="Search" value={term} onChangeText={newTerm => onTermChange(newTerm)} onEndEditing={()=> onTermSubmit()}/>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundstyle: {
    marginTop:15,
    backgroundColor: '#F0EEEE',
    height:50,
    borderRadius:5,
    marginHorizontal:15,
    flexDirection: 'row',
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

export default SearchBar;
