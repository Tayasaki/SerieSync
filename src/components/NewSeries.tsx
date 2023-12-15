import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";

export default function NewSeries() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-bold text-2xl">Créer une nouvelle série</h1>
      <form
        onSubmit={handleSubmit((data) => {
          localStorage.setItem(data.titre, JSON.stringify(data));
          navigate("/myseries");
        })}
      >
        <div>
          <Label htmlFor="title">Titre</Label>
          <Input
            type="text"
            id="title"
            {...register("titre")}
            required={true}
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="seasons">Nombre de saisons</Label>
          <Input
            type="number"
            id="seasons"
            {...register("nbsaison")}
            required={true}
            min={1}
          />
        </div>

        <div>
          <Label htmlFor="episodes">Nombre d'épisodes</Label>
          <Input
            type="number"
            id="episodes"
            {...register("nbepisode")}
            required={true}
            min={1}
          />
        </div>

        <div>
          <Label htmlFor="synopsis">Synopsis</Label>
          <Textarea
            id="synopsis"
            {...register("synopsis")}
            required={false}
            maxLength={200}
          />
        </div>

        <div className="container justify-between items-center py-2 flex gap-1 bottom-0 left-0 right-0 bg-background m-auto max-w-lg">
          <Button variant={"destructive"} type={"reset"}>
            Quitter
          </Button>
          <Button variant={"secondary"} type={"reset"}>
            Annuler
          </Button>
          <Button variant={"outline"} type={"submit"}>
            Ajouter
          </Button>
        </div>
      </form>
    </>
  );
}
