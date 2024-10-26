import axios from "axios";
import { Annotation } from "../storage/annotation";
import { ANNOTATIONS_KEY } from "../storage/keys";
import { setItem } from "../storage";

const zapierAPI = axios.create({
  baseURL: "https://hooks.zapier.com",
});

export type SyncResponse = {
  attempt: string;
  id: string;
  request_id: string;
  status: string;
};

export async function syncAnnotation(annotationList: Annotation[]) {
  const unsyncedAnnotationList = annotationList.filter((annt) => !annt.sync);
  const promises = unsyncedAnnotationList.map((unsyncedAnnotation) => {
    return zapierAPI.post<SyncResponse>(
      `/hooks/catch/472009/jla9rg/?email_key=${process.env.EMAIL}`,
      unsyncedAnnotation
    );
  });

  const results = await Promise.allSettled(promises);

  const successful = results.filter((result) => result.status === "fulfilled");

  const newAnnotationList = annotationList.map((annt) => {
    const annotationSyncResponse = successful.find((syncResp) => {
      const annotationId = JSON.parse(syncResp.value.config.data).id;
      return annotationId === annt.id;
    });
    if (annotationSyncResponse) {
      annt.sync = annotationSyncResponse.value.data;
    }
    return annt;
  });

  return setItem(ANNOTATIONS_KEY, JSON.stringify(newAnnotationList));
}
