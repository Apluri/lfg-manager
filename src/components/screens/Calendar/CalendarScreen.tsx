import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { Character } from "../../../utils/CharacterUtils";
import { Applicant, LfgPost } from "../../LFG/LfgPosts";
import { useAuth } from "../../providers/AuthContext";
import { useDatabase } from "../../providers/DatabaseContext";

export function CalendarScreen() {
  const db = useDatabase();
  const auth = useAuth();

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  useEffect(() => {
    getAllJoinedPosts();
  }, []);
  function getJoinedPosts(character: Character): LfgPost[] {
    const allLfgPosts = db?.lfgPosts;
    if (allLfgPosts === undefined && allLfgPosts === null) return [];

    let joinedPostsInfo: LfgPost[] = [];

    allLfgPosts?.forEach((post) => {
      post.applicants?.forEach((applicant) => {
        if (applicant.character.id === character.id) joinedPostsInfo.push(post);
      });
    });

    return joinedPostsInfo;
  }
  function getAllJoinedPosts(): LfgPost[] {
    let posts: LfgPost[] = [];
    db?.user?.characters?.forEach((char) => {
      getJoinedPosts(char).forEach((post) => posts.push(post));
    });
    return posts;
  }
  function getPostsByDay(day: string): LfgPost[] {
    return getAllJoinedPosts()
      .filter((post) => {
        return getWeekDay(new Date(post.startTime)) === day;
      })
      .sort((a, b) => {
        if (
          DateTime.fromISO(a.startTime).valueOf() >
          DateTime.fromISO(b.startTime).valueOf()
        ) {
          return 1;
        } else return -1;
      });
  }
  function getWeekDay(date: Date): string {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = date.getDay();
    return days[dayOfWeek];
  }
  function getMyCharacter(
    applicants: Applicant[] | undefined
  ): Character | undefined {
    return applicants?.find(
      (applicant) => applicant.uid === auth?.currentUser?.uid
    )?.character;
  }

  type Props = {
    highlight: boolean;
    children: JSX.Element;
  };
  function DayWrapper({ children, highlight }: Props) {
    if (highlight)
      return (
        <Paper
          sx={{
            padding: "1em",
          }}
        >
          {children}
        </Paper>
      );

    return (
      <Box
        sx={{
          padding: "1em",
        }}
      >
        {children}
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h2">Week Calendar</Typography>

      {days.map((day) => (
        <DayWrapper highlight={getWeekDay(new Date()) === day}>
          <Box>
            <Typography variant="h4">{day}</Typography>
            {getPostsByDay(day).map((post) => (
              <Typography
                key={post.lfgId}
                variant="body2"
                color="text.secondary"
              >
                {`
               ${DateTime.fromISO(post.startTime).toLocaleString(
                 DateTime.TIME_24_SIMPLE
               )}
             ${post.raid.name} ${post.title}
             ${getMyCharacter(post.applicants)?.charName}
             `}
              </Typography>
            ))}
          </Box>
        </DayWrapper>
      ))}
    </Box>
  );
}
