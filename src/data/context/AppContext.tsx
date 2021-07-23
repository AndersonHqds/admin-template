import { createContext, useEffect, useState } from "react";

// type Theme = "dark" | "";

interface AppContextProps {
  theme: string;
  onChangeTheme: () => void;
}

const AppContext = createContext<AppContextProps>({
  theme: null,
  onChangeTheme: null,
});

export function AppProvider(props) {
  const [theme, setTheme] = useState("dark");

  const changeTheme = () => {
    const newTheme = theme === "" ? "dark" : "";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme);
  }, []);

  return (
    <AppContext.Provider value={{ theme, onChangeTheme: changeTheme }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
