import { useEffect, useState } from "react";
import Serie from "./Serie.tsx";
import { Alert } from "./ui/alert.tsx";

export type SerieType = {
  titre: string;
  synopsis: string;
  nbsaison: number;
  nbepisode: number;
};

export default function MySeries() {
  const [series, setSeries] = useState<SerieType[]>([]);
  useEffect(() => {
    const seriesTemp = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== null && key !== "vite-ui-theme") {
        const serie = localStorage.getItem(key);
        if (serie !== null) {
          seriesTemp.push(JSON.parse(serie));
        }
      }
    }
    setSeries(seriesTemp);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <h1 className="font-bold text-2xl col-span-full text-center  mb-5">
        MySeries
      </h1>
      {series.length === 0 ? (
        <Alert className="col-span-full">Vous n'avez pas encore de série</Alert>
      ) : (
        series.map((serie, index) => <Serie key={index} {...serie} />)
      )}
    </div>
  );
}
