"use client";
import { useState } from "react";
import { AuthService } from "@services/AuthService";
import logger from "@lib/logger";
import { AxiosError } from "@services/api";
import toast from "react-hot-toast";



export default function Create() {
    const [formData, setFormData] = useState<Record<string, string>>({
        username: "",
        password: "",
        confirm_password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [createLoading, setCreateLoading] = useState(false);


    const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match");
            return;
        }
        try {
            setError(null);
            setCreateLoading(true);
            await AuthService.createUser({
                username: formData.username,
                password: formData.password
            });
            toast.success("User created successfully");
        } catch (error) {
            if (error instanceof AxiosError) {
                setError(error.response?.data.message);
                return
            }
            logger.error(error)
        } finally {
            setCreateLoading(false);
        }

    }



    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="w-full max-w-sm border p-5">

                <h1>VSTECS Randomizer</h1>

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Username</label>
                        <input
                            type="username"
                            name="username"
                            className="border"
                            id="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
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


                    <div className="flex flex-col gap-1">
                        <label htmlFor="">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            className="border"
                            id="confirm_password"
                            value={formData.confirm_password}
                            onChange={handleChange}
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={createLoading}
                        className="w-full border mt-5 py-2 rounded-sm">
                        {createLoading ? "Loading..." : "Create"}
                    </button>
                </form>

            </div>
        </div>
    );
}