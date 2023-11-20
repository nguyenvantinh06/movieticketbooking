import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  SafeAreaView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {fallbackMoviePoster, image500} from 'src/apis/moviedb';
import AppImage from 'src/components/app-image';
import AppText from 'src/components/app-text';
import VectorIcon from 'src/components/vector-icons';
import {SVG_NAME} from 'src/config/svg-path';
import {
  BORDER_RADIUS,
  COLORS,
  FONTSIZE,
  SPACING,
  STYLE_GLOBAL,
} from 'src/config/theme';
import {getSize} from 'src/hooks/use-resize-hoc';
import NavigationService from 'src/navigation/navigations-service';
import {deviceHeight, deviceWidth} from 'src/utils/app-const';
import {generateDate, generateSeats, timeArray} from 'src/utils/app-utils';
import {MovieDto} from 'src/utils/data-dto';
// import EncryptedStorage from 'react-native-encrypted-storage';

interface ISeatBookingScreen {
  dataMovie: MovieDto;
}
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

const SeatBookingScreen = ({dataMovie}: ISeatBookingScreen) => {
  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        // await EncryptedStorage.setItem(
        //   'ticket',
        //   JSON.stringify({
        //     seatArray: selectedSeatArray,
        //     time: timeArray[selectedTimeIndex],
        //     date: dateArray[selectedDateIndex],
        //     ticketImage: route.params.PosterImage,
        //   }),
        // );
      } catch (error) {
        console.error(
          'Something went Wrong while storing in BookSeats Functions',
          error,
        );
      }
      NavigationService.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please Select Seats, Date and Time of the Show',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  // return (
  //   <ScrollView
  //     style={styles.container}
  //     bounces={false}
  //     showsVerticalScrollIndicator={false}>
  //     <View>
  //       <ImageBackground
  //         source={{
  //           uri: image500(dataMovie?.poster_path) || fallbackMoviePoster,
  //         }}
  //         style={styles.ImageBG}>
  //         <LinearGradient
  //           colors={[COLORS.BlackRGB10, COLORS.Black]}
  //           style={styles.linearGradient}>
  //           <TouchableOpacity
  //             className="rounded-xl p-1"
  //             onPress={() => NavigationService.goBack()}>
  //             <VectorIcon.MaterialCommunityIcons
  //               name="chevron-left"
  //               size={28}
  //               color="white"
  //             />
  //           </TouchableOpacity>
  //         </LinearGradient>
  //       </ImageBackground>
  //     </View>

  //     <View style={styles.seatContainer}>
  //       <View style={styles.containerGap20}>
  //         {twoDSeatArray?.map((item, index) => {
  //           return (
  //             <View key={index} style={styles.seatRow}>
  //               {item?.map((subitem, subindex) => {
  //                 return (
  //                   <TouchableOpacity
  //                     key={subitem.number}
  //                     onPress={() => {
  //                       selectSeat(index, subindex, subitem.number);
  //                     }}>
  //                     <SVG_NAME.SEAT
  //                       width={getSize.s(24)}
  //                       height={getSize.v(24)}
  //                       fill={
  //                         subitem.taken
  //                           ? COLORS.Grey
  //                           : subitem.selected
  //                           ? COLORS.Orange
  //                           : COLORS.White
  //                       }
  //                     />
  //                   </TouchableOpacity>
  //                 );
  //               })}
  //             </View>
  //           );
  //         })}
  //       </View>
  //       <View style={styles.seatRadioContainer}>
  //         <View style={styles.radioContainer}>
  //           <SVG_NAME.RADIO
  //             fill={COLORS.White}
  //             width={FONTSIZE.size_20}
  //             height={FONTSIZE.size_20}
  //           />
  //           <AppText style={styles.radioText}>Available</AppText>
  //         </View>
  //         <View style={styles.radioContainer}>
  //           <SVG_NAME.RADIO
  //             fill={COLORS.Grey}
  //             width={FONTSIZE.size_20}
  //             height={FONTSIZE.size_20}
  //           />
  //           <AppText style={styles.radioText}>Taken</AppText>
  //         </View>
  //         <View style={styles.radioContainer}>
  //           <SVG_NAME.RADIO
  //             fill={COLORS.Orange}
  //             width={FONTSIZE.size_20}
  //             height={FONTSIZE.size_20}
  //           />
  //           <AppText style={styles.radioText}>Selected</AppText>
  //         </View>
  //       </View>
  //     </View>

  //     <View>
  //       <FlatList
  //         data={dateArray}
  //         keyExtractor={item => item.date}
  //         horizontal
  //         bounces={false}
  //         contentContainerStyle={styles.containerGap24}
  //         renderItem={({item, index}) => {
  //           return (
  //             <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
  //               <View
  //                 style={[
  //                   styles.dateContainer,
  //                   index == 0
  //                     ? {marginLeft: SPACING.space_24}
  //                     : index == dateArray.length - 1
  //                     ? {marginRight: SPACING.space_24}
  //                     : {},
  //                   index == selectedDateIndex
  //                     ? {backgroundColor: COLORS.Orange}
  //                     : {},
  //                 ]}>
  //                 <Text style={styles.dateText}>{item.date}</Text>
  //                 <Text style={styles.dayText}>{item.day}</Text>
  //               </View>
  //             </TouchableOpacity>
  //           );
  //         }}
  //       />
  //     </View>

  //     <View style={styles.OutterContainer}>
  //       <FlatList
  //         data={timeArray}
  //         keyExtractor={item => item}
  //         horizontal
  //         bounces={false}
  //         contentContainerStyle={styles.containerGap24}
  //         renderItem={({item, index}) => {
  //           return (
  //             <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
  //               <View
  //                 style={[
  //                   styles.timeContainer,
  //                   index == 0
  //                     ? {marginLeft: SPACING.space_24}
  //                     : index == dateArray.length - 1
  //                     ? {marginRight: SPACING.space_24}
  //                     : {},
  //                   index == selectedTimeIndex
  //                     ? {backgroundColor: COLORS.Orange}
  //                     : {},
  //                 ]}>
  //                 <Text style={styles.timeText}>{item}</Text>
  //               </View>
  //             </TouchableOpacity>
  //           );
  //         }}
  //       />
  //     </View>

  //     <View style={styles.buttonPriceContainer}>
  //       <View style={styles.priceContainer}>
  //         <Text style={styles.totalPriceText}>Total Price</Text>
  //         <Text style={styles.price}>$ {price}.00</Text>
  //       </View>
  //       <TouchableOpacity onPress={BookSeats}>
  //         <Text style={styles.buttonText}>Buy Tickets</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </ScrollView>
  // );
  return (
    <View style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        className="flex-1 bg-neutral-900">
        {/* back button and movie poster */}
        <View className="w-full">
          <SafeAreaView className={'absolute z-20 px-4 left-4' + topMargin}>
            <TouchableOpacity
              style={{backgroundColor: COLORS.Orange}}
              className="rounded-xl p-1"
              onPress={() => NavigationService.goBack()}>
              <VectorIcon.MaterialCommunityIcons
                name="chevron-left"
                size={28}
                color="white"
              />
            </TouchableOpacity>
          </SafeAreaView>

          <View>
            <AppImage
              // source={require('src/assets/images/moviePoster1.png')}
              source={{
                uri: image500(dataMovie?.poster_path) || fallbackMoviePoster,
              }}
              style={{width: deviceWidth, height: deviceHeight * 0.55}}
            />
            <LinearGradient
              colors={[
                'transparent',
                'rgba(23, 23, 23, 0.8)',
                'rgba(23, 23, 23, 1)',
              ]}
              style={{width: deviceWidth, height: deviceHeight * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0"
            />
          </View>

          <View style={styles.seatContainer}>
            <View style={styles.containerGap20}>
              {twoDSeatArray?.map((item, index) => {
                return (
                  <View key={index} style={styles.seatRow}>
                    {item?.map((subitem, subindex) => {
                      return (
                        <TouchableOpacity
                          key={subitem.number}
                          onPress={() => {
                            selectSeat(index, subindex, subitem.number);
                          }}
                          disabled={subitem.taken || subitem.selected}>
                          <SVG_NAME.SEAT
                            width={getSize.s(24)}
                            height={getSize.v(24)}
                            fill={
                              subitem.taken
                                ? COLORS.Grey
                                : subitem.selected
                                ? COLORS.Orange
                                : COLORS.White
                            }
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
            <View style={styles.seatRadioContainer}>
              <View style={styles.radioContainer}>
                <SVG_NAME.RADIO
                  fill={COLORS.White}
                  width={FONTSIZE.size_20}
                  height={FONTSIZE.size_20}
                />
                <AppText style={styles.radioText}>Available</AppText>
              </View>
              <View style={styles.radioContainer}>
                <SVG_NAME.RADIO
                  fill={COLORS.Grey}
                  width={FONTSIZE.size_20}
                  height={FONTSIZE.size_20}
                />
                <AppText style={styles.radioText}>Taken</AppText>
              </View>
              <View style={styles.radioContainer}>
                <SVG_NAME.RADIO
                  fill={COLORS.Orange}
                  width={FONTSIZE.size_20}
                  height={FONTSIZE.size_20}
                />
                <AppText style={styles.radioText}>Selected</AppText>
              </View>
            </View>
          </View>

          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={styles.containerGap24}>
              {dateArray?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedDateIndex(index)}
                    key={item.date}>
                    <View
                      style={[
                        styles.dateContainer,
                        index == 0
                          ? {marginLeft: SPACING.space_24}
                          : index == dateArray.length - 1
                          ? {marginRight: SPACING.space_24}
                          : {},
                        index == selectedDateIndex
                          ? {backgroundColor: COLORS.Orange}
                          : {},
                      ]}>
                      <AppText style={styles.dateText}>{item.date}</AppText>
                      <AppText style={styles.dayText}>{item.day}</AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.OutterContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={styles.containerGap24}>
              {timeArray?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedTimeIndex(index)}
                    key={index}>
                    <View
                      style={[
                        styles.timeContainer,
                        index == 0
                          ? {marginLeft: SPACING.space_24}
                          : index == dateArray.length - 1
                          ? {marginRight: SPACING.space_24}
                          : {},
                        index == selectedTimeIndex
                          ? {backgroundColor: COLORS.Orange}
                          : {},
                      ]}>
                      <AppText style={styles.timeText}>{item}</AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.buttonPriceContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.totalPriceText}>Total Price</Text>
              <Text style={styles.price}>$ {price}.00</Text>
            </View>
            <TouchableOpacity onPress={BookSeats}>
              <Text style={styles.buttonText}>Buy Tickets</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
    // paddingHorizontal: SPACING.space_12
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    ...STYLE_GLOBAL.body3,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    ...STYLE_GLOBAL.body3,
    color: COLORS.White,
  },
  dayText: {
    ...STYLE_GLOBAL.body3,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDER_RADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    ...STYLE_GLOBAL.body3,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    ...STYLE_GLOBAL.body2,
    fontWeight: '600',
    color: COLORS.White,
  },
  price: {
    ...STYLE_GLOBAL.body2,
    fontWeight: '600',
    color: COLORS.White,
  },
  buttonText: {
    ...STYLE_GLOBAL.body2,
    fontWeight: '600',
    borderRadius: BORDER_RADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
  containerSelectSeat: {
    alignItems: 'center',
    paddingBottom: SPACING.space_12,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    width: deviceWidth,
    backgroundColor: COLORS.Orange,
  },
});

export default SeatBookingScreen;
