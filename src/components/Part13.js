import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Part13 = () => {
  const navigate = useNavigate();
  const [householdId, setHouseholdId] = useState('');

  // กลุ่มเป้าหมาย: เด็กและเยาวชน
  const [childBenefit, setChildBenefit] = useState(false);
  const [childSocialSecurity, setChildSocialSecurity] = useState(false);
  const [childProtectionFund, setChildProtectionFund] = useState(false);
  const [childFoster, setChildFoster] = useState(false);
  const [childCouncil, setChildCouncil] = useState(false);

  // กลุ่มเป้าหมาย: ผู้สูงอายุ
  const [elderlyAllowance, setElderlyAllowance] = useState(false);
  const [elderlyFund, setElderlyFund] = useState(false);
  const [elderlySupport, setElderlySupport] = useState(false);
  const [elderlyFuneral, setElderlyFuneral] = useState(false);
  const [elderlyHousing, setElderlyHousing] = useState(false);
  const [elderlyCareCenter, setElderlyCareCenter] = useState(false);
  const [elderlySchool, setElderlySchool] = useState(false);

  // กลุ่มเป้าหมาย: ผู้พิการ
  const [disabledCard, setDisabledCard] = useState(false);
  const [disabledAllowance, setDisabledAllowance] = useState(false);
  const [disabledLoan, setDisabledLoan] = useState(false);
  const [disabledHousing, setDisabledHousing] = useState(false);
  const [disabledEmployment, setDisabledEmployment] = useState(false);
  const [disabledAssistant, setDisabledAssistant] = useState(false);

  // กลุ่มเป้าหมาย: ผู้ป่วยติดเตียง
  const [bedriddenRehabilitation, setBedriddenRehabilitation] = useState(false);
  const [bedriddenLtc, setBedriddenLtc] = useState(false);
  const [bedriddenTransport, setBedriddenTransport] = useState(false);

  // กลุ่มเป้าหมาย: สตรีและครอบครัว
  const [womenOscc, setWomenOscc] = useState(false);
  const [womenFamilySupport, setWomenFamilySupport] = useState(false);
  const [womenFund, setWomenFund] = useState(false);
  const [womenGroup, setWomenGroup] = useState(false);

  // กลุ่มเป้าหมาย: ผู้ป่วยเอดส์
  const [aidsAllowance, setAidsAllowance] = useState(false);

  // กลุ่มเป้าหมาย: ทหารผ่านศึก
  const [veteranPension, setVeteranPension] = useState(false);
  const [veteranFamilySupport1, setVeteranFamilySupport1] = useState(false);
  const [veteranSupport234, setVeteranSupport234] = useState(false);
  const [veteranVisit, setVeteranVisit] = useState(false);

  // กลุ่มเป้าหมาย: ประชาชนทั่วไป
  const [publicHealthcare, setPublicHealthcare] = useState(false);
  const [publicSocialSecurity, setPublicSocialSecurity] = useState(false);
  const [publicVocational, setPublicVocational] = useState(false);
  const [publicEducation, setPublicEducation] = useState(false);
  const [publicNsf, setPublicNsf] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        assessment_date: new Date().toISOString().split('T')[0], // ใช้วันที่ปัจจุบัน
        // กลุ่มเป้าหมาย: เด็กและเยาวชน
        child_benefit: childBenefit,
        child_social_security: childSocialSecurity,
        child_protection_fund: childProtectionFund,
        child_foster: childFoster,
        child_council: childCouncil,
        // กลุ่มเป้าหมาย: ผู้สูงอายุ
        elderly_allowance: elderlyAllowance,
        elderly_fund: elderlyFund,
        elderly_support: elderlySupport,
        elderly_funeral: elderlyFuneral,
        elderly_housing: elderlyHousing,
        elderly_care_center: elderlyCareCenter,
        elderly_school: elderlySchool,
        // กลุ่มเป้าหมาย: ผู้พิการ
        disabled_card: disabledCard,
        disabled_allowance: disabledAllowance,
        disabled_loan: disabledLoan,
        disabled_housing: disabledHousing,
        disabled_employment: disabledEmployment,
        disabled_assistant: disabledAssistant,
        // กลุ่มเป้าหมาย: ผู้ป่วยติดเตียง
        bedridden_rehabilitation: bedriddenRehabilitation,
        bedridden_ltc: bedriddenLtc,
        bedridden_transport: bedriddenTransport,
        // กลุ่มเป้าหมาย: สตรีและครอบครัว
        women_oscc: womenOscc,
        women_family_support: womenFamilySupport,
        women_fund: womenFund,
        women_group: womenGroup,
        // กลุ่มเป้าหมาย: ผู้ป่วยเอดส์
        aids_allowance: aidsAllowance,
        // กลุ่มเป้าหมาย: ทหารผ่านศึก
        veteran_pension: veteranPension,
        veteran_family_support_1: veteranFamilySupport1,
        veteran_support_234: veteranSupport234,
        veteran_visit: veteranVisit,
        // กลุ่มเป้าหมาย: ประชาชนทั่วไป
        public_healthcare: publicHealthcare,
        public_social_security: publicSocialSecurity,
        public_vocational: publicVocational,
        public_education: publicEducation,
        public_nsf: publicNsf,
      };

      const response = await axios.post('http://localhost:3000/api/household-social-welfare', data);
      console.log('Data sent successfully:', response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: '#789DBC', margin: 0, height: '70px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.03rem', fontWeight: 'bold' }}>
        ส่วนที่ 3 - การเข้าถึงและสวัสดิการสังคมที่ได้รับ
      </div>
      <div style={{ padding: '10px 30px 10px 30px' }}>
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

          <h3>1. กลุ่มเป้าหมาย เด็กและเยาวชน
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={childBenefit}
                onChange={(e) => setChildBenefit(e.target.checked)}
              />
              เงินอุดหนุนเด็กแรกเกิด
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={childSocialSecurity}
                onChange={(e) => setChildSocialSecurity(e.target.checked)}
              />
              เงินสงเคราะห์เด็กยากจน
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={childProtectionFund}
                onChange={(e) => setChildProtectionFund(e.target.checked)}
              />
              เงินกองทุนคุ้มครองเด็ก
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={childFoster}
                onChange={(e) => setChildFoster(e.target.checked)}
              />
              เงินสงเคราะห์เลี้ยงดูเด็กในครอบครัวอุปถัมภ์
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={childCouncil}
                onChange={(e) => setChildCouncil(e.target.checked)}
              />
              สภาเด็กและเยาวชน
            </label>
          </div>

          <h3>2. กลุ่มเป้าหมาย ผู้สูงอายุ
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlyAllowance}
                onChange={(e) => setElderlyAllowance(e.target.checked)}
              />
              เงินเบี้ยยังชีพผู้สูงอายุ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlyFund}
                onChange={(e) => setElderlyFund(e.target.checked)}
              />
              กองทุนผู้สูงอายุ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlySupport}
                onChange={(e) => setElderlySupport(e.target.checked)}
              />
              สนับสนุนการดูแลผู้สูงอายุ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlyFuneral}
                onChange={(e) => setElderlyFuneral(e.target.checked)}
              />
              เงินช่วยเหลือค่าจัดงานศพผู้สูงอายุ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlyHousing}
                onChange={(e) => setElderlyHousing(e.target.checked)}
              />
              ที่อยู่อาศัยสำหรับผู้สูงอายุ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlyCareCenter}
                onChange={(e) => setElderlyCareCenter(e.target.checked)}
              />
              ศูนย์ดูแลผู้สูงอายุ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={elderlySchool}
                onChange={(e) => setElderlySchool(e.target.checked)}
              />
              โรงเรียนผู้สูงอายุ
            </label>
          </div>

          <h3>3. กลุ่มเป้าหมาย ผู้พิการ
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disabledCard}
                onChange={(e) => setDisabledCard(e.target.checked)}
              />
              บัตรผู้พิการ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disabledAllowance}
                onChange={(e) => setDisabledAllowance(e.target.checked)}
              />
              เงินเบี้ยยังชีพผู้พิการ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disabledLoan}
                onChange={(e) => setDisabledLoan(e.target.checked)}
              />
              สินเชื่อสำหรับผู้พิการ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disabledHousing}
                onChange={(e) => setDisabledHousing(e.target.checked)}
              />
              ที่อยู่อาศัยสำหรับผู้พิการ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disabledEmployment}
                onChange={(e) => setDisabledEmployment(e.target.checked)}
              />
              การจ้างงานผู้พิการ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={disabledAssistant}
                onChange={(e) => setDisabledAssistant(e.target.checked)}
              />
              ผู้ช่วยเหลือผู้พิการ
            </label>
          </div>

          <h3>4. กลุ่มเป้าหมาย ผู้ป่วยติดเตียง
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={bedriddenRehabilitation}
                onChange={(e) => setBedriddenRehabilitation(e.target.checked)}
              />
              บริการฟื้นฟูสมรรถภาพ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={bedriddenLtc}
                onChange={(e) => setBedriddenLtc(e.target.checked)}
              />
              บริการดูแลระยะยาว (LTC)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={bedriddenTransport}
                onChange={(e) => setBedriddenTransport(e.target.checked)}
              />
              บริการขนส่งผู้ป่วยติดเตียง
            </label>
          </div>

          <h3>5. กลุ่มเป้าหมาย สตรีและครอบครัว
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={womenOscc}
                onChange={(e) => setWomenOscc(e.target.checked)}
              />
              ศูนย์พัฒนาครอบครัว (OSCC)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={womenFamilySupport}
                onChange={(e) => setWomenFamilySupport(e.target.checked)}
              />
              เงินสนับสนุนครอบครัว
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={womenFund}
                onChange={(e) => setWomenFund(e.target.checked)}
              />
              กองทุนสตรี
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={womenGroup}
                onChange={(e) => setWomenGroup(e.target.checked)}
              />
              กลุ่มสตรี
            </label>
          </div>

          <h3>6. กลุ่มเป้าหมาย ผู้ป่วยเอดส์
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={aidsAllowance}
                onChange={(e) => setAidsAllowance(e.target.checked)}
              />
              เบี้ยผู้ป่วยเอดส์
            </label>
          </div>

          <h3>7. กลุ่มเป้าหมาย ทหารผ่านศึก
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={veteranPension}
                onChange={(e) => setVeteranPension(e.target.checked)}
              />
              บำเหน็จบำนาญทหารผ่านศึก
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={veteranFamilySupport1}
                onChange={(e) => setVeteranFamilySupport1(e.target.checked)}
              />
              เงินสนับสนุนครอบครัวทหารผ่านศึก (ประเภท 1)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={veteranSupport234}
                onChange={(e) => setVeteranSupport234(e.target.checked)}
              />
              เงินสนับสนุนทหารผ่านศึก (ประเภท 2, 3, 4)
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={veteranVisit}
                onChange={(e) => setVeteranVisit(e.target.checked)}
              />
              การเยี่ยมเยียนทหารผ่านศึก
            </label>
          </div>

          <h3>8. กลุ่มเป้าหมาย ประชาชนทั่วไป
          สวัสดิการสังคมที่ได้รับ</h3>
          <div>
            <label>
              <input
                type="checkbox"
                checked={publicHealthcare}
                onChange={(e) => setPublicHealthcare(e.target.checked)}
              />
              บริการสุขภาพพื้นฐาน
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={publicSocialSecurity}
                onChange={(e) => setPublicSocialSecurity(e.target.checked)}
              />
              ประกันสังคม
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={publicVocational}
                onChange={(e) => setPublicVocational(e.target.checked)}
              />
              การฝึกอาชีพ
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={publicEducation}
                onChange={(e) => setPublicEducation(e.target.checked)}
              />
              การศึกษาขั้นพื้นฐาน
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={publicNsf}
                onChange={(e) => setPublicNsf(e.target.checked)}
              />
              กองทุนสวัสดิการชุมชน (NSF)
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <button
              type="submit"
              style={{
                width: '90px',
                height: '40px',
                padding: '0px',
                color: 'black',
                border: 'none',
                borderRadius: '22px',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'background 0.3s',
                marginTop: '40px',
                backgroundColor: '#FFE3E3',
              }}
            >
              เสร็จสิ้น
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Part13;