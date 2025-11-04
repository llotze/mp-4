"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchPage() {
    const [artistName, setArtistName] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (artistName.trim()) {
            router.push(`/results?artist=${encodeURIComponent(artistName.trim())}`);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
            <div className="w-full max-w-md p-6 bg-white dark:bg-zinc-800 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Search for Artist</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                        placeholder="Enter artist name..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full mt-4 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Search Artworks
                    </button>
                </form>
            </div>
        </div>
    );
}