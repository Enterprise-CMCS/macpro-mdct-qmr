import { render, screen } from "@testing-library/react";
import { ComponentMask } from "components/ComponentMask";

describe("ComponentMask", () => {
  test("component renders", () => {
    render(<ComponentMask />);

    const renderedComponentMask = screen.getByTestId("component-mask");

    expect(renderedComponentMask).toBeInTheDocument();
    expect(renderedComponentMask).toHaveStyle("opacity: 0.5");
    expect(renderedComponentMask).toHaveStyle("z-index: 2");
    expect(renderedComponentMask).toHaveStyle("cursor: not-allowed");
  });
});
