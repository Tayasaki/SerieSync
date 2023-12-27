import clsx from "clsx";
import { ArrowDownNarrowWide } from "lucide-react";
import { useEffect, useState } from "react";
import EditSerie from "./EditSerie.tsx";
import { type SerieType } from "./MySeries.tsx";
import { Badge } from "./ui/badge.tsx";
import { Button } from "./ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx";
import { Progress } from "./ui/progress.tsx";

const Serie = (props: SerieType) => {
  const [serie, setSerie] = useState<SerieType>(props);
  const [complet, setComplet] = useState(false);
  const [pourcentage, setPourcentage] = useState(0);

  useEffect(() => {
    setComplet(
      props.saison.every((saison) =>
        saison.episodes.every((episode) => episode.vu)
      )
    );
    setPourcentage(
      Math.round(
        (props.saison.reduce((acc, saison) => {
          return (
            acc +
            Math.round(
              (saison.episodes.filter((episode) => episode.vu).length /
                saison.episodes.length) *
                100
            )
          );
        }, 0) /
          props.saison.length) *
          100
      ) / 100
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
        </CardContent>
        <CardFooter className="py-2 px-4 container justify-between">
          <Progress value={pourcentage} className="mr-2" />
          <Badge className={clsx({ "bg-green-400 text-green-50": complet })}>
            {complet ? "Complet" : "Incomplet"}
          </Badge>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="p-2 container">
              <ArrowDownNarrowWide className="ml-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-10">
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
                    }}
                  >
                    {"S" + saison.numero + "|" + "E" + episode.numero}
                    {episode.vu ? "✔️" : "❌"}
                  </Button>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Serie;
