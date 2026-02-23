import { create } from 'zustand';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'firebase/auth';
import { auth } from './firebase';

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    plan: 'free' | 'pro';
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    initAuthListener: () => void;
}

export const useAuth = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isInitialized: false,

    login: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    },

    register: async (name, email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            // State will be updated by the listener, but we also manually update profile info
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    },

    initAuthListener: () => {
        onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                set({
                    user: {
                        id: firebaseUser.uid,
                        name: firebaseUser.displayName || 'User',
                        email: firebaseUser.email || '',
                        avatar: (firebaseUser.displayName || 'U').substring(0, 2).toUpperCase(),
                        plan: 'free'
                    },
                    isAuthenticated: true,
                    isInitialized: true
                });
            } else {
                set({
                    user: null,
                    isAuthenticated: false,
                    isInitialized: true
                });
            }
        });
    }
}));
