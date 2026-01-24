import React from "react";
// "https://opentdb.com/api_category.php"
interface FetchProps {
  apiUrl: string,
}

export const useFetch = ({
  apiUrl
}: FetchProps) => {
  const [dataSource, setDataSource] = React.useState<any>({})

  React.useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        setDataSource(data)
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        }
      }
    }
    fetchData();
  }, []);

  return {
    dataSource
  }
};
