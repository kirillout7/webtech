import {
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";



const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("apple:user", null);
  const [users, setUsers] = useLocalStorage("apple:users", []);


  const register = useCallback(
    async (name, password) => {
      const trimmed = (name ?? "").trim();
      if (trimmed.length < 2) {
        return { ok: false, error: "Имя должно быть не короче 2 символов" };
      }
      if (!password || password.length < 4) {
        return { ok: false, error: "Пароль должен быть не короче 4 символов" };
      }
      // .some() — проверяем, не занято ли имя
      const exists = users.some(
        (u) => u.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (exists) {
        return { ok: false, error: "Пользователь с таким именем уже существует" };
      }

      const passHash = await hashPassword(password);
      const account = {
        id: Date.now().toString(),
        name: trimmed,
        passHash,
        createdAt: new Date().toISOString(),
      };
      setUsers([...users, account]);
      setUser({ id: account.id, name: account.name, createdAt: account.createdAt });
      return { ok: true };
    },
    [users, setUsers, setUser],
  );

  const login = useCallback(
    async (name, password) => {
      const trimmed = (name ?? "").trim();
      if (!trimmed) return { ok: false, error: "Введите имя пользователя" };
      if (!password) return { ok: false, error: "Введите пароль" };

      const found = users.find(
        (u) => u.name.toLowerCase() === trimmed.toLowerCase(),
      );
      if (!found) return { ok: false, error: "Пользователь не найден" };

      const passHash = await hashPassword(password);
      if (passHash !== found.passHash) {
        return { ok: false, error: "Неверный пароль" };
      }
      setUser({ id: found.id, name: found.name, createdAt: found.createdAt });
      return { ok: true };
    },
    [users, setUser],
  );

  /** Выход. */
  const logout = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      register,
      login,
      logout,
    }),
    [user, register, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth должен использоваться внутри <AuthProvider>");
  }
  return ctx;
}


async function hashPassword(text) {
  const data = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
