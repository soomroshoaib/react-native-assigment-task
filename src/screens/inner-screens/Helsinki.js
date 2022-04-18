import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { groupBy } from '../../utils';
import { useEffect, useState } from 'react';
import InnerShift from '../../components/InnerShift';

const Helsinki = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://ada6-180-178-133-66.ngrok.io/shifts')
      .then((res) => res.json())
      .then((data) => {
        setShifts(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error(error.message);
      });
  }, []);

  const { Helsinki: helsinkiShifts } = groupBy(shifts, 'area');

  return (
    <SafeAreaView style={{ padding: 20 }}>
      {error ? <Text style={styles.container}>{error}</Text> : null}
      {loading ? (
        <Text style={styles.container}>Loading...</Text>
      ) : helsinkiShifts?.length > 0 ? (
        helsinkiShifts.map((shift, index) => {
          return <InnerShift key={shift.id} shift={shift} />;
        })
      ) : (
        <Text>No Shift</Text>
      )}
    </SafeAreaView>
  );
};

export default Helsinki;

const styles = StyleSheet.create({});
