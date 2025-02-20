import React, { useState } from 'react';

const Part3 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    selectedOption: '', // ตัวเลือกหลัก
    rentalOption: '', // ตัวเลือกย่อยเมื่อเลือก "บ้านเช่า"
    specificDescription: '', // คำอธิบายเพิ่มเติม
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ตัวเลือกทั้งหมด
  const options = [
    'มีที่อยู่อาศัยเป็นของตนเองและมั่นคงถาวร',
    'มีที่อยู่อาศัยเป็นของตนเองแต่ไม่มั่นคงถาวร',
    'อาศัยอยู่กับผู้อื่น',
    'อยู่ในที่ดินบุคคลอื่น',
    'พื้นที่สาธารณะ',
    'บ้านเช่า',
  ];

  // ตัวเลือกย่อยสำหรับ "บ้านเช่า"
  const rentalOptions = ['เช่าซื้อ', 'เช่ารายเดือน'];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setFormData((prev) => ({
      ...prev,
      selectedOption: selectedValue,
      rentalOption: selectedValue === 'บ้านเช่า' ? prev.rentalOption : '', // รีเซ็ต rentalOption ถ้าไม่เลือก "บ้านเช่า"
    }));
  };

  const handleRentalOptionChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      rentalOption: event.target.value,
    }));
  };

  const handleInputChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      specificDescription: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const data = {
      household_id: 1, // เปลี่ยนเป็น dynamic ID ตามความเหมาะสม
      own_with_spouse: formData.selectedOption === 'มีที่อยู่อาศัยเป็นของตนเองและมั่นคงถาวร',
      own_without_spouse: formData.selectedOption === 'มีที่อยู่อาศัยเป็นของตนเองแต่ไม่มั่นคงถาวร',
      living_with_others: formData.selectedOption === 'อาศัยอยู่กับผู้อื่น',
      squatter_area: formData.selectedOption === 'อยู่ในที่ดินบุคคลอื่น',
      public_area: formData.selectedOption === 'พื้นที่สาธารณะ',
      rental: formData.selectedOption === 'บ้านเช่า',
      rental_monthly: formData.rentalOption === 'เช่ารายเดือน',
      rental_purchase: formData.rentalOption === 'เช่าซื้อ',
      note: formData.specificDescription,
    };

    try {
      const response = await fetch('http://localhost:3000/api/household-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Data submitted successfully:', result);
        setStatusMessage('ข้อมูลถูกบันทึกสำเร็จ!');
        onNext(); // ไปยังส่วนถัดไป
      } else {
        console.error('Error submitting data:', result);
        setStatusMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setStatusMessage('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h3>3. สถานภาพที่อยู่อาศัย</h3>
          <p style={{ color: 'red' }}>(แนบรูปถ่ายที่อยู่อาศัยถ้ามี)</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* ตัวเลือกหลัก */}
          <div style={{ marginBottom: '20px' }}>
            {options.map((option, index) => (
              <label key={index} style={{ display: 'block', fontSize: '16px' }}>
                <input
                  type="radio"
                  name="selectedOption"
                  value={option}
                  checked={formData.selectedOption === option}
                  onChange={handleOptionChange}
                  style={{ marginRight: '8px' }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* ตัวเลือกย่อยสำหรับ "บ้านเช่า" */}
          {formData.selectedOption === 'บ้านเช่า' && (
            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
              {rentalOptions.map((subOption, subIndex) => (
                <label key={subIndex} style={{ display: 'block', fontSize: '16px' }}>
                  <input
                    type="radio"
                    name="rentalOption"
                    value={subOption}
                    checked={formData.rentalOption === subOption}
                    onChange={handleRentalOptionChange}
                    style={{ marginRight: '8px' }}
                  />
                  {subOption}
                </label>
              ))}
            </div>
          )}

          {/* คำอธิบายเพิ่มเติม */}
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px', marginTop: '30px' }}>
            <label htmlFor="specificDescription">โปรดระบุลักษณะที่อยู่อาศัย</label>
            <input
              type="text"
              name="specificDescription"
              value={formData.specificDescription}
              onChange={handleInputChange}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          {/* ปุ่มส่งข้อมูล */}
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <button
              type="submit"
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
        </form>

        {statusMessage && <p style={{ color: 'red', marginTop: '10px' }}>{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Part3;