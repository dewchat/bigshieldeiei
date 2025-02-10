import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Part5 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    q1: { value: '', note: '' },
    q2: { value: '', note: '' },
    q3: { value: '', note: '' },
    q4: { value: '', note: '' },
    q5: { value: '', note: '' },
  });

  const [totalScore, setTotalScore] = useState(0); // เก็บคะแนนรวม

  // ฟังก์ชันคำนวณคะแนนรวม
  const calculateScore = () => {
    return Object.values(answers).reduce((total, { value }) => total + parseInt(value || 0, 10), 0);
  };

  // อัปเดตคะแนนรวมทุกครั้งที่ answers เปลี่ยนแปลง
  useEffect(() => {
    setTotalScore(calculateScore());
  }, [answers]);

  // ฟังก์ชันสำหรับเปลี่ยนค่าของคำตอบ
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: {
        ...prevAnswers[name],
        [dataset.type === 'note' ? 'note' : 'value']: value,
      },
    }));
  };

  // ฟังก์ชันสำหรับการส่งข้อมูล
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('คะแนนรวมทั้งหมด:', totalScore);
    console.log('หมายเหตุ:', answers);
    navigate('/part6');
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
        1. สัมพันธภาพในครอบครัว  
        นิยาม: ความสัมพันธ์ระหว่างสมาชิกในครอบครัวหรือคนที่อยู่ในครัวเรือนเดียวกัน โดยมีการพูดคุย ปรึกษาหารือ มีความเอาใจใส่ซึ่งกันและกัน
      </p>

      <div style={{
        border: '1px solid #000',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        margin: '20px 0'
      }}>
        <p style={{ margin: '5px 0' }}>ค่าคะแนน</p>
        <p style={{ margin: '5px 0' }}>3 = สมาชิกมีการพูดคุยสื่อสารกันทุกเรื่องเป็นประจํา</p>
        <p style={{ margin: '5px 0' }}>2 = สมาชิกเลือกพูดคุยสื่อสารกันในบางเรื่องและบางครั้ง</p>
        <p style={{ margin: '5px 0' }}>1 = สมาชิกเลือกที่จะพูดคุยกับบุคคลภายนอกมากกว่าสมาชิกในครอบครัว</p>
        <p style={{ margin: '5px 0' }}>0 = สมาชิกในครอบครัวไม่มีการพูดคุยกัน ต่างคนต่างอยู่</p>
      </div>

      <form onSubmit={handleSubmit}>
        {renderRadioButtons('1. สมาชิกในครอบครัวของท่านมีการพูดคุยสื่อสารกันในช่วงเวลาที่อยู่ด้วยกัน', 'q1')}
        {renderRadioButtons('2. สมาชิกในครอบครัวของท่านมีการแสดงความเอาใจใส่ซึ่งกันและกัน เช่น การให้กำลังใจ การชื่นชม', 'q2')}
        {renderRadioButtons('3. สมาชิกในครอบครัวของท่านมีความเชื่อใจ หรือไว้วางใจที่จะเล่าเรื่องต่างๆ ให้กันและกันฟัง', 'q3')}
        {renderRadioButtons('4. สมาชิกในครอบครัวของท่านสามารถยอมรับความคิดเห็นที่แตกต่างกันของกันและกันได้', 'q4')}
        {renderRadioButtons('5. สมาชิกในครอบครัวของท่านร่วมตัดสินใจเรื่องสำคัญต่างๆ ด้วยกัน', 'q5')}

        <div>
          <p>คะแนนรวม: {totalScore}</p>
        </div>

      </form>

      </div>
    </div>
  );
};

export default Part5;
