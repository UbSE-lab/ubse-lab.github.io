// 라이브러리
// 서비스
// 컴포넌트
// 섹션
// 아이콘
import { Github, PanelTop } from "lucide-react";
// 이미지
// 데이터
// import { progress, complete } from "./data";
// 스타일
import "./style.css";

import React, { useState, useEffect } from "react";
import { selectProjectDatas } from "@/models/Projects/ProjectGetApi";

export const progressData = async () => {
  try {
    const response = await selectProjectDatas(
      import.meta.env.VITE_PROGRESSPJ_URL
      // "/progress"
    );
    if (response.data.data.status === 200) {
      return response.data.data.data;
    } else {
      alert("프로젝트 불러오기 실패");
    }
  } catch (error) {
    alert("진행중인 프로젝트를 불러오는데 실패했습니다.");
  }
};

export const completeData = async () => {
  try {
    const response = await selectProjectDatas(
      import.meta.env.VITE_COMPLETEPJ_URL
      // "/complete"
    );
    if (response.data.data.status === 200) {
      return response.data.data.data;
    } else {
      alert("프로젝트 불러오기 실패");
    }
  } catch (error) {
    alert("완성된 프로젝트를 불러오는데 실패했습니다.");
  }
};

const ProjectPage = () => {
  const [progressPj, setprogressPj] = useState([]);
  const [completePj, setcompletePj] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setprogressPj(await progressData());
      setcompletePj(await completeData());
    };
    fetchData();
  }, []);

  return (
    <div id="projectPage" className="page">
      <div className="pageHeader">
        <div className="article">
          <h1 className="title">프로젝트</h1>
          <h3 className="subTitle">Projects</h3>
        </div>
      </div>
      <div className="article">
        <div className="projectContainer">
          <h1 className="title">
            진행중인 프로젝트
            <span>{progressPj.length}</span>
          </h1>
          <div className="projectWrap">
            {progressPj.map((data, idx) => (
              <ProjectItem
                thumb={data.thumb}
                name={data.name}
                desc={data.desc}
                start={data.start}
                end={data.end}
                leader={data.leader}
                member={data.member}
                link={data.link}
              />
            ))}
          </div>
        </div>
        <div className="projectContainer">
          <h1 className="title">
            완료된 프로젝트
            <span>{completePj.length}</span>
          </h1>
          <div className="projectWrap">
            {completePj.map((data, idx) => (
              <ProjectItem
                thumb={data.thumb}
                name={data.name}
                desc={data.desc}
                start={data.start}
                end={data.end}
                leader={data.leader}
                member={data.member}
                link={data.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectItem = ({
  thumb = null,
  name = "프로젝트명",
  desc = "프로젝트설명",
  start = "",
  end = "",
  leader = "프로젝트리더",
  member = [],
  link = [],
}) => {
  return (
    <div className="projectItem">
      <div className="thumb">
        <img src={thumb} alt={name} />
      </div>
      <div className="contentWrap">
        <h3 className="name">{name}</h3>
        <p className="period">
          {start} ~ {end}
        </p>
        <p className="desc">{desc}</p>
        <h6 className="subTitle">참여 연구원</h6>
        <ul className="memberWrap">
          <li className="member" key={`leader`}>
            <span className="name">{leader}</span>
            <span className="role">프로젝트 리더</span>
          </li>
          {member.map((m, idx) => (
            <li className="member" key={`member${idx}`}>
              <span className="name">{m.name}</span>
              <span className="role">{m.role}</span>
            </li>
          ))}
        </ul>
        <div className="linkWrap">
          {link.map((l, idx) => (
            <a href={l.url} key={`link${idx}`} target="_blank">
              {l.type === "git" ? <Github /> : <PanelTop />}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProjectPage;
