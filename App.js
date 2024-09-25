import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';




export default function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos")
    .then((resp) => {
      setData(resp.data)
      // console.log(resp.data);
      
    })
    .catch(err => console.log("There is a fetch error"));
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>To Do List</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View style={styles.todo}>
              <Text  style={styles.text}>{item.id}. {item.title}</Text>
              {item.completed && <Feather name="check-square" size={24} color="black" onPress={() => {
                let newArr = data.map(i => {
                  if (i.id == item.id) {
                    return {
                        userId: i.userId,
                        id: i.id,
                        title: i.title,
                        completed: false
                    }
                  }else {
                    return {
                      userId: i.userId,
                      id: i.id,
                      title: i.title,
                      completed: i.completed
                    }
                  }
                })
                setData(newArr)
              }}/>}
              {!item.completed && <Feather name="square" size={24} color="black" onPress={() => {
                let newArr = data.map(i => {
                  if (i.id == item.id) {
                    return {
                        userId: i.userId,
                        id: i.id,
                        title: i.title,
                        completed: true
                    }
                  }else {
                    return {
                      userId: i.userId,
                      id: i.id,
                      title: i.title,
                      completed: i.completed
                    }
                  }
                })
                setData(newArr)
              }} />}
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
    fontSize: 35,
    fontWeight:"bold",
    marginHorizontal:"auto",
    marginVertical: 5
  },
  todo: {
    marginTop: 7,
    marginHorizontal:5,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:10,
  },
  text: {
    fontSize: 20,
    maxWidth: 350
  },

});
