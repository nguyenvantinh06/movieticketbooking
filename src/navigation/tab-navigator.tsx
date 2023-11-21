import {
  Platform,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import _ from 'lodash';

import AppText from 'src/components/app-text';
import AppView from 'src/components/app-view';
import {useAppTheme} from 'src/config/theme-config';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {SCENE_NAME} from 'src/utils/app-const';
import {StackActions} from '@react-navigation/native';
import HomeScreen from 'src/screens/HomeScreen';
import VectorIcon from 'src/components/vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';
import {CurvedBottomBar} from 'react-native-curved-bottom-bar';
import {COLORS} from 'src/config/theme';
import SearchScreen from 'src/screens/SearchScreen';
import ProfileScreen from 'src/screens/ProfileScreen';

const Todo = () => {
  return (
    <AppView>
      <AppText>Todo</AppText>
    </AppView>
  );
};

const Stack =
  createStackNavigator<
    Record<'HomeScreen' | 'NOTIFICATIONS_SCREEN', undefined>
  >();

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
    {/* <Stack.Screen name={'ExampleScreen'}>
      {props => <TestScreen hasBack={true} {...props} />}
    </Stack.Screen> */}
    {/* <Stack.Screen
      name={SCENE_NAME.NOTIFICATIONS_SCREEN}
      component={NotificationsScreen}
    /> */}
  </Stack.Navigator>
);

// const ProfileStack = React.memo(() => (
//   <Stack.Navigator
//     initialRouteName="ProfileScreen"
//     screenOptions={{
//       headerShown: false,
//     }}>
//     <Stack.Screen name={'ProfileScreen'} component={Todo} />
//     <Stack.Screen
//       name={'ProfileScreenDetailScreen'}
//       options={{
//         cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
//       }}>
//       {props => <Todo eventDetail={{}} {...props} />}
//     </Stack.Screen>
//   </Stack.Navigator>
// ));

const BottomTabStack = () => {
  // const {orientation} = useOrientation();
  const [visible, setVisible] = React.useState<boolean>(true);
  // hide bottom tab when keyboard show
  // React.useEffect(() => {
  //   let keyboardEventListeners: any[];
  //   if (Platform.OS === 'android') {
  //     keyboardEventListeners = [
  //       Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
  //       Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
  //     ];
  //   }
  //   return () => {
  //     if (Platform.OS === 'android') {
  //       keyboardEventListeners &&
  //         keyboardEventListeners.forEach((eventListener: any) =>
  //           eventListener.remove(),
  //         );
  //     }
  //   };
  // }, []);

  // React.useEffect(() => {
  //   if (orientation === 'PORTRAIT') {
  //     setVisible(true);
  //   } else {
  //     setVisible(false);
  //   }
  // }, [orientation]);

  // const tabPressListener = props => {
  //   const {navigation} = props;
  //   return {
  //     blur: e => {
  //       const target = e.target;
  //       const route = navigation.getState().routes.find(r => r.key === target);

  //       if (route?.state?.type === 'stack' && route.state.routes?.length > 1) {
  //         navigation.dispatch(StackActions.popToTop());
  //       }
  //     },
  //     state: () => {
  //       const state = navigation.getState();
  //       console.log('state', state);
  //     },
  //   };
  // };

  const _renderIcon = (routeName: string, selectedTab: string) => {
    switch (routeName) {
      case SCENE_NAME.HOME_TAB:
        return (
          <VectorIcon.Feather
            name={'video'}
            size={25}
            color={routeName === selectedTab ? COLORS.Orange : 'gray'}
          />
        );
      case SCENE_NAME.SEARCH_SCREEN:
        return (
          <VectorIcon.Feather
            name={'search'}
            size={25}
            color={routeName === selectedTab ? COLORS.Orange : 'gray'}
          />
        );
      case SCENE_NAME.TICKET_SCREEN:
        return (
          <VectorIcon.Ionicons
            name={'ticket-outline'}
            size={25}
            color={routeName === selectedTab ? COLORS.Orange : 'gray'}
          />
        );
      case SCENE_NAME.PROFILE_TAB:
        return (
          <VectorIcon.Feather
            name={'user'}
            size={25}
            color={routeName === selectedTab ? COLORS.Orange : 'gray'}
          />
        );
    }
  };

  const renderTabBar = ({routeName, selectedTab, navigate}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}>
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <CurvedBottomBar.Navigator
      type="UP"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={55}
      circleWidth={50}
      bgColor="black"
      initialRouteName="Tab1"
      borderTopLeftRight
      screenOptions={{
        headerShown: false,
      }}
      renderCircle={({selectedTab, navigate}) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Click Action')}>
            <VectorIcon.Ionicons name={'qr-code'} color="gray" size={25} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}>
      <CurvedBottomBar.Screen
        name={SCENE_NAME.HOME_TAB}
        position="LEFT"
        component={() => <HomeScreen />}
      />
      <CurvedBottomBar.Screen
        name={SCENE_NAME.SEARCH_SCREEN}
        component={() => <SearchScreen />}
        position="LEFT"
      />
      <CurvedBottomBar.Screen
        name={SCENE_NAME.TICKET_SCREEN}
        component={() => <Todo />}
        position="RIGHT"
      />
      <CurvedBottomBar.Screen
        name={SCENE_NAME.PROFILE_TAB}
        component={() => <ProfileScreen />}
        position="RIGHT"
      />
    </CurvedBottomBar.Navigator>
  );
};
export default React.memo(BottomTabStack);

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
