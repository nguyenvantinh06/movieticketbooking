import {View, Image, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {image500} from 'src/apis/moviedb';
import {SCENE_NAME, deviceHeight, deviceWidth} from 'src/utils/app-const';
import AppText from './app-text';
import NavigationService from 'src/navigation/navigations-service';
import {MovieDto} from 'src/utils/data-dto';
import AppImage from './app-image';

interface ITrendingMovies {
  data: MovieDto[];
}
export default function TrendingMovies({data}: ITrendingMovies) {
  const navigation = useNavigation();

  const handleClick = (item: MovieDto) => {
    console.log('handleClick', item);
    NavigationService.navigate(SCENE_NAME.MOVIE_DETAIL_SCREEN, {
      dataMovie: item,
    });
  };
  return (
    <View className="mb-8">
      <AppText className="text-white text-xl mx-4 mb-5 font-bold">
        Trending
      </AppText>
      <Carousel
        data={data}
        renderItem={({item}) => (
          <MovieCard handleClick={handleClick} item={item} />
        )}
        firstItem={1}
        loop={true}
        inactiveSlideScale={0.86}
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
      <AppImage
        // source={require('src/assets/images/moviePoster1.png')}
        source={{uri: image500(item.poster_path)}}
        style={{
          width: deviceWidth * 0.6,
          height: deviceHeight * 0.4,
        }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
