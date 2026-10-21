/**
 * app/api/posts/route.ts
 * API Route — returns Instagram-style posts as JSON
 * Access: GET http://localhost:3000/api/posts
 */
import { NextResponse } from 'next/server';

// Demo posts data (in real app, this comes from database)
const posts = [
  {
    id: '1',
    username: 'travel_diaries',
    caption: 'Exploring the mountains 🏔️ #travel #adventure #nature',
    likes: 2453,
    comments: 89,
    timestamp: '2h ago',
    color: '#FF6B6B',
  },
  {
    id: '2',
    username: 'foodie_mamta',
    caption: 'Homemade pasta night 🍝 #food #cooking #yummy',
    likes: 1200,
    comments: 45,
    timestamp: '5h ago',
    color: '#4ECDC4',
  },
  {
    id: '3',
    username: 'code_ninja',
    caption: 'Just deployed my Next.js app! 🚀 #coding #react #nextjs',
    likes: 890,
    comments: 32,
    timestamp: '8h ago',
    color: '#45B7D1',
  },
  {
    id: '4',
    username: 'sunset_lover',
    caption: 'Golden hour magic ✨ #sunset #photography #beautiful',
    likes: 5670,
    comments: 120,
    timestamp: '1d ago',
    color: '#F7DC6F',
  },
  {
    id: '5',
    username: 'dev_guru',
    caption: 'Redux Toolkit makes state management so clean 💡 #redux #react',
    likes: 3400,
    comments: 76,
    timestamp: '3h ago',
    color: '#9B59B6',
  },
  {
    id: '6',
    username: 'nature_clicks',
    caption: 'Morning dew on the petals 🌸 #nature #macro #photography',
    likes: 7800,
    comments: 200,
    timestamp: '12h ago',
    color: '#2ECC71',
  },
];

export async function GET() {
  // Simulate API delay (like a real server)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    success: true,
    count: posts.length,
    data: posts,
  });
}
