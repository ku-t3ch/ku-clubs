import { create } from "zustand";

type Header = {
  likes: number;
  type: {
    name: string;
  }[];
  id: string;
  campus: {
    name: string;
  };
  name: string;
  detail: string;
  logo: string;
  views: number;
};

type EditorStore = {
  header: Header | undefined;
  setHeader: (header: Header) => void;
};

const useEditorStore = create<EditorStore>((set) => ({
  header: undefined,
  setHeader: (header) => set({ header }),
}));

export default useEditorStore;
