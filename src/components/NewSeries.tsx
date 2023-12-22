import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import { DoorOpen, PlusSquare, RotateCcw } from "lucide-react";
import { SerieType } from "./MySeries";

export default function NewSeries() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-8 p-8 rounded-lg shadow-md pb-16">
      <h1 className="font-bold text-2xl mb-6">Créer une nouvelle série</h1>
      <form
        onSubmit={handleSubmit((data) => {
          let series: SerieType[] = [];
          if (localStorage.getItem("series")) {
            series = JSON.parse(localStorage.getItem("series")!) as SerieType[];
          }
          series.push(data);
          localStorage.setItem("series", JSON.stringify(series));
          navigate("/myseries");
        })}
      >
        <div className="mb-4">
          <Label htmlFor="title">Titre</Label>
          <Input
            type="text"
            id="title"
            {...register("titre")}
            required={true}
            maxLength={100}
            className="input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="seasons">Nombre de saisons</Label>
          <Input
            type="number"
            id="seasons"
            {...register("nbsaison")}
            required={true}
            min={1}
            className="input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="episodes">Nombre d'épisodes</Label>
          <Input
            type="number"
            id="episodes"
            {...register("nbepisode")}
            required={true}
            min={1}
            className="input"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="synopsis">Synopsis</Label>
          <Textarea
            id="synopsis"
            {...register("synopsis")}
            required={false}
            maxLength={200}
            className="input"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant="destructive"
            onClick={() => {
              navigate("/myseries");
            }}
          >
            Annuler <DoorOpen size={16} className="ml-1" />
          </Button>
          <Button variant="secondary" type="reset">
            Réinitialiser <RotateCcw size={16} className="ml-1" />
          </Button>
          <Button variant="outline" type="submit">
            Créer <PlusSquare size={16} className="ml-1" />
          </Button>
        </div>
      </form>
    </div>
  );
}
