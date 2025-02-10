import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Part4 = () => {
  const navigate = useNavigate();
  const [familyMembers, setFamilyMembers] = useState([{ id: Date.now() }]);

  const addMember = () => {
    setFamilyMembers([...familyMembers, { id: Date.now() }]);
  };

  const handleInputChange = (id, field, value) => {
    setFamilyMembers(
      familyMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ข้อมูลที่ส่งไปยังฐานข้อมูล
    const dataToSend = familyMembers.map((member) => ({
      number: member.number,
      idNumber: member.idNumber,
      fullName: member.fullName,
      birthDate: member.birthDate,
      age: member.age,
      gender: member.gender,
      relationship: member.relationship,
      occupation: member.occupation,
      monthlyIncome: member.monthlyIncome,
      normal: member.normal,
      disabled: member.disabled,
      chronicIllness: member.chronicIllness,
      bedridden: member.bedridden,
      selfHelp: member.selfHelp,
      note: member.note,
    }));

    try {
      const response = await fetch('http://localhost:3000/api/persons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        // ส่งข้อมูลสำเร็จ, นำทางไปหน้าอื่น
        navigate('/part5');
      } else {
        console.error('Error sending data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div>
      
      <div style={{ backgroundColor: '#789DBC', margin: 0, height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize:'1.2rem', fontWeight:'bold' }}>
        ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
      </div> 

      <form onSubmit={handleSubmit}>
        <h3>4. สมาชิกในครอบครัว (ผู้ที่อาศัยอยู่จริงในปัจจุบัน)</h3>
        {familyMembers.map((member) => (
          <div key={member.id} style={{ marginBottom: "20px" }}>
            <label>
              ที่
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "number", e.target.value)}
              />
            </label>
            <label>
              เลขบัตรประชาชน
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "idNumber", e.target.value)}
              />
            </label>
            <label>
              ชื่อ - สกุล
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "fullName", e.target.value)}
              />
            </label>
            <label>
              วัน/เดือน/ปีเกิด
              <input
                type="date"
                onChange={(e) => handleInputChange(member.id, "birthDate", e.target.value)}
              />
            </label>
            <label>
              อายุ
              <input
                type="number"
                onChange={(e) => handleInputChange(member.id, "age", e.target.value)}
              />
            </label>
            <label>
              เพศ
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "gender", e.target.value)}
              />
            </label>
            <label>
              ลักษณะความสัมพันธ์
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "relationship", e.target.value)}
              />
            </label>
            <label>
              อาชีพ
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "occupation", e.target.value)}
              />
            </label>
            <label>
              รายได้ต่อเดือน
              <input
                type="number"
                onChange={(e) => handleInputChange(member.id, "monthlyIncome", e.target.value)}
              />
            </label>
            <label>
              สภาพร่างกาย
              <div>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(member.id, "normal", e.target.checked)}
                  />
                  ปกติ
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(member.id, "disabled", e.target.checked)}
                  />
                  พิการ
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(member.id, "chronicIllness", e.target.checked)}
                  />
                  ป่วยเรื้อรัง
                </label>
                <label>
                  <input
                    type="checkbox"
                    onChange={(e) => handleInputChange(member.id, "bedridden", e.target.checked)}
                  />
                  ติดเตียง
                </label>
              </div>
            </label>
            <label>
              ช่วยเหลือตนเอง
              <div>
                <label>
                  <input
                    type="radio"
                    name={`selfHelp-${member.id}`}
                    value="ได้"
                    onChange={(e) => handleInputChange(member.id, "selfHelp", e.target.value)}
                  />
                  ได้
                </label>
                <label>
                  <input
                    type="radio"
                    name={`selfHelp-${member.id}`}
                    value="ไม่ได้"
                    onChange={(e) => handleInputChange(member.id, "selfHelp", e.target.value)}
                  />
                  ไม่ได้
                </label>
              </div>
            </label>
            <label>
              หมายเหตุ
              <input
                type="text"
                onChange={(e) => handleInputChange(member.id, "note", e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addMember} style={{ marginTop: '20px', padding: '10px' }}>
          เพิ่มสมาชิก
        </button>
        <button type="submit" style={{ marginTop: '20px', padding: '10px' }}>
          ยืนยัน
        </button>
      </form>
    </div>
  );
};

export default Part4;
