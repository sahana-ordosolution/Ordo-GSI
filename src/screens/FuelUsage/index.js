import React from "react";
import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ScrollView, Pressable
} from "react-native";
import globalStyles from "../../styles/globalStyles";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../../constants/Colors";
import { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { DatePickerModal, DatePickerInput } from "react-native-paper-dates";
import { Dropdown } from "react-native-element-dropdown";
import moment from "moment";
import Toast from 'react-native-simple-toast';
import { LoadingView } from "../../components/LoadingView";
import { TextInput as TextInput1 } from "react-native-paper";
import { ms, hs, vs } from "../../utils/Metrics";
import Maintenance from "../Maintenance";



const FuelUsage = ({ navigation, route }) => {

  // const { vehicleID } = route?.params
  const { details, screen } = route?.params || {};

  console.log("details",details,screen)

  const [driverDrop, setDriverDrop] = useState([]);
  const [fuelDrop, setFuelDrop] = useState([]);
  const [vehicleDrop, setVehicleDrop] = useState([]);

  const [visible2, setVisible2] = React.useState(false);
  const { token, userData } = useContext(AuthContext);
  const [fuelDate, setFuelDate] = useState("");
  const [fuelStation, setFuelStation] = useState("");
  const [costPerUnit, setCostPerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [billNo, setBillNo] = useState("");
  const [odometerReading, setOdometerReading] = useState("");
  const [km, setKm] = useState("");
  const [unit, setUnit] = useState("");
  const [rate, setRate] = useState("");
  const [pumpName, setPumpName] = useState("");
  const [location, setLocationName] = useState("");
  const [mileage, setMileage] = useState("");
  const [fuelType, setFuelType] = useState([]);
  const [driverType, setdriverType] = useState([]);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);

  const [isFocus3, setIsFocus3] = useState(false);
  const [vehicleID, setVehicleId] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    driverDropdown();
    fuelDropdown();
    VehicleDropdown();
  }, []);

  useEffect(() => {
  
    if (details) {
      // Populate all fields with details
      setFuelDate(formatDate(details?.fuel_date));  // format for input
      setFuelStation(details.fuel_station || "");
      setCostPerUnit(details.cost_per_unit?.toString() || "");
      setQuantity(details.quantity?.toString() || "");
      setTotalCost(details.total_cost?.toString() || "");
      setBillNo(details.invoice_no || "");
      setOdometerReading(details.odometer1?.toString() || "");
      setKm(details.km?.toString() || "");
      setUnit(details.unit?.toString() || "");
      setRate(details.rate?.toString() || "");
      setPumpName(details.pump_name || "");
      setLocationName(details.location || "");
      setMileage(details.mileage?.toString() || "");
      setVehicleId(details?.veh_id);
      setFuelType(details.fuel_type || "");
      setdriverType(details?.dri_id);
    }
  }, [details]);
  
