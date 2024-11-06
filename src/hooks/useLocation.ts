import { useState, useEffect } from "react";

import {
  requestForegroundPermissionsAsync,
  type LocationSubscription,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

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
    let location: LocationSubscription;
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation({ status: "denied" });
        return;
      }

      location = await watchPositionAsync(
        {
          accuracy: Accuracy.Highest,
          timeInterval: 100,
        },
        (loc) => {
          setLocation({
            status: "granted",
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
        }
      );
    })();
    return () => {
      return location.remove();
    };
  }, []);

  return location;
}
