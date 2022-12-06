import React from "react";

const TeacherAttach = ({ classData, attachment }) => {
  return (
    <>
      {classData.teacher && (
        <div className="mb-7">
          <div className="flex items-center gap-5 mb-2.5  ">
            <span className="bg-[#4062FF] rounded-full w-full max-w-[3rem] h-12">
              <svg
                data-v-4b07702c=""
                width="28"
                height="48"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto"
              >
                <path
                  data-v-4b07702c=""
                  d="M10.0002 0.157227C7.87916 0.157227 6.15405 1.88281 6.15405 4.00381V5.99662C6.15405 8.11777 7.87916 9.84336 10.0002 9.84336C12.1213 9.84336 13.8463 8.11777 13.8463 5.99662V4.00381C13.8463 1.88281 12.1213 0.157227 10.0002 0.157227Z"
                  fill="#8391A9"
                ></path>{" "}
                <path
                  data-v-4b07702c=""
                  d="M18.4821 14.8561C17.2506 12.7573 15.282 11.2013 12.9391 10.4747C12.8848 10.4579 12.8261 10.4722 12.7856 10.5122C11.6957 11.5868 10.3415 12.4252 10.0029 12.6277C9.64149 12.3967 8.1192 11.4044 7.21421 10.5122C7.1739 10.4722 7.11469 10.4579 7.06068 10.4747C4.71749 11.2015 2.74909 12.7574 1.51797 14.8562C1.48978 14.9043 1.48978 14.9639 1.51797 15.012C3.26622 17.991 6.51629 19.8416 9.9999 19.8416C13.4837 19.8416 16.7339 17.991 18.4821 15.012C18.5105 14.9638 18.5105 14.9041 18.4821 14.8561ZM15.231 16.0034C15.231 16.0883 15.1502 16.1532 15.0655 16.1532H14.0238C13.9389 16.1532 13.8463 16.2261 13.8463 16.3111V17.3884C13.8463 17.4731 13.801 17.5378 13.7161 17.5378H12.7805C12.6957 17.5378 12.6157 17.4731 12.6157 17.3884V16.3111C12.6154 16.2262 12.5574 16.1532 12.4725 16.1532H11.386C11.3011 16.1532 11.2309 16.0881 11.2309 16.0034V15.0759C11.2309 14.991 11.3011 14.9225 11.386 14.9225H12.4725C12.5574 14.9225 12.6154 14.8532 12.6154 14.7682V13.6897C12.6154 13.6048 12.6953 13.5379 12.7802 13.5379H13.7057C13.7904 13.5379 13.8462 13.6048 13.8462 13.6897V14.7714C13.8462 14.8564 13.9284 14.9224 14.0134 14.9224H15.0655C15.1502 14.9224 15.231 14.9942 15.231 15.0791V16.0034Z"
                  fill="#8391A9"
                ></path>
              </svg>
            </span>
            <h5 className="text-[1.125rem] text-[#042040] font-extrabold font-['Nunito_sans']">
              {classData.teacher.first_name} {classData.teacher.last_name}
            </h5>
          </div>
          <div className="text-sm px-3 py-1 inline-block text-[#8391A9] bg-blue-100 rounded-md font-semibold">
            {classData.teacher.subjects.map((sub) => (
              <span key={sub.id}> {sub.name}</span>
            ))}
          </div>
        </div>
      )}
      {classData.lock === true ? (
        <div className="flex border border-gray-200 items-center h-full justify-center flex-col">
          <svg
            data-v-61ba0d1f=""
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 24 24"
            className="mx-auto fill-blue-15 mb-4 fill-[#ECF4FF]"
          >
            <path
              data-v-61ba0d1f=""
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-6h8v6zm-6-6v-2c0-1.104.897-2 2-2s2 .896 2 2v2h1v-2c0-1.656-1.343-3-3-3s-3 1.344-3 3v2h1z"
            ></path>
          </svg>
          <span className="  text-base leading-6 text-[#042040] font-bold px-5">
            You don't have access to this classroom teacher attachments
          </span>
        </div>
      ) : (
        <div className="max-h-[430px]  h-full relative mb-2.5 ">
          <div className="relative border border-gray-200 rounded-lg  ">
            <div className="px-4 py-3 flex items-center">
              <span className="text-base leading-6 text-[#042040] py-3  font-bold">
                Teachar Attachments
              </span>
            </div>

            <ul className="text-[#7D8DA6] h-80 text-base font-semibold mb-0 overflow-x-hidden overflow-y-scroll">
              {/* {console.log(classData.teacher)} */}
              {classData.teacher === null ? (
                <>
                  <span className=" text-center h-full flex items-center justify-center relative">
                    <p>No Attachment found!</p>
                  </span>
                </>
              ) : (
                attachment &&
                attachment.map((item) => (
                  <li
                    className="bg-[#fbfcfe] text-base text-gray-300 py-3 px-7 hover:bg-blue-50 font-semibold"
                    key={item.id}
                  >
                    <a
                      className={"text-ellipsis text-gray-600"}
                      href={item.file}
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      {item.file && item.file.split("_path/")[1].split("?")[0]}
                    </a>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherAttach;
