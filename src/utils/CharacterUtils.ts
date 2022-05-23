import artillerist from "../assets/images/classIcons/artillerist.png";
import bard from "../assets/images/classIcons/bard.png";
import berserker from "../assets/images/classIcons/berserker.png";
import deadeye from "../assets/images/classIcons/deadeye.png";
import deathblade from "../assets/images/classIcons/deathblade.png";
import destroyer from "../assets/images/classIcons/destroyer.png";
import glavier from "../assets/images/classIcons/glaivier.png";
import gunlancer from "../assets/images/classIcons/gunlancer.png";
import gunslinger from "../assets/images/classIcons/gunslinger.png";
import paladin from "../assets/images/classIcons/paladin.png";
import reaper from "../assets/images/classIcons/reaper.png";
import scouter from "../assets/images/classIcons/scouter.png";
import scrapper from "../assets/images/classIcons/scrapper.png";
import shadowhunter from "../assets/images/classIcons/shadowhunter.png";
import sharpshooter from "../assets/images/classIcons/sharpshooter.png";
import sorceress from "../assets/images/classIcons/sorceress.png";
import soulfist from "../assets/images/classIcons/soulfist.png";
import striker from "../assets/images/classIcons/striker.png";
import wardancer from "../assets/images/classIcons/wardancer.png";
import cutelogo from "../assets/images/cute-logo.jpg";

export type Character = {
  id: string;
  charName: string;
  character: ClassNames;
  itemLevel: number;
};

export type Engraving = {
  name: string;
  level: number;
};

export type Gem = {
  type: "atk" | "cdr";
  level: number;
  skillName: string;
};

export enum ClassNames {
  BERSERKER = "Berserker",
  PALADIN = "Paladin",
  DESTROYER = "Destroyer",
  GUNLANCER = "Gunlancer",
  SOULFIST = "Soulfist",
  WARDANCER = "Wardancer",
  STRIKER = "Striker",
  GLAIVIER = "Glaivier",
  SCRAPPER = "Scrapper",
  ARTILLERIST = "Artillerist",
  GUNSLINGER = "Gunslinger",
  DEADEYE = "Deadeye",
  SHARPSHOOTER = "Sharpshooter",
  SORCERESS = "Sorceress",
  BARD = "Bard",
  SHADOWHUNTER = "Shadowhunter",
  DEATHBLADE = "Deathblade",
  REAPER = "Reaper",
  SCOUTER = "Scouter",
  DEFAULT = "NoClassSelected",
}

export function getClassNameList() {
  return [
    ClassNames.DEFAULT,
    ClassNames.ARTILLERIST,
    ClassNames.BARD,
    ClassNames.BERSERKER,
    ClassNames.DEATHBLADE,
    ClassNames.DEADEYE,
    ClassNames.DESTROYER,
    ClassNames.GLAIVIER,
    ClassNames.GUNLANCER,
    ClassNames.GUNSLINGER,
    ClassNames.PALADIN,
    ClassNames.REAPER,
    ClassNames.SCOUTER,
    ClassNames.SCRAPPER,
    ClassNames.SHADOWHUNTER,
    ClassNames.SHARPSHOOTER,
    ClassNames.SOULFIST,
    ClassNames.SORCERESS,
    ClassNames.STRIKER,
    ClassNames.WARDANCER,
  ];
}

export const classIcons: Record<ClassNames, string> = {
  [ClassNames.ARTILLERIST]: artillerist,
  [ClassNames.BARD]: bard,
  [ClassNames.BERSERKER]: berserker,
  [ClassNames.DEADEYE]: deadeye,
  [ClassNames.DEATHBLADE]: deathblade,
  [ClassNames.DESTROYER]: destroyer,
  [ClassNames.GLAIVIER]: glavier,
  [ClassNames.GUNLANCER]: gunlancer,
  [ClassNames.GUNSLINGER]: gunslinger,
  [ClassNames.PALADIN]: paladin,
  [ClassNames.REAPER]: reaper,
  [ClassNames.SCOUTER]: scouter,
  [ClassNames.SCRAPPER]: scrapper,
  [ClassNames.SHADOWHUNTER]: shadowhunter,
  [ClassNames.SHARPSHOOTER]: sharpshooter,
  [ClassNames.SORCERESS]: sorceress,
  [ClassNames.SOULFIST]: soulfist,
  [ClassNames.STRIKER]: striker,
  [ClassNames.WARDANCER]: wardancer,
  [ClassNames.DEFAULT]: cutelogo,
};
