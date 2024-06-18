import { useState } from "react";
import axios from "axios";
import "./style.css";

const Dialog = () => {
  return <div className="dialog"></div>;
};

const createUndergraduate = async (data) => {
  try {
    console.log("입력값: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("field", data.field.join("/"));
    if (data.profile) {
      formData.append("profile", data.profile);
    }

    const response = await axios.post(
      import.meta.env.VITE_UNDERGRADUATE_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // withCredentials: true,
      }
    );
    console.log("학부생 등록값:", response.data);
    alert("학부생 등록 성공!");
    return response.data;
  } catch (error) {
    console.error("등록 실패:", error);
    alert("학부생 등록을 실패하였습니다.");
  }
};

const createGraduate = async (data) => {
  try {
    console.log("입력값: ", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("graduated", data.graduated);
    formData.append("company", data.company);

    const response = await axios.post(
      import.meta.env.VITE_GRADUATE_URL,
      formData,
      {
        baseURL: import.meta.env.VITE_API_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      }
    );
    console.log("졸업생 등록값:", response.data);
    alert("졸업생 등록 성공!");
    return response.data;
  } catch (error) {
    console.error("등록 실패:", error);
    alert("졸업생 등록을 실패하였습니다.");
  }
};

const deleteUndergraduate = async (data) => {
  try {
    console.log(data.id);
    const response = await axios.delete(
      import.meta.env.VITE_UNDERGRADUATE_URL,
      {
        params: {
          id: data.id,
        },
        baseURL: import.meta.env.VITE_API_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      }
    );
    alert("학부생 삭제 성공!");
    return response.data;
  } catch (error) {
    console.error("삭제 실패:", error);
    alert("학부생 삭제를 실패하였습니다.");
  }
};

const deleteGraduate = async (data) => {
  try {
    console.log(data.id);
    const response = await axios.delete(import.meta.env.VITE_GRADUATE_URL, {
      params: {
        id: data.id,
      },
      baseURL: import.meta.env.VITE_API_ORIGIN,
      headers: {
        "Content-Type": "application/json",
      },
      // withCredentials: true,
    });
    alert("졸업생 삭제 성공!");
    return response.data;
  } catch (error) {
    console.error("삭제 실패:", error);
    alert("졸업생 삭제를 실패하였습니다.");
  }
};

const updateProfessor = async (data) => {
  try {
    console.log(data);
    const response = await axios.patch(
      import.meta.env.VITE_PROFESSOR_URL,
      data,
      {
        baseURL: import.meta.env.VITE_API_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      }
    );
    console.log("교수 수정값:", response.data);
    alert("교수 수정 성공!");
    return response.data;
  } catch (error) {
    console.error("수정 실패:", error);
    alert("교수 수정을 실패하였습니다.");
  }
};

const updateUndergraduate = async (data) => {
  try {
    console.log(data);
    const response = await axios.patch(
      import.meta.env.VITE_UNDERGRADUATE_URL,
      data,
      {
        baseURL: import.meta.env.VITE_API_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      }
    );
    console.log("학부생 수정값:", response.data);
    alert("학부생 수정 성공!");
    return response.data;
  } catch (error) {
    console.error("수정 실패:", error);
    alert("학부생 수정을 실패하였습니다.");
  }
};

const updateGraduate = async (data) => {
  try {
    console.log(data);
    const response = await axios.patch(
      import.meta.env.VITE_GRADUATE_URL,
      data,
      {
        baseURL: import.meta.env.VITE_API_ORIGIN,
        headers: {
          "Content-Type": "application/json",
        },
        // withCredentials: true,
      }
    );
    console.log("졸업생 수정값:", response.data);
    alert("졸업생 수정 성공!");
    return response.data;
  } catch (error) {
    console.error("수정 실패:", error);
    alert("졸업생 수정을 실패하였습니다.");
  }
};

const MemberCreateDialog = ({ trigger, type = "", refreshData }) => {
  const [memberType, setMemberType] = useState(type);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [field, setField] = useState("");
  const [graduated, setGraduated] = useState(2024);
  const [company, setCompany] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState(null);

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleProfileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const commonData = {
      name,
      email,
    };

    try {
      if (memberType === "professor") {
        alert("교수님이 나말고 누가 있니~~~~????");
      } else if (memberType === "undergraduate") {
        await createUndergraduate({
          ...commonData,
          profile: profile,
          field: field.split("/"),
        });
      } else if (memberType === "graduate") {
        await createGraduate({
          ...commonData,
          graduated,
          company,
        });
      }
      trigger(false);
      refreshData();
    } catch (error) {
      console.error("등록 실패:", error);
    }
  };

  return (
    <div className="dialogWrap" onClick={() => trigger(false)}>
      <div
        className="dialog member create"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialogHeader">
          <h1>구성원 추가</h1>
          <p>연구실 구성원을 추가합니다.</p>
        </div>
        <div className="dialogBody">
          <div className="dialogGroup type">
            <h3>구성원 타입</h3>
            <select
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
            >
              <option value="professor">교수</option>
              <option value="undergraduate">학부생</option>
              <option value="graduate">졸업생</option>
            </select>
          </div>
          <div className="dialogGroup name">
            <h3>이름</h3>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="dialogGroup email">
            <h3>이메일</h3>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          {memberType !== "graduate" && (
            <div className="dialogGroup field">
              <h3>연구/관심분야</h3>
              <input
                type="text"
                name="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="연구/관심분야를 입력하세요 ('/'로 구분)"
              />
            </div>
          )}
          {memberType === "graduate" && (
            <>
              <div className="dialogGroup graduate">
                <h3>졸업년도</h3>
                <input
                  type="number"
                  name="graduate"
                  value={graduated}
                  onChange={(e) => setGraduated(e.target.value)}
                  placeholder="졸업년도를 입력하세요"
                />
              </div>
              <div className="dialogGroup field">
                <h3>회사</h3>
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="회사를 입력하세요"
                />
              </div>
            </>
          )}
          {(memberType === "professor" || memberType === "undergraduate") && (
            <div className="dialogGroup profileImage">
              <h3>프로필 이미지</h3>
              <input
                type="file"
                onChange={
                  memberType === "professor"
                    ? handleImageChange
                    : handleProfileChange
                }
                required
              />
            </div>
          )}
        </div>
        <div className="dialogFooter">
          <button onClick={() => trigger(false)}>취소</button>
          <button onClick={handleSubmit}>추가</button>
        </div>
      </div>
    </div>
  );
};

