import { useState, useEffect } from "react";
import { externalApi, IData } from "@/services/external-api";
import { HomeTable } from "@/components/home-table";

interface IHomeState {
  loading: boolean;
  error: string;
  allData: Array<IData>;
}
export function Home() {
  const [homeState, setHomeState] = useState<IHomeState>({
    loading: true,
    error: "",
    allData: [],
  });

  useEffect(() => {
    (async () => {
      try {
        setHomeState((hs) => ({ ...hs, loading: true }));
        const data = await externalApi.getData();
        setHomeState((hs) => ({ ...hs, allData: data.slice(0, 2000) }));
      } catch {
        setHomeState((hs) => ({ ...hs, error: "Error fetching data" }));
      } finally {
        setHomeState((hs) => ({ ...hs, loading: false }));
      }
    })();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <HomeTable dataTable={homeState.allData} />
    </div>
  );
}
