"use client";

import React from "react";
import Link from "next/link";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";
import axiosInstance from "@/lib/api/axiosConfig";
import { logout } from "@/lib/actions/auth";

const checkAuth = async () => {
  try {
    await axiosInstance.get("/auth/me");
    return true;
  } catch {
    return false;
  }
};

const Navbar: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: isAuth } = useQuery({
    queryKey: ["isAuth"],
    queryFn: checkAuth,
  });

  const path = usePathname();

  const handleLogout = async () => {
    await logout();
    queryClient.invalidateQueries({ queryKey: ["isAuth"] });
    redirect("/");
  };

  return (
    <header>
      <nav>
        <div className="flex items-center justify-between p-4 h-[80px] border-b box-border">
          <Link
            href="/"
            className="flex items-center gap-4 text-black no-underline"
          >
            <TravelExploreIcon sx={{ width: 45, height: 45, color: "black" }} />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-black">
                Discovering the World
              </span>
              <span className="text-sm text-black">
                Making your Life Easier
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            {!!isAuth ? (
              <>
                <Link
                  href="/categories"
                  className={`px-2 py-1 font-bold rounded-md no-underline ${
                    path?.includes("/categories")
                      ? "bg-black text-white"
                      : "bg-white hover:bg-gray-200"
                  }`}
                >
                  Categories
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center font-bold gap-3 rounded-lg px-3 py-2 normal-case hover:bg-gray-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {path?.includes("/login") && (
                  <Link
                    href="/login"
                    className={`px-2 py-1 font-bold rounded-md no-underline bg-black text-white`}
                  >
                    Login
                  </Link>
                )}
                {path?.includes("/signup") && (
                  <Link
                    href="/signup"
                    className={`px-2 py-1 font-bold rounded-md no-underline bg-black text-white`}
                  >
                    Sign up
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;