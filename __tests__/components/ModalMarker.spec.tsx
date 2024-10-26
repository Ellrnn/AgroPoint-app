import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { ModalMarker } from "../../src/components/ModalMarker";

describe("ModalMarker Component", () => {
  const onCloseMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly when visible", () => {
    const { getByText } = render(
      <ModalMarker
        annotation="Test Annotation"
        datetime="2024-10-25T15:00:00.000Z"
        onClose={onCloseMock}
        visible={true}
      />
    );

    expect(getByText("Test Annotation")).toBeTruthy();
    expect(getByText("2024-10-25T15:00:00.000Z")).toBeTruthy();
  });

  test("does not render when not visible", () => {
    const { queryByText } = render(
      <ModalMarker
        annotation="Test Annotation"
        datetime="2024-10-25T15:00:00.000Z"
        onClose={onCloseMock}
        visible={false}
      />
    );

    expect(queryByText("Test Annotation")).toBeNull();
    expect(queryByText("2024-10-25T15:00:00.000Z")).toBeNull();
  });

  test("calls onClose when the button is pressed", () => {
    const { getByText } = render(
      <ModalMarker
        annotation="Test Annotation"
        datetime="2024-10-25T15:00:00.000Z"
        onClose={onCloseMock}
        visible={true}
      />
    );

    fireEvent.press(getByText("Fechar"));

    expect(onCloseMock).toHaveBeenCalled();
  });
});
