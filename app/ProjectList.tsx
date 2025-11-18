

"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { addProject } from "./redux/features/slice";

export default function ProjectList() {
  const projects = useSelector((state: RootState) => state.project.projects);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">📋 Project List</h1>

      <ul className="list-disc ml-6">
        {projects.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>

      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() =>
          dispatch(
            addProject({
              id: Date.now(),
              name: `New Project ${projects.length + 1}`,
            })
          )
        }
      >
        ➕ Add Project
      </button>
    </div>
  );
}
