import { ToggleTheme } from "../../theme/ToggleTheme";

export default function Headers() {
  return (
    <header className="border-b border-b-accent mb-8 max-w-lg m-auto py-2">
      <div className="container flex items-center justify-between py-2 max-w-lg m-auto">
        <h1 className="text-3xl font-bold">Serie Sync</h1>
        <ToggleTheme />
      </div>
    </header>
  );
}
