import { create } from 'zustand';

const useQuizStore = create((set, get) => ({
  started: false,
  startedOn: null,
  hasSubmitted: false, 

  setStarted: () =>
    set({
      started: true,
      startedOn: new Date().getTime(),
      hasSubmitted: false, 
    }),

  stop: () =>
    set({
      started: false,
      startedOn: null,
    }),

  setSubmitted: () =>
    set({
      hasSubmitted: true,
    }),

  hasTimedOut: () => {
    const { started, startedOn } = get();
    return started && new Date().getTime() - startedOn > 60 * 1000;
  },
}));

export default useQuizStore;
