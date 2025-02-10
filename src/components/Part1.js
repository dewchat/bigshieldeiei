import React, { useState } from 'react';

const Part1 = ({ onNext }) => {
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

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = async () => {
    setIsSubmitting(true);

    const sanitizedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        value.trim() === '' || value === null ? null : value,
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

  return (
    <div>
      <div style={{ backgroundColor: '#789DBC', margin: 0, height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize:'1.2rem', fontWeight:'bold' }}>
        ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
      </div>
  
      <div style={{ padding:'10px 30px 10px 30px'}}>
        <div>
          <h3>1. ข้อมูลผู้ตอบแบบสอบถาม</h3>
          <p style={{color:'red'}}>(ข้อมูลที่กรอกจะเป็นความลับทั้งหมด)</p>
        </div>

        <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column', marginBottom:'10px'}}>
          <label htmlFor='first_last_name'>ชื่อ - นามสกุล</label>
          <input
            type='text'
            name='first_last_name'
            value={formData.first_last_name}
            onChange={handleChange}
            style={{border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
          />
        </div>

        <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column', marginBottom:'10px'}}>
          <label htmlFor='national_id'>เลขที่บัตรประชาชน</label>
          <input
            type='text'
            name='national_id'
            value={formData.national_id}
            onChange={handleChange}
            style={{border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
          />
        </div>

        <div style={{display: 'flex',gap: '0.8rem', marginBottom:'10px', alignItems:'center', marginTop:'20px'}}>
          <label htmlFor='no_national_id_reason'>กรณีไม่มี เนื่องจาก</label>
          <input
            type='text'
            name='no_national_id_reason'
            value={formData.no_national_id_reason}
            onChange={handleChange}
            style={{border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px',width:'217px'}}
          />
        </div>

        <div style={{display: 'flex', marginTop:'10px',justifyContent:'space-between'}}>
          <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column'}}>
            <label htmlFor='birth_date'>วัน/เดือน/ปีเกิด</label>
            <input
              type='date'
              name='birth_date'
              value={formData.birth_date}
              onChange={handleChange}
              style={{width:'160px', border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
            />
          </div>
          <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column'}}>
            <label htmlFor='age'>อายุ</label>
            <input
              type='number'
              name='age'
              value={formData.age}
              onChange={handleChange}
              style={{width:'160px', border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
            />
          </div>
        </div>

        <div style={{display: 'flex', marginTop:'10px',justifyContent:'space-between'}}>
          <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column'}}>
            <label htmlFor='gender'>เพศ</label>
            <input
              type='text'
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              style={{width:'160px',border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
            />
          </div>
          <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column'}}>
            <label htmlFor='relationship'>ลักษณะความสัมพันธ์</label>
            <input
              type='text'
              name='relationship'
              value={formData.relationship}
              onChange={handleChange}
              style={{width:'160px',border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
            />
          </div>
        </div>

        <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column', marginBottom:'10px'}}>
          <label htmlFor='education_level'>ระดับการศึกษา</label>
          <input
            type='text'
            name='education_level'
            value={formData.education_level}
            onChange={handleChange}
            style={{border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
          />
        </div>

        <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column', marginBottom:'10px'}}>
          <label htmlFor='phone'>โทรศัพท์</label>
          <input
            type='text'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            style={{border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
          />
        </div>

        <div style={{display: 'flex',gap: '0.8rem', flexDirection: 'column', marginBottom:'10px'}}>
          <label htmlFor='mobile_phone'>โทรศัพท์มือถือ</label>
          <input
            type='text'
            name='mobile_phone'
            value={formData.mobile_phone}
            onChange={handleChange}
            style={{border:'1px solid gray', borderRadius:'8px', height: '26px', padding: '4px 7px 4px 10px'}}
          />
        </div>

        <button
          onClick={handleNext}
          disabled={isSubmitting}
          style={{ width: '100%', padding: '12px', backgroundColor: isSubmitting ? '#ccc' : '#D3E4CD', color: 'black', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '40px' }}>
          {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ถัดไป'}
        </button>

        {statusMessage && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Part1;