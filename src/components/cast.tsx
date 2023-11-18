import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppText from './app-text';
import AppImage from './app-image';
import {SCENE_NAME} from 'src/utils/app-const';
// import {fallbackPersonImage, image185, image342} from '../api/moviedb';
var {width, height} = Dimensions.get('window');

export default function Cast({cast, navigation}) {
  let personName = 'Test Person Name';
  let characterName = 'Test Character Name';

  return (
    <View className="my-6">
      <AppText className="text-white text-lg mx-4 mb-5">Top Cast</AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate(SCENE_NAME.PERSON_SCREEN, person)
                }
                className="mr-4 items-center">
                <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                  <AppImage
                    className="rounded-2xl h-24 w-20"
                    source={require('../assets/images/avatar.png')}
                    // source={{
                    //   uri:
                    //     image185(person?.profile_path) || fallbackPersonImage,
                    // }}
                  />
                </View>

                <AppText className="text-white text-xs mt-1">
                  {/* {person?.character.length > 10
                    ? person.character.slice(0, 10) + '...'
                    : person?.character} */}
                  {characterName.length > 10
                    ? characterName.slice(0, 10) + '...'
                    : characterName}
                </AppText>
                <AppText className="text-neutral-400 text-xs">
                  {/* {person?.original_name.length > 10
                    ? person.original_name.slice(0, 10) + '...'
                    : person?.original_name} */}
                  {personName.length > 10
                    ? personName.slice(0, 10) + '...'
                    : personName}
                </AppText>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
