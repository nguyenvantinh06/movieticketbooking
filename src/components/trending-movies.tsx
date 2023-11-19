import {View, Image, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {image500} from 'src/apis/moviedb';
import {
  SCENE_NAME,
  deviceHeight,
  deviceWidth,
  genres,
} from 'src/utils/app-const';
import AppText from './app-text';
import NavigationService from 'src/navigation/navigations-service';
import {MovieDto} from 'src/utils/data-dto';
import AppImage from './app-image';
import VectorIcon from './vector-icons';
import {
  BORDER_RADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
  STYLE_GLOBAL,
} from 'src/config/theme';

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
      <View>
        <AppImage
          // source={require('src/assets/images/moviePoster1.png')}
          source={{uri: image500(item.poster_path)}}
          style={{
            width: deviceWidth * 0.6,
            height: deviceHeight * 0.4,
          }}
          className="rounded-3xl"
        />
        <View>
          <View style={styles.rateContainer}>
            <VectorIcon.MaterialCommunityIcons
              name="star"
              style={styles.starIcon}
            />
            <AppText style={styles.voteText}>
              {Number(item.vote_average)?.toFixed(1)} ({item.vote_count})
            </AppText>
          </View>

          <AppText numberOfLines={1} style={styles.textTitle}>
            {item.title}
          </AppText>

          <View style={styles.genreContainer}>
            {item.genre_ids.map((item: any) => {
              return (
                <View key={item} style={styles.genreBox}>
                  <AppText style={styles.genreText}>{genres[item]}</AppText>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  textTitle: {
    ...STYLE_GLOBAL.body1,
    color: COLORS.White,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
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
  genreContainer: {
    flexDirection: 'row',
    gap: SPACING.space_8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDER_RADIUS.radius_25,
  },
  genreText: {
    color: COLORS.WhiteRGBA75,
  },
});
