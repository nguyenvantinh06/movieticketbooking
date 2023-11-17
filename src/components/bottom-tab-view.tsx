import {StyleSheet, View, Pressable} from 'react-native';
import React from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {getSize} from 'src/hooks/use-resize-hoc';
import {useAppTheme} from 'src/config/theme-config';
import AppText from 'src/components/app-text';
import {StackNavigation} from 'src/types';
import {parseBadge} from 'src/utils/app-utils';
import VectorIcon from './vector-icons';
import {COLORS, FONT_FAMILY} from 'src/config/theme';

const BottomTabView = (props: BottomTabBarProps) => {
  const theme = useAppTheme();
  //   const {countCheckIns, countUpdates} = useAppSelector(state => state.counter);
  //   const {selectorChild} = useAppSelector(state => state.children);
  const countCheckIns = 0;
  const countUpdates = 0;
  const {state, descriptors, navigation, insets} = props;

  const activeColor = COLORS.Primary;
  const unActiveColor = COLORS.Grey;

  const tabIcons = [
    {
      id: 1,
      iconActive: (
        <VectorIcon.Feather
          name="home"
          size={getSize.m(18)}
          color={activeColor}
        />
      ),
      iconUnActive: (
        <VectorIcon.Feather
          name="home"
          size={getSize.m(18)}
          color={unActiveColor}
        />
      ),
    },
    {
      id: 2,
      iconActive: (
        <VectorIcon.Feather
          name="package"
          size={getSize.m(18)}
          color={activeColor}
        />
      ),
      iconUnActive: (
        <VectorIcon.Feather
          name="package"
          size={getSize.m(18)}
          color={unActiveColor}
        />
      ),
    },
    {
      id: 3,
      iconActive: (
        <VectorIcon.Feather
          name="heart"
          size={getSize.m(18)}
          color={activeColor}
        />
      ),
      iconUnActive: (
        <VectorIcon.Feather
          name="heart"
          size={getSize.m(18)}
          color={unActiveColor}
        />
      ),
    },
    {
      id: 4,
      iconActive: (
        <VectorIcon.Feather
          name="user"
          size={getSize.m(18)}
          color={activeColor}
        />
      ),
      iconUnActive: (
        <VectorIcon.Feather
          name="user"
          size={getSize.m(18)}
          color={unActiveColor}
        />
      ),
    },
  ];

  const containerStyle = {
    paddingBottom: insets.bottom,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderColor: theme.colors.borderColor,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            (navigation as unknown as StackNavigation)?.navigate<any>({
              name: route.name,
              merge: true,
            });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options?.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}>
            {
              <View style={styles.button}>
                <View style={styles.iconView}>
                  {isFocused
                    ? tabIcons[index].iconActive
                    : tabIcons[index].iconUnActive}
                  {index === 1 && countCheckIns > 0 && (
                    <View
                      style={{
                        ...styles.countBadgeStyle,
                        borderColor: theme.colors.background,
                      }}>
                      <AppText style={styles.badgeTextStyle}>
                        {parseBadge(countCheckIns)}
                      </AppText>
                    </View>
                  )}

                  {index === 2 && countUpdates > 0 && (
                    <View
                      style={{
                        ...styles.countBadgeStyle,
                        borderColor: theme.colors.background,
                      }}>
                      <AppText style={styles.badgeTextStyle}>
                        {parseBadge(countUpdates)}
                      </AppText>
                    </View>
                  )}
                </View>
                <AppText
                  style={[
                    styles.labelText,
                    {color: isFocused ? activeColor : unActiveColor},
                  ]}>
                  {label}
                </AppText>
              </View>
            }
          </Pressable>
        );
      })}
    </View>
  );
};

export default React.memo(BottomTabView);

const styles = StyleSheet.create({
  container: {
    minHeight: getSize.v(52),
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    elevation: 12,
  },
  tabBarButton: {
    minHeight: getSize.m(52),
    flex: 1,
  },
  button: {
    paddingTop: getSize.m(5),
    flex: 1,
    alignItems: 'center',
  },
  iconView: {
    height: getSize.v(28),
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    // paddingTop: getSize.m(2),
    fontSize: getSize.m(10),
    lineHeight: getSize.m(16),
    fontFamily: FONT_FAMILY.regular,
    fontWeight: '600',
  },
  countBadgeStyle: {
    width: getSize.m(14),
    height: getSize.m(14),
    borderRadius: getSize.m(14) / 2,
    // borderWidth: 1,
    backgroundColor: 'red',
    position: 'absolute',
    zIndex: Number.MAX_SAFE_INTEGER,
    top: 2,
    right: -3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTextStyle: {
    color: 'white',
    fontSize: getSize.m(8),
    fontWeight: '600',
    lineHeight: getSize.m(10),
  },
});
