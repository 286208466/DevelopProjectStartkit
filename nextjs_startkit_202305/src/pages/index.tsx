import { FC, ReactElement,useEffect, useState } from "react";
import Image from "next/image";
import {GetServerSidePropsContext} from "next"

function App(props) {
  console.log(props, process);
  return (
    <>
      <div></div>
    </>
  );
}

export default App;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const page = (context.query?.page as string) || 1;
//   const uid = process.env.uid!;
//   const { data, count } = await getArticles(uid, (+page - 1) * 10);

//   return { props: { data, count, page: +page } };
// }


