export interface MentorProfile {
  name: string;
  role: string;
  track: string;
  experience: string;
  bio: string;
  fullBio: string;
  skills: string[];
  mentorshipFocus: string[];
  image: string;
  badgeBg: string;
  gradient: string;
}

// All mentor profiles are dynamically created & managed by the academy administrator
export const mentors: MentorProfile[] = [];
