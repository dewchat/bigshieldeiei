import React, { useState } from "react";

const Part4 = ({ onNext }) => {
  const [member, setMember] = useState({ id: Date.now() });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleInputChange = (field, value) => {
    setMember({ ...member, [field]: value });
  };

  const handleNext = async () => {
    setIsSubmitting(true);
    setStatusMessage('');

    const dataToSend = {
      household_id: 1,
      national_id: member.idNumber,
      first_name: member.fullName?.split(' ')[0],
      last_name: member.fullName?.split(' ')[1],
      birth_date: member.birthDate,
      gender: member.gender,
      relationship: member.relationship,
      occupation: member.occupation,
      monthly_income: member.monthlyIncome,
      physical_status: member.disabled ? 'disabled' :
                      member.chronicIllness ? 'chronically_ill' :
                      member.bedridden ? 'bedridden' :
                      member.normal ? 'normal' : 'unknown',
      self_care: member.selfHelp === 'ได้',
      is_respondent: member.note || ''
    };

    try {
      const response = await fetch('http://localhost:3000/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setStatusMessage('ข้อมูลถูกบันทึกสำเร็จ!');
        onNext(); // เรียก onNext เพื่อเปลี่ยนไปยังส่วนถัดไป
      } else {
        console.error('Error sending data:', response.statusText);
        setStatusMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNext(); // เรียก handleNext เมื่อฟอร์มถูกส่ง
  };

  return (
    <div>
      <div style={{ backgroundColor: '#789DBC', margin: 0, height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
        ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
      </div>

      <div style={{ padding: '10px 30px 10px 30px' }}>
        <div>
          <h3>4. สมาชิกในครอบครัว</h3>
          <p>(ผู้ที่อาศัยอยู่จริงในปัจจุบัน)</p>
        </div> 

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>ที่</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("number", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>เลขบัตรประชาชน</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>ชื่อ - สกุล</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>
        
          <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>วัน/เดือน/ปีเกิด</label>
              <input
                type="date"
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>อายุ</label>
              <input
                type="number"
                onChange={(e) => handleInputChange("age", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>เพศ</label>
              <input
                type="text"
                onChange={(e) => handleInputChange("gender", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>ลักษณะความสัมพันธ์</label>
              <input
                type="text"
                onChange={(e) => handleInputChange("relationship", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>อาชีพ</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div  style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>รายได้ต่อเดือน</label>
            <input
              type="number"
              onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div>
          <label>สภาพร่างกาย</label>
          <div>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleInputChange("normal", e.target.checked)}
                style={{ width: '20px', height: '20px', marginRight: '5px' }} // Adjust size here
              />
              ปกติ
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleInputChange("disabled", e.target.checked)}
                style={{ width: '20px', height: '20px', marginRight: '5px' }} // Adjust size here
              />
              พิการ
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleInputChange("chronicIllness", e.target.checked)}
                style={{ width: '20px', height: '20px', marginRight: '5px' }} // Adjust size here
              />
              ป่วยเรื้อรัง
            </label>
            <label>
              <input
                type="checkbox"
                onChange={(e) => handleInputChange("bedridden", e.target.checked)}
                style={{ width: '20px', height: '20px', marginRight: '5px' }} // Adjust size here
              />
              ติดเตียง
            </label>
          </div>
        </div>

        <div>
          <label>ช่วยเหลือตนเอง</label>
          <div>
            <label>
              <input
                type="radio"
                name="selfHelp"
                value="ได้"
                onChange={(e) => handleInputChange("selfHelp", e.target.value)}
                style={{ width: '20px', height: '20px', marginRight: '5px' }} // Adjust size here
              />
              ได้
            </label>
            <label>
              <input
                type="radio"
                name="selfHelp"
                value="ไม่ได้"
                onChange={(e) => handleInputChange("selfHelp", e.target.value)}
                style={{ width: '20px', height: '20px', marginRight: '5px' }} // Adjust size here
              />
              ไม่ได้
            </label>
          </div>
        </div>


          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>หมายเหตุ</label>
            <input
              type="text"
              onChange={(e) => handleInputChange("note", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <button type="submit" disabled={isSubmitting} style={{ marginTop: '20px', padding: '10px' }}>
            {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ยืนยัน'}
          </button>

          {statusMessage && <p style={{ color: 'red', marginTop: '10px' }}>{statusMessage}</p>}
        </form>

      </div>
    </div>
  );
};

export default Part4;