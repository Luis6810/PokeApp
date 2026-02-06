import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Spacing, Typography } from "../../shared/system-design";

const PokemonDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
    paddingBottom: 150,
  },

  name: {
    ...Typography.h2,
    textTransform: "capitalize",
    textAlign: "center",
    marginBottom: Spacing.md,
    color: Colors.text,
  },

  imageContainer: {
    alignItems: "center",
    marginBottom: Spacing.md,
  },

  image: {
    width: 200,
    height: 200,
  },

  favoriteButton: {
    alignSelf: "center",
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: 24,
    backgroundColor: Colors.accent,
  },

  favoriteText: {
    fontSize: 24,
    color: Colors.surface,
  },

  sectionTitle: {
    ...Typography.h3,
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.lg,
  },

  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: Spacing.md,
  },

  badge: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: 12,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  badgeText: {
    color: Colors.surface,
    ...Typography.small,
    textTransform: "capitalize",
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },

  statText: {
    ...Typography.body,
    color: Colors.text,
  },
});

export default PokemonDetailStyles;