import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import { projects as projectData, tasks as taskData } from "../data/dummyData";

/*
3. ProjectDetail 컴포넌트

- 선택한 프로젝트의 상세 정보 (description) 와 태스크 목록을 보여줌 (TaskItem 컴포넌트 사용)
- 프로젝트에 새로운 태스크를 추가 (TaskForm 컴포넌트 사용),
  a. 기존 태스크를 수정할 수 있는 버튼을 제공
     우측 상단 펜슬 아이콘 클릭 (수정 모드로 전환, '추가' 버튼이 '수정' 버튼으로 바뀜)
     하단 TaskForm 컴포넌트에 선택한 태스크 정보가 불러와짐
     수정 버튼을 한 번 더 누르면 수정 모드 종료 (필드를 변경한 경우에는 이를 반영, 아니면 변경사항 없이 종료)
  b. 기존 태스크를 삭제할 수 있는 버튼을 제공
- 두 가지 드롭다운으로 정렬 가능 (상태에 따른 정렬, 우선순위 및 마감일에 따른 정렬)
*/

function ProjectDetail() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);
    const [projectTasks, setProjectTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [filter, setFilter] = useState("전체");
    const [sortOrder, setSortOrder] = useState("priority-high");

    useEffect(() => {
        const selectedProject = projectData.find((p) => p.id === projectId);
        setProject(selectedProject);

        const filteredTasks = taskData.filter((task) => task.pjId === projectId);
        setProjectTasks(filteredTasks);
    }, [projectId]);

    const handleEditSave = (updatedTask) => {
        setProjectTasks((prevTasks) => {
            const taskIndex = prevTasks.findIndex((task) => task.id === updatedTask.id);
            if (taskIndex !== -1) {
                return prevTasks.map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                );
            } else {
                return [...prevTasks, { ...updatedTask, id: Date.now(), pjId: projectId }];
            }
        });
        setEditTask(null);
    };

    // 삭제 함수
    const handleDeleteTask = (taskId) => {
        setProjectTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const filteredTasks = projectTasks.filter((task) => {
        if (filter === "전체") return true;
        return task.status === filter;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };

        if (sortOrder === "priority-high") {
            // 우선순위 높은 순 -> 동일 우선순위일 경우 마감일 가까운 순
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
        } else if (sortOrder === "priority-low") {
            // 우선순위 낮은 순 -> 동일 우선순위일 경우 마감일 가까운 순
            if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            } else {
                return new Date(a.dueDate) - new Date(b.dueDate);
            }
        } else if (sortOrder === "due-soon") {
            // 마감일 가까운 순 -> 동일 마감일일 경우 우선순위 높은 순
            if (new Date(a.dueDate) !== new Date(b.dueDate)) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
        } else if (sortOrder === "due-late") {
            // 마감일 먼 순 -> 동일 마감일일 경우 우선순위 높은 순
            if (new Date(a.dueDate) !== new Date(b.dueDate)) {
                return new Date(b.dueDate) - new Date(a.dueDate);
            } else {
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
        }
        return 0;
    });

    return (
        <div className="p-16">
            {project ? (
                <>
                    <div className="text-2xl font-bold">{project.title}</div>
                    <div className="text-xl text-gray-600">{project.description}</div>

                    <div className="border-t border-gray-400 my-6" />


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4 items-center">
                        <div className="text-xl font-semibold">태스크 목록</div>

                        {/* 드롭다운 컨테이너 */}
                        <div className="flex flex-col gap-4 md:flex-row md:col-span-2 lg:col-start-3 lg:col-span-1">
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="p-2 border border-gray-300 rounded-xl w-full"
                            >
                                <option value="전체">전체</option>
                                <option value="not-started">시작 전</option>
                                <option value="in-progress">진행 중</option>
                                <option value="done">완료</option>
                            </select>

                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="p-2 border border-gray-300 rounded-xl w-full"
                            >
                                <option value="priority-high">우선순위 높은 순</option>
                                <option value="priority-low">우선순위 낮은 순</option>
                                <option value="due-soon">마감일 가까운 순</option>
                                <option value="due-late">마감일 먼 순</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {sortedTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                setProjectTasks={setProjectTasks}
                                onEdit={() => setEditTask(task)}
                                onDelete={() => handleDeleteTask(task.id)} // 삭제 함수 전달
                            />
                        ))}
                    </div>

                    <TaskForm
                        setProjectTasks={setProjectTasks}
                        editTask={editTask}
                        onSave={handleEditSave}
                    />
                </>
            ) : (
                <div>프로젝트 데이터를 불러오는 중...</div>
            )}
        </div>
    );
}

export default ProjectDetail;
