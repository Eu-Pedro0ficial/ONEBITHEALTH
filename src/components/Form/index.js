import React, { useState } from "react";
import { TextInput, View, Text, TouchableOpacity, Keyboard, Pressable } from "react-native";
import ResultImc from "../ResultImc";
import styles from "./style";

export default function Form(){

  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Preencha o peso e a altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");

  function imcCalculator(){
    let heightFormat = height.replace(",", ".");
    let weightFormat = weight.replace(",", ".");

    return setImc((weightFormat/(heightFormat*heightFormat)).toFixed(2))
  }

  function validatorImc(){
    if(weight !== null && height !== null){
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc("Seu imc é igual: ");
      setTextButton("Calcular novamente!");
      return;
    }

    setImc(null);
    setTextButton("Calcular");
    setMessageImc("Preencha o peso e altura");
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput style={styles.formInput} onChangeText={setHeight} value={height} placeholder="Ex. 1.75" keyboardType="numeric"/>

        <Text style={styles.formLabel}>Peso</Text>
        <TextInput style={styles.formInput} onChangeText={setWeight} value={weight} placeholder="Ex. 78.435" keyboardType="numeric"/>
        
        <TouchableOpacity style={styles.buttonCalculato} title={textButton} onPress={() => validatorImc()}>
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc messageResultImc={messageImc} resultImc={imc} />
    </Pressable>
  )
}
