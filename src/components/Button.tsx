import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  children: string;
};

export function PrimaryButton({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Text style={styles.textButton}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#28282B",
    borderRadius: 8,
    padding: 16,
    flex: 1,
  },
  textButton: {
    textAlign: "center",
    fontSize: 16,
    color: "#FAF9F6",
    fontWeight: "600",
  },
});