const formatDate = (isoString) => {
    return isoString ? moment(isoString).format("DD/MM/YYYY") : '';
  };


  const onDismiss2 = React.useCallback(() => {
    setVisible2(false);
  }, [setVisible2]);

  const onChange2 = React.useCallback(({ date }) => {
    setVisible2(false);
    const EmStart = moment(date).format("DD/MM/YYYY");
    setFuelDate(EmStart);
  }, []);

  useEffect(() => {
    if (quantity && costPerUnit && !isNaN(quantity) && !isNaN(costPerUnit)) {
      const calculatedTotalCost = parseFloat(quantity) * parseFloat(costPerUnit);
      setTotalCost(calculatedTotalCost.toFixed(2)); 
    } else {
      setTotalCost("");
    }
  }, [quantity, costPerUnit]);

  const InputWithLabel2 = ({ title, value, onPress }) => {
    // const textColor = !value ? "#cecece" : "black";
    const textColor = Colors.primary
    return (
      <View>
        {/* <Text style={styles.labelText}>{title}</Text> */}
        <Pressable style={{ ...styles.inputContainer }} onPress={onPress}>
          <Text style={{ ...styles.input2, color: textColor }}>
            {value ? value : "Select Date"}
          </Text>
          <Image
            style={{ width: 20, height: 20, marginRight: 15 }}
            source={require("../../assets/images/calendar.png")}
          ></Image>
        </Pressable>
      </View>
    );
  };

  const driverDropdown = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://gsidev.ordosolution.com/api/alldrivers/",
        requestOptions
      );
      const result = await response.json();
      console.log("hkdgjhahsgfhjsf", userData.token)
      const driverType = result.driver.map((brand) => {
        return {
          label: brand.label,
          value: brand.value,
        };
      });

      setDriverDrop(driverType);

    } catch (error) {
      console.log("error", error);
    }
  };

  const fuelDropdown = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://gsidev.ordosolution.com/api/choices/",
        requestOptions
      );
      const result = await response.json();
      console.log("hkdgjhahsgfhjsf",result)
      const fuelDrop = result.fuel_types.map((types) => {
        return {
          label: types.label,
          value: types.value,
        };
      });

      setFuelDrop(fuelDrop);
      // console.log(result)

    } catch (error) {
      console.log("error", error);
    }
  };

  const VehicleDropdown = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);

    var raw = "";

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://gsidev.ordosolution.com/api/allvehiclelist/",
        requestOptions
      );
      const result = await response.json();
    //   console.log("vehicle",result)
      const vehicleDrop = Object.values(result).flatMap((items) =>
        items.map((item) => ({
            label: `${item.label}  (${item.capacity ? item.capacity + " tons" : "No Capacity"})`,
            value: item.value,
            capacity: item?.capacity
        }))
    );

      setVehicleDrop(vehicleDrop);
      // console.log(result)

    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async () => {

    if (!driverType || !vehicleID || !fuelDate || !fuelStation || !quantity || !costPerUnit || !totalCost || !fuelType || !rate || !pumpName || !location || !unit || !km || !odometerReading) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }


    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${userData.token}`);
    myHeaders.append("Content-Type", "application/json");
    console.log("gfghgfgfgf", userData.token);

    var raw = JSON.stringify({
      dri_id: driverType,
      veh_id: vehicleID,
      fuel_date: moment(fuelDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      fuel_station: fuelStation,
      quantity: quantity,
      cost_per_unit: costPerUnit,
      total_cost: totalCost,
      fuel_type: fuelType,
      odometer1:odometerReading,
      km:km,
      unit:unit,
      rate:rate,
      pump_name:pumpName,
      location:location,
      mileage:mileage,
      invoice_no:billNo
    });

    console.log("raw",raw,details?.id)
    // Determine the URL and request method based on whether it's "edit" mode or not
    let url = "https://gsidev.ordosolution.com/api/fuelusage/";
    let method = "POST"; // Default is POST for creating a new tyre
  
    // If in "edit" mode, update the tyre using PUT
    if (screen === "edit" && details?.id) {
      url = `https://gsidev.ordosolution.com/api/fuelusage/${details?.id}/`; // Update URL with the specific tyre id
      method = "PUT"; // Change method to PUT for updating
    }
  
    // Request options
    var requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json();
  
      console.log("fuel Result:", result);
  
      // Show a success message
      Toast.show(`Fuel Usage data ${screen === "edit" ? "updated" : "added"} successfully`, Toast.LONG);
  
       // Navigate back accordingly
  if (screen === "edit") {
    navigation.pop(2); // Go back two screens if editing
  } else {
    navigation.goBack(); // Or just one screen if adding
  }
    } catch (error) {
      console.log("error", error);
    }
    setLoading(false);

  };


  return (
    <LinearGradient
      colors={Colors.linearColors}
      start={Colors.start}
      end={Colors.end}
      locations={Colors.location}
      style={{
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          height: "10%",
          alignItems: "center",
          paddingHorizontal: "5%",
          flex: 1,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/images/Refund_back.png")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: "AvenirNextCyr-Medium",
            fontSize: 19,
            color: "white",
          }}
        >
          Fuel Usage
        </Text>
        <View style={{ width: "6%" }} />
      </View>

      <View
        style={{
          height: "90%",
          backgroundColor: "white",
          width: "100%",
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          padding: "6%",
          paddingTop: "6%",
          justifyContent: "space-between",
        }}
      >
        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={{marginTop:'3%'}}>

            {/* <Text style={styles.label}>Vehicle</Text> */}
            <View>
                 {(!isFocus4 && !vehicleID) ? (
               <Text style={styles.label1}>
                 Vehicle No.<Text style={{ color: 'red' }}>*</Text>
               </Text>
             ) : (
               <Text style={[styles.label1, isFocus4 && { color: Colors.primary }]}>
                 Vehicle No. <Text style={{ color: 'red' }}>*</Text>
               </Text>
             )}
                     {/* <Text style={styles.label}>Vehicle</Text> */}
                      <Dropdown
                    
                                  style={[styles.dropdown, isFocus4 && { borderColor: Colors.primary}]}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              searchPlaceholder="Search"
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={vehicleDrop}
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={!isFocus4 ? "Please select the vehicle" : "..."}
              //searchPlaceholder="Search..."
              value={vehicleID}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={(item) => {
                setVehicleId(item.value);
                setIsFocus4(false);
              }}
            />
</View>

<View style={{marginTop:'3%'}}>

            
            {(!isFocus3 && !driverType) ? (
      <Text style={styles.label1}>
        Driver Name <Text style={{ color: 'red' }}>*</Text>
      </Text>
    ) : (
      <Text style={[styles.label1, isFocus3 && { color: Colors.primary }]}>
        Driver Name <Text style={{ color: 'red' }}>*</Text>
      </Text>
    )}
          <Dropdown
                         style={[styles.dropdown, isFocus3 && { borderColor: Colors.primary}]}
         
            
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              searchPlaceholder="Search"
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={driverDrop}
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={!isFocus3 ? "Please select the driver" : "..."}
              //searchPlaceholder="Search..."
              value={driverType}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={(item) => {
                setdriverType(item.value);
                setIsFocus3(false);
              }}
            />
</View>

<View style={{marginTop:'3%'}}>

            
            {(!isFocus2 && !fuelType) ? (
      <Text style={styles.label1}>
        Fuel Type <Text style={{ color: 'red' }}>*</Text>
      </Text>
    ) : (
      <Text style={[styles.label1, isFocus2 && { color: Colors.primary }]}>
        Fuel Type <Text style={{ color: 'red' }}>*</Text>
      </Text>
    )}
          <Dropdown
                         style={[styles.dropdown, isFocus2 && { borderColor: Colors.primary}]}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              searchPlaceholder="Search"
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={fuelDrop}
              maxHeight={400}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? "Please select your fuel type" : "..."}
              //searchPlaceholder="Search..."
              value={fuelType}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={(item) => {
                setFuelType(item.value);
                setIsFocus2(false);
              }}
            />
