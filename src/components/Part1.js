import React, { useState, useEffect } from 'react';

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
    
      // ตรวจสอบว่ามีฟิลด์ว่างเปล่าและกำหนดค่าเป็น null
      const sanitizedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value.trim() === '' || value === null ? null : value,
        ])
      );
    
      try {
        const response = await fetch('http://localhost:3000/api/respondents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData),
        });
    
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
    
        const result = await response.json();
        console.log('Response from server:', result);
    
        setStatusMessage('ข้อมูลถูกบันทึกสำเร็จ!');
        onNext(); // เรียก onNext เพื่อเปลี่ยนไปยัง Part ถัดไป
      } catch (error) {
        console.error('Error submitting data:', error);
        setStatusMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: '18px', margin: 0 }}>
          ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
        </h1>
      </div>
      <h3 style={{ marginBottom: '10px' }}>1. ข้อมูลผู้ตอบแบบสอบถาม</h3>
      <p style={{ color: 'red' }}>(ข้อมูลที่กรอกจะเป็นความลับทั้งหมด)</p>

      <form>
        <label>ชื่อ - นามสกุล:</label>
        <input
          name="first_last_name"
          value={formData.first_last_name}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>เลขที่บัตรประชาชน:</label>
        <input
          name="national_id"
          value={formData.national_id}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>กรณีไม่มี เนื่องจาก:</label>
        <input
          name="no_national_id_reason"
          value={formData.no_national_id_reason}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>วัน/เดือน/ปีเกิด:</label>
        <input
          name="birth_date"
          value={formData.birth_date}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>อายุ:</label>
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>เพศ:</label>
        <input
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>ลักษณะความสัมพันธ์:</label>
        <input
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>ระดับการศึกษา:</label>
        <input
          name="education_level"
          value={formData.education_level}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>โทรศัพท์:</label>
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        <label>โทรศัพท์มือถือ:</label>
        <input
          name="mobile_phone"
          value={formData.mobile_phone}
          onChange={handleChange}
          placeholder=""
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </form>

      <button onClick={handleNext} disabled={isSubmitting}>
        {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ถัดไป'}
      </button>

      {statusMessage && <p style={{ color: 'red', marginTop: '10px' }}>{statusMessage}</p>}
    
    </div>
  );
};

export default Part1;