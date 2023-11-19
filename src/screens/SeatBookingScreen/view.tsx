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
import NavigationService from 'src/navigation/navigations-service';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';

interface ISeatBookingScreen {}
export default function SeatBookingScreen({}) {
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
          onPress={() => NavigationService.goBack()}>
          <VectorIcon.MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: COLORS.Orange,
  },
});
