import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ImageBackground, ScrollView} from 'react-native';
// import EncryptedStorage from 'react-native-encrypted-storage';

import LinearGradient from 'react-native-linear-gradient';
import VectorIcon from 'src/components/vector-icons';
import {BORDER_RADIUS, COLORS, FONTSIZE, SPACING} from 'src/config/theme';
import {image500} from '../apis/moviedb';
import AppContainer from 'src/components/app-container';
import AppText from 'src/components/app-text';
import AppImage from 'src/components/app-image';
import NavigationService from 'src/navigation/navigations-service';
import {SCENE_NAME} from 'src/utils/app-const';

const TicketScreen = ({navigation, route}: any) => {
  console.log('route.params', route.params);
  const [ticketData, setTicketData] = useState<any>(route.params);

  //   useEffect(() => {
  //     (async () => {
  //       try {
  //         const ticket = await EncryptedStorage.getItem('ticket');
  //         if (ticket !== undefined && ticket !== null) {
  //           setTicketData(JSON.parse(ticket));
  //         }
  //       } catch (error) {
  //         console.error('Something went wrong while getting Data', error);
  //       }
  //     })();
  //   }, []);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  const onPressIconLeft = () => {
    NavigationService.navigate(SCENE_NAME.TICKET_SCREEN);
  };
  return (
    <AppContainer
      hasIconRight={false}
      title="My Tickets"
      styleHeader={{backgroundColor: COLORS.Black}}
      styleTitle={{color: COLORS.White}}
      onPressIconLeft={onPressIconLeft}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.ticketContainer}>
            <ImageBackground
              source={{uri: image500(ticketData?.ticketImage)}}
              style={styles.ticketBGImage}>
              <LinearGradient
                colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
                style={styles.linearGradient}>
                <View
                  style={[
                    styles.blackCircle,
                    {position: 'absolute', bottom: -40, left: -40},
                  ]}></View>
                <View
                  style={[
                    styles.blackCircle,
                    {position: 'absolute', bottom: -40, right: -40},
                  ]}></View>
              </LinearGradient>
            </ImageBackground>
            <View style={{overflow: 'hidden'}}>
              <View style={styles.linear}></View>
            </View>

            <View style={styles.ticketFooter}>
              <View
                style={[
                  styles.blackCircle,
                  {position: 'absolute', top: -40, left: -40},
                ]}></View>
              <View
                style={[
                  styles.blackCircle,
                  {position: 'absolute', top: -40, right: -40},
                ]}></View>
              <View style={styles.ticketDateContainer}>
                <View style={styles.subtitleContainer}>
                  <AppText style={styles.dateTitle}>
                    {ticketData?.date.date}
                  </AppText>
                  <AppText style={styles.subtitle}>
                    {ticketData?.date.day}
                  </AppText>
                </View>
                <View style={styles.subtitleContainer}>
                  <VectorIcon.Feather
                    name="clock"
                    style={styles.clockIcon}
                    size={FONTSIZE.size_20}
                    color={'white'}
                  />
                  <AppText style={styles.subtitle}>{ticketData?.time}</AppText>
                </View>
              </View>
              <View style={styles.ticketSeatContainer}>
                <View style={styles.subtitleContainer}>
                  <AppText style={styles.subheading}>Hall</AppText>
                  <AppText style={styles.subtitle}>02</AppText>
                </View>
                <View style={styles.subtitleContainer}>
                  <AppText style={styles.subheading}>Row</AppText>
                  <AppText style={styles.subtitle}>04</AppText>
                </View>
                <View style={styles.subtitleContainer}>
                  <AppText style={styles.subheading}>Seats</AppText>
                  <AppText style={styles.subtitle}>
                    {ticketData?.seatArray
                      .slice(0, 3)
                      .map((item: any, index: number, arr: any) => {
                        return item + (index == arr.length - 1 ? '' : ', ');
                      })}
                  </AppText>
                </View>
              </View>
              <AppImage
                source={require('src/assets/images/barcode.png')}
                style={styles.barcodeImage}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDER_RADIUS.radius_25,
    borderTopRightRadius: BORDER_RADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDER_RADIUS.radius_25,
    borderBottomRightRadius: BORDER_RADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  subtitle: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subheading: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    marginBottom: SPACING.space_10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
});

export default React.memo(TicketScreen);
