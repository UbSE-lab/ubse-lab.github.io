import { useState, useEffect } from "react";
import {
  MemberCreateDialog,
  MemberUpdateDialog,
  MemberDeleteDialog,
} from "@/components/dialog/component";
import { Pen, Plus, Trash2 } from "lucide-react";
import {
  professorDatas,
  undergraduateDatas,
  graduateDatas,
} from "../member/page";
import "./style.css";

const dataForm = {
  name: "",
  email: "",
  field: [],
  graduated: 0,
  company: "",
  id: "",
};

const ManageMemberPage = () => {
  const [createPopUp, setCreatePopUp] = useState(false);
  const [updatePopUp, setUpdatePopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [memberType, setMemberType] = useState("");
  const [target, setTarget] = useState(dataForm);

  const [professorData, setProfessorData] = useState([]);
  const [undergraduateData, setUndergraduateData] = useState([]);
  const [graduateData, setGraduateData] = useState([]);

  const manageProfessorDatas = async () => {
    setProfessorData(await professorDatas());
  };
  const manageUndergraduateDatas = async () => {
    setUndergraduateData(await undergraduateDatas());
  };
  const manageGraduateDatas = async () => {
    setGraduateData(await graduateDatas());
  };

  useEffect(() => {
    manageProfessorDatas();
    manageUndergraduateDatas();
    manageGraduateDatas();
  }, []);

  const createMember = (type) => {
    setMemberType(type);
    setCreatePopUp(true);
  };

  const refreshData = async () => {
    await manageProfessorDatas();
    await manageUndergraduateDatas();
    await manageGraduateDatas();
  };

  const deleteMember = (type, member) => {
    setMemberType(type);
    setTarget(member);
    setDeletePopUp(true);
  };

  const updateMember = (type, member) => {
    setMemberType(type);
    setTarget(member);
    setUpdatePopUp(true);
  };

  return (
    <div id="manageMemberPage" className="page">
      <div className="memberContainer">
        <div className="headerWrap">
          <h1 className="title">
            교수<span>{professorData.length}</span>
          </h1>
          <div className="funcWrap">
            <button
              onClick={() => {
                createMember("professor");
              }}
            >
              <Plus />
              추가
            </button>
          </div>
        </div>
        <div className="memberWrap">
          {professorData.map((data, idx) => (
            <ProfessorItem
              key={idx}
              profile={data.profile}
              name={data.name}
              email={data.email}
              field={data.field}
              setUpdate={() => updateMember("professor", data)}
              setDelete={() => deleteMember("professor", data)}
              setTarget={setTarget}
            />
          ))}
        </div>
      </div>
      <div className="memberContainer">
        <div className="headerWrap">
          <h1 className="title">
            학부생
            <span>{undergraduateData.length}</span>
          </h1>
          <div className="funcWrap">
            <button
              onClick={() => {
                createMember("undergraduate");
              }}
            >
              <Plus />
              추가
            </button>
          </div>
        </div>
        <div className="memberWrap">
          {undergraduateData.map((data, idx) => (
            <UndergraduateItem
              key={idx}
              profile={data.profile}
              name={data.name}
              email={data.email}
              field={data.field}
              id={data.id}
              setUpdate={() => updateMember("undergraduate", data)}
              setDelete={() => deleteMember("undergraduate", data)}
              setTarget={setTarget}
            />
          ))}
        </div>
      </div>
      <div className="memberContainer">
        <div className="headerWrap">
          <h1 className="title">
            졸업생
            <span>{graduateData.length}</span>
          </h1>
          <div className="funcWrap">
            <button
              onClick={() => {
                createMember("graduate");
              }}
            >
              <Plus />
              추가
            </button>
          </div>
        </div>
        <div className="memberWrap">
          {graduateData.map((data, idx) => (
            <GraduateItem
              key={idx}
              graduated={data.graduated_date}
              name={data.name}
              email={data.email}
              company={data.company}
              id={data.id}
              setUpdate={() => updateMember("graduate", data)}
              setDelete={() => deleteMember("graduate", data)}
              setTarget={setTarget}
            />
          ))}
        </div>
      </div>
      {createPopUp && (
        <MemberCreateDialog
          trigger={setCreatePopUp}
          type={memberType}
          refreshData={refreshData}
        />
      )}
      {updatePopUp && (
        <MemberUpdateDialog
          trigger={setUpdatePopUp}
          type={memberType}
          target={target}
          refreshData={refreshData}
        />
      )}
      {deletePopUp && (
        <MemberDeleteDialog
          trigger={setDeletePopUp}
          target={target}
          refreshData={refreshData}
          type={memberType}
        />
      )}
    </div>
  );
};

const ProfessorItem = ({
  profile = null,
  name = "이름",
  email = "이메일",
  field = ["연구분야"],
  setUpdate,
  setDelete,
  setTarget,
}) => {
  const updateMember = () => {
    let temp = { ...dataForm };
    temp.name = name;
    temp.email = email;
    temp.field = field;
    temp.graduated = 2024;
    setTarget(temp);
    setUpdate(true);
  };

  const deleteMember = () => {
    let temp = { ...dataForm };
    temp.name = name;
    temp.email = email;
    temp.field = field;
    temp.graduated = 0;
    setTarget(temp);
    setDelete(true);
  };
  return (
    <div className="memberItem">
      <img className="profile" src={profile} alt={name} />
      <h3 className="name">{name}</h3>
      <p className="email">{email}</p>
      <h6 className="subTitle">연구분야</h6>
      <ul className="fieldWrap">
        {field.map((f, idx) => (
          <li className="field" key={`field${idx}`}>
            {f}
          </li>
        ))}
      </ul>
      <div className="funcWrap">
        <button onClick={updateMember}>
          <Pen />
        </button>
        <button onClick={deleteMember}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

const UndergraduateItem = ({
  profile = null,
  name = "이름",
  email = "이메일",
  field = ["연구분야"],
  id = ["번호"],
  setUpdate,
  setDelete,
  setTarget,
}) => {
  const updateMember = () => {
    let temp = { ...dataForm };
    temp.name = name;
    temp.email = email;
    temp.field = field;
    temp.id = id;
    temp.graduated = 0;
    setTarget(temp);
    setUpdate(true);
  };
  const deleteMember = () => {
    let temp = { ...dataForm };
    temp.name = name;
    temp.email = email;
    temp.field = field;
    temp.id = id;
    temp.graduated = 0;
    setTarget(temp);
    setDelete(true);
  };
  return (
    <div className="memberItem">
      <img className="profile" src={profile} alt={name} />
      <h3 className="name">{name}</h3>
      <p className="email">{email}</p>
      <h6 className="subTitle">관심분야</h6>
      <ul className="fieldWrap">
        {field.map((f, idx) => (
          <li className="field" key={`field${idx}`}>
            {f}
          </li>
        ))}
      </ul>
      <div className="funcWrap">
        <button onClick={updateMember}>
          <Pen />
        </button>
        <button onClick={deleteMember}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

const GraduateItem = ({
  graduated = 2024,
  name = "이름",
  email = "이메일",
  company = "회사",
  id = ["번호"],
  setUpdate,
  setDelete,
  setTarget,
}) => {
  const updateMember = () => {
    let temp = { ...dataForm };
    temp.name = name;
    temp.graduated = graduated;
    temp.email = email;
    temp.company = company;
    temp.id = id;
    setTarget(temp);
    setUpdate(true);
  };
  const deleteMember = () => {
    let temp = { ...dataForm };
    temp.name = name;
    temp.graduated = graduated;
    temp.email = email;
    temp.company = company;
    temp.id = id;
    setTarget(temp);
    setDelete(true);
  };
  return (
    <div className="memberItem">
      <h3 className="name">
        {name}
        <span>{graduated}년 졸업</span>
      </h3>
      <p className="email">{email}</p>
      <p className="company">{company}</p>
      <div className="funcWrap">
        <button onClick={updateMember}>
          <Pen />
        </button>
        <button onClick={deleteMember}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default ManageMemberPage;
