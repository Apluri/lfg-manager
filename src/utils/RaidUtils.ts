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
