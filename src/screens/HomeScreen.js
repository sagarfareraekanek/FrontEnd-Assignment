import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import flickr from '../api/flickr';
import Board from '../components/Board';
import Dropdown from '../components/Dropdown';

let pageNo = 0;
const HomeScreen = function () {
  const [term, setTerm] = useState('');
  const [noOfCol, setCol] = useState(2);
  const [photos, setPhotos] = useState([]);
  const [refreshList, setRefreshList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onColValueSelect = function (value) {
    setCol(value);
    setRefreshList(true);
  }

  const searchApi = async (flag) => {

    setIsLoading(true)
    if(flag){
      pageNo = 1;
    }
    else{
      pageNo++;
      setRefreshList(false)
    }
    

    //console.log('-------Loader Start before API-----------')

    const response = await flickr.request({
      params: {
        text: term,
        page: pageNo,
      }
    });

   // console.log('-------Loader Start after API-----------')


    if (flag) {
      setPhotos(response.data.photos.photo);
    }
    else {
      let tempPhoto = photos
      tempPhoto = tempPhoto.concat(response.data.photos.photo);
      setPhotos(tempPhoto);
      
    }
    setIsLoading(false)
  }

  //console.log('-------Loader check in component-----------')

  return (
    <SafeAreaView>
      <SearchBar term={term} onTermChange={(newTerm) => {
        setTerm(newTerm)
        setRefreshList(false)
      }}
        onTermSubmit={() => searchApi(true)} />
      <Dropdown selectedValue={noOfCol} onValueSet={(value) => {
        onColValueSelect(value)
      }} />

      <ActivityIndicator size='large' color="#0000ff" animating={isLoading} hidesWhenStopped={true} />
      <Board data={photos} noOfCol={noOfCol} onScrollToBottom={(flag) => {
        searchApi(flag)

      }} refreshList={refreshList}></Board>

    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1
  }

});

export default HomeScreen;

