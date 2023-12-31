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
import {
  BORDER_RADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
  STYLE_GLOBAL,
} from '../config/theme';
import {
  fallbackMoviePoster,
  image185,
  image342,
  poster342,
} from 'src/apis/moviedb';
import NavigationService from 'src/navigation/navigations-service';
import {MovieDto} from 'src/utils/data-dto';
import VectorIcon from './vector-icons';

interface IMovieList {
  title: string;
  hideSeeAll?: boolean;
  data: MovieDto[];
  hasRating?: boolean;
}
export default function MovieList({
  title,
  hideSeeAll,
  data,
  hasRating = false,
}: IMovieList) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <AppText className="text-white text-lg font-bold">{title}</AppText>
        {!hideSeeAll && (
          <TouchableOpacity>
            <AppText style={styles.text} className="text-lg font-bold">
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
                NavigationService.navigate(SCENE_NAME.MOVIE_DETAIL_SCREEN, {
                  dataMovie: item,
                })
              }>
              <View>
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
                  {hasRating ? (
                    <View style={styles.rateContainer}>
                      <VectorIcon.MaterialCommunityIcons
                        name="star"
                        style={styles.starIcon}
                      />
                      <AppText style={styles.voteText}>
                        {Number(item.vote_average)?.toFixed(1)} (
                        {item.vote_count})
                      </AppText>
                    </View>
                  ) : null}
                </View>
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
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_10,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  voteText: {
    ...STYLE_GLOBAL.body2,
    color: COLORS.White,
  },
});
