"use client";

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  // State to track the authentication status
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  console.log("isSignedIn", isSignedIn);

  // Initialize the router
  const router = useRouter();

  // Effect to listen for authentication events
  useEffect(() => {
    // Listen for authentication events using AWS Amplify's Hub
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          router.push("/");
          break;
        case "signedOut":
          setAuthCheck(false);
          router.push("/");
          break;
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      hubListenerCancel();
    };
  }, [router]);

  const signOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };

  const defaultRoutes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/gallery",
      label: "Gallery",
    },
    {
      href: "/add",
      label: "Add News",
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined
  );

  return (
    <>
      <Divider />
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem"
      >
        <Flex as="nav" alignItems="center" gap="2rem" margin="0 2rem">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              {route.label}
            </Link>
          ))}
        </Flex>
        <Button
          variation="primary"
          borderRadius="2rem"
          className="mr-3"
          onClick={signOutSignIn}
        >
          {authCheck ? "Sign Out" : "Sign In"}
        </Button>
      </Flex>
      <Divider size="small" />
    </>
  );
}
