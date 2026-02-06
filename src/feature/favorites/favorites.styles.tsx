import { Colors, Spacing, Typography } from "../../shared/system-design";
import { StyleSheet } from "react-native";

const stylesFavorites = StyleSheet.create({
  list: {
    padding: Spacing.md,
    backgroundColor: Colors.background,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  image: {
    width: 72,
    height: 72,
    marginRight: Spacing.md,
  },

  textContainer: {
    flex: 1,
  },

  name: {
    ...Typography.h3,
    color: Colors.text,
  },

  subtitle: {
    ...Typography.small,
    color: Colors.textLight,
    marginTop: Spacing.xs,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },

  emptyText: {
    ...Typography.body,
    color: Colors.textLight,
  },
});

export default stylesFavorites;
