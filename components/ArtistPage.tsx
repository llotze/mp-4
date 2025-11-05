"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ApiResponse } from "@/types";

function ArtistPageContent() {
    const searchParams = useSearchParams();
    const artistName = searchParams.get('artist') || '';
    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!artistName) {
            setError('No artist specified');
            setLoading(false);
            return;
        }

        const fetchArtworks = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/api/artworks?artist=${encodeURIComponent(artistName)}`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch artworks');
                }
                
                const result: ApiResponse = await response.json();
                setData(result);
            } catch (err) {
                setError('Error loading artworks. Please try again.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [artistName]);

    if (!artistName) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">No Artist Specified</h1>
                <p className="mb-4">Please go back and search for an artist.</p>
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Back to Search
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                <p>Searching for artworks by {artistName}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Error</h1>
                <p className="mb-4">{error}</p>
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Back to Search
                </Link>
            </div>
        );
    }

    if (!data || data.records.length === 0) {
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">No Artworks Found</h1>
                <p className="mb-4">No artworks found for artist {artistName}.</p>
                <Link href="/" className="text-blue-600 hover:underline">
                    ← Back to Search
                </Link>
            </div>
        );
    }

    return (
        <div className="p-8">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">
                ← Back to Search
            </Link>
            <h1 className="text-3xl font-bold mb-2">Artworks by {artistName}</h1>
            <p className="mb-6">Found {data.info.totalrecords} artworks (showing {data.records.length})</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.records.map((artwork, index) => (
                    <div key={artwork.id || index} className="border rounded p-4">
                        {artwork.primaryimageurl && (
                            <Image 
                                src={artwork.primaryimageurl} 
                                alt={artwork.title || "Artwork"}
                                width={300}
                                height={192}
                                className="w-full h-48 object-cover mb-4 rounded"
                            />
                        )}
                        <h3 className="font-bold text-lg mb-2">
                            {artwork.title || "Untitled"}
                        </h3>
                        {artwork.dated && (
                            <p className="text-sm text-gray-600 mb-1">Date: {artwork.dated}</p>
                        )}
                        {artwork.classification && (
                            <p className="text-sm text-gray-600">Type: {artwork.classification}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ArtistPage() {
    return (
        <Suspense fallback={
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Loading...</h1>
                <p>Preparing search results...</p>
            </div>
        }>
            <ArtistPageContent />
        </Suspense>
    );
}