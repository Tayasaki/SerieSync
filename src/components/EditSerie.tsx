import clsx from "clsx";
import { Settings } from "lucide-react";
import { SerieType } from "./MySeries";
import { buttonVariants } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function EditSerie(props: SerieType) {
  return (
    <Dialog>
      <DialogTrigger
        className={clsx(
          buttonVariants({
            variant: "outline",
          })
        )}
      >
        <Settings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification de "{props.titre}"</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
