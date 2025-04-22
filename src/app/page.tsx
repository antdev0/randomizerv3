"use client";
import { useState, useEffect } from "react";
import { AuthService } from "@services/AuthService";
import logger from "@lib/logger";
import { AxiosError } from "@services/api";
import { useRouter } from 'next/navigation';

interface User {
  username: string;
}


export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<User[] | null>([]);
  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await AuthService.fetchUsers();
        setUsername(users.data);
 
      } catch (error) {

        logger.error(error);
      }
    }
    fetchUsers();
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError(null);
      setLoginLoading(true);
      const response = await AuthService.login(formData);
      localStorage.setItem("token", response.data.token);
      router.push('/randomizer');
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.message);
        return
      }
      logger.error(error)
    } finally {
      setLoginLoading(false);
    }

  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-sm border p-5">

        <h1>VSTECS Randomizer</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="">Username</label>
            <select
              name="username"
              id="username"
              className="border"
              value={formData.username}
              onChange={handleChange}>
              <option value="" disabled >Select</option>
              {username?.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              className="border"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full border mt-5 py-2 rounded-sm">
            {loginLoading ? "Loading..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}
