/* eslint-disable @typescript-eslint/no-explicit-any */
import { RandomUserResponse, User } from "@/types";

/**
 * Fetches a random user from the randomuser.me API
 * @returns Promise<User> - A single user object
 * @throws Error if the API request fails or returns invalid data
 */
export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?results=1&nat=us",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: RandomUserResponse = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No user data received from API");
    }

    return data.results[0];
  } catch (error) {
    console.error("Error fetching user data:", error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error("Network error: Please check your internet connection");
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unexpected error occurred while fetching user data");
  }
};

/**
 * Validates if the provided data is a valid User object
 * @param data - The data to validate
 * @returns boolean - True if valid User object
 */
export const isValidUser = (data: any): data is User => {
  return (
    data &&
    typeof data === "object" &&
    data.name &&
    typeof data.name.first === "string" &&
    typeof data.name.last === "string" &&
    typeof data.email === "string" &&
    data.picture &&
    typeof data.picture.large === "string"
  );
};
