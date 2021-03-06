import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  scroll: {
    flex: 1,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 21,
    fontWeight: "700",
    marginBottom: 5,
  },
  headerSubTitle: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
  },
  centeredText: {
    textAlign: "center",
  },
  input: {
    height: 40,
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CACACA",
    borderRadius: 3,
  },
  navText: {
    color: "blue",
  },
  button: {
    padding: 10,
    backgroundColor: "#10ABB4",
    marginVertical: 10,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingButton: {
    padding: 10,
    backgroundColor: "#CACACA",
    marginVertical: 10,
    borderRadius: 3,
  },
  logoutButton: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
    borderRadius: 3,
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
  },
  datePickerButton: {
    backgroundColor: "#B4BEC9",
    padding: 5,
    marginVertical: 10,
    borderRadius: 3,
    width: "30%",
  },
  selectedDate: {
    marginHorizontal: 10,
    fontWeight: "700",
  },
  datePickerContainer: {
    display: "flex",
    flexDirection: "row",
  },
  datePicker: {
    width: 100,
    marginVertical: 10,
  },
  descriptionInput: {
    //minHeight: 120,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#CACACA",
    borderRadius: 3,
  },
  flexView: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  body: {
    marginHorizontal: 15,
    marginVertical: 10,
  },
  productContainer: {
    justifyContent: "space-between",
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: "row",
    alignContent: "center",
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  productDescription: {
    fontSize: 14,
  },
  availableDate: {
    fontSize: 12,
  },
  productTextContainer: {
    marginHorizontal: 10,
    justifyContent: "space-around",
  },
});

export default styles;
