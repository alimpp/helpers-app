import { filesController } from '@/controllers/Files'

interface IUser {
  fristname: string;
  lastname: string;
  email: string;
  id: number;
  avatarUrl: string;
  bio: string;
  password?: string | number;
}

export const useUserGenerator = async (user: IUser) => {
  const colors = ['#8ecae6', '#a2d2ff', '#e07a5f', '#67b99a', '#358f80', '#90a959', '#274c77']
  const randomIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomIndex]
  const avatarUrl = user.avatarUrl
    ? await filesController.downloadFileById(user.avatarUrl)
    : "";
  return {
    fullname: user.fristname + " " + user.lastname,
    fristChar: user.fristname[0].toUpperCase() + user.lastname[0].toUpperCase(),
    fristname: user.fristname,
    lastname: user.lastname,
    email: user.email,
    id: user.id,
    avatarUrl: avatarUrl,
    bio: user.bio,
    avatarColor: randomColor,
  };
};