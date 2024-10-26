import { randomUUID } from "expo-crypto";
import { View, StyleSheet, Image, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";

import { useLocation } from "../hooks/useLocation";
import { ANNOTATIONS_KEY } from "../services/storage/keys";
import { Annotation, getAnnotations } from "../services/storage/annotation";
import { MarkerImg } from "./MarkerImg";

type MapProps = {
  onPinPressed: (annotation: Annotation) => void;
};

export function Map({ onPinPressed }: MapProps) {
  const location = useLocation();
  const mapRef = useRef<MapView>(null);

  const { data: annotationList } = useQuery({
    queryKey: [ANNOTATIONS_KEY],
    queryFn: getAnnotations,
  });

  const REGION = {
    latitude: location.latitude || 0,
    longitude: location.longitude || 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.mapWrapper}>
      <MapView style={styles.map} region={REGION} ref={mapRef} loadingEnabled>
        {annotationList?.map((annt) => {
          const isSynced = !!annt.sync;
          return (
            <View key={annt.id + randomUUID()}>
              <Marker
                testID="marker"
                tracksViewChanges={false}
                coordinate={{
                  latitude: annt.latitude,
                  longitude: annt.longitude,
                }}
                pinColor={isSynced ? "#BDBDBD" : "#00FF00"}
                onPress={() => onPinPressed(annt)}
              >
                <MarkerImg isSynced={isSynced} />
              </Marker>
            </View>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapWrapper: { height: "75%" },
  map: { height: "100%" },
});
