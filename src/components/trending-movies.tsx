import {View, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
// import {image500} from '../api/moviedb';
import {SCENE_NAME, deviceHeight, deviceWidth} from 'src/utils/app-const';
import AppText from './app-text';

export default function TrendingMovies({data}) {
  const navigation = useNavigation();

  const handleClick = item => {
    navigation.navigate(SCENE_NAME.MOVIE_SCREEN, item);
  };
  return (
    <View className="mb-8">
      <AppText className="text-white text-xl mx-4 mb-5">Trending</AppText>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        // loop={true}
        // inactiveSlideScale={0.86}
        inactiveSlideOpacity={0.6}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth * 0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  );
}

const MovieCard = ({item, handleClick}) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <Image
        source={require('src/assets/images/moviePoster1.png')}
        // source={{uri: image500(item.poster_path)}}
        style={{
          width: deviceWidth * 0.6,
          height: deviceHeight * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
