import { NextRequest, NextResponse } from "next/server";
import { ApiInfo } from "@/types";

type ApiResponse = {
  info: ApiInfo;
  records: any[];
  aggregations: Record<string, any>;
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const artist = searchParams.get('artist');
        const apiKey = process.env.HARVARD_ART_MUSEUM_API_KEY;
        const url = `https://api.harvardartmuseums.org/object?apikey=${apiKey}&person=${encodeURIComponent(artist)}&size=20`;
        
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