import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Part10 = () => {
  const navigate = useNavigate(); // ใช้สำหรับเปลี่ยนหน้า
  const [answers, setAnswers] = useState({
    q1: { value: '', note: '' },
    q2: { value: '', note: '' },
    q3: { value: '', note: '' },
    q4: { value: '', note: '' },
    q5: { value: '', note: '' },
  });

  // ฟังก์ชันสำหรับเปลี่ยนค่าของคำตอบในแต่ละข้อ
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.type === 'note') {
      setAnswers({
        ...answers,
        [name]: { ...answers[name], note: value },
      });
    } else {
      setAnswers({
        ...answers,
        [name]: { ...answers[name], value },
      });
    }
  };

  // ฟังก์ชันคำนวณคะแนนรวม
  const calculateScore = () => {
    return Object.values(answers).reduce((total, { value }) => total + parseInt(value || 0, 10), 0);
  };

  // ฟังก์ชันสำหรับการส่งข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    const totalScore = calculateScore(); // คำนวณคะแนนรวม
    console.log('คะแนนรวมทั้งหมด:', totalScore);
    console.log('หมายเหตุ:', answers);
    navigate('/part11'); // เปลี่ยนหน้าไปยังหน้าถัดไป
  };

  // ฟังก์ชันสร้างคำถามแบบหลายตัวเลือก
  const renderRadioButtons = (question, name) => (
    <div style={{ marginBottom: '20px' }}>
      <label>{question}</label>
      <p>คำตอบ</p>
      <div>
        {[0, 1, 2, 3].map((value) => (
          <label key={value} style={{ display: 'block', marginBottom: '5px' }}>
            <input
              type="radio"
              name={name}
              value={value}
              checked={answers[name].value === value.toString()}
              onChange={handleChange}
            />{' '}
            {value === 0
              ? '0 น้อยที่สุด'
              : value === 1
              ? '1 น้อย'
              : value === 2
              ? '2 ปานกลาง'
              : '3 มาก'}
          </label>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>หมายเหตุ:</label>
        <textarea
          name={name}
          data-type="note"
          value={answers[name].note}
          onChange={handleChange}
          rows="1"
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ backgroundColor: '#789DBC', margin: 0, height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize:'1.2rem', fontWeight:'bold' }}>
        ส่วนที่ 2 - การประเมินสภาวะครอบครัว
      </div> 
      <div style={{ padding:'10px 30px 10px 30px', }}>
        <p>
        6. การศึกษา
  นิยาม การเรียนรู้ให้มีทักษะที่จําเป็นต่อการดําเนินชีวิต
  คิดแก้ไขปัญหาเป็น และมีความรู้ตามหลักการ
  สามารถนําไปพัฒนาศักยภาพตนเองได้
        </p>

        <div style={{
          border: '1px solid #000',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          margin: '20px 0'
        }}>
          <p style={{ margin: '5px 0' }}>ค่าคะแนน</p>
          <p style={{ margin: '5px 0' }}>3 =  สมาชิกในครอบครัวได้รับการศึกษาทุกคน</p>
          <p style={{ margin: '5px 0' }}>2 = สมาชิกในครอบครัวส่วนใหญ่ เช่น ลูก หลาน ได้รับการศึกษาขั้นพื้นฐานหรือการฝึกอาชีพ</p>
          <p style={{ margin: '5px 0' }}>1 = สมาชิกในครอบครัวบางคน เช่น หลานคนเดียวที่ได้รับการศึกษา</p>
          <p style={{ margin: '5px 0' }}>0 =  สมาชิกในครอบครัวไม่ได้รับการศึกษาขั้นพื้นฐาน</p>
        </div>

        <form onSubmit={handleSubmit}>
          {renderRadioButtons(
            '1.สมาชิกในครอบครัวได้รับการศึกษาขั้นพื้นฐาน (จบการศึกษาภาคบังคับ ม.3 หรือเรียนฟรี 12 ปี)',
            'q1'
          )}
          {renderRadioButtons(
            '2.สมาชิกในครอบครัวของท่านเคยได้รับการอบรมเพื่อพัฒนาศักยภาพในการใช้ชีวิตจากหน่วยงานที่เกี่ยวข้อง เช่น อบรมฝึกอาชีพ อบรมที่หมู่บ้านจัด',
            'q2'
          )}
          {renderRadioButtons(
            '3. สมาชิกในครอบครัวของท่านมีทักษะด้านการอ่านการเขียน และการคํานวณ',
            'q3'
          )}
          {renderRadioButtons(
            '4.สมาชิกในครอบครัวของท่านให้ความสําคัญกับการได้รับการศึกษาในระบบ',
            'q4'
          )}
          {renderRadioButtons(
            '5. สมาชิกในครอบครัวของท่านมีทุนการศึกษาหรืองบประมาณที่ใช้ในการศึกษาอย่างเพียงพอ',
            'q5'
          )}

          <div>
            <p>คะแนนเฉลี่ย {calculateScore()}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Part10;
