import { forwardRef, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { format } from "date-fns";
import { randomUUID } from "expo-crypto";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { PrimaryButton } from "../../components/Button";
import { ANNOTATIONS_KEY } from "../../services/storage/keys";
import { Annotation, setAnnotations } from "../../services/storage/annotation";
import { useLocation } from "../../hooks/useLocation";

type CreateAnnotationSheetProps = {
  onClose: () => void;
};

export const CreateAnnotationSheet = forwardRef<
  BottomSheet,
  CreateAnnotationSheetProps
>(function CreateAnnotationSheetComp(props, ref) {
  const snapPoints = useMemo(() => ["35%"], []);
  const [annotation, setAnnotation] = useState("");
  const location = useLocation();

  const { mutate: addAnnotation } = useMutation({
    mutationKey: [ANNOTATIONS_KEY],
    mutationFn: (annt: Annotation) => setAnnotations(annt),
    meta: { refetches: [[ANNOTATIONS_KEY]] },
    onSuccess() {
      setAnnotation("");
      props.onClose();
      Toast.show({ type: "success", text1: "Anotação salva." });
    },
  });

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={{ borderWidth: 1, borderColor: "#2c4b2c99" }}
      enablePanDownToClose
    >
      <BottomSheetScrollView>
        <Text style={styles.text}>Nova anotação 🗒️</Text>
        <BottomSheetTextInput
          style={styles.input}
          placeholder="Digite..."
          defaultValue={annotation}
          onChangeText={setAnnotation}
          multiline
        />
        <View style={styles.paddingButton}>
          <PrimaryButton
            onPress={() => {
              if (annotation && location.status === "granted") {
                addAnnotation({
                  id: randomUUID(),
                  annotation,
                  latitude: location.latitude,
                  longitude: location.longitude,
                  datetime: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
                });
                Toast.show({ type: "info", text1: "Salvando..." });
              }
            }}
          >
            SALVAR
          </PrimaryButton>
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  paddingButton: { paddingHorizontal: 88, paddingVertical: 10 },
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
    flexDirection: "column",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "#28282B",
    fontWeight: "600",
  },
  input: {
    marginTop: 48,
    marginBottom: 24,
    marginHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 20,
    padding: 12,
    backgroundColor: "#e3e3e6",
  },
});
