import React from "react";
import { render } from "@testing-library/react";
import Courses from "./CourseList";

it("matches snapshot", function () {
    const { asFragment } = render(<Courses />);
    expect(asFragment()).toMatchSnapshot();
});
