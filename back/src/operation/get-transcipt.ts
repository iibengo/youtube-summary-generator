import { parse } from "node-html-parser";

export const getTrascript = async (url: string) => {
  const PAGE = await fetch(url)
    .then((res) => res.text())
    .then((html) => parse(html));

  const scripts = PAGE.getElementsByTagName("script");
  const playerScript = scripts.find((script) =>
    script.textContent.includes("var ytInitialPlayerResponse = {")
  );

  const dataString = playerScript?.textContent
    ?.split("var ytInitialPlayerResponse = ")?.[1]
    ?.slice(0, -1) as string;
  const data = JSON.parse(dataString.trim());
  const captionsUrl =
    data.captions.playerCaptionsTracklistRenderer.captionTracks[0].baseUrl;

  const resXML = await fetch(captionsUrl)
    .then((res) => res.text())
    .then((xml) => parse(xml));

  let transcript = "";
  const chunks = resXML.getElementsByTagName("text");
  for (const chunk of chunks) {
    transcript += chunk.textContent;
  }
  return transcript;
};
