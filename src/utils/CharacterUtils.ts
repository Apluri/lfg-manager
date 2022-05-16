export type Character = {
  charName: string;
  character: string;
  itemLevel: number;
  engravings: Engraving[];
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
}

export function getClassNameList() {
  return [
    ClassNames.BERSERKER,
    ClassNames.PALADIN,
    ClassNames.DESTROYER,
    ClassNames.GUNLANCER,
    ClassNames.SOULFIST,
    ClassNames.WARDANCER,
    ClassNames.GLAIVIER,
    ClassNames.STRIKER,
    ClassNames.SCRAPPER,
    ClassNames.ARTILLERIST,
    ClassNames.GUNSLINGER,
    ClassNames.DEADEYE,
    ClassNames.SHARPSHOOTER,
    ClassNames.SORCERESS,
    ClassNames.BARD,
    ClassNames.SHADOWHUNTER,
    ClassNames.DEATHBLADE,
    ClassNames.REAPER,
    ClassNames.SCOUTER,
  ];
}
