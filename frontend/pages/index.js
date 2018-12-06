import Items from '../components/Items';

export default function Home({ query }) {
  return (
    <div>
      <Items page={parseInt(query.page) || 1} />
    </div>
  );
}
