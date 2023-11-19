import {View, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import AppText from './app-text';
import AppImage from './app-image';
import {SCENE_NAME} from 'src/utils/app-const';
import {CastDto} from 'src/utils/data-dto';
import {fallbackPersonImage, image185, image342} from 'src/apis/moviedb';

interface ICast {
  cast: CastDto[];
  navigation: any;
}
export default function Cast({cast, navigation}: ICast) {
  // let personName = "Test Person Name";
  // let characterName = "Test Character Name";
  const renderItemCast = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate(SCENE_NAME.PERSON_SCREEN, {
            dataPerson: item,
          })
        }
        className="mr-4 items-center">
        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
          <AppImage
            className="rounded-2xl h-24 w-20"
            // source={require('src/assets/images/avatar.png')}
            source={{
              uri: image185(item?.profile_path) || fallbackPersonImage,
            }}
          />
        </View>

        <AppText className="text-white text-xs mt-1">
          {item?.character.length > 10
            ? item.character.slice(0, 10) + '...'
            : item?.character}
        </AppText>
        <AppText className="text-neutral-400 text-xs">
          {item?.original_name.length > 10
            ? item.original_name.slice(0, 10) + '...'
            : item?.original_name}
        </AppText>
      </TouchableOpacity>
    );
  };
  return (
    <View className="my-6">
      <AppText className="text-white text-lg mx-4 mb-5">Top Cast</AppText>
      <FlatList
        data={cast || []}
        keyExtractor={(item: CastDto) => item.id?.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
        renderItem={renderItemCast}
      />
    </View>
  );
}
