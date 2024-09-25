import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios'



export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((resp) => {
      setData(resp.data)
    })
    .catch(err => console.log("There is a fetch error"));
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Text>To Do List</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Text>{item.id}. {item.title}</Text>
              <Text>{item.completed}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    
  }
});
