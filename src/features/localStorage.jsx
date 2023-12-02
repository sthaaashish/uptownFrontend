export const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  export const clearLocal = () => {
    localStorage.clear();
  };
  export const getUser = () => {
    const user = localStorage.getItem("user");
    return user === null ? null : JSON.parse(user);
  };