</View>

<View style={{marginTop:'3%'}}>

                {(!fuelDate) ? (
          <Text style={styles.label1}>
            Date <Text style={{ color: 'red' }}>*</Text>
          </Text>
        ) : (
          <Text style={[styles.label1, { color: Colors.primary }]}>
            Date <Text style={{ color: 'red' }}>*</Text>
          </Text>
        )}
              <InputWithLabel2
                title="Maintenance Date"
                value={fuelDate}
                onPress={() => setVisible2(true)}
              />

              <DatePickerModal
                mode="single"
                visible={visible2}
                onDismiss={onDismiss2}
                // date={date}
                onConfirm={onChange2}
                saveLabel="Save" // optional
                label="Select date" // optional
                animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
              />
            </View>
            {/* <Text style={styles.label}>Fuel Station</Text> */}
            {/* <TextInput
              style={styles.textInput}
              placeholder="Please enter the fuel station"
              placeholderTextColor={Colors.primary}
              value={fuelStation}
              onChangeText={(text) => setFuelStation(text)}
            /> */}

<TextInput1
              mode="outlined"
              label="Bill No."
              value={billNo}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setBillNo(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

            <TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Fuel Station <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={fuelStation}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setFuelStation(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />
            {/* <Text style={styles.label}>Fuel Type</Text> */}
           

            {/* <Text style={styles.label}>Quantity</Text> */}
            {/* <TextInput
              style={styles.textInput}
              placeholder="Please enter the quantity"
              placeholderTextColor={Colors.primary}
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            /> */}
            <TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Quantity <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={quantity}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setQuantity(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

            {/* <Text style={styles.label}>Cost Per Unit</Text> */}
            {/* <TextInput
              style={styles.textInput}
              placeholder="Please enter the cost per unit"
              placeholderTextColor={Colors.primary}
              value={costPerUnit}
              onChangeText={(text) => setCostPerUnit(text)}
            /> */}
            <TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Cost Per Unit <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={costPerUnit}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setCostPerUnit(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

            {/* <Text style={styles.label}>Total Cost</Text> */}
            {/* <TextInput
              style={styles.textInput}
              placeholder="Please enter the total cost"
              placeholderTextColor={Colors.primary}
              value={totalCost}
              onChangeText={(text) => setTotalCost(text)}
            /> */}
            <TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Total Amount <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={totalCost}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setTotalCost(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

<TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Odometer Reading <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={odometerReading}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setOdometerReading(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

<TextInput1
              mode="outlined"
                    label={
                              <Text>
                                KM <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={km}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setKm(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />
                   <TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Unit <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={unit}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setUnit(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

<TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Rate <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={rate}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setRate(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />

<TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Pump Name <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={pumpName}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setPumpName(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />
       <TextInput1
              mode="outlined"
                    label={
                              <Text>
                                Location <Text style={{ color: 'red' }}>*</Text>
                              </Text>
                            }
              value={location}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setLocationName(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />
       <TextInput1
              mode="outlined"
              label="Mileage"
              value={mileage}
              theme={{ colors: { onSurfaceVariant: "#4b0482" } }}
              activeOutlineColor="#4b0482"
              outlineColor="#B6B4B4"
              textColor="#4b0482"
              onChangeText={(text) => setMileage(text)}
              returnKeyType="done"
              blurOnSubmit={false}
              outlineStyle={{ borderRadius: 10 }}
              style={{ marginBottom: "5%", height: 55, backgroundColor: "white" }}
            />


          </View>

        </ScrollView>
        <LinearGradient
                    colors={Colors.linearColors}
                    start={Colors.start}
                    end={Colors.end}
                    locations={Colors.ButtonsLocation}
                    style={{
                
                        borderRadius: ms(15),
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: "8%",
                    }}
                >
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </LinearGradient>
      </View>

      <LoadingView visible={loading} message="Please Wait ..." />

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#dedede",
    borderWidth: 1,
    backgroundColor: "white",
    height: 50,
    marginBottom: "5%",
    padding: "2%",
    paddingLeft: "2%",

    fontFamily: "AvenirNextCyr-Medium",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: Colors.primary,
    fontFamily: "AvenirNextCyr-Medium",
  },
  buttonContainer: {
    height: 50,
    // borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width:'100%'
    // backgroundColor: Colors.primary,
  },
  buttonText: {
    fontFamily: "AvenirNextCyr-Medium",
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 60,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "AvenirNextCyr-Medium",
    color: Colors.primary,
    // backgroundColor:'white'
  },
  dropdownContainer: {
    backgroundColor: "white",
    // color:'white'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "AvenirNextCyr-Medium",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  labelText: {
    fontFamily: "AvenirNextCyr-Medium",
    color: Colors.primary,
    fontSize: 16,
  },
  inputContainer: {
    borderColor: "#B6B4B4",
    borderWidth: 1,
    backgroundColor: "white",
    height: 55,
    marginBottom: 15,
    fontFamily: "AvenirNextCyr-Medium",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    // height: "60%",
    width: "100%",
  },
  dropdown: {
    height: 55,
    borderColor: "#B6B4B4",
    borderWidth: 1,
    //borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: "5%",
    borderRadius: 10,
    backgroundColor: "white",
  },
  input2: {
    fontFamily: "AvenirNextCyr-Medium",
    padding: 8,
    flex: 1,
  },
  label1: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 4,
        top: -10,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        fontFamily: 'AvenirNextCyr-Medium',
        color: Colors.primary
      },
});

export default FuelUsage;
