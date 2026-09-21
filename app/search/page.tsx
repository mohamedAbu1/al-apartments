import SearchClient from '../components/search-client';
import { Suspense } from 'react';

export default function SearchPage() {
  return <Suspense fallback={<main className="app-shell min-h-screen"/>}><SearchClient/></Suspense>;
}
