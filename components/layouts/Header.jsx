import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/context/authContext";

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push("/signin");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="w-full bg-slate-100 flex justify-end py-4 md:pr-24">
        <ul className="flex items-center gap-7">
          <li className="list-none flex items-end gap-2">
            <div className="text-sm text-orange-600">
              <b>Hello,</b>
              <p>Kelley</p>
            </div>
            <Image
              src={"/images/bing.png"}
              alt={"admin image"}
              width={100}
              height={100}
              className="rounded-full w-12 h-12"
            />
          </li>
          <li className="list-none">
            <button
              onClick={logout}
              className="px-3 py-2  bg-slate-300 text-slate-800 text-sm rounded-md"
            >
              Logout
            </button>
          </li>
        </ul>
      </header>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          success: {
            duration: 5000,
          },
        }}
      />
    </>
  );
};

export default Header;