const MemberUpdateDialog = ({ trigger, type = "", target, refreshData }) => {
  const [name, setName] = useState(target.name || "");
  const [email, setEmail] = useState(target.email || "");
  const [field, setField] = useState(
    Array.isArray(target.field) ? target.field.join("/") : ""
  );
  const [graduated, setGraduated] = useState(target.graduated || 0);
  const [company, setCompany] = useState(target.company || "");

  const handleSubmit = async () => {
    const commonData = {
      name,
      email,
    };
    try {
      if (type === "professor") {
        await updateProfessor({
          ...commonData,
          field: field.split("/"),
        });
      } else if (type === "undergraduate") {
        await updateUndergraduate({
          ...commonData,
          id: target.id,
          field: field.split("/"),
        });
      } else if (type === "graduate") {
        await updateGraduate({
          ...commonData,
          id: target.id,
          graduated,
          company,
        });
      }
      trigger(false);
      refreshData();
    } catch (error) {
      console.error("수정 실패:", error);
    }
  };

  return (
    <div className="dialogWrap" onClick={() => trigger(false)}>
      <div
        className="dialog member update"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialogHeader">
          <h1>구성원 정보 수정</h1>
          <p>연구실 구성원의 정보를 수정합니다.</p>
        </div>
        <div className="dialogBody">
          <div className="dialogGroup name">
            <h3>이름</h3>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>
          <div className="dialogGroup email">
            <h3>이메일</h3>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          {type !== "graduate" && (
            <div className="dialogGroup field">
              <h3>연구/관심분야</h3>
              <input
                type="text"
                name="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="연구/관심분야를 입력하세요 ('/'로 구분)"
              />
            </div>
          )}
          {type === "graduate" && (
            <>
              <div className="dialogGroup graduate">
                <h3>졸업년도</h3>
                <input
                  type="number"
                  name="graduate"
                  value={graduated}
                  onChange={(e) => setGraduated(e.target.value)}
                  placeholder="졸업년도를 입력하세요"
                />
              </div>
              <div className="dialogGroup field">
                <h3>회사</h3>
                <input
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="회사를 입력하세요"
                />
              </div>
            </>
          )}
        </div>
        <div className="dialogFooter">
          <button onClick={() => trigger(false)}>취소</button>
          <button onClick={handleSubmit}>수정</button>
        </div>
      </div>
    </div>
  );
};

const MemberDeleteDialog = ({ trigger, target, refreshData, type }) => {
  const handleDelete = async () => {
    try {
      if (type === "professor") {
        alert("히이이이이익!!!! 누굴 삭제하려고하니~~~~!!!!!!!!!!!!!");
      } else if (type === "undergraduate") {
        await deleteUndergraduate(target);
      } else if (type === "graduate") {
        await deleteGraduate(target);
      }
      trigger(false);
      refreshData();
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  return (
    <div className="dialogWrap" onClick={() => trigger(false)}>
      <div
        className="dialog member delete"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dialogHeader">
          <h1>구성원 삭제</h1>
          <p>연구실 구성원을 삭제합니다.</p>
        </div>
        <div className="dialogBody">
          <div className="dialogGroup target">
            <p>
              <strong>{target.name}</strong>을(를) 삭제하시겠습니까?
            </p>
          </div>
        </div>
        <div className="dialogFooter">
          <button onClick={() => trigger(false)}>취소</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      </div>
    </div>
  );
};

export { Dialog, MemberCreateDialog, MemberUpdateDialog, MemberDeleteDialog };
