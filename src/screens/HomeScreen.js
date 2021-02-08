import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, AsyncStorage } from 'react-native';
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
    if (flag) {
      pageNo = 1;
    }
    else {
      pageNo++;
      setRefreshList(false)
    }


    //console.log('-------Loader Start before API-----------')

    await flickr.request({
      params: {
        text: term,
        page: pageNo,
      }
    }).then((response) => {

      // console.log('---------printing response caching check-----------')
      // console.log(response)

      if (response.data.stat === 'ok') {
        if (flag) {
          setPhotos(response.data.photos.photo);
          AsyncStorage.getItem(term).then(() => {
            AsyncStorage.removeItem(term);
          })
          AsyncStorage.setItem(
            term, JSON.stringify(response.data.photos.photo))

        }
        else {
          let tempPhoto = photos
          tempPhoto = tempPhoto.concat(response.data.photos.photo);
          setPhotos(tempPhoto);
          AsyncStorage.removeItem(term);
          AsyncStorage.setItem(
            term, JSON.stringify(tempPhoto))
        }
      }
      else {
        console.log('------api issue----------')
        console.log(response.data)
        AsyncStorage.getItem(term)
        .then(response => {
          setPhotos(JSON.parse(response))
        }), (error) => {
          console.log('------No Image in persistent Storage --------')
          setPhotos([]);
        }
      }
    }, (error) => {
      console.log('------network Issue----------')
      AsyncStorage.getItem(term)
        .then(response => {
          setPhotos(JSON.parse(response))
        }), (error) => {
          console.log('------No Image in persistent Storage --------')
          setPhotos([]);
        }
    }

    )
    setIsLoading(false)
    //console.log('-------Loader check in component-----------')

  }
    AsyncStorage.getItem(term).then(response => {
      if (response != null) {
        console.log('---Print Async Storage Data-------')
        let data = JSON.parse(response);
        console.log(data.length)
      }
      else {
        console.log('---No Data for in Async----')
      }
    })


    return (
      <View style={{marginBottom:5}}>
        <SearchBar term={term} onTermChange={(newTerm) => {
          setTerm(newTerm)
          setRefreshList(false)
        }}
          onTermSubmit={() => searchApi(true)} />
        <Dropdown selectedValue={noOfCol} onValueSet={(value) => {
          onColValueSelect(value)
        }} />

        <ActivityIndicator size='large' color="#0000ff" animating={isLoading} hidesWhenStopped={true} />
        <Board data={photos} noOfCol={noOfCol} onScrollToBottom={(flag) => {searchApi(flag)}} refreshList={refreshList} loading = {isLoading}></Board>

      </View>
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

