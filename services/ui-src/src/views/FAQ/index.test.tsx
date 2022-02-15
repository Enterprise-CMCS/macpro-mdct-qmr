import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { FAQ } from ".";

const WrappedDemoComponents = () => (
  <Router>
    <FAQ />
  </Router>
);

describe("Tests for the FAQ page", () => {
  it("renders faq page", () => {
    render(<WrappedDemoComponents />);

    expect(screen.getByText(/this will be the faq page/i)).toBeInTheDocument();
  });
});
