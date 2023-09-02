import { prisma } from "@/server/db";

const checkCanEdit = async (clubId: string, email: string) => {
  let clubs = await prisma.club.findUnique({
    where: {
      id: clubId,
    },
    include: {
      owner: true,
      editor: true,
    },
  });

  if (!clubs) {
    return false;
  }

  if (clubs.owner.email === email) {
    return true;
  }

  const isEditor = clubs.editor.some((editor) => editor.email === email);

  if (isEditor) {
    return true;
  }

  return false;
};

export default checkCanEdit;
