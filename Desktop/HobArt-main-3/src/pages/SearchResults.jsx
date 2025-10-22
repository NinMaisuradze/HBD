import { useLocation } from 'react-router-dom';

export default function SearchResults(){
  const loc = useLocation();
  const params = new URLSearchParams(loc.search);
  const q = params.get('q') || '';

  return (
    <section style={{padding:'2rem'}}>
      <h2>Search results for “{q}”</h2>
      <p>Currently this is a placeholder. You can wire an actual search backend or filter local data here.</p>
    </section>
  )
}
