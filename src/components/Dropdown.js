import React, { useState } from "react";
import { View, Picker, StyleSheet, DropDownPicker } from "react-native";




const Dropdown = function ({ selectedValue, onValueSet }) {

  return (

    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => { onValueSet(itemValue) }}
      >
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom:50
  }
});

export default Dropdown;