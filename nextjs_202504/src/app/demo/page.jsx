"use client";

import { useTranslations } from "next-intl";

import LangSwitch from "@/components/common/LangSwitch";

import Head from "next/head";

function App() {
  const t = useTranslations("Route");
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <style jsx>
        {`
          p {
            width: 100%;
            height: 50px;
            line-height: 50px;
            font-size: 50px;
            background: lightblue;
            text-align: center;
          }
        `}
      </style>

      <p>{t("dashboard")}</p>

      <h2>语言切换</h2>
      <LangSwitch />
    </div>
  );
}

export default App;
