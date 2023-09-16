import React from "react";
import { render } from "@testing-library/react";
import CourseCard from "./CourseCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with price", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <CourseCard
                handle="rithm"
                name="Rithm School"
                description="Become an good developer in 16 weeks."
                price="$100"
                rating="4"
            />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without price ", function () {
    const { asFragment } = render(
        <MemoryRouter>
            <CourseCard
                handle="springboard"
                name="SpringBoard"
                description="Become a great software engineer with this bootcamp"
                rating="4.5"
            />
        </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
});
