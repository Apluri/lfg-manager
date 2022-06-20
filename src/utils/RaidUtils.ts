export type Raid = {
  name: LostArkRaids;
  maxPlayers: number;
};

export enum LostArkRaids {
  ARGOS_P1 = "Argos P1",
  ARGOS_P2 = "Argos P2",
  ARGOS_P3 = "Argos P3",
  VALTAN_NORMAL = "Valtan Normal",
  VALTAN_HARD = "Valtan Hard",
  VYKAS_NORMAL = "Vykas Normal",
  VYKAS_HARD = "Vykas HARD",
  CUSTOM = "Custom raid",
}

export enum LostArkRaidNames {
  ARGOS = "Argos",
  VALTAN = "Valtan",
  VYKAS = "Vykas",
  CUSTOM = "Custom raid",
}
export const lostArkRaidFilterList: LostArkRaidNames[] = [
  LostArkRaidNames.ARGOS,
  LostArkRaidNames.VALTAN,
  LostArkRaidNames.VYKAS,
  LostArkRaidNames.CUSTOM,
];
export const lostArkRaidFilters: Record<LostArkRaidNames, LostArkRaids[]> = {
  [LostArkRaidNames.ARGOS]: [
    LostArkRaids.ARGOS_P1,
    LostArkRaids.ARGOS_P2,
    LostArkRaids.ARGOS_P3,
  ],
  [LostArkRaidNames.VALTAN]: [
    LostArkRaids.VALTAN_NORMAL,
    LostArkRaids.VALTAN_HARD,
  ],
  [LostArkRaidNames.VYKAS]: [
    LostArkRaids.VYKAS_NORMAL,
    LostArkRaids.VYKAS_HARD,
  ],
  [LostArkRaidNames.CUSTOM]: [LostArkRaids.CUSTOM],
};

export function getLostArkRaidsList(): Raid[] {
  return [
    { name: LostArkRaids.ARGOS_P1, maxPlayers: 8 },
    { name: LostArkRaids.ARGOS_P2, maxPlayers: 8 },
    { name: LostArkRaids.ARGOS_P3, maxPlayers: 8 },
    { name: LostArkRaids.VALTAN_NORMAL, maxPlayers: 8 },
    { name: LostArkRaids.VALTAN_HARD, maxPlayers: 8 },
    { name: LostArkRaids.VYKAS_NORMAL, maxPlayers: 8 },
    { name: LostArkRaids.VYKAS_HARD, maxPlayers: 8 },
    { name: LostArkRaids.CUSTOM, maxPlayers: 20 },
  ];
}
