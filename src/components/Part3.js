import React, { useState } from 'react';

const Part3 = ({ onNext }) => {
  const [formData, setFormData] = useState({
    group1: '',
    group2: '',
    group3: '',
    rentalOption: '',
    specificDescription: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event, group) => {
    setFormData((prev) => ({
      ...prev,
      [group]: event.target.value,
      rentalOption: group === 'group3' && event.target.value !== 'บ้านเช่า' ? '' : prev.rentalOption,
    }));
  };

  const handleRadioChange = (event) => {
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
      household_id: 1,  // Assuming household_id is fixed for now. You might want to change this dynamically
      own_with_spouse: formData.group1 === 'มีที่อยู่อาศัยเป็นของตนเองและมั่นคงถาวร',
      own_without_spouse: formData.group1 === 'มีที่อยู่อาศัยเป็นของตนเองแต่ไม่มั่นคงถาวร',
      living_with_others: formData.group2 === 'อาศัยอยู่กับผู้อื่น',
      squatter_area: formData.group2 === 'อยู่ในที่ดินบุคคลอื่น',
      public_area: formData.group3 === 'พื้นที่สาธารณะ',
      rental: formData.group3 === 'บ้านเช่า',
      rental_monthly: formData.rentalOption === 'เช่ารายเดือน',
      rental_purchase: formData.rentalOption === 'เช่าซื้อ',
      note: formData.specificDescription,
    };

    try {
      const response = await fetch('http://localhost:3000/api/household-info', {  // Update the URL to your backend API endpoint
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
        onNext(); // Call onNext to proceed to the next part
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
      <div style={{ backgroundColor: '#789DBC', margin: 0, height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize:'1.2rem', fontWeight:'bold' }}>
        ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
      </div>
       
      <div style={{ padding: '10px 30px 10px 30px' }}>
        <div>
          <h3>3. สถานภาพที่อยู่อาศัย</h3>
          <p style={{ color: 'red' }}>(แนบรูปถ่ายที่อยู่อาศัยถ้ามี)</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Group 1 */}
          <div style={{ marginBottom: '20px' }}>
            {['มีที่อยู่อาศัยเป็นของตนเองและมั่นคงถาวร', 'มีที่อยู่อาศัยเป็นของตนเองแต่ไม่มั่นคงถาวร'].map((option, index) => (
               <label key={index} style={{ display: 'block', fontSize: '16px' }}>
                <input
                  type="radio"
                  name="group1"
                  value={option}
                  checked={formData.group1 === option}
                  onChange={(e) => handleChange(e, 'group1')}
                  style={{ marginRight: '8px' }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Group 2 */}
          <div style={{ marginBottom: '20px' }}>
            {['อาศัยอยู่กับผู้อื่น', 'อยู่ในที่ดินบุคคลอื่น'].map((option, index) => (
              <label key={index} style={{ display: 'block', fontSize: '16px' }}>
                <input
                  type="radio"
                  name="group2"
                  value={option}
                  checked={formData.group2 === option}
                  onChange={(e) => handleChange(e, 'group2')}
                  style={{ marginRight: '8px' }}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Group 3 */}
          <div style={{ marginBottom: '20px' }}>
            {['พื้นที่สาธารณะ', 'บ้านเช่า'].map((option, index) => (
              <label key={index} style={{ display: 'block', fontSize: '16px' }}>
                <input
                  type="radio"
                  name="group3"
                  value={option}
                  checked={formData.group3 === option}
                  onChange={(e) => handleChange(e, 'group3')}
                  style={{ marginRight: '8px'}}
                />
                {option}
              </label>
            ))}
          </div>

          {/* Nested options for 'บ้านเช่า' */}
          {formData.group3 === 'บ้านเช่า' && (
            <div style={{ marginLeft: '20px' }}>
              {['เช่าซื้อ', 'เช่ารายเดือน'].map((subOption, subIndex) => (
                <label key={subIndex} style={{ display: 'block', fontSize: '16px' }}>
                  <input
                    type="radio"
                    name="rentalOption"
                    value={subOption}
                    checked={formData.rentalOption === subOption}
                    onChange={handleRadioChange}
                    style={{ marginRight: '8px' }}
                  />
                  {subOption}
                </label>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px', marginTop: "30px"}}>
            <label htmlFor='specificDescription'>โปรดระบุลักษณะที่อยู่อาศัย</label>
            <input
              type='text'
              name='specificDescription'
              value={formData.specificDescription}
              onChange={handleInputChange}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

         
          <div style={{display:'flex',justifyContent:'end'}}>
            <button type="submit" disabled={isSubmitting} 
              style={{width:'90px',height:'40px', padding: '0px', backgroundColor: isSubmitting ? '#ccc' : '#D3E4CD', color: 'black', border: 'none', borderRadius: '22px', fontSize: '18px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '40px' }}>
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