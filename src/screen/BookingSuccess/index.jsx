import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from '../../component/atoms';
import {Ilustration2} from '../../assets/img';
import {colors} from '../../utils';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {order} from '../../features/bookingSlice';

export default function BookingSuccess({route, navigation}) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.order.loading);
  const error = useSelector(state => state.order.error);
  const {
    customerID,
    order_id,
    hotel_id,
    hotelName,
    DateCheckIn,
    DateCheckOut,
    price,
    idPhoto,
    transaction_time,
  } = route.params;

  console.log(route.params);

  useEffect(() => {
    dispatch(
      order({
        customerID,
        order_id,
        hotel_id,
        hotelName,
        DateCheckIn,
        DateCheckOut,
        price,
        idPhoto,
        transaction_time,
      }),
    );
  }, []);

  if (error) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <Ilustration2 />
          <View style={{marginVertical: 15}}>
            <Text style={styles.title}>Booking gagal</Text>
            <Text style={styles.description}>erorr</Text>
          </View>
        </View>
        <Button
          title="Back to home"
          onPress={() => navigation.navigate('Home')}
          color={colors.yellow}
        />
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={{marginVertical: 15}}>
            <Text style={styles.title}>Loading...</Text>
          </View>
        </View>
        <Button
          title="Back to home"
          onPress={() => navigation.navigate('Home')}
          color={colors.yellow}
        />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Ilustration2 />
        <View style={{marginVertical: 15}}>
          <Text style={styles.title}>The Hold Booking We Successful!!</Text>
          <Text style={styles.description}>
            this booking will be held until date {transaction_time}
          </Text>
        </View>
      </View>
      <Button
        title="Back to home"
        onPress={() => navigation.navigate('Home')}
        color={colors.yellow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container: {
    alignItems: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
