// 라이브러리
// 서비스
// 컴포넌트
// 섹션
// 아이콘
// 이미지
// 데이터
import { selectMemberDatas } from "@/models/Member/MemberGetApi";
// import { professor, undergraduate, graduate } from "./data";
// 스타일
import "./style.css";
import React, { useState, useEffect } from "react";

export const professorDatas = async () => {
  console.log(import.meta.env.VITE_PROFESSOR_URL);
  try {
    const response = await selectMemberDatas(
      import.meta.env.VITE_PROFESSOR_URL
    );
    if (response.data.data) {
      return [response.data.data];
    } else {
      alert("조회 실패!");
      return [];
    }
  } catch (error) {
    console.log(error);
    alert("교수님 프로필을 불러오는데 실패했습니다.");
    return [];
  }
};

export const undergraduateDatas = async () => {
  try {
    const response = await selectMemberDatas(
      import.meta.env.VITE_UNDERGRADUATE_URL
    );
    if (response.status === 200) {
      return response.data.data.data;
    } else {
      alert("조회 실패!");
      return [];
    }
  } catch (error) {
    console.log(error);
    alert("학부생 프로필을 불러오는데 실패했습니다.");
    return [];
  }
};

export const graduateDatas = async () => {
  try {
    const response = await selectMemberDatas(import.meta.env.VITE_GRADUATE_URL);
    if (response.data.data.status === 200) {
      console.log(response.data.data.data);
      return response.data.data.data;
    } else {
      alert("조회 실패!");
      return [];
    }
  } catch (error) {
    alert("졸업생 프로필을 불러오는데 실패했습니다.");
    return [];
  }
};

const MemberPage = () => {
  const [professorData, setProfessorData] = useState([]);
  const [undergraduateData, setUndergraduateData] = useState([]);
  const [graduateData, setGraduateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setProfessorData(await professorDatas());
      setUndergraduateData(await undergraduateDatas());
      setGraduateData(await graduateDatas());
    };
    fetchData();
  }, []);

  return (
    <div id="memberPage" className="page">
      <div className="pageHeader">
        <div className="article">
          <h1 className="title">구성원</h1>
          <h3 className="subTitle">Members</h3>
        </div>
      </div>
      <div className="article">
        {/* 교수 */}
        <div className="memberContainer">
          <h1 className="title">
            교수<span>{professorData.length}</span>
          </h1>
          <div className="memberWrap">
            {professorData.map((data, idx) => (
              <ProfessorItem
                key={idx}
                profile={data.profile}
                name={data.name}
                email={data.email}
                field={data.field}
              />
            ))}
          </div>
        </div>
        {/* 필요시 사용! */}
        {/* 대학원생(박사) */}
        {/* <div className="memberContainer ">
                    <h1 className="title">박사과정</h1>
                    <div className="memberWrap"></div>
                </div> */}
        {/* 대학원생(석사) */}
        {/* <div className="memberContainer">
                    <h1 className="title">석사과정</h1>
                    <div className="memberWrap"></div>
                </div> */}
        {/* 학부생 */}
        <div className="memberContainer">
          <h1 className="title">
            학부생
            <span>{undergraduateData.length}</span>
          </h1>
          <div className="memberWrap">
            {undergraduateData.map((data, idx) => (
              <UndergraduateItem
                key={idx}
                id={data.id}
                profile={data.profile}
                name={data.name}
                email={data.email}
                field={data.field}
              />
            ))}
          </div>
        </div>
        {/* 졸업생 */}
        <div className="memberContainer">
          <h1 className="title">
            졸업생
            <span>{graduateData.length}</span>
          </h1>
          <div className="memberWrap">
            {graduateData.map((data, idx) => (
              <GraduateItem
                key={idx}
                id={data.id}
                graduated={data.graduated_date}
                name={data.name}
                email={data.email}
                company={data.company}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfessorItem = ({
  profile = null,
  name = "이름",
  email = "이메일",
  field = ["연구분야"],
}) => {
  return (
    <div className="memberItem">
      <img className="profile" src={profile} alt={name} />
      <h3 className="name">{name}</h3>
      <p className="email">{email}</p>
      <h6 className="subTitle">연구분야</h6>
      <ul className="fieldWrap">
        {field.map((f, idx) => (
          <li className="field" key={idx}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

const UndergraduateItem = ({
  id = 0,
  profile = null,
  name = "이름",
  email = "이메일",
  field = ["연구분야"],
}) => {
  return (
    <div className="memberItem">
      <img className="profile" src={profile} alt={name} />
      <h3 className="name">{name}</h3>
      <p className="email">{email}</p>
      <h6 className="subTitle">관심분야</h6>
      <ul className="fieldWrap">
        {field.map((f, idx) => (
          <li className="field" key={idx}>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

const GraduateItem = ({
  id = 0,
  graduated = 0,
  name = "이름",
  email = "이메일",
  company = "회사",
}) => {
  return (
    <div className="memberItem">
      <h3 className="name">
        {name}
        <span>{graduated}년 졸업</span>
      </h3>
      <p className="email">{email}</p>
      <p className="company">{company}</p>
    </div>
  );
};

export default MemberPage;
