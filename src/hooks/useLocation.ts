import { useState, useEffect } from "react";
import * as Location from "expo-location";

export type LocationType =
  | {
      status: "waiting" | "denied";
      latitude?: never;
      longitude?: never;
    }
  | { status: "granted"; latitude: number; longitude: number };

export function useLocation() {
  const [location, setLocation] = useState<LocationType>({ status: "waiting" });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation({ status: "denied" });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation({
        status: "granted",
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return location;
}
