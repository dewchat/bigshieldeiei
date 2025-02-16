import React, { useState } from "react";

const Part4 = ({ onNext }) => {
  const [member, setMember] = useState({ id: Date.now() });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setMember({ ...member, [field]: value });
  };

  // ฟังก์ชันรีเซ็ตฟอร์ม (ไม่รีเซ็ต isDataSubmitted)
  const resetForm = () => {
    setMember({
      id: Date.now(), // รีเซ็ต ID
      number: '',
      idNumber: '',
      fullName: '',
      birthDate: '',
      age: '',
      gender: '',
      relationship: '',
      occupation: '',
      monthlyIncome: '',
      normal: false,
      disabled: false,
      chronicIllness: false,
      bedridden: false,
      selfHelp: '',
      note: ''
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        setIsDataSubmitted(true); // ตั้งค่าให้รู้ว่าข้อมูลถูกส่งแล้ว
        resetForm(); // รีเซ็ตฟอร์มหลังจากส่งข้อมูลสำเร็จ
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

  const handleNextPart = () => {
    setIsDataSubmitted(false); // รีเซ็ต isDataSubmitted เป็น false
    onNext(); // เรียก onNext เพื่อเปลี่ยนไปยังส่วนถัดไป
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
              value={member.number || ''}
              onChange={(e) => handleInputChange("number", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>เลขบัตรประชาชน</label>
            <input
              type="text"
              value={member.idNumber || ''}
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>ชื่อ - สกุล</label>
            <input
              type="text"
              value={member.fullName || ''}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>
        
          <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>วัน/เดือน/ปีเกิด</label>
              <input
                type="date"
                value={member.birthDate || ''}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>อายุ</label>
              <input
                type="number"
                value={member.age || ''}
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
                value={member.gender || ''}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column' }}>
              <label>ลักษณะความสัมพันธ์</label>
              <input
                type="text"
                value={member.relationship || ''}
                onChange={(e) => handleInputChange("relationship", e.target.value)}
                style={{ width: '160px', border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>อาชีพ</label>
            <input
              type="text"
              value={member.occupation || ''}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div  style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>รายได้ต่อเดือน</label>
            <input
              type="number"
              value={member.monthlyIncome || ''}
              onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'0.8rem'}}>
            <label>สภาพร่างกาย</label>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <label style={{display:'flex',alignItems:'center'}}>
                  <input
                    type="checkbox"
                    checked={member.normal || false}
                    onChange={(e) => handleInputChange("normal", e.target.checked)}
                    style={{ width: '20px', height: '20px', marginRight: '5px' }}
                  />
                  ปกติ
                </label>
              
                <label style={{display:'flex',alignItems:'center'}}>
                  <input
                    type="checkbox"
                    checked={member.disabled || false}
                    onChange={(e) => handleInputChange("disabled", e.target.checked)}
                    style={{ width: '20px', height: '20px', marginRight: '5px' }}
                  />
                  พิการ
                </label>

                <label style={{display:'flex',alignItems:'center'}}>
                  <input
                    type="checkbox"
                    checked={member.chronicIllness || false}
                    onChange={(e) => handleInputChange("chronicIllness", e.target.checked)}
                    style={{ width: '20px', height: '20px', marginRight: '5px' }}
                  />
                  ป่วยเรื้อรัง
                </label>

                <label style={{display:'flex',alignItems:'center'}}>
                  <input
                    type="checkbox"
                    checked={member.bedridden || false}
                    onChange={(e) => handleInputChange("bedridden", e.target.checked)}
                    style={{ width: '20px', height: '20px', marginRight: '5px' }}
                  />
                  ติดเตียง
                </label>
              </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'0.8rem',marginTop:'10px'}}>
            <label>ช่วยเหลือตนเอง</label>
            <div style={{display:'flex',gap:'6rem'}}>
              <label style={{display:'flex',alignItems:'center'}}>
                <input
                  type="radio"
                  name="selfHelp"
                  value="ได้"
                  checked={member.selfHelp === 'ได้'}
                  onChange={(e) => handleInputChange("selfHelp", e.target.value)}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                />
                ได้
              </label>
              <label style={{display:'flex',alignItems:'center'}}>
                <input
                  type="radio"
                  name="selfHelp"
                  value="ไม่ได้"
                  checked={member.selfHelp === 'ไม่ได้'}
                  onChange={(e) => handleInputChange("selfHelp", e.target.value)}
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                />
                ไม่ได้
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px',marginTop:'0.8rem'}}>
            <label>หมายเหตุ</label>
            <input
              type="text"
              value={member.note || ''}
              onChange={(e) => handleInputChange("note", e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
            />
          </div>

          {statusMessage && <p style={{ color: 'red', marginTop: '20px',textAlign:'center' }}>{statusMessage}</p>}

          <div style={{display:'flex',justifyContent:'center'}}>
            <button type="submit" disabled={isSubmitting} 
              style={{width:'90px',height:'40px', padding: '0px', backgroundColor: isSubmitting ? '#ccc' : '#D3E4CD', color: 'black', border: 'none', borderRadius: '22px', fontSize: '18px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '10px' }}>
              {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูล'}
            </button>
          </div>

          
        </form>

        {isDataSubmitted && (
          <div style={{display:'flex',justifyContent:'end'}}>
            <button onClick={handleNextPart} 
              style={{width:'90px',height:'40px', padding: '0px', backgroundColor: isSubmitting ? '#ccc' : '#D3E4CD', color: 'black', border: 'none', borderRadius: '22px', fontSize: '18px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.3s', marginTop: '40px' }}>
              ถัดไป
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Part4;