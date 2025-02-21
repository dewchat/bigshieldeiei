import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Part1 from './Part1';
import Part2 from './Part2';
import Part3 from './Part3';
import Part4 from './Part4';
import Part5 from './Part5';
import Part6 from './Part6';
import Part7 from './Part7';
import Part8 from './Part8';
import Part9 from './Part9';
import Part10 from './Part10';
import Part11 from './Part11';
import Part12 from './Part12';
import Part13 from './Part13';

const Info = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
      first_last_name: '',
      national_id: '',
      no_national_id_reason: '',
      birth_date: '',
      age: '',
      gender: '',
      relationship: '',
      education_level: '',
      phone: '',
      mobile_phone: '',
    });


  const nextPart = () => {
    if (currentPart < 13) {
      setCurrentPart(currentPart + 1);
    }
  };

  const prevPart = () => {
    if (currentPart === 1) {
      navigate('/home');
    } else if (currentPart > 1) {
      setCurrentPart(currentPart - 1);
    }
  };

  const loadFontAwesome = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(link);
  };
  
  loadFontAwesome();

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', fontFamily: 'Arial', position: 'relative' }}>
      {currentPart === 1 && <Part1 onNext={nextPart} formData={formData} setFormData={setFormData}/>}
      {currentPart === 2 && <Part2 onNext={nextPart} />}
      {currentPart === 3 && <Part3 onNext={nextPart} />}
      {currentPart === 4 && <Part4 onNext={nextPart} />}
      {currentPart === 5 && <Part5 onNext={nextPart} />}
      {currentPart === 6 && <Part6 onNext={nextPart} />}
      {currentPart === 7 && <Part7 onNext={nextPart} />}
      {currentPart === 8 && <Part8 onNext={nextPart} />}
      {currentPart === 9 && <Part9 onNext={nextPart} />}
      {currentPart === 10 && <Part10 onNext={nextPart} />}
      {currentPart === 11 && <Part11 onNext={nextPart} />}
      {currentPart === 12 && <Part12 onNext={nextPart} />}
      {currentPart === 13 && <Part13 />}

    <button 
      onClick={prevPart} 
      style={{
        position: 'absolute',
        top: '25px',
        left: '30px',
        fontSize: '20px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <i className="fas fa-arrow-left"></i> {/* ใช้ไอคอน */}
    </button>
  


      {/* ปุ่มถัดไป */}
      <button 
        onClick={nextPart} 
        disabled={currentPart === 13}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          fontSize: '15px'
        }}
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Info;
