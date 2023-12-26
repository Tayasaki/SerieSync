import { useEffect, useState } from "react";
import Serie from "./Serie.tsx";
import { Alert } from "./ui/alert.tsx";

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
/*
[
  {
    titre: "test",
    synopsis: "test",
    saison: [
      {
        numero: 1,
        episodes: [
          { numero: 1, vu: false },
          { numero: 2, vu: false },
        ],
      },
      { numero: 2, episodes: [{ numero: 1, vu: false }] },
    ],
  },
];
*/
export default function MySeries() {
  const [series, setSeries] = useState<SerieType[]>([]);
  useEffect(() => {
    setSeries(JSON.parse(localStorage.getItem("series") || "[]"));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-16 container mx-auto">
      <h1 className="font-bold text-2xl col-span-full text-center  mb-5">
        MySeries
      </h1>
      {series.length === 0 ? (
        <Alert
          className="text-2xl container flex items-center max-w-lg m-auto text-center col-span-full"
          variant={"default"}
        >
          Vous n'avez pas encore de série
        </Alert>
      ) : (
        series.map((serie, index) => <Serie key={index} {...serie} />)
      )}
    </div>
  );
}
