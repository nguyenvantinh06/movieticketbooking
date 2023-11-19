import {NavigationContainer, Theme} from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import BottomTabStack from 'src/navigation/tab-navigator';
import {SCENE_NAME} from 'src/utils/app-const';
import * as React from 'react';
import {DeviceEventEmitter, Platform, StatusBar} from 'react-native';
import {navigationRef, routeNameRef} from './navigations-service';
import AppView from 'src/components/app-view';
import {useAppTheme} from 'src/config/theme-config';
import AppText from 'src/components/app-text';
import WelcomeScreen from 'src/screens/WelcomeScreen';
import HomeScreen from 'src/screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from 'src/screens/auth/LoginScreen';
import SignUpScreen from 'src/screens/auth/SignUpScreen';
import OnboardingScreen from 'src/screens/OnboardingScreen';
import PersonScreen from 'src/screens/PersonScreen';
import MovieDetailScreen from 'src/screens/MovieDetailScreen';
import SeatBookingScreen from 'src/screens/SeatBookingScreen';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const LoggedInStack = createNativeStackNavigator();

interface IProps {
  theme: Theme;
}

const Todo = () => {
  return (
    <AppView>
      <AppText>Todo</AppText>
    </AppView>
  );
};

const AuthNavigator = () => {
  // const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={SCENE_NAME.WELCOME}>
      {/* <Stack.Screen
        name={SCENE_NAME.LOGIN}
        component={LoginScreen}
        options={{
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      /> */}
      <Stack.Screen
        name={SCENE_NAME.WELCOME}
        component={WelcomeScreen}
        options={
          {
            // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          }
        }
      />
      <Stack.Screen
        name={SCENE_NAME.HOME_TAB}
        component={HomeScreen}
        options={
          {
            // animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
          }
        }
      />
      <Stack.Screen name={SCENE_NAME.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCENE_NAME.SIGN_UP} component={SignUpScreen} />
      <Stack.Screen
        name={SCENE_NAME.ON_BOARDING}
        component={OnboardingScreen}
      />
      {/* <Stack.Screen
        name={SCENE_NAME.LOGIN}
        component={LoginScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      /> */}
      {/* <Stack.Screen
        name={SCENE_NAME.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      />
      <Stack.Screen
        name={SCENE_NAME.SIGN_UP}
        component={SignUpScreen}
        options={{
          animationEnabled: false,
          animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
        }}
      /> */}
    </AuthStack.Navigator>
  );
};

const LoggedInNavigator = () => {
  return (
    <LoggedInStack.Navigator
      initialRouteName={SCENE_NAME.ROOT}
      // initialRouteName={SCENE_NAME.ERROR_UNDER_CONSTRUCTION}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCENE_NAME.ROOT} component={BottomTabStack} />
      <Stack.Screen
        name={SCENE_NAME.MOVIE_DETAIL_SCREEN}
        component={MovieDetailScreen}
      />
      <Stack.Screen name={SCENE_NAME.PERSON_SCREEN} component={PersonScreen} />
      <Stack.Screen
        name={SCENE_NAME.SEAT_BOOKING_SCREEN}
        component={SeatBookingScreen}
      />
      {/* <Stack.Screen name={SCENE_NAME.CURRENT_TRIP_DETAIL_SCREEN}>
        {props => (
          <CurrentTripDetail
            isCurrentTripTab={false}
            tripDetails={{}}
            isTripHistory={false}
            hasBack={false}
            {...props}
          />
        )}
      </Stack.Screen>
     */}
    </LoggedInStack.Navigator>
  );
};

const App: React.FC<IProps> = () => {
  const theme = useAppTheme();
  // const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
  const isLoggedIn = true;
  // React.useEffect(() => {
  //   return StatusBar.setBarStyle('dark-content');
  // }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current =
          navigationRef.current?.getCurrentRoute()?.name || '';
      }}
      onStateChange={async () => {
        // const previousRouteName = routeNameRef.current;
        const currentRouteName: string =
          navigationRef.current?.getCurrentRoute()?.name || '';

        // if (previousRouteName !== currentRouteName) {
        //   await analytics().logScreenView({
        //     screen_name: currentRouteName,
        //     screen_class: currentRouteName,
        //   });
        // }
        DeviceEventEmitter.emit('currentRouteName', {name: currentRouteName});
        routeNameRef.current = currentRouteName || null;
      }}
      theme={theme}>
      <StatusBar
        backgroundColor={Platform.select({
          ios: undefined,
          android: 'transparent',
        })}
        translucent={true}
      />
      <AppView row flex>
        <AppView flex>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isLoggedIn ? (
              <Stack.Screen name="LoggedStack" component={LoggedInNavigator} />
            ) : (
              <Stack.Screen
                name="AuthStack"
                component={AuthNavigator}
                options={{
                  animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
                }}
              />
            )}
          </Stack.Navigator>
        </AppView>
      </AppView>
    </NavigationContainer>
  );
};

export default App;
