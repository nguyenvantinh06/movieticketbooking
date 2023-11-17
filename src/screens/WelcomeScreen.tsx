import React, {useEffect, useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import {View} from 'react-native';
import {styled} from 'nativewind';
import {SCENE_NAME} from 'src/utils/app-const';
import NavigationService from 'src/navigation/navigations-service';
import {getItem} from 'src/utils/async-storage';

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);
  const isFirstLoad = useRef(false);
  const isCheckOnboard = useRef(false);
  const navigation = useNavigation();
  let onBoarded: string | number | null | undefined = null;
  useEffect(() => {
    if (isFirstLoad.current) return;
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + hp(5))),
      100,
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + hp(5.5))),
      300,
    );
    isFirstLoad.current = true;
  }, []);

  const [showOnboarding, setShowOnboarding] = useState(null);

  const checkIfAlreadyOnBoarded = async () => {
    onBoarded = await getItem('onBoarded');
    console.log('onBoarded', onBoarded);
    isCheckOnboard.current = true;
  };

  useEffect(() => {
    checkIfAlreadyOnBoarded();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isFirstLoad.current && isCheckOnboard.current && onBoarded) {
        setTimeout(() => NavigationService.navigate(SCENE_NAME.LOGIN), 1500);
      } else {
        setTimeout(
          () => NavigationService.navigate(SCENE_NAME.ON_BOARDING),
          1500,
        );
      }
    }, 3000);
  }, [isCheckOnboard, onBoarded]);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      {/* logo image with rings */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{padding: ring2padding}}>
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{padding: ring1padding}}>
          <AppImage
            source={require('src/assets/images/welcome.png')}
            style={{width: hp(20), height: hp(20)}}
          />
        </Animated.View>
      </Animated.View>

      {/* title and punchline */}
      <View className="flex items-center space-y-2">
        <AppText
          style={{fontSize: hp(7)}}
          className="font-bold text-white tracking-widest">
          Food App
        </AppText>
        <AppText
          style={{fontSize: hp(2)}}
          className="font-medium text-white tracking-widest">
          Food is always right
        </AppText>
      </View>
    </View>
  );
}
