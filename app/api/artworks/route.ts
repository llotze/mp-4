import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/types";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const artist = searchParams.get('artist');
        
        if (!artist) {
            return NextResponse.json({ error: 'Artist parameter required' }, { status: 400 });
        }

        const apiKey = process.env.HARVARD_ART_MUSEUM_API_KEY;
        
        if (!apiKey) {
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&person=${encodeURIComponent(artist)}&hasimage=1&imagepermissionlevel=0&size=20`;
        
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json({ error: 'API request failed' }, { status: response.status });
        }

        const data: ApiResponse = await response.json();
        
        return NextResponse.json(data);
        
    } catch (error) {
        console.error("Error fetching artworks:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}