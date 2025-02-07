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

  const parts = [Part1, Part2, Part3, Part4, Part5, Part6, Part7, Part8, Part9, Part10, Part11, Part12, Part13];
  const CurrentComponent = parts[currentPart - 1];

  const nextPart = () => {
    if (currentPart < parts.length) {
      setCurrentPart(currentPart + 1);
    }
  };

  const prevPart = () => {
    if (currentPart === 1) {
      navigate('/home'); 
    } else {
      setCurrentPart(currentPart - 1);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', fontFamily: 'Arial', position: 'relative' }}>
      <CurrentComponent />
      <button 
        onClick={prevPart} 
        style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '20px' }}
      >
        ←
      </button>
      <button 
        onClick={nextPart} 
        disabled={currentPart === parts.length} 
        style={{ position: 'absolute', bottom: '10px', right: '10px', fontSize: '15px' }}
      >
        ถัดไป
      </button>
    </div>
  );
};

export default Info;
