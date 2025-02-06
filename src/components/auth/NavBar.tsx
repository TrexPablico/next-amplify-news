"use client";

// Import necessary modules and components
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";
import Image from "next/image";

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  // State to track the authentication status
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  const [dropdown, setDropdown] = useState(false);
  const [time, setTime] = useState("");
  const [bannerVisible, setBannerVisible] = useState(true);
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

  // Effect to update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeOptions = {
        timeZone: "Asia/Manila",
        hour: "2-digit" as "2-digit",
        minute: "2-digit" as "2-digit",
        second: "2-digit" as "2-digit",
      };
      const dateOptions = {
        timeZone: "Asia/Manila",
        weekday: "long" as "long",
        year: "numeric" as "numeric",
        month: "long" as "long",
        day: "numeric" as "numeric",
      };
      const philippineTime = now.toLocaleTimeString("en-US", timeOptions);
      const philippineDate = now.toLocaleDateString("en-US", dateOptions);
      setTime(`${philippineDate} - ${philippineTime}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const showDropdown = () => {
    setDropdown(!dropdown);
  };

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
          <Link href="/">
            <Image src="/img/hc.png" alt="Logo" width={80} height={80} />
          </Link>
          <div className="hidden md:flex gap-7">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                {route.label}
              </Link>
            ))}
          </div>
        </Flex>
        <Flex alignItems="center" gap="2rem">
          <div>{time}</div>
          <Button
            variation="primary"
            borderRadius="2rem"
            className="mr-3"
            onClick={signOutSignIn}
          >
            {authCheck ? "Sign Out" : "Sign In"}
          </Button>
          <button
            className="md:hidden"
            onClick={showDropdown}
            aria-label="Menu"
          >
            &#9776; {/* Menu Icon */}
          </button>
        </Flex>
      </Flex>
      {dropdown && (
        <div className="md:hidden">
          <nav className="flex flex-col items-center gap-2 mt-2">
            {routes.map((route) => (
              <Link key={route.href} href={route.href}>
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      <Divider size="small" />
    </>
  );
}
