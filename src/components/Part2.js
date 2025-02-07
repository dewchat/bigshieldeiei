import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการเปลี่ยนเส้นทาง

const Part2 = () => {
  const navigate = useNavigate(); // ใช้สำหรับการเปลี่ยนเส้นทาง

  
  const [formData, setFormData] = useState({
    latitude: '',
    longitude: '',
    placeName: '',
    houseCode: '',
    houseNumber: '',
    village: '',
    subDistrict: '',
    alley: '',
    road: '',
    district: '',
    province: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // เตรียมข้อมูลที่จะส่งไปยัง backend
    const dataToSend = {
      house_number: formData.houseNumber,
      village_no: formData.village,
      sub_district: formData.subDistrict,
      district: formData.district,
      province: formData.province,
      postal_code: formData.postalCode,
      housing_type: formData.placeName, // ส่ง placeName เป็น housing_type
    };

    try {
      const response = await fetch('http://localhost:3000/api/households', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('ข้อมูลถูกบันทึกแล้ว:', result);
        navigate('/part3'); // เปลี่ยนเส้นทางไปยังหน้า Part3.js
      } else {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', result);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // พาย้อนกลับไปยังหน้าก่อนหน้า
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ flex: 1, textAlign: 'center', fontSize: '18px', margin: 0 }}>
          ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
        </h1>
      </div>
      <h3 style={{ marginBottom: '10px' }}>2. ที่อยู่ปัจจุบัน</h3>

      <form onSubmit={handleSubmit}>
        <label>พิกัด GPS</label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            name="latitude"
            placeholder=""
            value={formData.latitude}
            onChange={handleChange}
          />
          <input
            name="longitude"
            placeholder=""
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>

        <label>ชื่อสถานที่/ชื่ออาคาร/ชื่อหมู่บ้าน:</label>
        <input
          name="placeName"
          placeholder=""
          value={formData.placeName}
          onChange={handleChange}
        />

        <label>รหัสประจำบ้าน:</label>
        <input
          name="houseCode"
          placeholder=""
          value={formData.houseCode}
          onChange={handleChange}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <label>บ้านเลขที่:</label>
            <input
              name="houseNumber"
              placeholder=""
              value={formData.houseNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>หมู่ที่:</label>
            <input
              name="village"
              placeholder=""
              value={formData.village}
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div>
            <label>ตรอก:</label>
            <input
              name="alley"
              placeholder=""
              value={formData.alley}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>ซอย:</label>
            <input
              name="subDistrict"
              placeholder=""
              value={formData.subDistrict}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>ถนน:</label>
        <input
          name="road"
          placeholder=""
          value={formData.road}
          onChange={handleChange}
        />

        <label>ตำบล/แขวง:</label>
        <input
          name="district"
          placeholder=""
          value={formData.district}
          onChange={handleChange}
        />

        <label>อำเภอ/เขต:</label>
        <input
          name="province"
          placeholder=""
          value={formData.province}
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
          name="postalCode"
          placeholder=""
          value={formData.postalCode}
          onChange={handleChange}
        />

        <button type="submit">บันทึก</button>
      </form>
    </div>
  );
};

export default Part2;
