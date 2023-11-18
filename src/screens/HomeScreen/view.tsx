import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {
//   fetchTopRatedMovies,
//   fetchTrendingMovies,
//   fetchUpcomingMovies,
// } from '../api/moviedb';
import {useNavigation} from '@react-navigation/native';
import AppText from 'src/components/app-text';
import VectorIcon from 'src/components/vector-icons';
import AppLoading from 'src/components/app-loading';
import MovieList from 'src/components/movie-list';
import TrendingMovies from 'src/components/trending-movies';
import {COLORS, STYLE_GLOBAL} from 'src/config/theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3]);
  const [upcoming, setUpcoming] = useState([1, 2, 3]);
  const [topRated, setTopRated] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  //   useEffect(() => {
  //     getTrendingMovies();
  //     getUpcomingMovies();
  //     getTopRatedMovies();
  //   }, []);

  //   const getTrendingMovies = async () => {
  //     const data = await fetchTrendingMovies();
  //     console.log('got trending', data.results.length);
  //     if (data && data.results) setTrending(data.results);
  //     setLoading(false);
  //   };
  //   const getUpcomingMovies = async () => {
  //     const data = await fetchUpcomingMovies();
  //     console.log('got upcoming', data.results.length);
  //     if (data && data.results) setUpcoming(data.results);
  //   };
  //   const getTopRatedMovies = async () => {
  //     const data = await fetchTopRatedMovies();
  //     console.log('got top rated', data.results.length);
  //     if (data && data.results) setTopRated(data.results);
  //   };

  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios ? '-mb-8' : 'mb-3'}>
        <StatusBar barStyle="light-content" />
        <View className="flex-row justify-between items-center mx-3">
          <VectorIcon.FontAwesome size={30} color="white" name="bars" />
          <AppText className="text-white text-3xl font-bold">
            <AppText style={styles.textMovie}>M</AppText>ovies
          </AppText>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <VectorIcon.Feather size={30} color="white" name="search" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <AppLoading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 60}}>
          {/* Trending Movies Carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upcoming.length > 0 && (
            <MovieList title="Upcoming" data={upcoming} />
          )}

          {/* top rated movies row */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  textMovie: {
    ...STYLE_GLOBAL.heading2,
    color: COLORS.Orange,
  },
});
