import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import VectorIcon from './vector-icons';
import {COLORS, FONTSIZE, SPACING, STYLE_GLOBAL} from 'src/config/theme';
import {useMemo} from 'react';

const SettingComponent = ({typeSetting}: any) => {
  const getInformation = useMemo(() => {
    switch (typeSetting) {
      case 'user':
        return {
          icon: (
            <VectorIcon.Feather
              name={'user'}
              color={COLORS.White}
              size={FONTSIZE.size_24}
            />
          ),
          heading: 'Account',
          subheading: 'Edit Profile',
          subtitle: 'Change Password',
        };
      case 'setting':
        return {
          icon: (
            <VectorIcon.Feather
              name={'settings'}
              color={COLORS.White}
              size={FONTSIZE.size_24}
            />
          ),
          heading: 'Settings',
          subheading: 'Theme',
          subtitle: 'Permissions',
        };
      case 'referral':
        return {
          icon: (
            <VectorIcon.Feather
              name={'dollar-sign'}
              color={COLORS.White}
              size={FONTSIZE.size_24}
            />
          ),
          heading: 'Offers & Referrals',
          subheading: 'Offers',
          subtitle: 'Referrals',
        };
      case 'about':
        return {
          icon: (
            <VectorIcon.MaterialCommunityIcons
              name={'information-outline'}
              color={COLORS.White}
              size={FONTSIZE.size_24}
            />
          ),
          heading: 'About',
          subheading: 'About Movies',
          subtitle: 'More',
        };
    }
  }, [typeSetting]);
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.iconStyle}>{getInformation?.icon}</View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{getInformation?.heading}</Text>
        <Text style={styles.subtitle}>{getInformation?.subheading}</Text>
        <Text style={styles.subtitle}>{getInformation?.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <VectorIcon.MaterialCommunityIcons
          name={'chevron-right'}
          style={styles.iconStyle}
          color={COLORS.White}
          size={FONTSIZE.size_24}
        />
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(SettingComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    paddingHorizontal: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    ...STYLE_GLOBAL.heading4,
    color: COLORS.White,
  },
  subtitle: {
    ...STYLE_GLOBAL.body2,
    color: COLORS.WhiteRGBA15,
  },
});
