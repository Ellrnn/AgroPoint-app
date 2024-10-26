import { randomUUID } from "expo-crypto";

import { getItem, setItem } from ".";
import { ANNOTATIONS_KEY } from "./keys";
import { SyncResponse } from "../api/ApiService";

export type Annotation = {
  id: string;
  annotation: string;
  longitude: number;
  latitude: number;
  datetime: string;
  sync?: SyncResponse | null;
};

export async function setAnnotations(annotation: Annotation) {
  const annotationList = await getAnnotations();
  annotationList.push(annotation);
  const string = JSON.stringify(annotationList);
  return setItem(ANNOTATIONS_KEY, string);
}

export async function getAnnotations(): Promise<Annotation[]> {
  let annotationList = [];
  const annotations = await getItem(ANNOTATIONS_KEY);
  if (annotations) {
    annotationList = JSON.parse(annotations);
  }
  return annotationList;
}
