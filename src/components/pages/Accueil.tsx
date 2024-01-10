import { useEffect, useState } from "react";

const Accueil = () => {
  const [watchList] = useState<string[]>(
    JSON.parse(localStorage.getItem("watchlist") || "[]")
  );

  useEffect(() => {
    document.title = "Série Sync - Accueil";
  }, []);

  return (
    <div className="flex items-center justify-center h-auto mb-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue sur notre application
        </h1>
        <p className="text-lg container max-w-lg">
          Utilisez les boutons ci-dessous pour naviguer dans l'application !
          <br />
          <br />
          Vous pourrez ajouter des séries, les modifier et les supprimer mais
          surtout suivre votre progression dans vos séries préférées !
        </p>
        {watchList.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mt-8 mb-4">
              N'oubliez pas ces séries qui n'attendent que vous!
            </h3>
            <ul>
              {watchList.map((serie, i) => (
                <li key={i}>{serie}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Accueil;
