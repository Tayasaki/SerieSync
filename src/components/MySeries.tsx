import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import Serie from "./Serie.tsx";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert.tsx";

export type SerieType = {
  titre: string;
  synopsis: string;
  saison: {
    numero: number;
    episodes: {
      numero: number;
      vu: boolean;
    }[];
  }[];
};

export default function MySeries() {
  const [series, setSeries] = useState<SerieType[]>([]);
  useEffect(() => {
    setSeries(JSON.parse(localStorage.getItem("series") || "[]"));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-16 container mx-auto">
      <h1 className="font-bold text-2xl col-span-full text-center mb-6">
        Mes séries
      </h1>
      {series.length === 0 ? (
        <Alert className="col-span-full container" variant={"default"}>
          <AlertCircle />
          <AlertTitle>Vous n'avez aucune série pour le moment</AlertTitle>
          <AlertDescription>
            Rendez vous sur la page de création pour ajouter vos premières
            séries
          </AlertDescription>
        </Alert>
      ) : (
        series.map((serie, index) => <Serie key={index} {...serie} />)
      )}
    </div>
  );
}
