import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegPlusSquare, FaTrashAlt } from "react-icons/fa";
import { PiListPlusBold } from "react-icons/pi";
import { projects as initialProjects } from "../data/dummyData";
import ProjectModal from "./ProjectModal";

/*
2. ProjectList 컴포넌트

- 모든 프로젝트 목록을 보여주고, 프로젝트를 선택할 수 있음
- 각 프로젝트를 클릭하면 해당 프로젝트의 태스크 목록 페이지로 이동 가능함
*/

function ProjectList() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(initialProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddProject = (title, description) => {
        const newProject = {
            id: (projects.length + 1).toString(),
            title,
            description,
            tasks: [],
        };
        setProjects([...projects, newProject]);
    };

    const handleDeleteProject = (projectId) => {
        setProjects(projects.filter((project) => project.id !== projectId));
    };

    return (
        <div className="p-16">
            <div className="text-3xl font-bold mb-4 mr-2 flex justify-between items-center">
                프로젝트 목록
                <PiListPlusBold
                    onClick={() => setIsModalOpen(true)}
                    className="text-gray-500 hover:text-gray-700 cursor-pointer text-3xl"
                />
            </div>

            <ul className="mt-4 space-y-3">
                {projects.map((project) => (
                    <li
                        key={project.id}
                        className="p-4 bg-gray-100 rounded-xl shadow flex justify-between items-center hover:bg-gray-200 group"
                    >
                        <span>{project.title}</span>

                        <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <FaRegPlusSquare
                                className="text-gray-500 hover:text-blue-500 cursor-pointer"
                                onClick={() => navigate(`/project/${project.id}`)}
                            />
                            <FaTrashAlt
                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                                onClick={() => handleDeleteProject(project.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddProject={handleAddProject}
            />
        </div>
    );
}

export default ProjectList;
