import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
    Easing,
    Extrapolation,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";


import Colors from '../constants/Colors';

const CustomFloating = ({ navigation, reports, screen }) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
    const firstValue = useSharedValue(30);
    const secondValue = useSharedValue(30);
    const thirdValue = useSharedValue(30);
    const fourthValue = useSharedValue(30);
    const firstWidth = useSharedValue(60);
    const secondWidth = useSharedValue(60);
    const thirdWidth = useSharedValue(60);
    const fourthWidth = useSharedValue(60);
    const isOpen = useSharedValue(false);
    const opacity = useSharedValue(0);
    const progress = useDerivedValue(() =>
        isOpen.value ? withTiming(1) : withTiming(0),
    );

    const handlePress = () => {
        const config = {
            easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
            duration: 500,
        };
        if (isOpen.value) {
            firstWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    firstValue.value = withTiming(30, config);
                }
            });
            secondWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    secondValue.value = withDelay(50, withTiming(30, config));
                }
            });
            thirdWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    thirdValue.value = withDelay(100, withTiming(30, config));
                }
            });
            fourthWidth.value = withTiming(60, { duration: 100 }, finish => {
                if (finish) {
                    fourthValue.value = withDelay(100, withTiming(30, config));
                }
            });
            opacity.value = withTiming(0, { duration: 100 });
        } else {
            firstValue.value = withDelay(200, withSpring(130));
            secondValue.value = withDelay(100, withSpring(210));
            thirdValue.value = withDelay(100, withSpring(290));
            fourthValue.value = withSpring(370);

            firstWidth.value = withDelay(1200, withSpring(200));
            secondWidth.value = withDelay(1100, withSpring(200));
            thirdWidth.value = withDelay(1100, withSpring(200));
            fourthWidth.value = withDelay(1000, withSpring(200));

            opacity.value = withDelay(1200, withSpring(1));
        }
        isOpen.value = !isOpen.value;
    };

    const opacityText = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    const firstWidthStyle = useAnimatedStyle(() => {
        return {
            width: firstWidth.value,
        };
    });
    const secondWidthStyle = useAnimatedStyle(() => {
        return {
            width: secondWidth.value,
        };
    });
    const thirdWidthStyle = useAnimatedStyle(() => {
        return {
            width: thirdWidth.value,
        };
    });

    const fourthWidthStyle = useAnimatedStyle(() => {
        return {
            width: fourthWidth.value,
        };
    });


    const firstIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            firstValue.value,
            [30, 130],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: firstValue.value,
            transform: [{ scale: scale }],
        };
    });

    const secondIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            secondValue.value,
            [30, 210],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: secondValue.value,
            transform: [{ scale: scale }],
        };
    });

    const thirdIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            thirdValue.value,
            [30, 290],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: thirdValue.value,
            transform: [{ scale: scale }],
        };
    });

    const fourthIcon = useAnimatedStyle(() => {
        const scale = interpolate(
            fourthValue.value,
            [30, 290],
            [0, 1],
            Extrapolation.CLAMP,
        );

        return {
            bottom: fourthValue.value,
            transform: [{ scale: scale }],
        };
    });

    const plusIcon = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${progress.value * 45}deg` }],
        };
    });

    console.log("screen",screen);

    return (
        <View style={styles.container}>
            {/* {screen == "Finance" &&
                <AnimatedTouchable
                    onPress={() => {
                        navigation.navigate('MainChat', { from: 'Ordermanagement' });
                    }}
                    style={[
                        styles.contentContainer,
                        screen === "Finance" ? fourthIcon : thirdIcon,
                        screen === "Finance" ? fourthWidthStyle : thirdWidthStyle
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <Entypo name="chat" size={24} color="white" />
                    </View>
                    <Animated.Text style={[styles.text, opacityText]}>AI Chat</Animated.Text>
                </AnimatedTouchable>

            } */}


            {/* {screen !== "Quotation" && <AnimatedTouchable
                onPress={() => { navigation.navigate(reports, { moduleName: screen }) }}
                style={[styles.contentContainer, secondIcon, secondWidthStyle]}>
                <View style={styles.iconContainer}>
                    <Octicons name="graph" size={24} color="white" />
                </View>
                <Animated.Text style={[styles.text, opacityText]}>
                    Reports
                </Animated.Text>
            </AnimatedTouchable>} */}

            {screen == "Finance" &&
                <AnimatedTouchable
                    onPress={() => {
                        navigation.navigate('CreditNotes', { from: 'Ordermanagement' });
                    }}
                    style={[styles.contentContainer, thirdIcon, thirdWidthStyle]}>

                    <View style={styles.iconContainer}>
                        <AntDesign name="filetext1" size={24} color="white" />
                    </View>
                    <Animated.Text style={[styles.text, opacityText]}>Credit Notes</Animated.Text>
                </AnimatedTouchable>
                

            }

            {/* {screen !== "Quotation" && <AnimatedTouchable
                onPress={() => { navigation.navigate('Expense', { from: 'Ordermanagement' }) }}

                style={[styles.contentContainer, firstIcon, firstWidthStyle]}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="attach-money" size={24} color="white" />
                </View>
                <Animated.Text style={[styles.text, opacityText]}>
                    Expenses
                </Animated.Text>
            </AnimatedTouchable>} */}


{screen == "Order" &&
                <AnimatedTouchable
                    onPress={() => {
                        navigation.navigate('Incentives', { from: 'Ordermanagement' });
                    }}
                    style={[
                        styles.contentContainer,
                        firstIcon, firstWidthStyle
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <Entypo name="chat" size={24} color="white" />
                    </View>
                    <Animated.Text style={[styles.text, opacityText]}>Incentives</Animated.Text>
                </AnimatedTouchable>
            }


            {screen == "Quotation" && <AnimatedTouchable
                onPress={() => { navigation.navigate("CustomerList", { screen: "SalesOrder", screenId: 2 }) }}

                style={[styles.contentContainer, firstIcon, firstWidthStyle]}>
                <View style={styles.iconContainer}>
                    <MaterialIcons name="attach-money" size={24} color="white" />
                </View>
                <Animated.Text style={[styles.text, opacityText]}>
                    Create
                </Animated.Text>
            </AnimatedTouchable>}

            {screen == "Fleet" &&
            <>
                <AnimatedTouchable
                    onPress={() => {
                        navigation.navigate('MaintenanceHistory');
                    }}
                    style={[
                        styles.contentContainer,
                        firstIcon, firstWidthStyle
                    ]}
                >
                    <View style={styles.iconContainer}>
                        <Ionicons name="settings-sharp" size={24} color="white" />
                    </View>
                    <Animated.Text style={[styles.text, opacityText]}>Maintenance</Animated.Text>
                </AnimatedTouchable>
                   <AnimatedTouchable
                   onPress={() => {
                       navigation.navigate('FuelHistory');
                   }}
                   style={[
                       styles.contentContainer,
                       secondIcon, secondWidthStyle
                   ]}
               >
                   <View style={styles.iconContainer}>
                       <MaterialCommunityIcons name="fuel" size={24} color="white" />
                   </View>
                   <Animated.Text style={[styles.text, opacityText]}>Fuel Usage</Animated.Text>
               </AnimatedTouchable>


               <AnimatedTouchable
                   onPress={() => {
                       navigation.navigate('TripHistory');
                   }}
                   style={[
                       styles.contentContainer,
                       thirdIcon, thirdWidthStyle
                   ]}
               >
                   <View style={styles.iconContainer}>
                       <FontAwesome5 name="route" size={24} color="white" />
                   </View>
                   <Animated.Text style={[styles.text, opacityText]}>Trip</Animated.Text>
               </AnimatedTouchable>


               <AnimatedTouchable
                   onPress={() => {
                       navigation.navigate('TireHistory');
                   }}
                   style={[
                       styles.contentContainer,
                       fourthIcon, fourthWidthStyle
                   ]}
               >
                   <View style={styles.iconContainer}>
                       <MaterialCommunityIcons name="tire" size={24} color="white" />
                   </View>
                   <Animated.Text style={[styles.text, opacityText]}>Tyre</Animated.Text>
               </AnimatedTouchable>
               </>
            }

            

            <Pressable
                style={styles.contentContainer}
                onPress={() => {
                    handlePress();
                }}>
                <Animated.View style={[styles.iconContainer, plusIcon]}>
                    <AntDesign name="plus" color="white" size={28} />
                </Animated.View>
            </Pressable>
        </View>
    );
};

export default CustomFloating;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    contentContainer: {
        // backgroundColor: '#0F56B3',
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: 50,
        right: 30,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden',
    },
    iconContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 26,
        height: 26,
    },
    text: {
        color: 'white',
        fontSize: 18,
    },
});