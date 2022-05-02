import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders horse text", () => {
  render(<App />);
  const horseText = screen.getByText(/horse/i);
  expect(horseText).toBeInTheDocument();
});
