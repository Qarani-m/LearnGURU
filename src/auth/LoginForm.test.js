import React from "react";
import { render } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router-dom";

it("matches snapshot", function () {
    const { asFragment } = render(
        <MemoryRouter initialEntries={['/test']} initialIndex={0}>
            <LoginForm />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});