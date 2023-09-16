import React from "react";
import { render } from "@testing-library/react";
import Profile from "./ProfileForm";
import { UserProvider } from "../testUtils";

// snapshot
it("matches snapshot", function () {
    const { asFragment } = render(
        <UserProvider>
            <Profile />
        </UserProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
});


// functionality testing
describe("ProfileForm", () => {
    it("renders the form correctly", () => {
        const { getByLabelText, getByText } = render(<ProfileForm />);

        expect(getByLabelText("Username")).toBeInTheDocument();
        expect(getByLabelText("First Name")).toBeInTheDocument();
        expect(getByLabelText("Last Name")).toBeInTheDocument();
        expect(getByLabelText("Email")).toBeInTheDocument();
        expect(getByLabelText("Confirm password to make changes:")).toBeInTheDocument();
        expect(getByText("Save Changes")).toBeInTheDocument();
    });

    it("submits the form correctly", () => {
        // Create a mock handleSubmit function
        const mockHandleSubmit = jest.fn();

        // Render the form with the mock handleSubmit function
        const { getByText, getByLabelText } = render(
            <ProfileForm handleSubmit={mockHandleSubmit} />
        );

        // Fill in the form inputs
        fireEvent.change(getByLabelText("First Name"), { target: { value: "John" } });
        fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
        fireEvent.change(getByLabelText("Email"), { target: { value: "john.doe@example.com" } });
        fireEvent.change(getByLabelText("Confirm password to make changes:"), { target: { value: "testpassword" } });

        // Simulate form submission
        fireEvent.click(getByText("Save Changes"));

        // Check if the handleSubmit function was called with the correct data
        expect(mockHandleSubmit).toHaveBeenCalledWith({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            password: "testpassword",
            profile_picture: "", // You can add the value if you want to test the profile_picture field
        });
    });
});
