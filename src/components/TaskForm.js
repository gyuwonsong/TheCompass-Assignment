import React, { useState, useEffect } from "react";

/*
5. TaskForm 컴포넌트

- 새로운 태스크를 추가하거나 기존 태스크를 수정하는 폼
- 태스크의 제목, 설명, 우선순위, 마감일 등을 입력받음
*/

function TaskForm({ setProjectTasks, editTask = null, onSave }) {
    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
    });

    useEffect(() => {
        if (editTask) {
            setTaskData({
                title: editTask.title,
                description: editTask.description,
                priority: editTask.priority,
                dueDate: editTask.dueDate,
            });
        } else {
            setTaskData({ title: "", description: "", priority: "medium", dueDate: "" });
        }
    }, [editTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editTask) {
            onSave({ ...editTask, ...taskData });
            setProjectTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === editTask.id ? { ...editTask, ...taskData } : task
                )
            );
        } else {
            const newTask = { ...taskData, id: Date.now().toString(), status: "not-started" };
            setProjectTasks((prevTasks) => [...prevTasks, newTask]);
        }
        setTaskData({ title: "", description: "", priority: "medium", dueDate: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* 제목 입력 필드 */}
            <input
                type="title"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                placeholder="태스크 제목"
                required
                className="px-3 py-2 border border-gray-300 rounded-xl"
            />

            {/* 설명 입력 필드 */}
            <input
                type="description"
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                placeholder="태스크 설명"
                required
                className="px-3 py-2 border border-gray-300 rounded-xl"
            />

            {/* 우선순위, 마감일 및 추가 버튼 */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 w-full flex flex-col sm:flex-row gap-4 items-stretch md:w-full">
                {/* 우선순위 선택 드롭다운 */}
                <select
                    value={taskData.priority}
                    onChange={(e) => setTaskData({ ...taskData, priority: e.target.value })}
                    className="px-3 py-2 lg:w-4/6 border border-gray-300 rounded-xl sm:w-full"
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                {/* 마감일 선택 필드 */}
                <input
                    type="date"
                    value={taskData.dueDate}
                    onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
                    required
                    className="px-3 py-2 lg:w-4/6 border border-gray-300 rounded-xl sm:w-full"
                    min={new Date().toISOString().split("T")[0]}
                />

                {/* 추가/수정 버튼 */}
                <button
                    type="submit"
                    className="px-3 py-2 lg:w-2/6 bg-gray-500 text-white rounded-xl hover:bg-gray-700 sm:w-full"
                >
                    {editTask ? "수정" : "추가"}
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
