import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Part8 = ({ onNext }) => {
  const navigate = useNavigate(); 
  const [answers, setAnswers] = useState({
    q1: { value: '', note: '' },
    q2: { value: '', note: '' },
    q3: { value: '', note: '' },
    q4: { value: '', note: '' },
    q5: { value: '', note: '' },
  });

  const [totalScore, setTotalScore] = useState(0);
  const [householdId, setHouseholdId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const calculateScore = () => {
    return Object.values(answers).reduce((total, { value }) => total + (parseInt(value, 10) || 0), 0);
  };

  useEffect(() => {
    setTotalScore(calculateScore());
  }, [answers]);

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    setAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [name]: {
          ...prevAnswers[name],
          [dataset.type === 'note' ? 'note' : 'value']: value,
        },
      };
      setTotalScore(calculateScore(updatedAnswers));
      return updatedAnswers;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      household_id: householdId,
      assessment_date: new Date().toISOString(),
      q1_score: answers.q1.value,
      q1_note: answers.q1.note,
      q2_score: answers.q2.value,
      q2_note: answers.q2.note,
      q3_score: answers.q3.value,
      q3_note: answers.q3.note,
      q4_score: answers.q4.value,
      q4_note: answers.q4.note,
      q5_score: answers.q5.value,
      q5_note: answers.q5.note,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/security-assessment', data);
      console.log('ข้อมูลที่ส่งไป:', response.data);
      setStatusMessage('ข้อมูลถูกบันทึกสำเร็จ!');
      onNext(); // เรียก onNext เพื่อเปลี่ยนไปยัง Part ถัดไป
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
      setStatusMessage('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
        <label>หมายเหตุ:</label>
        <textarea
          name={name}
          data-type="note"
          value={answers[name].note}
          onChange={handleChange}
          rows="1"
          style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
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
          4. ความมั่นคงปลอดภัย
          <br />
          นิยาม: ความปลอดภัยทั้งด้านร่างกาย จิตใจและสังคมที่จะนําไปสู่ความมั่นคงในการดํารงชีวิตไม่ตกอยู่ในสภาวะความลําบาก
        </p>

        <div style={{
          border: '1px solid #000',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
          margin: '20px 0'
        }}>
          <p>ค่าคะแนน</p>
          <p>3 = มีความรู้สึกมั่นคงปลอดภัยในชีวิตมาก</p>
          <p>2 = มีความรู้สึกมั่นคง ปลอดภัยในชีวิตปานกลาง</p>
          <p>1 = มีน้อยความรู้สึกมั่นคง ปลอดภัยในชีวิต</p>
          <p>0 = ไม่มีความรู้สึกมั่นคง ปลอดภัยในชีวิต</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '0.8rem', flexDirection: 'column', marginBottom: '10px' }}>
            <label>Household ID:</label>
            <input
              type="text"
              value={householdId}
              onChange={(e) => setHouseholdId(e.target.value)}
              style={{ border: '1px solid gray', borderRadius: '8px', height: '26px', padding: '4px 7px 4px 10px' }}
              required
            />
          </div>

          {renderRadioButtons('1. ครอบครัวของท่านถือเป็นพื้นที่ที่มีความสุขอยู่แล้วบายใจ ทั้งด้านร่างกาย และจิตใจ', 'q1')}
          {renderRadioButtons('2. สมาชิกในครอบครัวของท่านให้อิสระและสามารถทําตามความต้องการของตนเองได้', 'q2')}
          {renderRadioButtons('3. สมาชิกในครอบครัวของท่านให้ความสําคัญกับการยอมรับตัวตน เช่น เป็นผู้พิการ เป็นเพศที่สาม', 'q3')}
          {renderRadioButtons('4. สมาชิกในครอบครัวของท่านมีการพูดคุยแลกเปลี่ยนความคิดเห็นซึ่งกันและกัน', 'q4')}
          {renderRadioButtons('5. สมาชิกในครอบครัวสามารถอยู่ร่วมกับคนในชุมชนได้', 'q5')}

          <div>
            <p>คะแนนรวม: {totalScore}</p>
          </div>

          <div style={{display:'flex',justifyContent:'end'}}>
            <button
              disabled={isSubmitting}
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

export default Part8;