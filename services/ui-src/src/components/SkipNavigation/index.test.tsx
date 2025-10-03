import { render, screen } from "@testing-library/react";
import { SkipNav } from "components";

const skipNavComponent = <SkipNav />;

describe("<SkipNav />", () => {
  test("SkipNav is visible and focusable", async () => {
    render(skipNavComponent);
    const skipNav = document.getElementById("skip-nav-main")!;
    skipNav.focus();

    const skipNavLink = screen.getByText("Skip to main content");
    await expect(skipNavLink).toHaveFocus();
    await expect(skipNavLink).toBeVisible();
  });
});
