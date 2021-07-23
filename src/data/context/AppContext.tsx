import { createContext, useState } from "react";

type Theme = "dark" | "";

interface AppContextProps {
  theme: Theme;
  onChangeTheme: () => void;
}

const AppContext = createContext<AppContextProps>({
  theme: null,
  onChangeTheme: null,
});

export function AppProvider(props) {
  const [theme, setTheme] = useState<Theme>("dark");

  const changeTheme = () => {
    setTheme(theme === "" ? "dark" : "");
  };

  return (
    <AppContext.Provider value={{ theme, onChangeTheme: changeTheme }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
