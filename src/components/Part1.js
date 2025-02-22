import React, { useState, useEffect } from 'react';

const Part1 = ({ onNext, formData, setFormData }) => {  

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'birth_date') {
      // Calculate age when birth date changes
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      
      // Adjust age if birthday hasn't occurred this year
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      setFormData(prev => ({
        ...prev,
        birth_date: value,
        age: age.toString()
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = async () => {
    setIsSubmitting(true);

    // Convert empty fields to null
    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value === '' || value === null ? null : value,
      ])
    );

    try {
      const response = await fetch('http://localhost:3000/api/respondents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setStatusMessage('ข้อมูลถูกบันทึกสำเร็จ!');
      onNext();
    } catch (error) {
      setStatusMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <div>
      <div
        style={{
          backgroundColor: '#789DBC',
          margin: 0,
          height: '70px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
      </div>

      <div style={{ padding: '10px 30px 10px 30px' }}>
        <div>
          <h3>1. ข้อมูลผู้ตอบแบบสอบถาม</h3>
          <p style={{ color: 'red' }}>(ข้อมูลที่กรอกจะเป็นความลับทั้งหมด)</p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
          <label>ชื่อ - นามสกุล</label>
          <input
            type='text'
            name='first_last_name'
            value={formData.first_last_name}
            onChange={handleChange}
            style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
          <label>เลขที่บัตรประชาชน</label>
          <input
            type='text'
            name='national_id'
            value={formData.national_id}
            onChange={handleChange}
            style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '10px', alignItems: 'center', marginTop: '20px' }}>
          <label>กรณีไม่มี เนื่องจาก</label>
          <input
            type='text'
            name='no_national_id_reason'
            value={formData.no_national_id_reason}
            onChange={handleChange}
            style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px', width: '217px' }}
          />
        </div>

        <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
            <label>วัน/เดือน/ปีเกิด</label>
            <input
              type='date'
              name='birth_date'
              value={formData.birth_date}
              onChange={handleChange}
              style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
            <label>อายุ</label>
            <input
              type='text'
              name='age'
              value={formData.age}
              readOnly
              style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px', backgroundColor: '#f0f0f0' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
            <label>เพศ</label>
            <input
              type='text'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
            <label>ลักษณะความสัมพันธ์</label>
            <input
              type='text'
              name='relationship'
              value={formData.relationship}
              onChange={handleChange}
              style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
          <label>ระดับการศึกษา</label>
          <input
            type='text'
            name='education_level'
            value={formData.education_level}
            onChange={handleChange}
            style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
          <label>โทรศัพท์</label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
          <label>โทรศัพท์มือถือ</label>
          <input
            type='text'
            name='mobile_phone'
            value={formData.mobile_phone}
            onChange={handleChange}
            style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            style={{
              width: '90px',
              height: '40px',
              padding: '0px',
              backgroundColor: isSubmitting ? '#ccc' : '#D3E4CD',
              color: 'black',
              border: 'none',
              borderRadius: '22px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s',
              marginTop: '40px',
            }}
          >
            {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ถัดไป'}
          </button>
        </div>

        {statusMessage && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Part1;