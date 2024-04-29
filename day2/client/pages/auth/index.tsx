import { useState } from "react";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

interface SheetDataRow {
  name: string;
  email: string;
  password: string;
  message: string;
}

const LoginPage = ({ sheetdata }: { sheetdata: SheetDataRow[] }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const trimmedEmail = email.trim();
    const user = sheetdata.find((user) => user.email === trimmedEmail);
    console.log(user);
        if (user && user.password === password) {
      console.log("Login successful");
    } else {
      console.log("Invalid email or password");
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

export const getServerSideProps = async (ctx: NextPageContext) => {
  try {
    const res = await fetch(
      process.env.NODE_ENV === "development"
        ? `http://${ctx.req?.headers.host}/api/submit`
        : `https://${ctx.req?.headers.host}/api/submit`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const { data } = await res.json();

    return {
      props: {
        sheetdata: data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        sheetdata: [], // Return empty array or handle the error as needed
      },
    };
  }
};
