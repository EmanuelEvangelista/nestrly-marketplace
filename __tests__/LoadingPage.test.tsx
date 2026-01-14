import { render, screen } from "@testing-library/react";
import LoadingPage from "@/app/loading";

describe("LoadingPage", () => {
  it("muestra el spinner cuando loading es true", () => {
    render(<LoadingPage loading={true} />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("no muestra el spinner cuando loading es false", () => {
    render(<LoadingPage loading={false} />);
    // el loader sigue existiendo pero con loading=false no se renderiza
    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});
