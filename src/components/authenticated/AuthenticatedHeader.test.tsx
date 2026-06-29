import { render, screen } from "@testing-library/react";
import AuthenticatedHeader from "./AuthenticatedHeader";

describe("AuthenticatedHeader", () => {
  it("renders the admin title and logout button", () => {
    render(<AuthenticatedHeader />);

    expect(screen.getByText(/SPEcific Admin/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /logout/i })).toBeInTheDocument();
  });
});
