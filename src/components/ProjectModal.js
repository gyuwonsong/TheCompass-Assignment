import React, { useState } from "react";

/*
6. ProjectModal 컴포넌트

- 새로운 프로젝트 생성 가능
*/

function ProjectModal({ isOpen, onClose, onAddProject }) {
    const [newProjectTitle, setNewProjectTitle] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");

    const handleAddProject = () => {
        if (!newProjectTitle.trim() || !newProjectDescription.trim()) return;
        onAddProject(newProjectTitle, newProjectDescription);
        setNewProjectTitle("");
        setNewProjectDescription("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-1/3 shadow-lg">
                <h2 className="text-2xl font-bold mb-4">새 프로젝트 추가</h2>

                <input
                    type="text"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    placeholder="프로젝트 제목"
                    className="p-2 border border-gray-300 rounded-lg w-full mb-3"
                />
                <textarea
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                    placeholder="프로젝트 설명"
                    className="p-2 border border-gray-300 rounded-lg w-full mb-3 resize-none"
                    rows="3"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleAddProject}
                        className="px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-700"
                    >
                        추가
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProjectModal;
