import {
  View,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute} from '@react-navigation/native';
import VectorIcon from 'src/components/vector-icons';
import {COLORS} from 'src/config/theme';
import AppLoading from 'src/components/app-loading';
import AppImage from 'src/components/app-image';
import AppText from 'src/components/app-text';
import MovieList from 'src/components/movie-list';
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image185,
  image342,
  image500,
} from 'src/apis/moviedb';
import {deviceHeight, deviceWidth} from 'src/utils/app-const';
import {CastDto, MovieDto} from 'src/utils/data-dto';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';

interface IPersonScreen {
  data: CastDto;
}
export default function PersonScreen({data}: IPersonScreen) {
  const [isFavorite, toggleFavorite] = useState(false);
  const navigation = useNavigation();
  const [person, setPerson] = useState<CastDto>();
  const [personMovies, setPersonMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(data.id);
    getPersonMovies(data.id);
  }, [data]);

  const getPersonDetails = async (id: number) => {
    const data = await fetchPersonDetails(id);
    console.log('got person details', data);
    setLoading(false);
    if (data) {
      setPerson(data);
    }
  };
  const getPersonMovies = async (id: number) => {
    const data = await fetchPersonMovies(id);
    console.log('got person movies');
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{paddingBottom: 20}}>
      {/* back button */}
      <SafeAreaView
        className={
          'flex-row justify-between items-center mx-4 z-10 ' + verticalMargin
        }>
        <TouchableOpacity
          style={styles.background}
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

      {/* person details */}
      {loading ? (
        <AppLoading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 1,
            }}>
            <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
              <AppImage
                // source={require('src/assets/images/avatar.png')}
                source={{
                  uri: image342(person?.profile_path) || fallbackPersonImage,
                }}
                style={{height: deviceHeight * 0.43, width: deviceWidth * 0.74}}
              />
            </View>
          </View>

          <View className="mt-6">
            <AppText className="text-3xl text-white font-bold text-center">
              {/* Person Name */}
              {person?.name}
            </AppText>
            <AppText className="text-neutral-500 text-base text-center">
              {person?.place_of_birth}
              {/* USA */}
            </AppText>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <AppText className="text-white font-semibold ">Gender</AppText>
              <AppText className="text-neutral-300 text-sm">
                {/* Male */}
                {person?.gender == 1 ? 'Female' : 'Male'}
              </AppText>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <AppText className="text-white font-semibold">Birthday</AppText>
              <AppText className="text-neutral-300 text-sm">
                {/* 1964-09-02 */}
                {person?.birthday}
              </AppText>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <AppText className="text-white font-semibold">known for</AppText>
              <AppText className="text-neutral-300 text-sm">
                {/* Acting */}
                {person?.known_for_department}
              </AppText>
            </View>
            <View className="px-2 items-center">
              <AppText className="text-white font-semibold">Popularity</AppText>
              <AppText className="text-neutral-300 text-sm">
                {/* 84.23 % */}
                {person?.popularity?.toFixed(2)} %
              </AppText>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <AppText className="text-white text-lg">Biography</AppText>
            <AppText className="text-neutral-400 tracking-wide">
              {person?.biography ? person.biography : 'N/A'}
            </AppText>
          </View>

          {/* person movies */}
          {person?.id && personMovies?.length > 0 && (
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.Orange,
  },
});
