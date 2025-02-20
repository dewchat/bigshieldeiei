import React, { useState } from "react";

const Part4 = ({ onNext }) => {
  const [members, setMembers] = useState([]); // เก็บรายการสมาชิกทั้งหมด
  const [currentMember, setCurrentMember] = useState({
    id: Date.now(),
    number: "",
    idNumber: "",
    fullName: "",
    birthDate: "",
    age: "",
    gender: "",
    relationship: "",
    occupation: "",
    monthlyIncome: "",
    normal: false,
    disabled: false,
    chronicIllness: false,
    bedridden: false,
    selfHelp: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  // อัปเดตข้อมูลสมาชิกปัจจุบัน
  const handleInputChange = (field, value) => {
    setCurrentMember({ ...currentMember, [field]: value });
  };

  // รีเซ็ตฟอร์มสมาชิกปัจจุบัน
  const resetForm = () => {
    setCurrentMember({
      id: Date.now(),
      number: "",
      idNumber: "",
      fullName: "",
      birthDate: "",
      age: "",
      gender: "",
      relationship: "",
      occupation: "",
      monthlyIncome: "",
      normal: false,
      disabled: false,
      chronicIllness: false,
      bedridden: false,
      selfHelp: "",
      note: "",
    });
  };

  // เพิ่มสมาชิกใหม่
  const addMember = () => {
    setMembers([...members, currentMember]);
    resetForm();
  };

  // ส่งข้อมูลสมาชิกทีละคน
  const sendMemberData = async (member) => {
    const dataToSend = {
      household_id: 1,
      national_id: member.idNumber,
      first_name: member.fullName?.split(" ")[0],
      last_name: member.fullName?.split(" ")[1],
      birth_date: member.birthDate,
      gender: member.gender,
      relationship: member.relationship,
      occupation: member.occupation,
      monthly_income: member.monthlyIncome,
      physical_status: member.disabled
        ? "disabled"
        : member.chronicIllness
        ? "chronically_ill"
        : member.bedridden
        ? "bedridden"
        : member.normal
        ? "normal"
        : "unknown",
      self_care: member.selfHelp === "ได้",
      is_respondent: member.note || "",
    };

    const response = await fetch("http://localhost:3000/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error(`เกิดข้อผิดพลาดในการส่งข้อมูลสมาชิก: ${response.statusText}`);
    }

    return response.json();
  };

  // ส่งข้อมูลสมาชิกทั้งหมดทีละคน
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      // วนลูปส่งข้อมูลสมาชิกทีละคน
      const results = await Promise.all(
        members.map((member) => sendMemberData(member))
      );

      if (results.length === members.length) {
        setStatusMessage("ข้อมูลถูกบันทึกสำเร็จ!");
        setIsDataSubmitted(true);
        setMembers([]); // รีเซ็ตรายการสมาชิกหลังจากส่งข้อมูลสำเร็จ
      }
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage("เกิดข้อผิดพลาดในการส่งข้อมูล");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ไปยังส่วนถัดไป
  const handleNextPart = () => {
    setIsDataSubmitted(false);
    onNext();
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: "#789DBC",
          margin: 0,
          height: "70px",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        ส่วนที่ 1 - ข้อมูลทั่วไปของครัวเรือน
      </div>

      <div style={{ padding: "10px 30px 10px 30px" }}>
        <div>
          <h3>4. สมาชิกในครอบครัว</h3>
          <p>(ผู้ที่อาศัยอยู่จริงในปัจจุบัน)</p>
        </div>

        {/* แสดงรายการสมาชิกที่เพิ่มเข้ามา */}
        {members.map((member, index) => (
          <div
            key={member.id}
            style={{
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <p>
              <strong>ที่:</strong> {member.number}
            </p>
            <p>
              <strong>เลขบัตรประชาชน:</strong> {member.idNumber}
            </p>
            <p>
              <strong>ชื่อ - สกุล:</strong> {member.fullName}
            </p>
            <p>
              <strong>วัน/เดือน/ปีเกิด:</strong> {member.birthDate}
            </p>
            <p>
              <strong>อายุ:</strong> {member.age}
            </p>
            <p>
              <strong>เพศ:</strong> {member.gender}
            </p>
            <p>
              <strong>ลักษณะความสัมพันธ์:</strong> {member.relationship}
            </p>
            <p>
              <strong>อาชีพ:</strong> {member.occupation}
            </p>
            <p>
              <strong>รายได้ต่อเดือน:</strong> {member.monthlyIncome}
            </p>
            <p>
              <strong>สภาพร่างกาย:</strong>{" "}
              {member.normal ? "ปกติ " : ""}
              {member.disabled ? "พิการ " : ""}
              {member.chronicIllness ? "ป่วยเรื้อรัง " : ""}
              {member.bedridden ? "ติดเตียง" : ""}
            </p>
            <p>
              <strong>ช่วยเหลือตนเอง:</strong> {member.selfHelp}
            </p>
            <p>
              <strong>หมายเหตุ:</strong> {member.note}
            </p>
          </div>
        ))}

        {/* ฟอร์มกรอกข้อมูลสมาชิก */}
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <label>ที่</label>
            <input
              type="text"
              value={currentMember.number || ""}
              onChange={(e) => handleInputChange("number", e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                height: "26px",
                padding: "4px 7px 4px 10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <label>เลขบัตรประชาชน</label>
            <input
              type="text"
              value={currentMember.idNumber || ""}
              onChange={(e) => handleInputChange("idNumber", e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                height: "26px",
                padding: "4px 7px 4px 10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <label>ชื่อ - สกุล</label>
            <input
              type="text"
              value={currentMember.fullName || ""}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                height: "26px",
                padding: "4px 7px 4px 10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "0.8rem", flexDirection: "column" }}>
              <label>วัน/เดือน/ปีเกิด</label>
              <input
                type="date"
                value={currentMember.birthDate || ""}
                onChange={(e) => handleInputChange("birthDate", e.target.value)}
                style={{
                  width: "160px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  height: "26px",
                  padding: "4px 7px 4px 10px",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "0.8rem", flexDirection: "column" }}>
              <label>อายุ</label>
              <input
                type="number"
                value={currentMember.age || ""}
                onChange={(e) => handleInputChange("age", e.target.value)}
                style={{
                  width: "160px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  height: "26px",
                  padding: "4px 7px 4px 10px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "0.8rem", flexDirection: "column" }}>
              <label>เพศ</label>
              <input
                type="text"
                value={currentMember.gender || ""}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                style={{
                  width: "160px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  height: "26px",
                  padding: "4px 7px 4px 10px",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "0.8rem", flexDirection: "column" }}>
              <label>ลักษณะความสัมพันธ์</label>
              <input
                type="text"
                value={currentMember.relationship || ""}
                onChange={(e) => handleInputChange("relationship", e.target.value)}
                style={{
                  width: "160px",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  height: "26px",
                  padding: "4px 7px 4px 10px",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <label>อาชีพ</label>
            <input
              type="text"
              value={currentMember.occupation || ""}
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                height: "26px",
                padding: "4px 7px 4px 10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexDirection: "column",
              marginBottom: "10px",
            }}
          >
            <label>รายได้ต่อเดือน</label>
            <input
              type="number"
              value={currentMember.monthlyIncome || ""}
              onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                height: "26px",
                padding: "4px 7px 4px 10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.8rem",
            }}
          >
            <label>สภาพร่างกาย</label>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={currentMember.normal || false}
                  onChange={(e) => handleInputChange("normal", e.target.checked)}
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                ปกติ
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={currentMember.disabled || false}
                  onChange={(e) => handleInputChange("disabled", e.target.checked)}
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                พิการ
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={currentMember.chronicIllness || false}
                  onChange={(e) => handleInputChange("chronicIllness", e.target.checked)}
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                ป่วยเรื้อรัง
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={currentMember.bedridden || false}
                  onChange={(e) => handleInputChange("bedridden", e.target.checked)}
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                ติดเตียง
              </label>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.8rem",
              marginTop: "10px",
            }}
          >
            <label>ช่วยเหลือตนเอง</label>
            <div style={{ display: "flex", gap: "6rem" }}>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="selfHelp"
                  value="ได้"
                  checked={currentMember.selfHelp === "ได้"}
                  onChange={(e) => handleInputChange("selfHelp", e.target.value)}
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                ได้
              </label>
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="selfHelp"
                  value="ไม่ได้"
                  checked={currentMember.selfHelp === "ไม่ได้"}
                  onChange={(e) => handleInputChange("selfHelp", e.target.value)}
                  style={{ width: "20px", height: "20px", marginRight: "5px" }}
                />
                ไม่ได้
              </label>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.8rem",
              flexDirection: "column",
              marginBottom: "10px",
              marginTop: "0.8rem",
            }}
          >
            <label>หมายเหตุ</label>
            <input
              type="text"
              value={currentMember.note || ""}
              onChange={(e) => handleInputChange("note", e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                height: "26px",
                padding: "4px 7px 4px 10px",
              }}
            />
          </div>

          {statusMessage && (
            <p style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
              {statusMessage}
            </p>
          )}

          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button
              type="button"
              onClick={addMember}
              style={{
                width: "120px",
                height: "40px",
                backgroundColor: "#D3E4CD",
                color: "black",
                border: "none",
                borderRadius: "22px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              เพิ่มสมาชิก +
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "90px",
                height: "40px",
                backgroundColor: isSubmitting ? "#ccc" : "#D3E4CD",
                color: "black",
                border: "none",
                borderRadius: "22px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: isSubmitting ? "not-allowed" : "pointer",
              }}
            >
              {isSubmitting ? "กำลังส่งข้อมูล..." : "ส่งข้อมูล"}
            </button>
          </div>
        </form>

        {isDataSubmitted && (
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button
              onClick={handleNextPart}
              style={{
                width: "90px",
                height: "40px",
                backgroundColor: "#D3E4CD",
                color: "black",
                border: "none",
                borderRadius: "22px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                marginTop: "40px",
              }}
            >
              ถัดไป
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Part4;