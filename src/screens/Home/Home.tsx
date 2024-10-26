import BottomSheet from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import { useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Annotation, getAnnotations } from "../../services/storage/annotation";
import { Map } from "../../components/Map";
import { syncAnnotation } from "../../services/api/ApiService";
import { ModalMarker } from "../../components/ModalMarker";
import { PrimaryButton } from "../../components/Button";
import { ANNOTATIONS_KEY } from "../../services/storage/keys";
import { CreateAnnotationSheet } from "./CreateAnnotationSheet";

export function Home() {
  const bottonSheetRef = useRef<BottomSheet>(null);
  const selectedAnnotation = useRef<Annotation>();
  const markerAnnt = selectedAnnotation.current;
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenPress = () => bottonSheetRef.current?.expand();
  const handleClosePress = () => bottonSheetRef.current?.close();

  const { data: annotationList } = useQuery({
    queryKey: [ANNOTATIONS_KEY],
    queryFn: getAnnotations,
  });

  const { mutate: synchronizeAnnotation } = useMutation({
    mutationFn: (anntList: Annotation[]) => syncAnnotation(anntList),
    meta: { refetches: [[ANNOTATIONS_KEY]] },
    onSuccess: () =>
      Toast.show({
        type: "success",
        text1: "Sincronização bem sucedida.",
      }),
    onError: () =>
      Toast.show({
        type: "error",
        text1: "Erro ao sincronizar.",
      }),
  });

  return (
    <>
      <Map
        onPinPressed={(annt) => {
          selectedAnnotation.current = annt;
          setModalVisible(true);
        }}
      />
      <View style={styles.container}>
        {modalVisible && (
          <ModalMarker
            annotation={markerAnnt!.annotation}
            datetime={markerAnnt!.datetime}
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
          />
        )}
        <View style={styles.wrapperButton}>
          <PrimaryButton onPress={handleOpenPress}>ADICIONAR</PrimaryButton>
          <PrimaryButton
            onPress={() => {
              Toast.show({
                type: "info",
                text1: "Sincronização em andamento...",
              });
              synchronizeAnnotation(annotationList || []);
            }}
          >
            SINCRONIZAR
          </PrimaryButton>
        </View>
      </View>
      <CreateAnnotationSheet onClose={handleClosePress} ref={bottonSheetRef} />
    </>
  );
}

const styles = StyleSheet.create({
  wrapperButton: {
    flexDirection: "row",
    gap: 24,
    paddingHorizontal: 12,
    top: 20,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "column",
  },
});
