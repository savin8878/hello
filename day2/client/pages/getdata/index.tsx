import { useState } from "react";
import { NextPage } from "next";
interface SheetDataRow {
  name: string;
  email: string;
  password: string;
  message: string;
}
const Home: NextPage<{ sheetdata: SheetDataRow[] }> = ({ sheetdata }) => {
  const [data, setData] = useState(sheetdata);

  const fetchData = async () => {
    const req = await fetch("/api/submit", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const res = await req.json();
    setData(res.data);
  };

  return (
    <div className="">
      <table>
        <thead>
          
        </thead>
        <tbody>
          {data.map((row:any, index:any) => (
            <tr key={index}>
              {row.map((cell:any, cellIndex:any) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};
export const getServerSideProps = async () => {
  // Fetch initial data here if needed
  const initialData: SheetDataRow[] = []; // Initial data, if needed
  return {
    props: {
      sheetdata: initialData,
    },
  };
};

export default Home;
