import { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import moment from "moment";

import { DecorationTitle } from "../reusable/DecorationTitle";
import { SelectCalendar } from "../reusable/EditGroup";
import { IconSelector } from "../reusable/IconSelector";
import { Confirm } from "../reusable/Confirm";
import useScrollBlock from "../../utils/useScrollBlock";

const EditProjectFinal = ({
  status,
  projectData,
  formValue,
  setFormValue,
  editCancel,
  setEditCancel,
  setProjectDeleted,
  isWorkBoxOpen,
}) => {
  const [blockScroll, allowScroll] = useScrollBlock();
  const [deleteProjectBoxOpen, setDeleteProjectBoxOpen] = useState(false);

  const handleDeleteProject = () => {
    setDeleteProjectBoxOpen(true);
    blockScroll();
  };

  const handleValueChange = (value) => {
    setFormValue((prevValue) => {
      return {
        ...prevValue,
        finishDate: moment(value.toDate()).format("YYYY/MM/DD"),
      };
    });
  };

  //依據status呈現不同內容
  useEffect(() => {
    if (!projectData || !status) return;

    switch (status.project) {
      case "create":
        //點開「新增工作細項」或「編輯工作細項」的狀況 (不變動formValue的資料)
        if (isWorkBoxOpen) {
          return;
        } else {
          //初次進入的狀況 (載入預設值)
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              finishDate: "進行中",
            };
          });
        }
        break;

      case "edit":
        //點選取消的狀況 (恢復資料庫中的資料)
        if (editCancel) {
          setFormValue((prevValue) => {
            return {
              ...prevValue,
              finishDate: projectData.finishDate,
            };
          });
          setEditCancel(false);
        } else {
          //點開「新增工作細項」或「編輯工作細項」的狀況 (不變動formValue的資料)
          if (isWorkBoxOpen) {
            return;
          } else {
            //初次進入的狀況 (載入資料庫中的資料)
            setFormValue((prevValue) => {
              return {
                ...prevValue,
                finishDate: projectData.finishDate,
              };
            });
          }
        }
        break;

      default:
        break;
    }
  }, [projectData, status]);

  return (
    <>
      {deleteProjectBoxOpen && (
        <Confirm
          message1="專案刪除後無法復原，"
          message2="是否確認刪除?"
          confirmFor="deleteProject"
          setDeleteProjectBoxOpen={setDeleteProjectBoxOpen}
          allowScroll={allowScroll}
          projectData={projectData}
          setProjectDeleted={setProjectDeleted}
        />
      )}
      <div className="edit-project-final">
        <DecorationTitle title="專案完成 / 刪除" fontSize="l" />
        <div>
          <div className="m-text">專案實際完成日</div>
          <div>
            {formValue.finishDate !== "進行中" && (
              <div className="m-text">{formValue.finishDate}</div>
            )}
            {formValue.finishDate === "進行中" ? (
              <DatePicker
                value={formValue.finishDate}
                onChange={handleValueChange}
                className="teal"
                render={(value, openCalendar) => {
                  return (
                    <div onClick={openCalendar}>
                      <SelectCalendar text="選擇" />
                    </div>
                  );
                }}
              />
            ) : (
              <DatePicker
                value={formValue.finishDate}
                onChange={handleValueChange}
                className="teal"
                render={(value, openCalendar) => {
                  return (
                    <div onClick={openCalendar}>
                      <SelectCalendar text="編輯" />
                    </div>
                  );
                }}
              />
            )}
          </div>

          <div className="m-text">刪除專案</div>
          <div className="pointer" onClick={handleDeleteProject}>
            <IconSelector name="delete" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProjectFinal;
