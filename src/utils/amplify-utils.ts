import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import outputs from "@/../amplify_outputs.json";
import { cookies } from "next/headers";
import { getCurrentUser } from "aws-amplify/auth/server";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/data";
import { Schema } from "@/../amplify/data/resource";

export const cookieBasedClient = generateServerClientUsingCookies<Schema>({
  config: outputs,
  cookies,
  authMode: "userPool",
});

// Create a server runner with Amplify configurations
export const { runWithAmplifyServerContext } = createServerRunner({
  config: outputs, // Amplify outputs containing configuration details
});

// Define an asynchronous function to check user authentication
export const isAuthenticated = async () =>
  // Run within the Amplify server context
  await runWithAmplifyServerContext({
    // Pass Next.js server context with cookies for authentication
    nextServerContext: { cookies },
    // Define the operation to execute
    async operation(contextSpec) {
      try {
        // Attempt to get the current authenticated user
        const user = await getCurrentUser(contextSpec);

        // Return true if user is authenticated, false otherwise
        return !!user;
      } catch (error) {
        // Log any errors encountered during authentication check
        console.error("Error getting current user", error);

        // Return false if an error occurs (user not authenticated)
        return false;
      }
    },
  });
