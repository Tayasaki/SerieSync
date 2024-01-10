import { Label } from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Delete, PencilLine, PlusSquare, Settings } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { SerieType } from "../../pages/MySeries";
import { Button, buttonVariants } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

type FormDataType = {
  titre: string;
  synopsis: string;
  episodes: number[];
};

export default function EditSerie(props: SerieType) {
  const [serie, setSerie] = useState<SerieType>(props);
  const { register, handleSubmit, reset, control } = useForm<FormDataType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "episodes" as never,
  });

  const onSubmit = (data: FormDataType) => {
    const series = JSON.parse(localStorage.getItem("series") || "[]");
    const index = series.findIndex((s: SerieType) => s.titre === serie.titre);

    series[index].titre = data.titre;
    series[index].synopsis = data.synopsis;
    series[index].saison = serie.saison.concat(
      data.episodes.map((episodes, index) => ({
        numero: serie.saison.length + index + 1,
        episodes: Array.from({ length: episodes }, (_, index) => ({
          numero: index + 1,
          vu: false,
        })),
      }))
    );

    localStorage.setItem("series", JSON.stringify(series));
    setSerie(series[index]);
    reset();
    toast.success(data.titre + " a bien été modifié" + "🎉🎉");
  };

  return (
    <Dialog>
      <DialogTrigger
        className={clsx(
          buttonVariants({
            variant: "link",
          })
        )}
      >
        <Settings />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modification de "{serie.titre}"</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label>Titre</Label>
              <Input
                type="text"
                id="titre"
                defaultValue={serie.titre}
                {...register("titre", {
                  required: "Le titre est obligatoire",
                  maxLength: {
                    value: 100,
                    message: "Le titre ne doit pas dépasser 100 caractères",
                  },
                })}
              />
              <Label>Synopsis</Label>
              <Textarea
                id="synopsis"
                defaultValue={serie.synopsis}
                {...register("synopsis", {
                  required: false,
                  maxLength: {
                    value: 400,
                    message: "Le synopsis ne doit pas dépasser 400 caractères",
                  },
                })}
              />
              {fields.map((field, index) => (
                <div className="mb-4" key={field.id}>
                  <Label>Saison {index + 1 + serie.saison.length}</Label>
                  <Button
                    size={"xs"}
                    variant="destructive"
                    onClick={() => remove(index)}
                    className="ml-2"
                  >
                    <Delete size={16} />
                  </Button>
                  <Input
                    type="number"
                    id={`saision${index + 1}`}
                    {...register(`episodes.${index}`, {
                      required: "Ce champ est requis",
                      min: 1,
                    } as const)}
                  />
                </div>
              ))}
              <div className="flex justify-end gap-4 mt-3">
                <Button
                  variant="secondary"
                  onClick={() => append({ episode: [] })}
                >
                  Ajouter une saison <PlusSquare size={16} className="ml-1" />
                </Button>

                <Button variant="outline" type="submit">
                  Modifier <PencilLine size={16} className="ml-1" />
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
