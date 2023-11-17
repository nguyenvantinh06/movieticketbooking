import {Platform, Keyboard} from 'react-native';
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
import BottomTabView from 'src/components/bottom-tab-view';
import VectorIcon from 'src/components/vector-icons';
import {getSize} from 'src/hooks/use-resize-hoc';

const Todo = () => {
  return (
    <AppView>
      <AppText>Todo</AppText>
    </AppView>
  );
};

const Tab = createBottomTabNavigator();
const Stack =
  createStackNavigator<
    Record<'HomeScreen' | 'NOTIFICATIONS_SCREEN', undefined>
  >();

const HomeStack = React.memo(() => (
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
));

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
  React.useEffect(() => {
    let keyboardEventListeners: any[];
    if (Platform.OS === 'android') {
      keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', () => setVisible(false)),
        Keyboard.addListener('keyboardDidHide', () => setVisible(true)),
      ];
    }
    return () => {
      if (Platform.OS === 'android') {
        keyboardEventListeners &&
          keyboardEventListeners.forEach((eventListener: any) =>
            eventListener.remove(),
          );
      }
    };
  }, []);

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

  return (
    <Tab.Navigator
      initialRouteName={SCENE_NAME.HOME_TAB}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name={SCENE_NAME.HOME_TAB}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({focused, color}) => (
            // <TabBarIcon focused={focused} tintColor={color} name="home" />
            <VectorIcon.Feather
              name="home"
              size={getSize.m(18)}
              color={color}
            />
          ),
        }}
        // listeners={props => tabPressListener({...props})}
      />
      <Tab.Screen
        name={'Test2'}
        component={Todo}
        options={{
          title: 'Groceries',
          tabBarIcon: ({focused, color}) => (
            <VectorIcon.FontAwesome
              name="shopping-basket"
              size={getSize.m(18)}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={'test3'}
        component={Todo}
        options={{
          title: 'Likes',
          tabBarIcon: ({focused, color}) => (
            <VectorIcon.Feather
              name="heart"
              size={getSize.m(18)}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={SCENE_NAME.PROFILE_TAB}
        component={Todo}
        options={{
          title: 'Profile',
          tabBarIcon: ({focused, color}) => (
            <VectorIcon.Feather
              name="user"
              size={getSize.m(18)}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default React.memo(BottomTabStack);
