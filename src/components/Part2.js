import React, { useState, useEffect } from 'react';

const Part2 = ({ onNext }) => {
  const [formData, setFormData] = useState({

    house_registration_id: '',
    house_number: '',
    village_no: '',
    alley: '',
    street: '',
    sub_district: '',
    district: '',
    province: '',
    postal_code: '',
    latitude: '',
    longitude: '',
    building_name: '',
  
    
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
      const response = await fetch('http://localhost:3000/api/households', {
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
      <h1 style={{ textAlign: 'center' }}>ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน</h1>
      <h3>2. ที่อยู่ปัจจุบัน</h3>

      <form>
        <label>พิกัด GPS</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
          <input
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>

        <label>ชื่อสถานที่/ชื่ออาคาร/ชื่อหมู่บ้าน:</label>
        <input
          name="building_name"
          placeholder=""
          value={formData.building_name
          }
          onChange={handleChange}
        />

        <label>รหัสประจำบ้าน:</label>
        <input
          name="house_registration_id"
          placeholder=""
          value={formData.house_registration_id}
          onChange={handleChange}
        />

        <label>บ้านเลขที่:</label>
        <input
          name="house_number"
          placeholder=""
          value={formData.house_number}
          onChange={handleChange}
        />

        <label>หมู่ที่:</label>
        <input
          name="village_no"
          placeholder=""
          value={formData.village_no}
          onChange={handleChange}
        />

        <label>ตรอก:</label>
        <input
          name="alley"
          placeholder=""
          value={formData.alley}
          onChange={handleChange}
        />

        <label>ถนน:</label>
        <input
          name="street"
          placeholder=""
          value={formData.street}
          onChange={handleChange}
        />

        <label>ตำบล/แขวง:</label>
        <input
          name="sub_district"
          placeholder=""
          value={formData.sub_district}
          onChange={handleChange}
        />

        <label>อำเภอ/เขต:</label>
        <input
          name="district"
          placeholder=""
          value={formData.district}
          onChange={handleChange}
        />

        <label>จังหวัด:</label>
        <input
          name="province"
          placeholder=""
          value={formData.province}
          onChange={handleChange}
        />

        <label>รหัสไปรษณีย์:</label>
        <input
          name="postal_code"
          placeholder=""
          value={formData.postal_code}
          onChange={handleChange}
        />
      </form>

      <button onClick={handleNext} disabled={isSubmitting}>
        {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ถัดไป'}
      </button>

      {statusMessage && <p style={{ color: 'red', marginTop: '10px' }}>{statusMessage}</p>}
    </div>
  );
};

export default Part2;
