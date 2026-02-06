import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 6,

    backgroundColor: "#ffffff",
    borderRadius: 12,

    elevation: 2,
  },

  name: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  favoriteButton: {
    padding: 6,
  },

  favoriteText: {
    fontSize: 18,
  },
});
export default styles;