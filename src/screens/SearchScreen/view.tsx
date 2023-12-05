import {
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviePoster, image185, searchMovies} from 'src/apis/moviedb';
import {debounce} from 'lodash';
import VectorIcon from 'src/components/vector-icons';
import AppLoading from 'src/components/app-loading';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import {SCENE_NAME, deviceHeight, deviceWidth} from 'src/utils/app-const';
import {MovieDto} from 'src/utils/data-dto';
import NavigationService from 'src/navigation/navigations-service';
import {SPACING} from 'src/config/theme';

export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MovieDto[]>([]);

  const handleSearch = (search: string) => {
    if (search && search.length > 2) {
      setLoading(true);
      searchMovies({
        query: search,
        include_adult: false,
        language: 'en-US',
        page: '1',
      }).then(data => {
        console.log('got search results');
        setLoading(false);
        if (data && data.results) setResults(data.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const renderItemMovie = ({item, index}) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() =>
          NavigationService.navigate(SCENE_NAME.MOVIE_DETAIL_SCREEN, {
            dataMovie: item,
          })
        }>
        <View className="space-y-2 mb-4 items-center mx-2">
          <AppImage
            source={{
              uri: image185(item?.poster_path) || fallbackMoviePoster,
            }}
            // source={require('src/assets/images/moviePoster1.png')}
            className="rounded-3xl"
            style={{
              width: deviceWidth * 0.44,
              height: deviceHeight * 0.3,
            }}
          />
          <AppText className="text-gray-300 ml-1">
            {item.title.length > 22
              ? item.title.slice(0, 22) + '...'
              : item.title}
          </AppText>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      {/* search input */}
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(SCENE_NAME.HOME_TAB)}
          className="rounded-full p-3 m-1 bg-neutral-500">
          <VectorIcon.MaterialCommunityIcons
            name="close"
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {loading ? (
        <AppLoading />
      ) : (
        <FlatList
          data={results || []}
          keyExtractor={(item: MovieDto) => item.id?.toString()}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          // ListHeaderComponent={
          //   <View style={styles.InputHeaderContainer}>
          //     <InputHeader searchFunction={searchMoviesFunction} />
          //   </View>
          // }
          contentContainerStyle={styles.centerContainer}
          renderItem={renderItemMovie}
          ListEmptyComponent={
            <View className="flex-row justify-center">
              <AppImage
                source={require('src/assets/images/movieTime.png')}
                className="h-96 w-96"
              />
            </View>
          }
          ListFooterComponent={
            <View style={{paddingBottom: SPACING.space_36}} />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
  },
});
