import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import PersonInfoComponent from "./PersonInfoComponent";

jest.mock("axios");

describe("PersonInfoComponent", () => {
  it("renders component correctly", () => {
    render(<PersonInfoComponent />);
    // Add assertions to check if the component renders correctly
    expect(screen.getByText("SWAPI App")).toBeInTheDocument();
    // Add more assertions as needed
  });

  it("fetches character list on component mount", async () => {
    axios.get.mockResolvedValueOnce({
      data: { results: [{ name: "Luke Skywalker" }] },
    });
    render(<PersonInfoComponent />);

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("https://swapi.dev/api/people/");
    });

    // Add assertions to check if the character list is displayed
    expect(screen.getByText("Character List")).toBeInTheDocument();
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("fetches person info on button click", async () => {
    axios.get.mockResolvedValueOnce({
      data: { name: "Obi-Wan Kenobi", birthYear: "19BBY" },
    });
    render(<PersonInfoComponent />);

    // Simulate user input and button click
    fireEvent.change(screen.getByLabelText("Enter person name:"), {
      target: { value: "Obi-Wan Kenobi" },
    });
    fireEvent.click(screen.getByText("Fetch Person Info"));

    // Wait for the async operation to complete
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/swapi-proxy/person-info?name=Obi-Wan Kenobi"
      );
    });

    // Add assertions to check if the person info is displayed
    expect(screen.getByText("Obi-Wan Kenobi")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
  });
});
