import { Progress } from "../../ui/progress.tsx";
import { ScrollArea } from "../../ui/scroll-area.tsx";
import { Button } from "../../ui/button.tsx";
import clsx from "clsx";
import { ArrowDownNarrowWide } from "lucide-react";
import { useEffect, useState } from "react";
import EditSerie from "./EditSerie.tsx";
import { type SerieType } from "../../pages/MySeries.tsx";
import { Badge } from "../../ui/badge.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu.tsx";

const Serie = (props: SerieType) => {
  const [serie, setSerie] = useState<SerieType>(props);
  const [complet, setComplet] = useState(false);
  const [pourcentage, setPourcentage] = useState(0);

  const save = (serie: SerieType) => {
    const series = JSON.parse(localStorage.getItem("series") || "[]");
    const index = series.findIndex((s: SerieType) => s.titre === serie.titre);
    series[index] = serie;
    localStorage.setItem("series", JSON.stringify(series));
  };

  useEffect(() => {
    setComplet(
      props.saison.every((saison) =>
        saison.episodes.every((episode) => episode.vu)
      )
    );

    setPourcentage(
      Math.round(
        (props.saison.reduce(
          (acc, saison) =>
            acc +
            saison.episodes.reduce(
              (acc, episode) => acc + (episode.vu ? 1 : 0),
              0
            ),
          0
        ) /
          props.saison.reduce(
            (acc, saison) => acc + saison.episodes.length,
            0
          )) *
          100
      )
    );
  }, [serie, props.saison]);

  return (
    <div className="rounded-lg overflow-hidden">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">{props.titre}</CardTitle>
          <CardDescription className="text-xs">
            ({props.saison.length} saisons)
          </CardDescription>
          <div className="ml-32 absolute">
            <EditSerie {...props} />
          </div>
        </CardHeader>
        <CardContent className="max-h-48 overflow-y-auto">
          <p className="text-sm italic text-muted-foreground">
            {props.synopsis ? props.synopsis : "Aucun synopsis"}
          </p>
          <div className="mt-6">
            <Progress value={pourcentage} className="mr-2" />
            <p className="text-sm">{pourcentage + "%"}</p>
          </div>
        </CardContent>
        <CardFooter className="py-2 px-4 container justify-between">
          <Badge className={clsx({ "bg-green-400 text-green-50": complet })}>
            {complet ? "Complet" : "Incomplet"}
          </Badge>
          <DropdownMenu modal={true}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <ArrowDownNarrowWide />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
              <ScrollArea className="h-60 w-30 rounded-md p-2">
                {props.saison.map((saison) =>
                  saison.episodes.map((episode, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        const newSerie = { ...serie };
                        newSerie.saison[saison.numero - 1].episodes[
                          episode.numero - 1
                        ].vu = !episode.vu;
                        setSerie(newSerie);
                        save(newSerie);
                      }}
                    >
                      {"S" + saison.numero + "|" + "E" + episode.numero}
                      {episode.vu ? "✔️" : "❌"}
                    </Button>
                  ))
                )}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Serie;
