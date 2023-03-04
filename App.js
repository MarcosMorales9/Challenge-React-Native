import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useState, useEffect } from "react";

const animales = [
  "Bird",
  "Cat",
  "Dog",
  "fox",
  "kangaroo",
  "koala",
  "panda",
  "raccoon",
  "red_panda",
];
// hacemos un array con las difentes url para despues utilizarlas para sacar el index de manera aleatoria

export default function App() {
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  // utilizamos el useState que en un pricipio vale '' pero despues nos va a permitir meter el dato y tambien poder actualizarlo

  const getAnimal = () => {
    var randomAnimal = Math.floor(Math.random() * animales.length);
    // utilizamos el array que hicimos de los diferentes animales y de esta manera obtenemos el index de manera aleatoria
    var animal = animales[randomAnimal];
    // hacemos una variable que va a tener el animal generado de manera aleatoria por su index
    fetch(`https://some-random-api.ml/animal/${animal}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.image);
        setText(data.fact);
      });
    // capturamos los datos de el animal aleatorio y actualizamos el estado de image y text
  };

  useEffect(() => {
    getAnimal();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.cardAnimal}>
          <Text>{text}</Text>
          <Image style={styles.cardImage} source={{ uri: `${image}` }}/>
          <TouchableOpacity style={{...styles.button}}>
            <Button title="Next Fact" onPress={getAnimal} color="#5500BE" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 200,
    paddingBottom: 200,
    alignItems: "center",
  },
  cardAnimal: {
    flex: 1,
    width: 250,
    height: "400%",
    padding: 20,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#D6D6D6",
  },
  cardImage: {
    width: 203,
    height: 200,
    marginBottom: 10,
    borderRadius: 4,
  },
  button: {
    alignSelf:"center",
    borderRadius:9,
    paddingVertical:5,
    backgroundColor:"#5500BE",
    width:"100%"
  },
});
