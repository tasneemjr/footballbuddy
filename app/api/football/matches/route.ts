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
    // Fetch matches that are LIVE or SCHEDULED for today
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${BASE_URL}/matches?date=${today}`, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ 
        error: 'Failed to fetch matches',
        details: errorData
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch matches',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 