import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Shift from '../components/Shift';

export default function MyShifts() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookedShifts, setBookedShifts] = useState([]);

  const fetchAllShifts = async () => {
    try {
      setLoading(true);
      const allShifts = await axios.get(
        `https://ada6-180-178-133-66.ngrok.io/shifts`
      );
      console.log({ allShifts });
      // setShifts((prevShifts) => [...prevShifts, allShifts]);
      setShifts(allShifts);
      setLoading(false);
      shifts = shifts.filter((shift) => shift.booked);
      setBookedShifts(shifts);
      console.log({ shifts });
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log({ error: error.message });
    }
  };

  useEffect(() => {
    setLoading(true);
    fetch('https://ada6-180-178-133-66.ngrok.io/shifts')
      .then((res) => res.json())
      .then((data) => {
        setShifts(data);
        shifts.filter((shift) => shift.booked);
        setBookedShifts(shifts);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error(error.message);
      });
  }, []);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      {error ? <Text style={styles.container}>{error}</Text> : null}
      <ScrollView>
        {loading ? (
          <Text style={styles.container}>Loading...</Text>
        ) : bookedShifts?.length > 0 ? (
          bookedShifts.map((shift, index) => {
            return <Shift key={shift.id} shift={shift} />;
          })
        ) : (
          <Text>No Shift</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
