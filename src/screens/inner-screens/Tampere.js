import { StyleSheet, Text, View, SafeAreaView, FlatList } from 'react-native';
import { groupBy } from '../../utils';
import { useEffect, useState } from 'react';
import InnerShift from '../../components/InnerShift';

const Tampere = () => {
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

  const { Tampere: tampereShifts } = groupBy(shifts, 'area');

  return (
    <SafeAreaView style={{ padding: 20 }}>
      {error ? <Text style={styles.container}>{error}</Text> : null}
      {loading ? (
        <Text style={styles.container}>Loading...</Text>
      ) : tampereShifts?.length > 0 ? (
        tampereShifts.map((shift, index) => {
          return <InnerShift key={shift.id} shift={shift} />;
        })
      ) : (
        <Text>No Shift</Text>
      )}
    </SafeAreaView>
  );
};

export default Tampere;

const styles = StyleSheet.create({});
