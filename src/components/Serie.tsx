import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
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
import { ArrowDownNarrowWide, Check, X } from "lucide-react";

const Serie = (props: SerieType) => {
  const complet = true;
  return (
    <div className="rounded-lg overflow-hidden shadow-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">{props.titre}</CardTitle>
          <CardDescription className="text-xs">
            ({props.saison.length} saisons)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm italic">
            {props.synopsis ? props.synopsis : "Aucun synopsis"}
          </p>
        </CardContent>
        <CardFooter className="py-2 px-4 container justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"outline"} size={"sm"}>
                Episodes
                <ArrowDownNarrowWide className="ml-2" size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {props.saison.map((saison) =>
                saison.episodes.map((episode, index) => (
                  <DropdownMenuItem key={index}>
                    S{saison.numero}|{episode.numero}
                    <Button variant={"link"}>
                      {episode.vu ? <Check size={16} /> : <X />}
                    </Button>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Badge variant={"outline"}>{complet ? "Complet" : "Incomplet"}</Badge>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Serie;
