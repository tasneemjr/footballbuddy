import { NextResponse } from 'next/server';

export async function GET() {
  const API_KEY = process.env.FOOTBALL_API_KEY;
  const BASE_URL = 'https://api.football-data.org/v4';

  console.log('API Key length:', API_KEY?.length);
  console.log('First 4 characters of API key:', API_KEY?.substring(0, 4));

  if (!API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Test the API by fetching competitions
    const response = await fetch(`${BASE_URL}/competitions`, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ 
        error: 'API request failed',
        status: response.status,
        details: errorData
      }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ 
      status: 'success',
      message: 'API key is working correctly',
      data: data
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch data. Please check your API key.',
        details: error?.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
} 