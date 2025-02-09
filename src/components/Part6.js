import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Part6 = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    q1: { value: '', note: '' },
    q2: { value: '', note: '' },
    q3: { value: '', note: '' },
    q4: { value: '', note: '' },
    q5: { value: '', note: '' },
  });

  const [totalScore, setTotalScore] = useState(0); // Store the total score

  // Calculate the total score
  const calculateScore = () => {
    return Object.values(answers).reduce((total, { value }) => total + parseInt(value || 0, 10), 0);
  };

  // Update the total score whenever answers change
  useEffect(() => {
    setTotalScore(calculateScore());
  }, [answers]);

  // Function to handle changes to answers
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

  // Submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Total score:', totalScore);
    console.log('Notes:', answers);
    navigate('/part7'); // Navigate to Part7
  };

  // Render multiple-choice question with radio buttons
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
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '20px' }}>
        ส่วนที่ 2 - การประเมินสภาวะครอบครัว
      </h1>
      <p>
        2. การมีรายได้และมีงานทํา
        <br />
        นิยาม: ลักษณะการประกอบอาชีพของสมาชิกในครอบครัวและรายได้เฉลี่ยที่นํามาใช้จ่ายในการดํารงชีวิต
      </p>

      <div
        style={{
          border: '1px solid #000',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          margin: '20px 0',
        }}
      >
        <p style={{ margin: '5px 0' }}>ค่าคะแนน</p>
        <p style={{ margin: '5px 0' }}>3 = รายได้เพียงพอต่อการดํารงชีพและมีเงินออม</p>
        <p style={{ margin: '5px 0' }}>2 = รายได้เพียงพอแต่ไม่มีเงินออม</p>
        <p style={{ margin: '5px 0' }}>1 = รายได้ไม่เพียงพอ และมีหนี้สิน</p>
        <p style={{ margin: '5px 0' }}>0 = รายได้ไม่เพียงพอ และมีหนี้สินมาก</p>
      </div>

      <form onSubmit={handleSubmit}>
        {renderRadioButtons(
          '1. สมาชิกในครอบครัวของท่านสามารถหารายได้เลี้ยงดูครอบครัวได้ทุกคน',
          'q1'
        )}
        {renderRadioButtons(
          '2. สมาชิกในครอบครัวของท่านมีการออมเงินในรูปแบบต่างๆ เช่น กองทุนหมู่บ้าน สัจจะวันละบาท สลากออมสิน',
          'q2'
        )}
        {renderRadioButtons(
          '3. สมาชิกในครอบครัวของท่านมีรายได้เพียงพอต่อการดําเนินชีวิต',
          'q3'
        )}
        {renderRadioButtons(
          '4. สมาชิกในครอบครัวของท่านรับรู้และมีการวางแผนการชําระหนี้สิน',
          'q4'
        )}
        {renderRadioButtons(
          '5. สมาชิกในครอบครัวของท่านมีความสามารถในการจัดการชําระหนี้สินได้ตรงเวลา',
          'q5'
        )}

        <div>
          <p>คะแนนรวม: {totalScore}</p>
        </div>
        
      </form>
    </div>
  );
};

export default Part6;
