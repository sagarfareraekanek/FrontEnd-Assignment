import React, { useState ,useEffect , Component , useCallback} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, AsyncStorage ,ActivityIndicator} from 'react-native';
import SearchBar from '../components/SearchBar';
import flickr from '../api/flickr';
import Board from '../components/Board';
import Dropdown from '../components/Dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import Photo from '../components/Photo';

const HomeScreen = function () {
  const [term, setTerm] = useState('');
  const [noOfCol,setCol] = useState(2);
  const [IsColValueUpdated, SetIsColValueUpdated] = useState(false)
  let pageNo=0;
  const [photos, setPhotos] = useState([]);
 const [onSubmit,setOnSubmit] = useState(true);
 const [refreshList,setRefreshList] = useState(false);
 const [isLoading, setIsLoading] = useState(false);
const onColValueSelect = function(value)
{
    setCol(value);
    SetIsColValueUpdated(true);
    setRefreshList(true)
}
  const searchApi = async (flag) => {
    setIsLoading(true)
    
    if(flag){
      pageNo=1;
    }
    else
    pageNo++;
    const response = await flickr.request({params:{
      text:term,
      page:pageNo,
    }});

    //console.log('=====printing api data===')
    //console.log(response.data.photos.photo)
    //console.log(response.data.photos.photo.length)

    if(flag){
     setPhotos(response.data.photos.photo);
     
    }
    else{
      let tempPhoto = photos
      tempPhoto = tempPhoto.concat(response.data.photos.photo);
      setPhotos(tempPhoto);
      if(refreshList===true) {
        setRefreshList(false)
      }
    }
    setIsLoading(false)
  }
// console.log("----updated phtoos to flatlist")
// console.log(photos.length)
// console.log('====Assigning refresh logic to flatslist============')
// console.log(refreshList)
return (
  <SafeAreaView>
    <SearchBar term={term} onTermChange={(newTerm) => {
      setTerm(newTerm)
      setRefreshList(false)
      }} 
      onTermSubmit={() => searchApi(true)} />
    <Dropdown selectedValue={noOfCol} onValueSet={(value)=>{
      onColValueSelect(value)
    }}/>

    <ActivityIndicator size='large' color="#0000ff" animating = {isLoading} hidesWhenStopped = {true}/>   
    <Board data={photos} noOfCol={noOfCol} onScrollToBottom={(flag)=> {
      searchApi(flag)
      
      }} refreshList = {refreshList}></Board>
    {/* <Text>{term}</Text> */}
  </SafeAreaView>
)
// console.log('======= IsColValueUpdated ======')

// console.log('======= printing column updated======')
// console.log(IsColValueUpdated);
//   return (
//   <View style={{flex:1}}>
//     <SearchBar term={term} onTermChange={(newTerm) => {setTerm(newTerm)}} 
//             onTermSubmit={() => console.log('lets try ')} />
//             <Dropdown selectedValue={noOfCol} onValueSet={(value)=>{
//         onColValueSelect(value)
//       }}/>
//     <UnsplashFeed noOfCol={noOfCol} term={term} IsColValueUpdated={IsColValueUpdated} resetIsColValueUpdated={()=>SetIsColValueUpdated(false)}/>
//     </View>
//   );

};
const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1
  }

});
// function useUnsplashPhotos(keyword) {
//   const [page, setPage] = useState(1);
//   const [shouldFetch, setShouldFetch] = useState(true);
//   const [photos, setPhotos] = useState([]);
//   const fetchMore = useCallback(() => setShouldFetch(true), []);

//   useEffect(
//     () => {
//       if (!shouldFetch) {
//         return;
//       }

//       const fetch = async () => {

//         const response = await flickr.request({params:{
//           text:keyword,
//           page:page,
//           per_page:48
//         }});
//         const newPhotos = response.data.photos.photo;
//         setShouldFetch(false);
//         setPhotos(oldPhotos => [...oldPhotos, ...newPhotos]);
        
//         //increment page for the next call
//         setPage(page + 1);
//       };

//       fetch();
//     },
//     // prevent fetching for other state changes
//     [page, shouldFetch],
//   );

//   return [photos, fetchMore];
// }

// const UnsplashFeed = props => {
//   const [photos, fetchMore] = useUnsplashPhotos('dog');

//   const renderItem = ({ item, index }) => {
//     return (
//       <Photo data={item} noOfCol={props.noOfCol} ></Photo>
//     );
//   };

//   //console.log("---pirnting photos from feed-----")
//   //console.log(photos)

//   console.log('======= printing column updated======')
//   console.log(props.IsColValueUpdated)

//   return (
//     <View style={{ flex: 1 , marginTop: -450, marginBottom: 40}}>
//       <FlatList
//         data={photos}
//         renderItem={renderItem}
//         numColumns= {props.noOfCol}
//         keyExtractor={(item) => '_' + Math.random().toString(36).substr(2, 9)}
//         columnWrapperStyle={{flex: 1, justifyContent: 'space-around'}}
//         key={props.IsColValueUpdated ? Math.floor((Math.random() * 147)) : 0}
//         onEndReachedThreshold={0.9}
//         onEndReached={fetchMore}
//       />
//     </View>
//   );
// };

export default HomeScreen;

