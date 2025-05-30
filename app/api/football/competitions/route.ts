import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const BASE_URL = 'https://api.football-data.org/v4';

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${BASE_URL}/competitions`, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ 
        error: 'Failed to fetch competitions',
        details: errorData
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch competitions',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 