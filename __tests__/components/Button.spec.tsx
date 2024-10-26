import React from "react";
import { render } from "@testing-library/react-native";
import { PrimaryButton } from "../../src/components/Button";

describe("Button", () => {
  test("if the button renders with child text", () => {
    const { getByText } = render(<PrimaryButton>text</PrimaryButton>);
    const element = getByText("text");

    expect(element).toBeTruthy();
  });
  test("if the button press is work", () => {
    const { debug } = render(<PrimaryButton>text</PrimaryButton>);
    debug();
  });
});
