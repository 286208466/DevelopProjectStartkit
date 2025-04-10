"use client";

import { useLocale } from "next-intl";

import { setLocale } from "@/i18n";
import { locales } from "@/i18n/config";

export default function LangSwitch() {
  const [ZH, EN] = locales;
  const locale = useLocale();

  // 切换语言
  function onChangeLang(value) {
    const locale = value;
    setLocale(locale);
  }
  return (
    <>
      <style jsx>{`
        button {
          cursor: pointer;
        }
      `}</style>
      <button
        variant="ghost"
        size="icon"
        onClick={() => onChangeLang(locale === ZH ? EN : ZH)}
      >
        {locale === ZH ? "中文" : "English"}
      </button>
    </>
  );
}
