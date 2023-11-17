import {View, Text, ScrollView, Image, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import AppText from 'src/components/app-text';
import VectorIcon from 'src/components/vector-icons';
import AppImage from 'src/components/app-image';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}
        className="space-y-6 pt-14">
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <AppImage
            source={require('src/assets/images/avatar.png')}
            style={{height: hp(5), width: hp(5.5)}}
          />
          <VectorIcon.MaterialCommunityIcons
            name="bell-outline"
            size={hp(4)}
            color="gray"
          />
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <AppText style={{fontSize: hp(1.7)}} className="text-neutral-600">
            Hello, Noman!
          </AppText>
          <View>
            <AppText
              style={{fontSize: hp(3.8)}}
              className="font-semibold text-neutral-600">
              Make your own food,
            </AppText>
          </View>
          <AppText
            style={{fontSize: hp(3.8)}}
            className="font-semibold text-neutral-600">
            stay at{' '}
            <AppText style={{fontSize: hp(3.8)}} className="text-amber-400">
              home
            </AppText>
          </AppText>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={'gray'}
            // style={{fontSize: hp(1.7)}}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <VectorIcon.MaterialIcons
              name="search"
              size={hp(2.5)}
              color="gray"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
