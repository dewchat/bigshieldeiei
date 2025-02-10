import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 




const Home = () => {
  const navigate = useNavigate();

  const goToInfo = () => {
    navigate('/info'); // เปลี่ยนเส้นทางไปยัง /info
  };

  const handleSignOut = () => {
    // Add sign-out logic here (e.g., clear session, token, or user data)
    navigate('/'); // ไปยังหน้า Signin
  };

  return (

    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
      <button
        onClick={goToInfo}
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: '#ffffff',
          color: 'white',
          border: '1px solid gray',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '1rem',
          fontSize: '3rem'
        }}
      >
      </button>

      <h1 style={{ fontSize: '1rem', lineHeight: '1' }}>
        แบบสำรวจคุณภาพชีวิตและการได้รับสวัสดิการสังคม<br />
        กองสวัสดิการสังคม เทศบาลเมืองเมืองแกนพัฒนา
      </h1>

      <button
        onClick={handleSignOut}
        style={{
          width: '300px',
          height: '50px',
          backgroundColor: ' #FFE3E3',
          color: 'black',
          border: 'none',
          borderRadius: '14px',
          cursor: 'pointer',
          marginTop: '4rem',
          fontSize: '1rem',
          fontWeight: 'bold'

        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
