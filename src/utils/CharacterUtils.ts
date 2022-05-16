export type Character = {
  charName: string;
  character: string;
  itemLevel: number;
  engravings: Engraving[];
  gems: Gem[];
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
