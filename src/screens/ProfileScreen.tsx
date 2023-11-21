import * as React from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import AppImage from 'src/components/app-image';
import AppText from 'src/components/app-text';
import SettingComponent from 'src/components/setting-component';
import {COLORS, SPACING} from 'src/config/theme';

const SETTING = [
  {
    id: 1,
    type: 'user',
  },
  {
    id: 2,
    type: 'setting',
  },
  {
    id: 3,
    type: 'referral',
  },
  {
    id: 4,
    type: 'about',
  },
];
const ProfileScreen = ({navigation}: any) => {
  return (
    <View className="flex-1 bg-neutral-800">
      <ScrollView>
        <View style={styles.appHeaderContainer}>
          {/* <AppHeader
          name="close"
          header={'My Profile'}
          action={() => navigation.goBack()}
        /> */}
        </View>

        <View style={styles.profileContainer}>
          <AppImage
            source={require('src/assets/images/avatar.png')}
            style={styles.avatarImage}
          />
          <AppText style={styles.avatarText}>Account Name</AppText>
        </View>

        <View style={styles.profileContainer}>
          {SETTING.map(item => {
            return <SettingComponent typeSetting={item?.type} key={item?.id} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_36,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
});

export default React.memo(ProfileScreen);
