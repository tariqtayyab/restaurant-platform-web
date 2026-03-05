import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { subdomain: string } }
) {
  // Mock data - same as your page.tsx
  const restaurants: Record<string, any> = {
    'chillout': {
      name: 'Chill Out Cafe',
      logo: '/logos/chillout.png',
      theme: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        background: '#F7F9FC'
      },
      workingHours: [
        { day: 'Monday', open: '09:00', close: '22:00', closed: false },
        { day: 'Tuesday', open: '09:00', close: '22:00', closed: false },
        { day: 'Wednesday', open: '09:00', close: '22:00', closed: false },
      ],
      heroTitle: 'Welcome to Chill Out Cafe',
      heroDescription: 'Best coffee in town'
    },
    'pizzahut': {
      name: 'Pizza Hut Express',
      logo: '/logos/pizzahut.png',
      theme: {
        primary: '#E31837',
        secondary: '#006491',
        background: '#FFFFFF'
      },
      workingHours: [
        { day: 'Monday', open: '11:00', close: '23:00', closed: false },
        { day: 'Tuesday', open: '11:00', close: '23:00', closed: false },
      ],
      heroTitle: 'Pizza Hut Express',
      heroDescription: 'Delicious pizza delivered fast'
    }
  };
  
  const restaurant = restaurants[params.subdomain];
  
  if (!restaurant) {
    return NextResponse.json(
      { error: 'Restaurant not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(restaurant);
}