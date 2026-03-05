// app/page.tsx
export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: '#f9f9f9'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          🍽️ Restaurant Platform
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
          Welcome to your multi-tenant restaurant website platform
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a 
            href="/chillout"
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#0070f3', 
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Visit Chillout Cafe
          </a>
          <a 
            href="/pizzahut"
            style={{ 
              padding: '0.75rem 1.5rem', 
              background: '#e00', 
              color: 'white',
              textDecoration: 'none',
              borderRadius: '5px'
            }}
          >
            Visit Pizza Hut
          </a>
        </div>
      </div>
    </div>
  );
}