import React, { useState, useEffect } from "react";
import { format, subDays } from "date-fns";
import { HiPencil, HiStar, HiTrash } from "react-icons/hi2";

/*
4. TaskItem 컴포넌트

- 각 태스크의 정보 표시 (To Do List 로 표현함)
- 태스크의 상태를 업데이트하거나 (드롭다운을 통한 상태 업데이트 가능), 우선순위 및 마감일 등을 보여줌
  우선순위 : High / Medium / Low (별 모양으로 표시 각 5 / 3 / 1 개)
  마감일 : Date (yyyy-MM-dd)
  상태 : 시작 전 / 진행 중 / 완료 (완료 상태일 때는 변경 불가능, 드롭다운 비활성화)
- 상태에 따라 스타일을 변경하여 마감 기한이 지난 태스크를 강조
  a. 기한이 지난 경우 (오늘 포함) : 배경색을 bg-red-100 으로 설정 (빨간색 배경으로 표시)
  b. 기한이 얼마 남지 않은 경우 (3일 이내) : 배경색을 bg-yellow-100 으로 설정 (노란색 배경으로 표시)
  c. 기한에 여유가 있는 경우 : 배경색을 bg-gray-100 (기본 배경색)으로 설정 (회색 배경으로 표시)
- 완료된 테스크는 텍스트에 취소선 적용
*/

function TaskItem({ task, setProjectTasks, onEdit, onDelete }) {
    // task 데이터를 상태로 관리
    const [taskData, setTaskData] = useState(task);

    // task prop이 변경될 때마다 taskData를 업데이트
    useEffect(() => {
        setTaskData(task);
    }, [task]);

    // taskData가 변경될 때 상위 컴포넌트에 반영
    useEffect(() => {
        setProjectTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === taskData.id ? taskData : t
            )
        );
    }, [taskData, setProjectTasks]);

    // 마감일 상태에 따른 스타일링 설정
    const isOverdue = new Date(taskData.dueDate) < new Date();
    const isCloseToDeadline =
        !isOverdue && new Date(taskData.dueDate) < subDays(new Date(), -3);

    const handleStatusChange = (e) => {
        const updatedStatus = e.target.value;
        setTaskData((prevData) => ({ ...prevData, status: updatedStatus }));
    };

    const renderPriorityStars = () => {
        let stars = 1;
        if (taskData.priority === "high") stars = 5;
        else if (taskData.priority === "medium") stars = 3;

        return [...Array(stars)].map((_, i) => (
            <HiStar key={i} className="inline text-yellow-500" />
        ));
    };

    return (
        <li
            className={`relative p-6 rounded-xl shadow 
        ${isOverdue ? "bg-red-100" : isCloseToDeadline ? "bg-yellow-100" : "bg-gray-100"}
        transition-colors duration-200 group list-none`}
        >
            <div className="absolute top-6 right-6 flex gap-2">
                <div className="text-gray-500 hover:text-blue-500 cursor-pointer">
                    <HiPencil size={20} onClick={() => onEdit(taskData)}/>
                </div>
                <div className="text-gray-500 hover:text-red-500 cursor-pointer">
                    <HiTrash size={20} onClick={onDelete}/>
                </div>
            </div>


            <div className={`font-semibold ${taskData.status === "done" ? "line-through text-gray-500" : ""}`}>
                {taskData.title}
            </div>

            <div className="text-gray-600">{taskData.description}</div>
            <div className="text-gray-600 text-lg"> {renderPriorityStars()} </div>

            <div className="flex flex-row items-center justify-between mt-6">
                <div className="text-gray-600"> 마감일 : {format(new Date(taskData.dueDate), "yyyy-MM-dd")} </div>

                <div>
                    <label htmlFor={`status-${taskData.id}`} className="text-gray-600 mr-2">상태 :</label>
                    <select
                        id={`status-${taskData.id}`}
                        value={taskData.status}
                        onChange={handleStatusChange}
                        className="p-1 border border-gray-300 rounded-xl"
                        disabled={taskData.status === "done"}
                    >
                        <option value="not-started">시작 전</option>
                        <option value="in-progress">진행 중</option>
                        <option value="done">완료</option>
                    </select>
                </div>
            </div>
        </li>
    );
}

export default TaskItem;
