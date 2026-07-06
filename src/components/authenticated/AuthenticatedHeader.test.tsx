import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthenticatedHeader from "./AuthenticatedHeader";
import { vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: {
      id: "1",
      name: "Primary Admin",
      email: "admin@example.com",
      role: "superadmin",
    },
  }),
}));

describe("AuthenticatedHeader", () => {
  it("renders profile name and shows logout inside dropdown", async () => {
    const user = userEvent.setup();
    render(<AuthenticatedHeader />);

    expect(screen.getByText(/SPEcific/i)).toBeInTheDocument();

    const profileButton = screen.getByRole("button", { name: /Primary Admin/i });
    expect(profileButton).toBeInTheDocument();

    await user.click(profileButton);
    expect(screen.getByRole("menuitem", { name: /logout/i })).toBeInTheDocument();
  });
});
