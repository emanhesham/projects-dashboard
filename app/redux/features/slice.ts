import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Project {
  id: number;
  name: string;
}

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
  },
});

export const { addProject, setProjects } = projectSlice.actions;
export default projectSlice.reducer;
