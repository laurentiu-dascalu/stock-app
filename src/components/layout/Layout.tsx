import classes from "./Layout.module.css";
import SearchBar from "./SearchBar";

const Layout: React.FC<{ children: React.ReactNode; }> = (props) => {
  return (
    <div>
      <SearchBar />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
