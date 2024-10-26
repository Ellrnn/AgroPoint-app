import "react-native-gesture-handler";
import {
  matchQuery,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Home } from "./src/screens/Home/Home";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.refetchQueries({
        predicate: (query) =>
          mutation.meta?.refetches?.some((queryKey) =>
            matchQuery({ queryKey }, query)
          ) ?? false,
      });
    },
  }),
});

export default function App() {
  return (
    <SafeAreaProvider style={{ backgroundColor: "#fff", flex: 1 }}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <Home />
          <Toast />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
