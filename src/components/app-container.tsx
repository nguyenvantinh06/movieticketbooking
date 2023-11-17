import {getSize} from 'src/hooks/use-resize-hoc';
import NavigationService from 'src/navigation/navigations-service';
import React from 'react';
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {useAppTheme} from 'src/config/theme-config';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppText from 'src/components/app-text';
import {COLORS, SIZE} from 'src/config/theme';
import VectorIcon from './vector-icons';

interface IProps {
  title?: string;
  isCustomHeader?: boolean;
  children: React.ReactElement;
  headerShown?: boolean;
  hasIconLeft?: boolean;
  iconLeft?: JSX.Element;
  onPressIconLeft?: (isBackButton?: boolean) => void;
  hasIconRight?: boolean;
  iconRight?: JSX.Element;
  onPressIconRight?: () => void;
  style?: any;
  styleTitle?: any;
  readyRender?: boolean;
  error?: boolean;
  renderError?: React.ReactElement;
  checkLandscapeMode?: boolean;
  hasBottomWidth?: boolean;
  styleInnerHeader?: ViewStyle;
  styleHeader?: ViewStyle;
  disabledIconLeft?: boolean;
  disabledIconRight?: boolean;
  renderHeader?: React.ReactElement;
  renderTitle?: React.ReactElement;
}

const AppContainer = ({
  title = 'Default Text',
  isCustomHeader = false,
  children,
  headerShown = true,
  hasIconLeft = true,
  iconLeft,
  onPressIconLeft,
  hasIconRight = true,
  iconRight,
  onPressIconRight,
  style,
  styleTitle,
  readyRender = true,
  error = false,
  renderError,
  checkLandscapeMode = false,
  hasBottomWidth = true,
  styleInnerHeader,
  styleHeader,
  disabledIconLeft = false,
  disabledIconRight = false,
  renderHeader,
  renderTitle,
}: IProps) => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  let eventBackHandler = React.useRef<any>(null);
  const goBack = React.useCallback(() => {
    if (typeof onPressIconLeft === 'function') {
      Keyboard.dismiss();
      onPressIconLeft?.(true);
    } else {
      Keyboard.dismiss();
      NavigationService.goBack();
    }
  }, [onPressIconLeft]);

  React.useEffect(() => {
    eventBackHandler.current = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        hasIconLeft && goBack();
        return true;
      },
    );
    return () => {
      eventBackHandler.current?.remove();
    };
  }, [hasIconLeft, onPressIconLeft, goBack]);

  React.useEffect(() => {
    return navigation?.addListener?.('blur', () => {
      eventBackHandler.current?.remove();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {headerShown ? (
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor: theme.colors.background,
              borderColor: theme.colors.borderColor,
              paddingTop: inset.top + getSize.v(7),
            },
            hasBottomWidth && {borderBottomWidth: 1},
            styleHeader && styleHeader,
          ]}>
          {isCustomHeader ? (
            <View style={[styles.innerHeader, styleInnerHeader]}>
              {renderHeader}
            </View>
          ) : (
            <View style={[styles.innerHeader, styleInnerHeader]}>
              {hasIconLeft ? (
                <TouchableOpacity
                  onPress={() =>
                    onPressIconLeft
                      ? onPressIconLeft()
                      : NavigationService.goBack()
                  }
                  activeOpacity={0.6}
                  disabled={disabledIconLeft}>
                  {iconLeft ? (
                    <>{iconLeft}</>
                  ) : (
                    <VectorIcon.Entypo
                      name="chevron-left"
                      size={getSize.m(24)}
                      color={theme.dark ? COLORS.DarkGrey : theme.colors.text}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.emptyView} />
              )}
              {renderTitle ? (
                renderTitle
              ) : (
                <AppText
                  style={[
                    styles.titleHeader,
                    {color: theme.colors.text},
                    styleTitle,
                  ]}>
                  {title}
                </AppText>
              )}
              {hasIconRight ? (
                <TouchableOpacity
                  onPress={onPressIconRight}
                  activeOpacity={0.6}
                  disabled={disabledIconRight}>
                  {iconRight ? (
                    <>{iconRight}</>
                  ) : (
                    <VectorIcon.AntDesign
                      name="bells"
                      size={getSize.m(24)}
                      color={theme.dark ? COLORS.DarkGrey : theme.colors.text}
                    />
                  )}
                </TouchableOpacity>
              ) : (
                <View style={styles.emptyView} />
              )}
            </View>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.statusBar,
            {
              backgroundColor: theme.colors.background,
              height: inset.top + getSize.v(7),
            },
            styleHeader && styleHeader,
          ]}
        />
      )}
      {readyRender ? (
        error ? (
          <>{renderError}</>
        ) : (
          <View
            style={[
              styles.containerChildren,
              {backgroundColor: theme.colors.background},
              style,
            ]}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <>{children}</>
            </TouchableWithoutFeedback>
          </View>
        )
      ) : (
        <View />
      )}
    </View>
  );
};

export default React.memo(AppContainer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    minHeight: getSize.v(36),
    paddingHorizontal: getSize.m(16),
    // borderBottomWidth: 1,
    backgroundColor: COLORS.White,
  },
  innerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: getSize.v(36),
    paddingVertical: getSize.m(8),
  },
  titleHeader: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZE.heading4,
    fontWeight: '700',
  },
  statusBar: {
    backgroundColor: COLORS.White,
  },
  containerChildren: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  emptyView: {
    width: getSize.m(24),
    height: getSize.m(24),
  },
  headerImages: {
    width: getSize.m(144),
    height: getSize.m(32),
  },
});
