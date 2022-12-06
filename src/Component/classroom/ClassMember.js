import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalProvider from "../../Context/Index";

const ClassMember = () => {
  const { baseurl } = GlobalProvider();
  const { id } = useParams();
  const [member, setmember] = useState("");

  useEffect(() => {
    baseurl
      .get(`classrooms/${id}/students-list/`)
      .then((res) => setmember(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="border border-[#f1f1f1] h-full rounded-lg">
      <div className="text-base leading-6 font-bold py-3 px-4 font-['Nunito_Sans']">
        Classroom Members
      </div>
      <ul className="h-80 ">
        {member &&
          member.map((single) => (
            <li
              key={single.id}
              className="list-none flex items-center gap-3 px-7 py-2.5"
            >
              <span className=" ">
                <img
                  className="w-[28px] h-[28px] rounded-full"
                  src={single.avatar}
                  alt={"Member"}
                />
              </span>
              <p className="m-0">
                {single.first_name} {single.last_name}{" "}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ClassMember;
