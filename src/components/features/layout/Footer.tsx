import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { Home, List, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="py-2 flex container gap-1 justify-between fixed bottom-0 left-0 right-0 bg-background max-w-lg m-auto border-t border-t-accent">
      <Link
        to="/"
        className={clsx(
          buttonVariants({
            variant: "link",
          })
        )}
      >
        <Home />
      </Link>
      <Link
        to="/myseries"
        className={clsx(
          buttonVariants({
            variant: "link",
          })
        )}
      >
        <List />
      </Link>
      <Link
        to="/new"
        className={clsx(
          buttonVariants({
            variant: "link",
          })
        )}
      >
        <PenSquare />
      </Link>
    </div>
  );
}
