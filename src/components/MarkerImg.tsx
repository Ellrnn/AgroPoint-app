import { Platform, Image } from "react-native";

type MarkerImgProps = {
  isSynced: boolean;
};
export function MarkerImg({ isSynced }: MarkerImgProps) {
  if (Platform.OS !== "android") {
    return null;
  }
  if (isSynced) {
    return (
      <Image
        source={require("../../assets/greyPino.png")}
        style={{ height: 100, width: 100 }}
      />
    );
  }
  return (
    <Image
      source={require("../../assets/greenPino.png")}
      style={{ height: 100, width: 100 }}
    />
  );
}
