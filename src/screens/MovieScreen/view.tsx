import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from 'src/components/vector-icons';
import {COLORS} from 'src/config/theme';
import AppLoading from 'src/components/app-loading';
import AppImage from 'src/components/app-image';
import AppText from 'src/components/app-text';
import MovieList from 'src/components/movie-list';
import Cast from 'src/components/cast';
// import {
//   fallbackMoviePoster,
//   fetchMovieCredits,
//   fetchMovieDetails,
//   fetchSimilarMovies,
//   image500,
// } from '../api/moviedb';
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
var {width, height} = Dimensions.get('window');

export default function MovieScreen() {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({id: 1});
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [isFavorite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     setLoading(true);
  //     getMovieDetials(item.id);
  //     getMovieCredits(item.id);
  //     getSimilarMovies(item.id);
  //   }, [item]);

  //   const getMovieDetials = async id => {
  //     const data = await fetchMovieDetails(id);
  //     console.log('got movie details');
  //     setLoading(false);
  //     if (data) {
  //       setMovie({...movie, ...data});
  //     }
  //   };
  //   const getMovieCredits = async id => {
  //     const data = await fetchMovieCredits(id);
  //     console.log('got movie credits');
  //     if (data && data.cast) {
  //       setCast(data.cast);
  //     }
  //   };
  //   const getSimilarMovies = async id => {
  //     const data = await fetchSimilarMovies(id);
  //     console.log('got similar movies');
  //     if (data && data.results) {
  //       setSimilarMovies(data.results);
  //     }
  //   };
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      className="flex-1 bg-neutral-900">
      {/* back button and movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row justify-between items-center px-4 ' +
            topMargin
          }>
          <TouchableOpacity
            style={styles.backgroundButtonBack}
            className="rounded-xl p-1"
            onPress={() => navigation.goBack()}>
            <VectorIcon.MaterialCommunityIcons
              name="chevron-left"
              size={28}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
            <VectorIcon.MaterialCommunityIcons
              name="heart"
              size={35}
              color={isFavorite ? COLORS.Orange : 'white'}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <AppLoading />
        ) : (
          <View>
            <AppImage
              source={require('src/assets/images/moviePoster1.png')}
              //   source={{uri: image500(movie.poster_path) || fallbackMoviePoster}}
              style={{width, height: height * 0.55}}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23, 23, 23, 0.8)',
                'rgba(23, 23, 23, 1)',
              ]}
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"
            />
          </View>
        )}
      </View>

      {/* movie details */}

      <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
        {/* title */}
        <AppText className="text-white text-center text-3xl font-bold tracking-widest">
          {/* {movie?.title} */}
          Movie title
        </AppText>

        {/* status, release year, runtime */}
        {movie?.id ? (
          <AppText className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} •{' '}
            {movie?.runtime} min
          </AppText>
        ) : null}

        {/* genres  */}
        <View className="flex-row justify-center mx-4 space-x-2">
          {movie?.genres?.map((genre, index) => {
            let showDot = index + 1 != movie?.genres.length;
            return (
              <AppText
                key={index}
                className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name} {showDot ? '•' : null}
              </AppText>
            );
          })}
        </View>

        {/* description */}
        <AppText className="text-neutral-400 mx-4 tracking-wide">
          {/* {movie?.overview} */}
          Movie overview
        </AppText>
      </View>

      {/* cast */}
      {movie?.id && cast.length > 0 && (
        <Cast navigation={navigation} cast={cast} />
      )}

      {/* similar movies section */}
      {movie?.id && similarMovies.length > 0 && (
        <MovieList
          title={'Similar Movies'}
          hideSeeAll={true}
          data={similarMovies}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundButtonBack: {
    backgroundColor: COLORS.Orange,
  },
});
