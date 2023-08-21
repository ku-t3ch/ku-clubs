-- CreateTable
CREATE TABLE "_ClubEditors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClubEditors_AB_unique" ON "_ClubEditors"("A", "B");

-- CreateIndex
CREATE INDEX "_ClubEditors_B_index" ON "_ClubEditors"("B");

-- AddForeignKey
ALTER TABLE "_ClubEditors" ADD CONSTRAINT "_ClubEditors_A_fkey" FOREIGN KEY ("A") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClubEditors" ADD CONSTRAINT "_ClubEditors_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
