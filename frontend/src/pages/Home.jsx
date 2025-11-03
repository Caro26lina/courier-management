
import { Link } from "react-router-dom";

export default function Home() {
  const styles = {
    container: {
  minHeight: '100vh',
  width: '100vw',              // ✅ stretch full width
  background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',                // ✅ remove padding which caused the gap
  fontFamily: 'Arial, sans-serif',
  position: 'relative',
  overflow: 'hidden'
},

    backgroundElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    },
    floatingCircle: {
      position: 'absolute',
      borderRadius: '50%',
      mixBlendMode: 'multiply',
      filter: 'blur(80px)',
      opacity: 0.2,
      animation: 'pulse 4s ease-in-out infinite'
    },
    circle1: {
      width: '320px',
      height: '320px',
      background: '#a855f7',
      top: '-160px',
      right: '-128px'
    },
    circle2: {
      width: '320px',
      height: '320px',
      background: '#6366f1',
      bottom: '-160px',
      left: '-128px',
      animationDelay: '2s'
    },
    circle3: {
      width: '320px',
      height: '320px',
      background: '#3b82f6',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      animationDelay: '4s'
    },
    card: {
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '24px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  width: '100%',
  maxWidth: '1600px',  // 🔥 increased width
  overflow: 'hidden',
  position: 'relative',
  display: 'flex'
},

    leftSection: {
      flex: 1,
      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    rightSection: {
      flex: 1,
      padding: '48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    logoCircle: {
      width: '120px',
      height: '120px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      backdropFilter: 'blur(10px)'
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '12px',
      textAlign: 'center'
    },
    subtitle: {
      color: '#dbeafe',
      fontSize: '18px',
      textAlign: 'center'
    },
    welcomeTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '12px',
      textAlign: 'center'
    },
    welcomeSubtitle: {
      color: '#d1d5db',
      fontSize: '16px',
      textAlign: 'center',
      marginBottom: '32px'
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    button: {
      width: '100%',
      padding: '18px 24px',
      borderRadius: '16px',
      border: 'none',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
      transition: 'all 0.3s ease',
      textDecoration: 'none'
    },
    adminButton: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      color: 'white'
    },
    userButton: {
      background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      color: 'white'
    },
    registerButton: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      color: 'white'
    },
    footer: {
      marginTop: '32px',
      textAlign: 'center'
    },
    footerText: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px'
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.backgroundElements}>
        <div style={{...styles.floatingCircle, ...styles.circle1}}></div>
        <div style={{...styles.floatingCircle, ...styles.circle2}}></div>
        <div style={{...styles.floatingCircle, ...styles.circle3}}></div>
      </div>

      {/* Main Card - Full Width */}
      <div style={styles.card}>
        {/* Left Section - Branding */}
        <div style={styles.leftSection}>
          <div style={styles.logoCircle}>
            <span style={{ fontSize: '60px' }}>🚚</span>
          </div>
          <h1 style={styles.title}>Courier Management</h1>
          <p style={styles.subtitle}>Efficient Delivery Solutions</p>
          <div style={styles.footer}>
            <p style={styles.footerText}>Fast • Secure • Reliable</p>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div style={styles.rightSection}>
          <div>
            <h2 style={styles.welcomeTitle}>Welcome to Courier System</h2>
            <p style={styles.welcomeSubtitle}>Choose your access type to continue</p>
          </div>

          {/* Buttons */}
          <div style={styles.buttons}>
            <Link
              to="/admin-login"
              style={{...styles.button, ...styles.adminButton}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span>🔐</span>
              <span>Admin Login</span>
            </Link>

            <Link
              to="/user-login"
              style={{...styles.button, ...styles.userButton}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span>👤</span>
              <span>User Login</span>
            </Link>

            <Link
              to="/user/register"
              style={{...styles.button, ...styles.registerButton}}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span>📝</span>
              <span>New User? Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
  @keyframes pulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.3; }
  }
`}</style>
    </div>
  );
}