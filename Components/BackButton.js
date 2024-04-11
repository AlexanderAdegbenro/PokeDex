import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackButton = ({ onPress }) => (
  <TouchableOpacity style={styles.backButton} onPress={onPress}>
    <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
  </TouchableOpacity>
);

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 0,
    top: 80,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "orange",
  },
});

export default BackButton;
