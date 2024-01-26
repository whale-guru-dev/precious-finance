import { Box, IconButton } from "@mui/material";
import Image from "next/image";

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  "& .MuiButtonBase-root": {
    marginRight: "0.5rem",
  },
} as const;

export interface SocialMediaProps {
  onTwitterClick: () => void;
  onMediumClick: () => void;
  onDiscordClick: () => void;
  onGitBookClick: () => void;
}

export const SocialMedia: React.FC<SocialMediaProps> = ({
  onTwitterClick,
  onMediumClick,
  onDiscordClick,
  onGitBookClick,
}) => {
  return (
    <Box sx={containerStyle}>
      <IconButton aria-label="open twitter" onClick={onTwitterClick}>
        <Image src="/icons/twitter.svg" alt="logo" width="25" height="25" />
      </IconButton>
      <IconButton aria-label="open medium" onClick={onMediumClick}>
        <Image src="/icons/medium.svg" alt="logo" width="25" height="25" />
      </IconButton>
      <IconButton aria-label="open discord" onClick={onDiscordClick}>
        <Image src="/icons/discord.svg" alt="logo" width="25" height="25" />
      </IconButton>
      <IconButton aria-label="open gitbook" onClick={onGitBookClick}>
        <Image src="/icons/gitbook.svg" alt="logo" width="25" height="25" />
      </IconButton>
    </Box>
  );
};
