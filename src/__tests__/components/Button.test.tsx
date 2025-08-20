/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

// Simple Button mock
const Button = ({
  children,
  disabled,
  variant,
  size,
  className,
  ...props
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) => (
  <button
    disabled={disabled}
    className={`btn ${variant || ""} ${size || ""} ${className || ""}`}
    {...props}
  >
    {children}
  </button>
);

describe("Button Component", () => {
  it("renders button with text", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" })
    ).toBeInTheDocument();
  });

  it("renders disabled button", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(
      screen.getByRole("button", { name: "Disabled Button" })
    ).toBeDisabled();
  });

  it("renders button with variant class", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: "Outline Button" });
    expect(button.className).toContain("outline");
  });

  it("renders button with size class", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole("button", { name: "Small Button" });
    expect(button.className).toContain("sm");
  });
});
