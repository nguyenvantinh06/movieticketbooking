import {
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import AppText from './app-text';
import {SCENE_NAME, deviceHeight, deviceWidth} from 'src/utils/app-const';
import AppImage from './app-image';
import {COLORS, STYLE_GLOBAL} from '../config/theme';
import {
  fallbackMoviePoster,
  image185,
  image342,
  poster342,
} from 'src/apis/moviedb';
import NavigationService from 'src/navigation/navigations-service';
import {MovieDto} from 'src/utils/data-dto';

interface IMovieList {
  title: string;
  hideSeeAll?: boolean;
  data: MovieDto[];
}
export default function MovieList({title, hideSeeAll, data}: IMovieList) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <AppText className="text-white text-lg">{title}</AppText>
        {!hideSeeAll && (
          <TouchableOpacity>
            <AppText style={styles.text} className="text-lg">
              See All
            </AppText>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() =>
                NavigationService.navigate(SCENE_NAME.MOVIE_SCREEN, {
                  dataMovie: item,
                })
              }>
              <View className="space-y-1 mr-4">
                <AppImage
                  // source={require('src/assets/images/moviePoster1.png')}
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  className="rounded-3xl"
                  style={{
                    width: deviceWidth * 0.33,
                    height: deviceHeight * 0.22,
                  }}
                />
                <AppText
                  className="text-neutral-300 ml-1"
                  style={{textAlign: 'center'}}>
                  {item.title.length > 14
                    ? item.title.slice(0, 14) + '...'
                    : item.title}
                </AppText>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    ...STYLE_GLOBAL.body1,
    color: COLORS.Orange,
  },
});
