import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export const BackButton = ({ onPress }) => (
  <TouchableOpacity style={styles.backButton} onPress={onPress}>
    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 0,
    top: 80,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
});

export default BackButton;
