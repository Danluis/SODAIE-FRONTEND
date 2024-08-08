import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    googleUser: {},
    setGoogleUser: (googleUser) => set({ googleUser }),
    facebookUser: {},
    setFacebookUser: (facebookUser) => set({ facebookUser })
  }
));
