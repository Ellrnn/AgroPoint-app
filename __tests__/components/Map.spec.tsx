import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Map } from "../../src/components/Map";

jest.mock("../../src/hooks/useLocation", () => ({
  useLocation: jest.fn(),
}));

jest.mock("../../src/services/storage/annotation", () => ({
  getAnnotations: jest.fn(),
}));

import { useLocation } from "../../src/hooks/useLocation";
import { getAnnotations } from "../../src/services/storage/annotation";

const mockAnnotations = [
  {
    id: "1",
    latitude: -23.56,
    longitude: -46.64,
    sync: {
      attempt: "1",
      id: "sync-1",
      request_id: "req-1",
      status: "completed",
    },
    annotation: "Primeira anotação",
    datetime: "2024-10-25T14:48:00.000Z",
  },
  {
    id: "2",
    latitude: -23.55,
    longitude: -46.63,
    sync: null,
    annotation: "Segunda anotação",
    datetime: "2024-10-25T15:00:00.000Z",
  },
];

const queryClient = new QueryClient();
const handlePinPress = jest.fn();

describe("Map Component", () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      latitude: -23.56,
      longitude: -46.64,
    });
    (getAnnotations as jest.Mock).mockResolvedValue(mockAnnotations);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderMap = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <Map onPinPressed={handlePinPress} />
      </QueryClientProvider>
    );

  it("renders map and markers", async () => {
    const { findAllByTestId } = renderMap();

    const markers = await findAllByTestId("marker");
    expect(markers.length).toBe(mockAnnotations.length);
  });

  it("fires an action on marker press", async () => {
    const { findAllByTestId } = renderMap();
    const markers = await findAllByTestId("marker");

    fireEvent.press(markers[0]);

    expect(handlePinPress).toHaveBeenCalled();
  });
});
afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});
