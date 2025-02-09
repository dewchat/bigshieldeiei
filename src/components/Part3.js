import React, { useState } from 'react';

const Part3 = () => {
  const [formData, setFormData] = useState({
    group1: '',
    group2: '',
    group3: '',
    rentalOption: '',
    specificDescription: '',
  });

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

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '18px' }}>ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน</h1>

      <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>3. สถานภาพที่อยู่อาศัย</h3>
      <p style={{ fontSize: '14px' }}>(แนบรูปถ่ายที่อยู่อาศัยถ้ามี)</p>

      <form>
        {/* Group 1 */}
        <div>
          {['มีที่อยู่อาศัยเป็นของตนเองและมั่นคงถาวร', 'มีที่อยู่อาศัยเป็นของตนเองแต่ไม่มั่นคงถาวร'].map((option, index) => (
            <label key={index} style={{ display: 'block', fontSize: '14px' }}>
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
        <div>
          {['อาศัยอยู่กับผู้อื่น', 'อยู่ในที่ดินบุคคลอื่น'].map((option, index) => (
            <label key={index} style={{ display: 'block', fontSize: '14px' }}>
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
        <div>
          {['พื้นที่สาธารณะ', 'บ้านเช่า'].map((option, index) => (
            <label key={index} style={{ display: 'block', fontSize: '14px' }}>
              <input
                type="radio"
                name="group3"
                value={option}
                checked={formData.group3 === option}
                onChange={(e) => handleChange(e, 'group3')}
                style={{ marginRight: '8px' }}
              />
              {option}
            </label>
          ))}
        </div>

        {/* Nested options for 'บ้านเช่า' */}
        {formData.group3 === 'บ้านเช่า' && (
          <div style={{ marginLeft: '20px' }}>
            {['เช่าซื้อ', 'เช่ารายเดือน'].map((subOption, subIndex) => (
              <label key={subIndex} style={{ display: 'block', fontSize: '14px' }}>
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

        {/* Specific Description */}
        <div style={{ marginTop: '10px' }}>
          <label style={{ fontSize: '14px' }}>โปรดระบุลักษณะที่อยู่อาศัย</label>
          <input
            type="text"
            name="specificDescription"
            value={formData.specificDescription}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '5px' }}
          />
        </div>
      </form>
    </div>
  );
};

export default Part3;
