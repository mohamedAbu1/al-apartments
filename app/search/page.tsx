 'use client';
import { useSearchParams } from 'next/navigation';
import SearchClient from '../components/search-client';
import TripSearchClient from '../components/trip-search-client';
import { Suspense } from 'react';

export default function SearchPage() {
  return <Suspense fallback={<main className="app-shell min-h-screen"/>}><SearchRouter/></Suspense>;
}

function SearchRouter() { const searchParams = useSearchParams(); return searchParams.get('mode') === 'trip' ? <TripSearchClient/> : <SearchClient/>; }
