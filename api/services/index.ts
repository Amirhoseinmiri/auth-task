import axios from "axios";
import { RandomUserResponse, User } from "@/types";

export const fetchRandomUser = async (): Promise<User> => {
  try {
    const response = await axios.get<RandomUserResponse>(
      "https://randomuser.me/api/?results=1&nat=us",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    if (!data.results || data.results.length === 0) {
      throw new Error("No user data received from API");
    }

    return data.results[0];
  } catch (error: any) {
    console.error("Error fetching user data:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(`API error: ${error.response.statusText}`);
      }
      if (error.request) {
        throw new Error(
          "No response from server. Please check your connection."
        );
      }
      throw new Error(`Axios error: ${error.message}`);
    }

    throw new Error("An unexpected error occurred while fetching user data");
  }
};
